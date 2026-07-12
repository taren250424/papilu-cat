import Phaser from 'phaser'
import Cat from '../actors/Cat'
import Butterfly from '../actors/Butterfly'
import PlayingSceneConfig from './PlayingSceneConfig'

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
        }
    }

    update() {
        const cam = this.cameras.main
        const canvasRect = this.game.canvas.getBoundingClientRect()

        this.cat.update(cam, canvasRect)
        this.butterfly?.update(cam, canvasRect)
    }
}
