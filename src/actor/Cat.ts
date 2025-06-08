import Phaser from 'phaser'

export default class Cat extends Phaser.Physics.Arcade.Sprite{
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        animkey: string
    ) {
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setInteractive({ useHandCursor: true })
        this.on('pointerdown', () => { alert('고양이를 눌렀습니다!') })

        this.play(animkey)
    }
}