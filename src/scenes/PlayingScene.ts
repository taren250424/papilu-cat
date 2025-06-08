import Phaser from 'phaser'
import Cat from '../actor/Cat';

export default class PlayingScene extends Phaser.Scene {
    private cat!: Cat

    constructor() {
        super('PlayingScene')
    }

    create() {
        // this.cat = new Cat(this, config.width / 2, config.height / 2, "cat_sprite", "cat_upAnim");
        this.cat = new Cat(this, 50, 50, "cat_sprite", "cat_upAnim");
        console.log(this.cat)   // temp.
    }
}
