import Phaser from 'phaser'
import Cat from '../actor/Cat'
import Butterfly from '../actor/Butterfly'
import config from '../config'
import { SPRITES, ANIMS } from '../constants/animationKey'

export default class PlayingScene extends Phaser.Scene {
    private cat!: Cat
    private butterfly!: Butterfly
    private CAT_PADDING = 50;
    private BUTTERFLY_PADDING = 10;

    constructor() {
        super('PlayingScene')
    }

    create() {
        this.cat = new Cat(this, config.width / 1.5, config.height / 1.5, SPRITES.CAT, ANIMS.CAT, this.CAT_PADDING)
        this.butterfly = new Butterfly(this, config.width / 3, config.height / 3, SPRITES.BUTTERFLY, ANIMS.BUTTERFLY, this.BUTTERFLY_PADDING)
    }

    update() {
        const cam = this.cameras.main
        const canvasRect = this.game.canvas.getBoundingClientRect()

        this.cat.update(cam, canvasRect)
        this.butterfly.update(cam, canvasRect)
    }
}
