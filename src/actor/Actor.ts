import Phaser from "phaser"
import config from "../config"

export default class Actor extends Phaser.Physics.Arcade.Sprite {
    private moveTimer?: Phaser.Time.TimerEvent
    protected div: HTMLElement
    
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        animkey: string,
        divPadding: number,
        private minDelay = 1000,
        private maxDelay = 3000,
        private moveArea = { xMin: 0, xMax: config.width, yMin: 0, yMax: config.height }
    ) {
        super(scene, x, y, texture)

        this.div = this.createAndAppendDiv(divPadding)

        this.div.addEventListener('click', () => {
            alert(this.constructor.name)
        })

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

    private scheduleMovement() {
        const delay = Phaser.Math.Between(this.minDelay, this.maxDelay)
        this.moveTimer = this.scene.time.addEvent({
            delay,
            callback: this.moveToRandomPosition,
            callbackScope: this
        })
    }

    private moveToRandomPosition() {
        const { xMin, xMax, yMin, yMax } = this.moveArea
        const targetX = Phaser.Math.Between(xMin, xMax)
        const targetY = Phaser.Math.Between(yMin, yMax)

        const distance = Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY)
        const duration = distance / 0.01

        // Sprite is facing up by default.
        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY)
        this.rotation = angle + Phaser.Math.DegToRad(90)

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

    private createAndAppendDiv(divPadding: number): HTMLElement {
        const dom = document.createElement('div')
        dom.className = 'actorDiv'
        dom.style.position = 'fixed'
        dom.style.pointerEvents = 'auto'
        dom.style.transform = 'translate(-50%, -50%)'
        dom.style.borderRadius = '50%';
        dom.style.width = `${this.width - divPadding}px`
        dom.style.height = `${this.height - divPadding}px`
        // dom.style.backgroundColor = 'yellow'
        document.body.appendChild(dom)
        return dom
    }
}