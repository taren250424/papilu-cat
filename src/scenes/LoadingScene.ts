import Phaser from 'phaser'
import { SPRITES, ANIMS } from '../constants/animationKey'
import PapiluCatConfig from '../PapiluCatConfig'
import PlayingSceneConfig from './PlayingSceneConfig'
import config from '../config'

export default class LoadingScene extends Phaser.Scene {
    private loadingSprite!: string
    private loadingSpriteWidth!: number
    private loadingSpriteHeight!: number
    private loadingSpriteStartIndex!: number
    private loadingSpriteEndIndex!: number
    private loadingSpriteFrameRate!: number

    private catIdleSprite!: string
    private catIdleSpriteWidth!: number
    private catIdleSpriteHeight!: number
    private catIdleSpriteStartIndex!: number
    private catIdleSpriteEndIndex!: number
    private catIdleSpriteFrameRate!: number
    private catIdleSpriteAngleCorrection!: number

    private catMoveSprite!: string
    private catMoveSpriteWidth!: number
    private catMoveSpriteHeight!: number
    private catMoveSpriteStartIndex!: number
    private catMoveSpriteEndIndex!: number
    private catMoveSpriteFrameRate!: number
    private catMoveSpriteAngleCorrection!: number

    private catFirstActionSprite!: string
    private catFirstActionSpriteWidth!: number
    private catFirstActionSpriteHeight!: number
    private catFirstActionSpriteStartIndex!: number
    private catFirstActionSpriteEndIndex!: number
    private catFirstActionSpriteFrameRate!: number
    private catFirstActionSpriteAngleCorrection!: number

    private catSecondActionSprite!: string
    private catSecondActionSpriteWidth!: number
    private catSecondActionSpriteHeight!: number
    private catSecondActionSpriteStartIndex!: number
    private catSecondActionSpriteEndIndex!: number
    private catSecondActionSpriteFrameRate!: number
    private catSecondActionSpriteAngleCorrection!: number

    private flyIdleSprite!: string
    private flyIdleSpriteWidth!: number
    private flyIdleSpriteHeight!: number
    private flyIdleSpriteStartIndex!: number
    private flyIdleSpriteEndIndex!: number
    private flyIdleSpriteFrameRate!: number
    private flyIdleSpriteAngleCorrection!: number

    private flyMoveSprite!: string
    private flyMoveSpriteWidth!: number
    private flyMoveSpriteHeight!: number
    private flyMoveSpriteStartIndex!: number
    private flyMoveSpriteEndIndex!: number
    private flyMoveSpriteFrameRate!: number
    private flyMoveSpriteAngleCorrection!: number

    constructor() {
        super('LoadingScene')
    }

    init(papiluCatConfig: PapiluCatConfig) {
        if (
            papiluCatConfig.loading?.sprite !== undefined &&
            papiluCatConfig.loading?.spriteWidth !== undefined &&
            papiluCatConfig.loading?.spriteHeight !== undefined &&
            papiluCatConfig.loading?.spriteStartIndex !== undefined &&
            papiluCatConfig.loading?.spriteEndIndex !== undefined &&
            papiluCatConfig.loading?.spriteFrameRate !== undefined 
        ) {
            this.loadingSprite = papiluCatConfig.loading?.sprite
            this.loadingSpriteWidth = papiluCatConfig.loading?.spriteWidth
            this.loadingSpriteHeight = papiluCatConfig.loading?.spriteHeight
            this.loadingSpriteStartIndex = papiluCatConfig.loading?.spriteStartIndex
            this.loadingSpriteEndIndex = papiluCatConfig.loading?.spriteEndIndex
            this.loadingSpriteFrameRate = papiluCatConfig.loading?.spriteFrameRate
        } else {
            this.loadingSprite = 'src/assets/spritesheets/default_loading.png'
            this.loadingSpriteWidth = 80.375
            this.loadingSpriteHeight = 360
            this.loadingSpriteStartIndex = 0
            this.loadingSpriteEndIndex = 7
            this.loadingSpriteFrameRate = 10
        }

        if (
            papiluCatConfig.catIdle?.sprite !== undefined &&
            papiluCatConfig.catIdle?.spriteWidth !== undefined &&
            papiluCatConfig.catIdle?.spriteHeight !== undefined &&
            papiluCatConfig.catIdle?.spriteStartIndex !== undefined &&
            papiluCatConfig.catIdle?.spriteEndIndex !== undefined &&
            papiluCatConfig.catIdle?.spriteFrameRate !== undefined &&
            papiluCatConfig.catIdle?.spriteAngleCorrection !== undefined
        ) {
            this.catIdleSprite = papiluCatConfig.catIdle.sprite
            this.catIdleSpriteWidth = papiluCatConfig.catIdle.spriteWidth
            this.catIdleSpriteHeight = papiluCatConfig.catIdle.spriteHeight
            this.catIdleSpriteStartIndex = papiluCatConfig.catIdle.spriteStartIndex
            this.catIdleSpriteEndIndex = papiluCatConfig.catIdle.spriteEndIndex
            this.catIdleSpriteFrameRate = papiluCatConfig.catIdle.spriteFrameRate
            this.catIdleSpriteAngleCorrection = papiluCatConfig.catIdle.spriteAngleCorrection
        } else {
            this.catIdleSprite = 'src/assets/spritesheets/default_catIdle.png'
            this.catIdleSpriteWidth = 74
            this.catIdleSpriteHeight = 62.5
            this.catIdleSpriteStartIndex = 4
            this.catIdleSpriteEndIndex = 5
            this.catIdleSpriteFrameRate = 1
            this.catIdleSpriteAngleCorrection = 90
        }

        if (
            papiluCatConfig.catMove?.sprite !== undefined &&
            papiluCatConfig.catMove?.spriteWidth !== undefined &&
            papiluCatConfig.catMove?.spriteHeight !== undefined &&
            papiluCatConfig.catMove?.spriteStartIndex !== undefined &&
            papiluCatConfig.catMove?.spriteEndIndex !== undefined &&
            papiluCatConfig.catMove?.spriteFrameRate !== undefined &&
            papiluCatConfig.catMove?.spriteAngleCorrection !== undefined
        ) {
            this.catMoveSprite = papiluCatConfig.catMove.sprite
            this.catMoveSpriteWidth = papiluCatConfig.catMove.spriteWidth
            this.catMoveSpriteHeight = papiluCatConfig.catMove.spriteHeight
            this.catMoveSpriteStartIndex = papiluCatConfig.catMove.spriteStartIndex
            this.catMoveSpriteEndIndex = papiluCatConfig.catMove.spriteEndIndex
            this.catMoveSpriteFrameRate = papiluCatConfig.catMove.spriteFrameRate
            this.catMoveSpriteAngleCorrection = papiluCatConfig.catMove.spriteAngleCorrection
        } else {
            this.catMoveSprite = 'src/assets/spritesheets/default_catMove.png'
            this.catMoveSpriteWidth = 74
            this.catMoveSpriteHeight = 62.5
            this.catMoveSpriteStartIndex = 0
            this.catMoveSpriteEndIndex = 2
            this.catMoveSpriteFrameRate = 8
            this.catMoveSpriteAngleCorrection = 90
        }

        if (
            papiluCatConfig.catFirstAction?.sprite !== undefined &&
            papiluCatConfig.catFirstAction?.spriteWidth !== undefined &&
            papiluCatConfig.catFirstAction?.spriteHeight !== undefined &&
            papiluCatConfig.catFirstAction?.spriteStartIndex !== undefined &&
            papiluCatConfig.catFirstAction?.spriteEndIndex !== undefined &&
            papiluCatConfig.catFirstAction?.spriteFrameRate !== undefined &&
            papiluCatConfig.catFirstAction?.spriteAngleCorrection !== undefined
        ) {
            this.catFirstActionSprite = papiluCatConfig.catFirstAction.sprite
            this.catFirstActionSpriteWidth = papiluCatConfig.catFirstAction.spriteWidth
            this.catFirstActionSpriteHeight = papiluCatConfig.catFirstAction.spriteHeight
            this.catFirstActionSpriteStartIndex = papiluCatConfig.catFirstAction.spriteStartIndex
            this.catFirstActionSpriteEndIndex = papiluCatConfig.catFirstAction.spriteEndIndex
            this.catFirstActionSpriteFrameRate = papiluCatConfig.catFirstAction.spriteFrameRate
            this.catFirstActionSpriteAngleCorrection = papiluCatConfig.catFirstAction.spriteAngleCorrection
        } else {
            this.catFirstActionSprite = 'src/assets/spritesheets/default_catFirstAction.png'
            this.catFirstActionSpriteWidth = 126.67
            this.catFirstActionSpriteHeight = 124.25
            this.catFirstActionSpriteStartIndex = 0
            this.catFirstActionSpriteEndIndex = 23
            this.catFirstActionSpriteFrameRate = 8
            this.catFirstActionSpriteAngleCorrection = 90
        }

        if (
            papiluCatConfig.catSecondAction?.sprite !== undefined &&
            papiluCatConfig.catSecondAction?.spriteWidth !== undefined &&
            papiluCatConfig.catSecondAction?.spriteHeight !== undefined &&
            papiluCatConfig.catSecondAction?.spriteStartIndex !== undefined &&
            papiluCatConfig.catSecondAction?.spriteEndIndex !== undefined &&
            papiluCatConfig.catSecondAction?.spriteFrameRate !== undefined &&
            papiluCatConfig.catSecondAction?.spriteAngleCorrection !== undefined
        ) {
            this.catSecondActionSprite = papiluCatConfig.catSecondAction.sprite
            this.catSecondActionSpriteWidth = papiluCatConfig.catSecondAction.spriteWidth
            this.catSecondActionSpriteHeight = papiluCatConfig.catSecondAction.spriteHeight
            this.catSecondActionSpriteStartIndex = papiluCatConfig.catSecondAction.spriteStartIndex
            this.catSecondActionSpriteEndIndex = papiluCatConfig.catSecondAction.spriteEndIndex
            this.catSecondActionSpriteFrameRate = papiluCatConfig.catSecondAction.spriteFrameRate
            this.catSecondActionSpriteAngleCorrection = papiluCatConfig.catSecondAction.spriteAngleCorrection
        } else {
            this.catSecondActionSprite = 'src/assets/spritesheets/default_catSecondAction.png'
            this.catSecondActionSpriteWidth = 650
            this.catSecondActionSpriteHeight = 650
            this.catSecondActionSpriteStartIndex = 0
            this.catSecondActionSpriteEndIndex = 0
            this.catSecondActionSpriteFrameRate = 8
            this.catSecondActionSpriteAngleCorrection = 90
        }

        if (
            papiluCatConfig.flyIdle?.sprite !== undefined &&
            papiluCatConfig.flyIdle?.spriteWidth !== undefined &&
            papiluCatConfig.flyIdle?.spriteHeight !== undefined &&
            papiluCatConfig.flyIdle?.spriteStartIndex !== undefined &&
            papiluCatConfig.flyIdle?.spriteEndIndex !== undefined &&
            papiluCatConfig.flyIdle?.spriteFrameRate !== undefined &&
            papiluCatConfig.flyIdle?.spriteAngleCorrection !== undefined
        ) {
            this.flyIdleSprite = papiluCatConfig.flyIdle.sprite
            this.flyIdleSpriteWidth = papiluCatConfig.flyIdle.spriteWidth
            this.flyIdleSpriteHeight = papiluCatConfig.flyIdle.spriteHeight
            this.flyIdleSpriteStartIndex = papiluCatConfig.flyIdle.spriteStartIndex
            this.flyIdleSpriteEndIndex = papiluCatConfig.flyIdle.spriteEndIndex
            this.flyIdleSpriteFrameRate = papiluCatConfig.flyIdle.spriteFrameRate
            this.flyIdleSpriteAngleCorrection = papiluCatConfig.flyIdle.spriteAngleCorrection
        } else {
            this.flyIdleSprite = 'src/assets/spritesheets/default_flyIdle.png'
            this.flyIdleSpriteWidth = 75
            this.flyIdleSpriteHeight = 75
            this.flyIdleSpriteStartIndex = 0
            this.flyIdleSpriteEndIndex = 0
            this.flyIdleSpriteFrameRate = 1
            this.flyIdleSpriteAngleCorrection = 90
        }

        if (
            papiluCatConfig.flyMove?.sprite !== undefined &&
            papiluCatConfig.flyMove?.spriteWidth !== undefined &&
            papiluCatConfig.flyMove?.spriteHeight !== undefined &&
            papiluCatConfig.flyMove?.spriteStartIndex !== undefined &&
            papiluCatConfig.flyMove?.spriteEndIndex !== undefined &&
            papiluCatConfig.flyMove?.spriteFrameRate !== undefined &&
            papiluCatConfig.flyMove?.spriteAngleCorrection !== undefined
        ) {
            this.flyMoveSprite = papiluCatConfig.flyMove.sprite
            this.flyMoveSpriteWidth = papiluCatConfig.flyMove.spriteWidth
            this.flyMoveSpriteHeight = papiluCatConfig.flyMove.spriteHeight
            this.flyMoveSpriteStartIndex = papiluCatConfig.flyMove.spriteStartIndex
            this.flyMoveSpriteEndIndex = papiluCatConfig.flyMove.spriteEndIndex
            this.flyMoveSpriteFrameRate = papiluCatConfig.flyMove.spriteFrameRate
            this.flyMoveSpriteAngleCorrection = papiluCatConfig.flyMove.spriteAngleCorrection
        } else {
            this.flyMoveSprite = 'src/assets/spritesheets/default_flyIdle.png'
            this.flyMoveSpriteWidth = 75
            this.flyMoveSpriteHeight = 75
            this.flyMoveSpriteStartIndex = 0
            this.flyMoveSpriteEndIndex = 0
            this.flyMoveSpriteFrameRate = 8
            this.flyMoveSpriteAngleCorrection = 90
        }
    }

    preload() {
        // 1st.
        this.load.spritesheet(SPRITES.LOADING, this.loadingSprite, {
            frameWidth: this.loadingSpriteWidth,
            frameHeight: this.loadingSpriteHeight
        })
    }

    create() {
        this.anims.create({
            key: ANIMS.LOADING,
            frames: this.anims.generateFrameNumbers(SPRITES.LOADING, { start: this.loadingSpriteStartIndex, end: this.loadingSpriteEndIndex }),
            frameRate: this.loadingSpriteFrameRate,
            repeat: -1
        })

        const loadingSprite = this.add.sprite(config.width / 2, config.height / 2, SPRITES.LOADING)
        loadingSprite.play(ANIMS.LOADING)

        // 2nd.
        this.load.spritesheet(SPRITES.CAT_IDLE, this.catIdleSprite, {
            frameWidth: this.catIdleSpriteWidth,
            frameHeight: this.catIdleSpriteHeight
        })

        this.load.spritesheet(SPRITES.CAT_MOVE, this.catMoveSprite, {
            frameWidth: this.catMoveSpriteWidth,
            frameHeight: this.catMoveSpriteHeight
        })

        this.load.spritesheet(SPRITES.CAT_FIRST_ACTION, this.catFirstActionSprite, {
            frameWidth: this.catFirstActionSpriteWidth,
            frameHeight: this.catFirstActionSpriteHeight
        })

        this.load.spritesheet(SPRITES.CAT_SECOND_ACTION, this.catSecondActionSprite, {
            frameWidth: this.catSecondActionSpriteWidth,
            frameHeight: this.catSecondActionSpriteHeight
        })

        this.load.spritesheet(SPRITES.FLY_IDLE, this.flyIdleSprite, {
            frameWidth: this.flyIdleSpriteWidth,
            frameHeight: this.flyIdleSpriteHeight
        })

        this.load.spritesheet(SPRITES.FLY_MOVE, this.flyMoveSprite, {
            frameWidth: this.flyMoveSpriteWidth,
            frameHeight: this.flyMoveSpriteHeight
        })

        this.load.on('complete', () => {
            this.anims.create({
                key: ANIMS.CAT_IDLE,
                frames: this.anims.generateFrameNumbers(SPRITES.CAT_IDLE, { start: this.catIdleSpriteStartIndex, end: this.catIdleSpriteEndIndex }),
                frameRate: this.catIdleSpriteFrameRate,
                repeat: -1
            })

            this.anims.create({
                key: ANIMS.CAT_MOVE,
                frames: this.anims.generateFrameNumbers(SPRITES.CAT_MOVE, { start: this.catMoveSpriteStartIndex, end: this.catMoveSpriteEndIndex }),
                frameRate: this.catMoveSpriteFrameRate,
                repeat: -1
            })

            this.anims.create({
                key: ANIMS.CAT_FIRST_ACTION,
                frames: this.anims.generateFrameNumbers(SPRITES.CAT_FIRST_ACTION, { start: this.catFirstActionSpriteStartIndex, end: this.catFirstActionSpriteEndIndex }),
                frameRate: this.catFirstActionSpriteFrameRate,
                repeat: -1
            })

            this.anims.create({
                key: ANIMS.CAT_SECOND_ACTION,
                frames: this.anims.generateFrameNumbers(SPRITES.CAT_SECOND_ACTION, { start: this.catSecondActionSpriteStartIndex, end: this.catSecondActionSpriteEndIndex }),
                frameRate: this.catSecondActionSpriteFrameRate,
                repeat: -1
            })

            this.anims.create({
                key: ANIMS.FLY_IDLE,
                frames: this.anims.generateFrameNumbers(SPRITES.FLY_IDLE, { start: this.flyIdleSpriteStartIndex, end: this.flyIdleSpriteEndIndex }),
                frameRate: this.flyIdleSpriteFrameRate,
                repeat: -1
            })

            this.anims.create({
                key: ANIMS.FLY_MOVE,
                frames: this.anims.generateFrameNumbers(SPRITES.FLY_MOVE, { start: this.flyMoveSpriteStartIndex, end: this.flyMoveSpriteEndIndex }),
                frameRate: this.flyMoveSpriteFrameRate,
                repeat: -1
            })

            const playingSceneConfig: PlayingSceneConfig = {
                catIdleSpriteAngleCorrection: this.catIdleSpriteAngleCorrection,
                catMoveSpriteAngleCorrection: this.catMoveSpriteAngleCorrection,
                catFirstActionSpriteAngleCorrection: this.catFirstActionSpriteAngleCorrection,
                catSecondActionSpriteAngleCorrection: this.catSecondActionSpriteAngleCorrection,
                flyIdleSpriteAngleCorrection: this.flyIdleSpriteAngleCorrection,
                flyMoveSpriteAngleCorrection: this.flyMoveSpriteAngleCorrection,
            }
            this.scene.start('PlayingScene', playingSceneConfig)

            loadingSprite.destroy()
            this.anims.remove(ANIMS.LOADING)
        })

        setTimeout(() => { this.load.start() }, 1000)
    }
}
