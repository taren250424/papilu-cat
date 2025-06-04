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

    // container.style.display = "none"

    const game = new Phaser.Game(config)
}