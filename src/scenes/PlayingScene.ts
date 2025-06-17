import Phaser from 'phaser'
import Cat from '../actors/Cat'
import PlayingSceneConfig from './PlayingSceneConfig'

export default class PlayingScene extends Phaser.Scene {
    private start_x!: number
    private start_y!: number
    private cat!: Cat
    private catMoveAngleCorrection!: number
    private catActionCount!: number

    constructor() {
        super('PlayingScene')
    }

    init(playingSceneConfig: PlayingSceneConfig) {
        this.start_x = playingSceneConfig.start_x
        this.start_y = playingSceneConfig.start_y
        this.catMoveAngleCorrection = playingSceneConfig.catMoveAngleCorrection
        this.catActionCount = playingSceneConfig.catActionCount
    }

    create() {
        this.cat = new Cat(this, this.catMoveAngleCorrection, this.catActionCount, this.start_x, this.start_y)
    }

    update() {
        const cam = this.cameras.main
        const canvasRect = this.game.canvas.getBoundingClientRect()

        this.cat.update(cam, canvasRect)
    }
}
