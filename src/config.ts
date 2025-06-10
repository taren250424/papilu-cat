import { CONTAINER_ID } from './constants/domId'

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    parent: CONTAINER_ID,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
}

export default config