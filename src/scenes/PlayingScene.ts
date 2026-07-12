import Phaser from 'phaser'
import Cat from '../actors/Cat'
import Butterfly from '../actors/Butterfly'
import PlayingSceneConfig from './PlayingSceneConfig'
import { STATUS } from '../constants/status'

export default class PlayingScene extends Phaser.Scene {
    private start_x!: number
    private start_y!: number
    private cat!: Cat
    private catMoveAngleCorrection!: number
    private catActionCount!: number
    private butterfly: Butterfly | null = null
    private butterflyEnabled!: boolean
    private flyMoveAngleCorrection!: number

    constructor() {
        super('PlayingScene')
    }

    init(playingSceneConfig: PlayingSceneConfig) {
        this.start_x = playingSceneConfig.start_x
        this.start_y = playingSceneConfig.start_y
        this.catMoveAngleCorrection = playingSceneConfig.catMoveAngleCorrection
        this.catActionCount = playingSceneConfig.catActionCount
        this.flyMoveAngleCorrection = playingSceneConfig.flyMoveAngleCorrection
        this.butterflyEnabled = playingSceneConfig.butterfly
    }

    create() {
        this.cat = new Cat(this, this.catMoveAngleCorrection, this.catActionCount, this.start_x, this.start_y)

        if (this.butterflyEnabled) {
            const start_x = Phaser.Math.Between(40, window.innerWidth - 40)
            const start_y = Phaser.Math.Between(40, window.innerHeight - 40)
            this.butterfly = new Butterfly(this, this.flyMoveAngleCorrection, start_x, start_y)

            this.scheduleNextChase()
            this.scheduleNextPerch()
        }
    }

    // Every once in a while the cat notices the butterfly and goes after it.
    private scheduleNextChase() {
        const delay = Phaser.Math.Between(15000, 40000)
        this.time.delayedCall(delay, () => {
            if (this.butterfly?.active && !this.butterfly.isPerching() && this.cat.getStatus() === STATUS.IDLE) {
                this.cat.startChase(this.butterfly)
            }
            this.scheduleNextChase()
        })
    }

    // In quiet moments the butterfly settles on the cat.
    private scheduleNextPerch() {
        const delay = Phaser.Math.Between(25000, 50000)
        this.time.delayedCall(delay, () => {
            if (
                this.butterfly?.active &&
                this.butterfly.getStatus() === STATUS.IDLE &&
                this.cat.getStatus() === STATUS.IDLE
            ) {
                this.butterfly.perchOn(this.cat)
            }
            this.scheduleNextPerch()
        })
    }

    update() {
        const cam = this.cameras.main
        const canvasRect = this.game.canvas.getBoundingClientRect()

        this.cat.update(cam, canvasRect)
        this.butterfly?.update(cam, canvasRect)

        // The butterfly keeps its distance from the cat, unless it is perching.
        if (this.butterfly?.active) {
            if (this.butterfly.isPerching()) {
                if (this.cat.getStatus() !== STATUS.IDLE) this.butterfly.flutterOff()
            } else {
                const distance = Phaser.Math.Distance.Between(this.cat.x, this.cat.y, this.butterfly.x, this.butterfly.y)
                if (distance < 90) this.butterfly.evadeFrom(this.cat.x, this.cat.y)
            }
        }
    }
}
