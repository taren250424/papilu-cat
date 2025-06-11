import Phaser from 'phaser'
import Actor from './Actor'
import config from '../config'
import { SPRITES, ANIMS } from '../constants/animationKey'

export default class Cat extends Actor {
    private idleAngleCorrection: number
    private moveAngleCorrection: number
    private firstActionAngleCorrection: number
    private secondActionAngleCorrection: number

    constructor(
        scene: Phaser.Scene,
        idleAngleCorrection: number,
        moveAngleCorrection: number,
        firstActionAngleCorrection: number,
        secondActionAngleCorrection: number
    ) {
        super(scene, config.width / 3, config.height / 3, SPRITES.CAT_IDLE, ANIMS.CAT_IDLE, idleAngleCorrection)
        this.idleAngleCorrection = idleAngleCorrection
        this.moveAngleCorrection = moveAngleCorrection
        this.firstActionAngleCorrection = firstActionAngleCorrection
        this.secondActionAngleCorrection = secondActionAngleCorrection
    }

    protected onPointerDownOrOver() {
        alert('I am a cat')
    }
}