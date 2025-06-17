import Phaser from 'phaser'
import { SPRITES, ANIMS } from '../constants/animationKey'
import PapiluCatConfig from '../PapiluCatConfig'
import SpriteConfig from '../SpriteConfig'
import PlayingSceneConfig from './PlayingSceneConfig'

export default class LoadingScene extends Phaser.Scene {
    private loadingImg!: string
    private loadingWidth!: number
    private loadingHeight!: number
    private loadingStartIndex!: number
    private loadingEndIndex!: number
    private loadingFrameRate!: number

    private catIdleImg!: string
    private catIdleWidth!: number
    private catIdleHeight!: number
    private catIdleStartIndex!: number
    private catIdleEndIndex!: number
    private catIdleFrameRate!: number

    private catMoveImg!: string
    private catMoveWidth!: number
    private catMoveHeight!: number
    private catMoveStartIndex!: number
    private catMoveEndIndex!: number
    private catMoveFrameRate!: number
    private catMoveAngleCorrection!: number

    private catActions!: SpriteConfig[]

    constructor() {
        super('LoadingScene')
    }

    init(papiluCatConfig: PapiluCatConfig) {
        if (
            papiluCatConfig.loading?.img !== undefined &&
            papiluCatConfig.loading?.width !== undefined &&
            papiluCatConfig.loading?.height !== undefined &&
            papiluCatConfig.loading?.startIndex !== undefined &&
            papiluCatConfig.loading?.endIndex !== undefined &&
            papiluCatConfig.loading?.frameRate !== undefined
        ) {
            this.loadingImg = papiluCatConfig.loading?.img
            this.loadingWidth = papiluCatConfig.loading?.width
            this.loadingHeight = papiluCatConfig.loading?.height
            this.loadingStartIndex = papiluCatConfig.loading?.startIndex
            this.loadingEndIndex = papiluCatConfig.loading?.endIndex
            this.loadingFrameRate = papiluCatConfig.loading?.frameRate
        } else {
            this.loadingImg = 'src/assets/spritesheets/default_loading.png'
            this.loadingWidth = 80.375
            this.loadingHeight = 360
            this.loadingStartIndex = 0
            this.loadingEndIndex = 7
            this.loadingFrameRate = 10
        }

        if (
            papiluCatConfig.catIdle?.img !== undefined &&
            papiluCatConfig.catIdle?.width !== undefined &&
            papiluCatConfig.catIdle?.height !== undefined &&
            papiluCatConfig.catIdle?.startIndex !== undefined &&
            papiluCatConfig.catIdle?.endIndex !== undefined &&
            papiluCatConfig.catIdle?.frameRate !== undefined &&
            papiluCatConfig.catMove?.img !== undefined &&
            papiluCatConfig.catMove?.width !== undefined &&
            papiluCatConfig.catMove?.height !== undefined &&
            papiluCatConfig.catMove?.startIndex !== undefined &&
            papiluCatConfig.catMove?.endIndex !== undefined &&
            papiluCatConfig.catMove?.frameRate !== undefined &&
            papiluCatConfig.catMove?.angleCorrection !== undefined
        ) {
            this.catIdleImg = papiluCatConfig.catIdle.img
            this.catIdleWidth = papiluCatConfig.catIdle.width
            this.catIdleHeight = papiluCatConfig.catIdle.height
            this.catIdleStartIndex = papiluCatConfig.catIdle.startIndex
            this.catIdleEndIndex = papiluCatConfig.catIdle.endIndex
            this.catIdleFrameRate = papiluCatConfig.catIdle.frameRate
            this.catMoveImg = papiluCatConfig.catMove.img
            this.catMoveWidth = papiluCatConfig.catMove.width
            this.catMoveHeight = papiluCatConfig.catMove.height
            this.catMoveStartIndex = papiluCatConfig.catMove.startIndex
            this.catMoveEndIndex = papiluCatConfig.catMove.endIndex
            this.catMoveFrameRate = papiluCatConfig.catMove.frameRate
            this.catMoveAngleCorrection = papiluCatConfig.catMove.angleCorrection
        } else {
            this.catIdleImg = 'src/assets/spritesheets/default_catIdle.png'
            this.catIdleWidth = 74
            this.catIdleHeight = 62.5
            this.catIdleStartIndex = 4
            this.catIdleEndIndex = 5
            this.catIdleFrameRate = 4
            this.catMoveImg = 'src/assets/spritesheets/default_catMove.png'
            this.catMoveWidth = 74
            this.catMoveHeight = 62.5
            this.catMoveStartIndex = 0
            this.catMoveEndIndex = 2
            this.catMoveFrameRate = 8
            this.catMoveAngleCorrection = 90
        }

        if (papiluCatConfig.catActions) {
            this.catActions = papiluCatConfig.catActions
        }
    }

    preload() {
        // 1st.
        this.load.spritesheet(SPRITES.LOADING, this.loadingImg, {
            frameWidth: this.loadingWidth,
            frameHeight: this.loadingHeight
        })
    }

    create() {
        this.anims.create({
            key: ANIMS.LOADING,
            frames: this.anims.generateFrameNumbers(SPRITES.LOADING, { start: this.loadingStartIndex, end: this.loadingEndIndex }),
            frameRate: this.loadingFrameRate,
            repeat: -1
        })

        const start_x = Phaser.Math.Between(0, window.innerWidth)
        const start_y = Phaser.Math.Between(0, window.innerHeight)

        const loadingSprite = this.add.sprite(start_x, start_y / 2, SPRITES.LOADING)
        loadingSprite.play(ANIMS.LOADING)

        // 2nd.
        this.load.spritesheet(SPRITES.CAT_IDLE, this.catIdleImg, {
            frameWidth: this.catIdleWidth,
            frameHeight: this.catIdleHeight
        })

        this.load.spritesheet(SPRITES.CAT_MOVE, this.catMoveImg, {
            frameWidth: this.catMoveWidth,
            frameHeight: this.catMoveHeight
        })

        if (this.catActions && this.catActions.length > 0) {
            for (let i = 0; i < this.catActions.length; i++) {
                this.load.spritesheet(`${SPRITES.CAT_ACTION}_${i}`, this.catActions[i].img, {
                    frameWidth: this.catActions[i].width,
                    frameHeight: this.catActions[i].height
                })
            }
        }

        this.load.on('complete', () => {
            this.anims.create({
                key: ANIMS.CAT_IDLE,
                frames: this.anims.generateFrameNumbers(SPRITES.CAT_IDLE, { start: this.catIdleStartIndex, end: this.catIdleEndIndex }),
                frameRate: this.catIdleFrameRate,
                repeat: -1
            })

            this.anims.create({
                key: ANIMS.CAT_MOVE,
                frames: this.anims.generateFrameNumbers(SPRITES.CAT_MOVE, { start: this.catMoveStartIndex, end: this.catMoveEndIndex }),
                frameRate: this.catMoveFrameRate,
                repeat: -1
            })

            if (this.catActions && this.catActions.length > 0) {
                for (let i = 0; i < this.catActions.length; i++) {
                    this.anims.create({
                        key: `${ANIMS.CAT_ACTION}_${i}`,
                        frames: this.anims.generateFrameNumbers(`${SPRITES.CAT_ACTION}_${i}`, { start: this.catActions[i].startIndex, end: this.catActions[i].endIndex }),
                        frameRate: this.catActions[i].frameRate,
                        repeat: -1
                    })
                }
            }

            const playingSceneConfig: PlayingSceneConfig = {
                start_x: start_x,
                start_y: start_y,
                catMoveAngleCorrection: this.catMoveAngleCorrection,
                catActionCount: this.catActions?.length ?? 0
            }
            this.scene.start('PlayingScene', playingSceneConfig)

            loadingSprite.destroy()
            this.anims.remove(ANIMS.LOADING)
        })

        setTimeout(() => { this.load.start() }, 1000)
    }
}
