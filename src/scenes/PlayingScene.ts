import Phaser from 'phaser'
import Cat from '../actors/Cat'
import Fly from '../actors/Fly'
import config from '../config'
import { SPRITES, ANIMS } from '../constants/animationKey'
import PlayingSceneConfig from './PlayingSceneConfig'

export default class PlayingScene extends Phaser.Scene {
    private cat!: Cat
    private fly!: Fly
    private catSpriteAngleCorrection!: number
    private flySpriteAngleCorrection!: number

    constructor() {
        super('PlayingScene')
    }

    init(playingSceneConfig: PlayingSceneConfig) {
        this.catSpriteAngleCorrection = playingSceneConfig.catSpriteAngleCorrection
        this.flySpriteAngleCorrection = playingSceneConfig.flySpriteAngleCorrection
    }

    create() {
        this.cat = new Cat(this, config.width / 1.5, config.height / 1.5, SPRITES.CAT, ANIMS.CAT, this.catSpriteAngleCorrection)
        this.fly = new Fly(this, config.width / 3, config.height / 3, SPRITES.FLY, ANIMS.FLY, this.flySpriteAngleCorrection)
    }

    update() {
        const cam = this.cameras.main
        const canvasRect = this.game.canvas.getBoundingClientRect()

        this.cat.update(cam, canvasRect)
        this.fly.update(cam, canvasRect)
    }
}
