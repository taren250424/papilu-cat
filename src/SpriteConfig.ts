export interface SpriteConfig {
    img: string
    width: number
    height: number
    startIndex: number
    endIndex: number
    frameRate: number
}
export interface MoveConfig extends SpriteConfig {
    angleCorrection: number
}
export type CatMoveConfig = MoveConfig
