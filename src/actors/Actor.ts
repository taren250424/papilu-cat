import Phaser from "phaser"
import SectionHelper from "../modules/SectionHelper"
import { Section } from "../type/Section"
import { STATUS } from "../constants/status"

export default class Actor extends Phaser.Physics.Arcade.Sprite {
    private moveTimer?: Phaser.Time.TimerEvent
    protected div: HTMLElement
    protected moveAngleCorrection: number

    protected minDelay: number = 1000
    protected maxDelay: number = 3000

    protected status: string = STATUS.IDLE
    protected tween: Phaser.Tweens.Tween | null = null

    private isResizeThrottled: boolean = false
    private isMouseOverThrottled: boolean = false

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        animkey: string,
        moveAngleCorrection: number
    ) {
        super(scene, x, y, texture)

        this.moveAngleCorrection = moveAngleCorrection
        this.div = this.createAndAppendDiv()

        this.div.addEventListener('pointerdown', () => { this.onPointerDownOrOver() })
        this.div.addEventListener('pointerover', () => { this.onPointerDownOrOver() })

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.play(animkey)

        this.scheduleMovement()

        window.addEventListener('resize', () => { 
            if (this.isResizeThrottled) return
            this.isResizeThrottled = true

            this.emergencyStop() 
            this.enterIdleState()

            setTimeout(() => { this.isResizeThrottled = false }, 200)
        })
    }

    update(cam: Phaser.Cameras.Scene2D.Camera, canvasRect: DOMRect): void {
        this.div.style.left = `${canvasRect.left + (this.x - cam.scrollX)}px`
        this.div.style.top = `${canvasRect.top + (this.y - cam.scrollY)}px`
    }

    destroy(): void {
        this.moveTimer?.remove()
        this.div.remove()
        super.destroy()
    }

    protected onPointerDownOrOver() {
        if (this.isMouseOverThrottled) return
        this.isMouseOverThrottled = true

        this.emergencyStop()
        const sectionHelper = SectionHelper.getInstance()
        const d: Section = sectionHelper.getRandomPositionAroundTarget(this.x, this.y)
        this.moveToRandomPosition(d.start.x, d.start.y, d.end.x, d.end.y)

        setTimeout(() => { this.isMouseOverThrottled = false}, 200)
    }

    protected scheduleMovement() {
        const delay = Phaser.Math.Between(this.minDelay, this.maxDelay)
        const r = Phaser.Math.Between(1, 10)

        if (r >= 1 && r <= 6) {
            this.moveTimer = this.scene.time.addEvent({
                delay,
                callback: () => this.scheduleMovement(),
                callbackScope: this
            })
        } else if (r > 6 && r <= 8) {
            const sectionHelper = SectionHelper.getInstance()
            const d: Section = sectionHelper.getRandomPositionAroundTarget(this.x, this.y)

            this.moveTimer = this.scene.time.addEvent({
                delay,
                callback: () => this.moveToRandomPosition(d.start.x, d.start.y, d.end.x, d.end.y),
                callbackScope: this
            })
        } else {
            this.moveTimer = this.scene.time.addEvent({
                delay,
                callback: () => this.performRandomAction(),
                callbackScope: this
            })
        }
    }

    protected enterIdleState() {
        this.status = STATUS.IDLE
        this.rotation = 0
        this.scheduleMovement()
        // const delay = Phaser.Math.Between(this.minDelay, this.maxDelay)
        // this.scene.time.delayedCall(delay, () => {
            
        // })
    }

    protected moveToRandomPosition(start_x: number, start_y: number, end_x: number, end_y: number) {
        this.status = STATUS.MOVE

        const targetX = Phaser.Math.Between(start_x, end_x)
        const targetY = Phaser.Math.Between(start_y, end_y)

        const distance = Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY)
        const duration = distance / 0.01

        // Sprite is facing up by default.
        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY)
        this.rotation = angle + Phaser.Math.DegToRad(this.moveAngleCorrection)

        this.tween = this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: targetY,
            duration: duration,
            ease: 'Power1',
            onComplete: () => {
                this.enterIdleState()
            }
        })
    }

    protected performRandomAction() {
        this.status = STATUS.ACTION
        this.rotation = 0
        this.scheduleMovement()
        // const delay = Phaser.Math.Between(this.minDelay, this.maxDelay)
        // this.scene.time.delayedCall(delay, () => {
            
        // })
    }

    private emergencyStop() {
        this.tween?.stop()
        this.moveTimer?.remove()
    }

    private createAndAppendDiv(): HTMLElement {
        const dom = document.createElement('div')
        dom.style.width = `${this.width}px`
        dom.style.height = `${this.height}px`
        dom.style.transform = 'translate(-50%, -50%)'
        dom.style.borderRadius = '50%';
        dom.style.position = 'fixed'
        dom.style.pointerEvents = 'auto'
        dom.style.cursor = 'pointer'
        // dom.style.backgroundColor = 'yellow'
        document.body.appendChild(dom)
        return dom
    }
}