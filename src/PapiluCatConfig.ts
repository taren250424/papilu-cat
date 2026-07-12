import { SpriteConfig, MoveConfig } from "./SpriteConfig"

export default interface PapiluCatConfig {
    loading?: Partial<SpriteConfig>
    catIdle?: Partial<SpriteConfig>
    catMove?: Partial<MoveConfig>
    catActions?: Partial<SpriteConfig>[]
    flyIdle?: Partial<SpriteConfig>
    flyMove?: Partial<MoveConfig>
    butterfly?: boolean
}
