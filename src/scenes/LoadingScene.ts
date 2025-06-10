import Phaser from 'phaser'
import { SPRITES, ANIMS } from '../constants/animationKey'
import PapiluCatConfig from '../PapiluCatConfig'
import PlayingSceneConfig from './PlayingSceneConfig'

export default class LoadingScene extends Phaser.Scene {
    private catSprite!: string
    private catSpriteWidth!: number
    private catSpriteHeight!: number
    private catSpriteStartIndex!: number
    private catSpriteEndIndex!: number
    private catSpriteAngleCorrection!: number
    private flySprite!: string
    private flySpriteWidth!: number
    private flySpriteHeight!: number
    private flySpriteStartIndex!: number
    private flySpriteEndIndex!: number
    private flySpriteAngleCorrection!: number

    constructor() {
        super('LoadingScene')
    }

    init(papiluCatConfig: PapiluCatConfig) {
        this.catSprite = papiluCatConfig.cat.sprite
        this.catSpriteWidth = papiluCatConfig.cat.spriteWidth
        this.catSpriteHeight = papiluCatConfig.cat.spriteHeight
        this.catSpriteStartIndex = papiluCatConfig.cat.spriteStartIndex
        this.catSpriteEndIndex = papiluCatConfig.cat.spriteEndIndex
        this.catSpriteAngleCorrection = papiluCatConfig.cat.spriteAngleCorrection
        this.flySprite = papiluCatConfig.fly.sprite
        this.flySpriteWidth = papiluCatConfig.fly.spriteWidth
        this.flySpriteHeight = papiluCatConfig.fly.spriteHeight
        this.flySpriteStartIndex = papiluCatConfig.fly.spriteStartIndex
        this.flySpriteEndIndex = papiluCatConfig.fly.spriteEndIndex
        this.flySpriteAngleCorrection = papiluCatConfig.fly.spriteAngleCorrection
    }

    preload() {
        this.load.spritesheet(SPRITES.CAT, this.catSprite, {
            frameWidth: this.catSpriteWidth,
            frameHeight: this.catSpriteHeight
        })

        this.load.spritesheet(SPRITES.FLY, this.flySprite, {
            frameWidth: this.flySpriteWidth,
            frameHeight: this.flySpriteHeight
        })
    }

    create() {
        this.anims.create({
            key: ANIMS.CAT,
            frames: this.anims.generateFrameNumbers(SPRITES.CAT, { start: this.catSpriteStartIndex, end: this.catSpriteEndIndex }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: ANIMS.FLY,
            frames: this.anims.generateFrameNumbers(SPRITES.FLY, { start: this.flySpriteStartIndex, end: this.flySpriteEndIndex }),
            frameRate: 10,
            repeat: -1
        })

        const playingSceneConfig: PlayingSceneConfig = {
            catSpriteAngleCorrection: this.catSpriteAngleCorrection,
            flySpriteAngleCorrection: this.flySpriteAngleCorrection
        }
        this.scene.start('PlayingScene', playingSceneConfig)
    }
}
