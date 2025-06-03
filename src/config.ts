import { CONTAINER_ID } from './constants/domId'
import LoadingScene from './scenes/LoadingScene'
import PlayingScene from './scenes/PlayingScene'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    transparent: true,
    scene: [LoadingScene, PlayingScene],
    parent: CONTAINER_ID,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    fps: { target: 30, forceSetTimeOut: true }
}

export default config