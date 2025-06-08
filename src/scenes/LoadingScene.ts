import Phaser from 'phaser'
import catSprite from '../assets/spritesheets/cat.png'

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene')
    }

    preload() {
        // this.load.spritesheet('cat_sprite', 'spritesheets/cat.png', {
        this.load.spritesheet('cat_sprite', catSprite, {
            frameWidth: 144.3,
            frameHeight: 144.25
        })
    }

    create() {
        this.anims.create({
            key: "cat_downAnim",
            frames: this.anims.generateFrameNumbers('cat_sprite', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "cat_leftAnim",
            frames: this.anims.generateFrameNumbers('cat_sprite', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "cat_rightAnim",
            frames: this.anims.generateFrameNumbers('cat_sprite', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "cat_upAnim",
            frames: this.anims.generateFrameNumbers('cat_sprite', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        })

        this.scene.start('PlayingScene')
    }
}
