import Phaser from "phaser"
import Actor from "./Actor"

export default class Fly extends Actor {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        animkey: string,
        angleCorrection: number,
        minDelay = 1000,
        maxDelay = 3000,
    ) {
        super(scene, x, y, texture, animkey, angleCorrection, minDelay, maxDelay)
    }

    protected onClick() {
        alert('I am a fly')
    }
}