import Phaser from 'phaser'
import { ANIMS, SPRITES } from '../constants/animationKey'
import { STATUS } from '../constants/status'
import Actor from './Actor'
import SectionHelper from '../modules/SectionHelper'
import { Section } from '../type/Section'

export default class Butterfly extends Actor {
    constructor(
        scene: Phaser.Scene,
        moveAngleCorrection: number,
        start_x: number = window.innerWidth / 2,
        start_y: number = window.innerHeight / 2,
    ) {
        super(scene, start_x, start_y, SPRITES.FLY_IDLE, ANIMS.FLY_IDLE, moveAngleCorrection)

        // Butterflies are quicker and more restless than the cat.
        this.minDelay = 3000
        this.maxDelay = 12000
        this.speedPxPerMs = 0.05
        this.emergencyStop()
        this.scheduleMovement()
    }

    protected enterIdleState() {
        this.setTexture(`${SPRITES.FLY_IDLE}`)
        this.play(`${ANIMS.FLY_IDLE}`)
        super.enterIdleState()
    }

    protected moveToRandomPosition(start_x: number, start_y: number, end_x: number, end_y: number) {
        this.setTexture(`${SPRITES.FLY_MOVE}`)
        this.play(`${ANIMS.FLY_MOVE}`)
        super.moveToRandomPosition(start_x, start_y, end_x, end_y)
    }

    private lastEvadeAt: number = -Infinity
    private perching: boolean = false

    private static readonly EVADE_COOLDOWN = 1200
    private static readonly EVADE_SPEED = 0.12
    private static readonly PERCH_OFFSET_X = 8
    private static readonly PERCH_OFFSET_Y = -15

    isPerching(): boolean {
        return this.perching
    }

    // Fly over and settle on the idle cat.
    perchOn(target: Actor) {
        if (this.perching) return

        this.emergencyStop()
        this.perching = true
        this.status = STATUS.MOVE

        const targetX = target.x + Butterfly.PERCH_OFFSET_X
        const targetY = target.y + Butterfly.PERCH_OFFSET_Y

        this.setTexture(`${SPRITES.FLY_MOVE}`)
        this.play(`${ANIMS.FLY_MOVE}`)

        const distance = Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY)
        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY)
        this.rotation = angle + Phaser.Math.DegToRad(this.moveAngleCorrection)

        this.tween = this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: targetY,
            duration: distance / this.speedPxPerMs,
            ease: 'Sine.easeOut',
            onComplete: () => {
                this.status = STATUS.PERCH
                this.rotation = 0
                this.setTexture(`${SPRITES.FLY_IDLE}`)
                this.play(`${ANIMS.FLY_IDLE}`)
            }
        })
    }

    // The cat woke up or started moving: take off again.
    flutterOff() {
        if (!this.perching) return
        this.startleFrom(this.x, this.y)
    }

    protected emergencyStop() {
        this.perching = false
        super.emergencyStop()
    }

    // Dart away from the cat, faster than regular wandering.
    evadeFrom(threat_x: number, threat_y: number) {
        if (this.perching) return

        const now = this.scene.time.now
        if (now - this.lastEvadeAt < Butterfly.EVADE_COOLDOWN) return
        this.lastEvadeAt = now

        const wanderSpeed = this.speedPxPerMs
        this.speedPxPerMs = Butterfly.EVADE_SPEED
        this.startleFrom(threat_x, threat_y)
        this.speedPxPerMs = wanderSpeed
    }

    // Butterflies have no standalone actions: flutter to a nearby spot instead.
    protected performRandomAction() {
        const sectionHelper = SectionHelper.getInstance()
        const d: Section = sectionHelper.getRandomPositionAroundTarget(this.x, this.y)
        this.moveToRandomPosition(d.start.x, d.start.y, d.end.x, d.end.y)
    }
}
