export interface SpriteConfig {
    img: string
    width: number
    height: number
    startIndex: number
    endIndex: number
    frameRate: number
}
export interface CatMoveConfig extends SpriteConfig {
    angleCorrection: number
}