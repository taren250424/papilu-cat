import Phaser from 'phaser'
import { ANIMS, SPRITES } from '../constants/animationKey'
import Actor from './Actor'

export default class Cat extends Actor {
    private catActionCount: number

    constructor(
        scene: Phaser.Scene,
        moveAngleCorrection: number,
        catActionCount: number,
        start_x: number = window.innerWidth / 2,
        start_y: number = window.innerHeight / 2,
    ) {
        super(scene, start_x, start_y, SPRITES.CAT_IDLE, ANIMS.CAT_IDLE, moveAngleCorrection)
        this.catActionCount = catActionCount
    }

    // protected onPointerDownOrOver(e: MouseEvent) {
    //     super.onPointerDownOrOver(e)
    // }

    protected enterIdleState() {
        this.setTexture(`${SPRITES.CAT_IDLE}`)
        this.play(`${ANIMS.CAT_IDLE}`)
        super.enterIdleState()
    }

    protected moveToRandomPosition(start_x: number, start_y: number, end_x: number, end_y: number) {
        this.setTexture(`${SPRITES.CAT_MOVE}`)
        this.play(`${ANIMS.CAT_MOVE}`)
        super.moveToRandomPosition(start_x, start_y, end_x, end_y)
    }

    protected performRandomAction() {
        if (this.catActionCount > 0) {
            const idx = Phaser.Math.Between(0, this.catActionCount - 1)
            this.setTexture(`${SPRITES.CAT_ACTION}_${idx}`)
            this.play(`${ANIMS.CAT_ACTION}_${idx}`)
        }

        super.performRandomAction()
    }
}
