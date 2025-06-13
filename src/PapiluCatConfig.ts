import SpriteConfig from "./SpriteConfig"

export default interface PapiluCatConfig {
    loading?: Partial<{
        img: string
        width: number
        height: number
        startIndex: number
        endIndex: number
        frameRate: number
    }>
    
    catIdle?: Partial<SpriteConfig>
    catMove?: Partial<SpriteConfig>
    catActions?: SpriteConfig[]
}
