import Phaser from 'phaser'
import { ANIMS, SPRITES } from '../constants/animationKey'
import { STATUS } from '../constants/status'
import Actor from './Actor'

export default class Cat extends Actor {
    private catActionCount: number

    private chaseTimer: Phaser.Time.TimerEvent | null = null
    private chaseTarget: Actor | null = null

    private static readonly CHASE_SPEED = 110
    private static readonly CATCH_DISTANCE = 34
    private static readonly CHASE_TIMEOUT = 8000
    private static readonly CHASE_TICK = 200

    constructor(
        scene: Phaser.Scene,
        moveAngleCorrection: number,
        catActionCount: number,
        start_x: number = window.innerWidth / 2,
        start_y: number = window.innerHeight / 2,
    ) {
        super(scene, start_x, start_y, SPRITES.CAT_IDLE, ANIMS.CAT_IDLE, moveAngleCorrection)
        this.catActionCount = catActionCount
    }

    startChase(target: Actor) {
        if (this.status === STATUS.CHASE) return

        this.emergencyStop()
        this.status = STATUS.CHASE
        this.chaseTarget = target
        this.setTexture(`${SPRITES.CAT_MOVE}`)
        this.play(`${ANIMS.CAT_MOVE}`)

        const startedAt = this.scene.time.now
        this.chaseTimer = this.scene.time.addEvent({
            delay: Cat.CHASE_TICK,
            loop: true,
            callback: () => {
                const target = this.chaseTarget
                if (!target || !target.active || this.scene.time.now - startedAt > Cat.CHASE_TIMEOUT) {
                    this.stopChase(false)
                    return
                }

                const distance = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y)
                if (distance <= Cat.CATCH_DISTANCE) {
                    this.stopChase(true)
                    return
                }

                const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y)
                this.rotation = angle + Phaser.Math.DegToRad(this.moveAngleCorrection)
                this.scene.physics.moveTo(this, target.x, target.y, Cat.CHASE_SPEED)
            }
        })
    }

    private stopChase(caught: boolean) {
        this.chaseTimer?.remove()
        this.chaseTimer = null
        this.chaseTarget = null
        const body = this.body as Phaser.Physics.Arcade.Body | null
        body?.stop()

        // Satisfied after a catch: play with the prey. Gave up: back to idle.
        if (caught && this.catActionCount > 0) this.performRandomAction()
        else this.enterIdleState()
    }

    protected emergencyStop() {
        this.chaseTimer?.remove()
        this.chaseTimer = null
        this.chaseTarget = null
        super.emergencyStop()
    }

    protected enterIdleState() {
        this.setTexture(`${SPRITES.CAT_IDLE}`)
        this.play(`${ANIMS.CAT_IDLE}`)
        super.enterIdleState()
    }

    protected moveToRandomPosition(start_x: number, start_y: number, end_x: number, end_y: number) {
        this.setTexture(`${SPRITES.CAT_MOVE}`)
        this.play(`${ANIMS.CAT_MOVE}`)
        super.moveToRandomPosition(start_x, start_y, end_x, end_y)
    }

    protected performRandomAction() {
        if (this.catActionCount > 0) {
            const idx = Phaser.Math.Between(0, this.catActionCount - 1)
            this.setTexture(`${SPRITES.CAT_ACTION}_${idx}`)
            this.play(`${ANIMS.CAT_ACTION}_${idx}`)
        }

        super.performRandomAction()
    }
}
