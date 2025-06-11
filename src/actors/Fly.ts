import Phaser from "phaser"
import Actor from "./Actor"
import config from '../config'
import { SPRITES, ANIMS } from '../constants/animationKey'

export default class Fly extends Actor {
    private idleAngleCorrection: number
    private moveAngleCorrection: number

    constructor(
        scene: Phaser.Scene,
        idleAngleCorrection: number,
        moveAngleCorrection: number,
    ) {
        super(scene, config.width / 4, config.height / 4, SPRITES.FLY_IDLE, ANIMS.FLY_IDLE, idleAngleCorrection)
        this.idleAngleCorrection = idleAngleCorrection
        this.moveAngleCorrection = moveAngleCorrection
    }

    protected onPointerDownOrOver() {
        alert('I am a fly')
    }
}