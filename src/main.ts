import './style.scss'

import Phaser from 'phaser'
import config from './config'
import { CONTAINER_ID } from './constants/domId'

export function init() {
    const container = document.createElement('div')
    container.id = CONTAINER_ID
    container.style.position = 'fixed'
    container.style.top = '0'
    container.style.left = '0'
    container.style.pointerEvents = 'none'
    container.style.border = '1px solid red'
    document.body.appendChild(container)

    // test.
    // const b = document.createElement('button')
    // b.id = '_b'
    // b.style.width = '50px'
    // b.style.height = '30px'
    // b.style.pointerEvents = 'auto'
    // b.addEventListener('click', () => {
    //     alert('캔버스 위 버튼 눌림')
    // })
    // container.appendChild(b)

    const game = new Phaser.Game(config)
}