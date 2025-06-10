import './main.scss'

import Phaser from 'phaser'
import config from './config'
import LoadingScene from './scenes/LoadingScene'
import PlayingScene from './scenes/PlayingScene'
import { CONTAINER_ID } from './constants/domId'

import PapiluCatConfig from './PapiluCatConfig'

let game: Phaser.Game | null = null
let container: HTMLDivElement | null = null

export function create(data: PapiluCatConfig) {
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

    game.scene.add('LoadingScene', LoadingScene)
    game.scene.add('PlayingScene', PlayingScene)
    game.scene.start('LoadingScene', data)
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
