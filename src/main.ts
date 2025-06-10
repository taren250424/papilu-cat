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
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.position = 'fixed'
    container.style.top = '0'
    container.style.left = '0'

    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'

    container.style.pointerEvents = 'none'

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