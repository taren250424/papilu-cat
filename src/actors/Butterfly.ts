import Phaser from 'phaser'
import { ANIMS, SPRITES } from '../constants/animationKey'
import Actor from './Actor'
import SectionHelper from '../modules/SectionHelper'
import { Section } from '../type/Section'

export default class Butterfly extends Actor {
    constructor(
        scene: Phaser.Scene,
        moveAngleCorrection: number,
        start_x: number = window.innerWidth / 2,
        start_y: number = window.innerHeight / 2,
    ) {
        super(scene, start_x, start_y, SPRITES.FLY_IDLE, ANIMS.FLY_IDLE, moveAngleCorrection)

        // Butterflies are quicker and more restless than the cat.
        this.minDelay = 3000
        this.maxDelay = 12000
        this.speedPxPerMs = 0.05
        this.emergencyStop()
        this.scheduleMovement()
    }

    protected enterIdleState() {
        this.setTexture(`${SPRITES.FLY_IDLE}`)
        this.play(`${ANIMS.FLY_IDLE}`)
        super.enterIdleState()
    }

    protected moveToRandomPosition(start_x: number, start_y: number, end_x: number, end_y: number) {
        this.setTexture(`${SPRITES.FLY_MOVE}`)
        this.play(`${ANIMS.FLY_MOVE}`)
        super.moveToRandomPosition(start_x, start_y, end_x, end_y)
    }

    // Butterflies have no standalone actions: flutter to a nearby spot instead.
    protected performRandomAction() {
        const sectionHelper = SectionHelper.getInstance()
        const d: Section = sectionHelper.getRandomPositionAroundTarget(this.x, this.y)
        this.moveToRandomPosition(d.start.x, d.start.y, d.end.x, d.end.y)
    }
}
