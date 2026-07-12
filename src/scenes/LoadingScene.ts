import Phaser from 'phaser'
import { SPRITES, ANIMS } from '../constants/animationKey'
import PapiluCatConfig from '../PapiluCatConfig'
import { SpriteConfig } from '../SpriteConfig'
import PlayingSceneConfig from './PlayingSceneConfig'

import defaultLoadingImg from '../assets/spritesheets/default_loading.png?base64'
import defaultCatIdleImg from '../assets/spritesheets/default_catIdle.png?base64'
import defaultCatMoveImg from '../assets/spritesheets/default_catMove.png?base64'
import defaultCatAction0Img from '../assets/spritesheets/default_catAction_0.png?base64'
import defaultCatAction1Img from '../assets/spritesheets/default_catAction_1.png?base64'
import defaultFlyIdleImg from '../assets/spritesheets/default_flyIdle.png?base64'
import defaultFlyMoveImg from '../assets/spritesheets/default_flyMove.png?base64'

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

    private catActions!: Partial<SpriteConfig>[]

    private butterfly!: boolean

    private flyIdleImg!: string
    private flyIdleWidth!: number
    private flyIdleHeight!: number
    private flyIdleStartIndex!: number
    private flyIdleEndIndex!: number
    private flyIdleFrameRate!: number

    private flyMoveImg!: string
    private flyMoveWidth!: number
    private flyMoveHeight!: number
    private flyMoveStartIndex!: number
    private flyMoveEndIndex!: number
    private flyMoveFrameRate!: number
    private flyMoveAngleCorrection!: number

    constructor() {
        super('LoadingScene')
    }

    init(papiluCatConfig: PapiluCatConfig) {
        if (!papiluCatConfig) papiluCatConfig = {}

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
            this.loadingImg = defaultLoadingImg
            this.loadingWidth = 64
            this.loadingHeight = 64
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
            this.catIdleImg = defaultCatIdleImg
            this.catIdleWidth = 32
            this.catIdleHeight = 48
            this.catIdleStartIndex = 0
            this.catIdleEndIndex = 3
            this.catIdleFrameRate = 3
            this.catMoveImg = defaultCatMoveImg
            this.catMoveWidth = 32
            this.catMoveHeight = 48
            this.catMoveStartIndex = 0
            this.catMoveEndIndex = 3
            this.catMoveFrameRate = 10
            this.catMoveAngleCorrection = 90
        }

        this.butterfly = papiluCatConfig.butterfly !== false

        if (
            papiluCatConfig.flyIdle?.img !== undefined &&
            papiluCatConfig.flyIdle?.width !== undefined &&
            papiluCatConfig.flyIdle?.height !== undefined &&
            papiluCatConfig.flyIdle?.startIndex !== undefined &&
            papiluCatConfig.flyIdle?.endIndex !== undefined &&
            papiluCatConfig.flyIdle?.frameRate !== undefined &&
            papiluCatConfig.flyMove?.img !== undefined &&
            papiluCatConfig.flyMove?.width !== undefined &&
            papiluCatConfig.flyMove?.height !== undefined &&
            papiluCatConfig.flyMove?.startIndex !== undefined &&
            papiluCatConfig.flyMove?.endIndex !== undefined &&
            papiluCatConfig.flyMove?.frameRate !== undefined &&
            papiluCatConfig.flyMove?.angleCorrection !== undefined
        ) {
            this.flyIdleImg = papiluCatConfig.flyIdle.img
            this.flyIdleWidth = papiluCatConfig.flyIdle.width
            this.flyIdleHeight = papiluCatConfig.flyIdle.height
            this.flyIdleStartIndex = papiluCatConfig.flyIdle.startIndex
            this.flyIdleEndIndex = papiluCatConfig.flyIdle.endIndex
            this.flyIdleFrameRate = papiluCatConfig.flyIdle.frameRate
            this.flyMoveImg = papiluCatConfig.flyMove.img
            this.flyMoveWidth = papiluCatConfig.flyMove.width
            this.flyMoveHeight = papiluCatConfig.flyMove.height
            this.flyMoveStartIndex = papiluCatConfig.flyMove.startIndex
            this.flyMoveEndIndex = papiluCatConfig.flyMove.endIndex
            this.flyMoveFrameRate = papiluCatConfig.flyMove.frameRate
            this.flyMoveAngleCorrection = papiluCatConfig.flyMove.angleCorrection
        } else {
            this.flyIdleImg = defaultFlyIdleImg
            this.flyIdleWidth = 24
            this.flyIdleHeight = 24
            this.flyIdleStartIndex = 0
            this.flyIdleEndIndex = 1
            this.flyIdleFrameRate = 3
            this.flyMoveImg = defaultFlyMoveImg
            this.flyMoveWidth = 24
            this.flyMoveHeight = 24
            this.flyMoveStartIndex = 0
            this.flyMoveEndIndex = 3
            this.flyMoveFrameRate = 12
            this.flyMoveAngleCorrection = 90
        }

        if (papiluCatConfig.catActions) {
            this.catActions = papiluCatConfig.catActions
        } else {
            this.catActions = [
                // nap (curled up, breathing)
                { img: defaultCatAction0Img, width: 32, height: 32, startIndex: 0, endIndex: 3, frameRate: 3 },
                // tail play (sitting, tail swishing)
                { img: defaultCatAction1Img, width: 32, height: 48, startIndex: 0, endIndex: 3, frameRate: 5 },
            ]
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

        const loadingSprite = this.add.sprite(start_x, start_y, SPRITES.LOADING)
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

        if (this.butterfly) {
            this.load.spritesheet(SPRITES.FLY_IDLE, this.flyIdleImg, {
                frameWidth: this.flyIdleWidth,
                frameHeight: this.flyIdleHeight
            })

            this.load.spritesheet(SPRITES.FLY_MOVE, this.flyMoveImg, {
                frameWidth: this.flyMoveWidth,
                frameHeight: this.flyMoveHeight
            })
        }

        if (this.catActions && this.catActions.length > 0) {
            for (let i = 0; i < this.catActions.length; i++) {
                if (
                    this.catActions[i].startIndex !== undefined && this.catActions[i].startIndex !== null &&
                    this.catActions[i].endIndex !== undefined && this.catActions[i].endIndex !== null &&
                    this.catActions[i].width !== undefined && this.catActions[i].width !== null &&
                    this.catActions[i].height !== undefined && this.catActions[i].height !== null &&
                    this.catActions[i].frameRate !== undefined && this.catActions[i].frameRate !== null &&
                    this.catActions[i].img
                ) {
                    this.load.spritesheet(`${SPRITES.CAT_ACTION}_${i}`, this.catActions[i].img, {
                        frameWidth: this.catActions[i].width!,
                        frameHeight: this.catActions[i].height!
                    })
                } else {
                    this.catActions.splice(i, 1)
                    i--
                }
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

            if (this.butterfly) {
                this.anims.create({
                    key: ANIMS.FLY_IDLE,
                    frames: this.anims.generateFrameNumbers(SPRITES.FLY_IDLE, { start: this.flyIdleStartIndex, end: this.flyIdleEndIndex }),
                    frameRate: this.flyIdleFrameRate,
                    repeat: -1
                })

                this.anims.create({
                    key: ANIMS.FLY_MOVE,
                    frames: this.anims.generateFrameNumbers(SPRITES.FLY_MOVE, { start: this.flyMoveStartIndex, end: this.flyMoveEndIndex }),
                    frameRate: this.flyMoveFrameRate,
                    repeat: -1
                })
            }

            const playingSceneConfig: PlayingSceneConfig = {
                start_x: start_x,
                start_y: start_y,
                catMoveAngleCorrection: this.catMoveAngleCorrection,
                catActionCount: this.catActions?.length ?? 0,
                flyMoveAngleCorrection: this.flyMoveAngleCorrection,
                butterfly: this.butterfly
            }
            this.scene.start('PlayingScene', playingSceneConfig)

            loadingSprite.destroy()
            this.anims.remove(ANIMS.LOADING)
        })

        setTimeout(() => { this.load.start() }, 1000)
    }
}
