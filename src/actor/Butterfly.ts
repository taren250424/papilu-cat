import Phaser from "phaser"
import config from "../config"
import Actor from "./Actor"

export default class Butterfly extends Actor {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        animkey: string,
        padding: number,
        minDelay = 1000,
        maxDelay = 3000,
        moveArea = { xMin: 0, xMax: config.width, yMin: 0, yMax: config.height }
    ) {
        super(scene, x, y, texture, animkey, padding, minDelay, maxDelay, moveArea)
    }
}