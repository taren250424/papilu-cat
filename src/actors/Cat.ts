import Phaser from 'phaser'
import Actor from './Actor'
import config from '../config'
import { SPRITES, ANIMS } from '../constants/animationKey'

export default class Cat extends Actor {
    private idleAngleCorrection: number
    private moveAngleCorrection: number
    private actionsAngleCorrection: number[]

    constructor(
        scene: Phaser.Scene,
        idleAngleCorrection: number,
        moveAngleCorrection: number,
        actionsAngleCorrection: number[]
    ) {
        super(scene, config.width / 3, config.height / 3, SPRITES.CAT_IDLE, ANIMS.CAT_IDLE, idleAngleCorrection)
        this.idleAngleCorrection = idleAngleCorrection
        this.moveAngleCorrection = moveAngleCorrection
        this.actionsAngleCorrection = actionsAngleCorrection

        this.setTexture(`${SPRITES.CAT_ACTION}_0`)
        this.play(`${ANIMS.CAT_ACTION}_0`)
        console.log(actionsAngleCorrection)
    }

    protected onPointerDownOrOver() {
        alert('I am a cat')
    }
}

// const log = console.log
// const sect = Array.from({ length: 4 }, () => Array(4).fill(null))
// const directions = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ]

// window.addEventListener('DOMContentLoaded', () => {
//     setSect()

//     document.body.addEventListener('click', (e) => {
//         for (let i = 0; i < 4; i++) {
//             for (let j = 0; j < 4; j++) {
//                 if (
//                     (sect[i][j].start.x <= e.clientX && e.clientX <= sect[i][j].end.x) &&
//                     (sect[i][j].start.y <= e.clientY && e.clientY <= sect[i][j].end.y)
//                 ) {
//                     const arr = []
//                     for (const [di, dj] of directions) {
//                         const ni = i + di
//                         const nj = j + dj
//                         if (ni >= 0 && ni < 4 && nj >= 0 && nj < 4) { arr.push({ row: ni, col: nj }) }
//                     }
                    
//                     const idx = Math.floor(Math.random() * arr.length)
//                     log(`current sect: ${i}, ${j} / random sect: ${JSON.stringify(arr[idx])}`)
//                     return
//                 }
//             }
//         }
//     })
// })

// let resizeTimer
// window.addEventListener('resize', () => {
//     clearTimeout(resizeTimer)
//     resizeTimer = setTimeout(() => { setSect() }, 1000)
// })

// function setSect() {
//     const width = window.innerWidth / 4
//     const height = window.innerHeight / 4
//     for (let i = 0; i < 4; i++) {
//         for (let j = 0; j < 4; j++) {
//             sect[i][j] = {
//                 start: {
//                     x: j * width,
//                     y: i * height
//                 },
//                 end: {
//                     x: (j + 1) * width,
//                     y: (i + 1) * height
//                 }
//             }
//         }
//     }
// }