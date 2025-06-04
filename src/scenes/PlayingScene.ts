import Phaser from 'phaser'
import config from '../config';
import Cat from '../actor/cat';

export default class PlayingScene extends Phaser.Scene {
    private cat!: Cat

    constructor() {
        super('PlayingScene')
    }

    create() {
        // this.cat = new Cat(this, config.width / 2, config.height / 2, "cat_sprite", "cat_upAnim");
        this.cat = new Cat(this, 50, 50, "cat_sprite", "cat_upAnim");
    }
}
