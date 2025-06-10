import Phaser from "phaser"
import config from "../config"

export default class Actor extends Phaser.Physics.Arcade.Sprite {
    private moveTimer?: Phaser.Time.TimerEvent
    protected div: HTMLElement
    private angleCorrection: number
    
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        animkey: string,
        angleCorrection: number,
        private minDelay = 1000,
        private maxDelay = 3000,
    ) {
        super(scene, x, y, texture)

        this.div = this.createAndAppendDiv()
        this.angleCorrection = angleCorrection

        this.div.addEventListener('click', () => { this.onClick() })

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.play(animkey)

        this.scheduleMovement()
    }

    update(cam: Phaser.Cameras.Scene2D.Camera, canvasRect: DOMRect): void {
        this.div.style.left = `${canvasRect.left + (this.x - cam.scrollX)}px`
        this.div.style.top  = `${canvasRect.top + (this.y - cam.scrollY)}px`
    }

    destroy(): void {
        this.moveTimer?.remove()
        this.div.remove()
        super.destroy()
    }

    protected onClick() {}

    private scheduleMovement() {
        const delay = Phaser.Math.Between(this.minDelay, this.maxDelay)
        this.moveTimer = this.scene.time.addEvent({
            delay,
            callback: this.moveToRandomPosition,
            callbackScope: this
        })
    }

    private moveToRandomPosition() {
        const targetX = Phaser.Math.Between(0, config.width)
        const targetY = Phaser.Math.Between(0, config.height)

        const distance = Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY)
        const duration = distance / 0.01

        // Sprite is facing up by default.
        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY)
        this.rotation = angle + Phaser.Math.DegToRad(this.angleCorrection)

        this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: targetY,
            duration: duration,
            ease: 'Power1',
            onComplete: () => {
                this.scheduleMovement()
            }
        })
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
        document.body.appendChild(dom)
        return dom
    }
}