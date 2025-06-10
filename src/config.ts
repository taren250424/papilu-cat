import { CONTAINER_ID } from './constants/domId'
import LoadingScene from './scenes/LoadingScene'
import PlayingScene from './scenes/PlayingScene'

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    scene: [LoadingScene, PlayingScene],
    parent: CONTAINER_ID,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
}

export default config