import Phaser from 'phaser'
import Cat from '../actors/Cat'
import Fly from '../actors/Fly'
import PlayingSceneConfig from './PlayingSceneConfig'

export default class PlayingScene extends Phaser.Scene {
    private cat!: Cat
    private fly!: Fly
    private catIdleSpriteAngleCorrection!: number
    private catMoveSpriteAngleCorrection!: number
    private catFirstSpriteAngleCorrection!: number
    private catSecondSpriteAngleCorrection!: number
    private flyIdleSpriteAngleCorrection!: number
    private flyMoveSpriteAngleCorrection!: number

    constructor() {
        super('PlayingScene')
    }

    init(playingSceneConfig: PlayingSceneConfig) {
        this.catIdleSpriteAngleCorrection = playingSceneConfig.catIdleSpriteAngleCorrection
        this.catMoveSpriteAngleCorrection = playingSceneConfig.catMoveSpriteAngleCorrection
        this.catFirstSpriteAngleCorrection = playingSceneConfig.catFirstActionSpriteAngleCorrection
        this.catSecondSpriteAngleCorrection = playingSceneConfig.catSecondActionSpriteAngleCorrection
        this.flyIdleSpriteAngleCorrection = playingSceneConfig.flyIdleSpriteAngleCorrection
        this.flyMoveSpriteAngleCorrection = playingSceneConfig.flyMoveSpriteAngleCorrection
    }

    create() {
        this.cat = new Cat(this, this.catIdleSpriteAngleCorrection, this.catMoveSpriteAngleCorrection, this.catFirstSpriteAngleCorrection, this.catSecondSpriteAngleCorrection)
        this.fly = new Fly(this, this.flyIdleSpriteAngleCorrection, this.flyMoveSpriteAngleCorrection)
    }

    update() {
        const cam = this.cameras.main
        const canvasRect = this.game.canvas.getBoundingClientRect()

        this.cat.update(cam, canvasRect)
        this.fly.update(cam, canvasRect)
    }
}
