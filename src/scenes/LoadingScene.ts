import Phaser from 'phaser'
import catSprite from '../assets/spritesheets/cat.png'
import butterflySprite from '../assets/spritesheets/butterfly.png'
import { SPRITES, ANIMS } from '../constants/animationKey'

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene')
    }

    preload() {
        this.load.spritesheet(SPRITES.CAT, catSprite, {
            frameWidth: 74,
            frameHeight: 62.5
        })

        this.load.spritesheet(SPRITES.BUTTERFLY, butterflySprite, {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        this.anims.create({
            key: ANIMS.CAT,
            frames: this.anims.generateFrameNumbers(SPRITES.CAT, {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: ANIMS.BUTTERFLY,
            frames: this.anims.generateFrameNumbers(SPRITES.BUTTERFLY),
            frameRate: 10,
            repeat: -1
        })

        this.scene.start('PlayingScene')
    }
}
