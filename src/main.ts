import './main.scss'

import Phaser from 'phaser'
import config from './config'
import { CONTAINER_ID } from './constants/domId'

let game: Phaser.Game | null = null
let container: HTMLDivElement | null = null

export function create() {
    if (game) return

    container = document.createElement('div')
    container.id = CONTAINER_ID
    container.style.position = 'fixed'
    container.style.top = '0'
    container.style.left = '0'
    container.style.pointerEvents = 'none'
    container.style.border = '1px solid red'
    document.body.appendChild(container)

    game = new Phaser.Game(config)
}

export function destroy() {
    if (game) {
        game.destroy(true)
        game = null
    }

    if (container) {
        container.remove()
        container = null
    }
}