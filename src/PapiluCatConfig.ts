import { SpriteConfig, CatMoveConfig } from "./SpriteConfig"

export default interface PapiluCatConfig {
    loading?: Partial<SpriteConfig>
    catIdle?: Partial<SpriteConfig>
    catMove?: Partial<CatMoveConfig>
    catActions?: Partial<SpriteConfig>[]
}
