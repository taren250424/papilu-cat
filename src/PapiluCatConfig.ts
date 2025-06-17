import SpriteConfig from "./SpriteConfig"

export default interface PapiluCatConfig {
    loading?: Partial<SpriteConfig>
    catIdle?: Partial<SpriteConfig>

    catMove?: Partial<{
        img: string
        width: number
        height: number
        startIndex: number
        endIndex: number
        frameRate: number
        angleCorrection: number
    }>

    catActions?: SpriteConfig[]
}
