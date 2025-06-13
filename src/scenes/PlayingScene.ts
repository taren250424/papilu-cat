import Phaser from 'phaser'
import Cat from '../actors/Cat'
import PlayingSceneConfig from './PlayingSceneConfig'

export default class PlayingScene extends Phaser.Scene {
    private cat!: Cat
    private catIdleAngleCorrection!: number
    private catMoveAngleCorrection!: number
    private catActionsAngleCorrection!: number[]

    constructor() {
        super('PlayingScene')
    }

    init(playingSceneConfig: PlayingSceneConfig) {
        this.catIdleAngleCorrection = playingSceneConfig.catIdleAngleCorrection
        this.catMoveAngleCorrection = playingSceneConfig.catMoveAngleCorrection
        this.catActionsAngleCorrection = playingSceneConfig.catActionsAngleCorrection
    }

    create() {
        this.cat = new Cat(this, this.catIdleAngleCorrection, this.catMoveAngleCorrection, this.catActionsAngleCorrection)
    }

    update() {
        const cam = this.cameras.main
        const canvasRect = this.game.canvas.getBoundingClientRect()

        this.cat.update(cam, canvasRect)
    }
}
