interface SpriteConfig {
    sprite: string
    spriteWidth: number
    spriteHeight: number
    spriteStartIndex: number
    spriteEndIndex: number
    spriteFrameRate: number
    spriteAngleCorrection: number
}

export default interface PapiluCatConfig {
    loading?: Partial<{
        sprite: string
        spriteWidth: number
        spriteHeight: number
        spriteStartIndex: number
        spriteEndIndex: number
        spriteFrameRate: number
    }>
    
    catIdle?: Partial<SpriteConfig>
    catMove?: Partial<SpriteConfig>
    catFirstAction?: Partial<SpriteConfig>
    catSecondAction?: Partial<SpriteConfig>
    flyIdle?: Partial<SpriteConfig>
    flyMove?: Partial<SpriteConfig>
}
