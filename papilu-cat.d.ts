/**
 * Configuration for a single sprite animation.
 */
interface SpriteConfig {
    /** Image source URL or path for the sprite sheet. */
    img: string

    /** Width of each frame in the sprite sheet (in pixels). */
    width: number

    /** Height of each frame in the sprite sheet (in pixels). */
    height: number

    /** The starting frame index in the sprite sheet. */
    startIndex: number

    /** The ending frame index in the sprite sheet. */
    endIndex: number

    /** Frame rate for the animation (frames per second). */
    frameRate: number
}

/**
 * Configuration for the moving animation (catMove).
 * Extends SpriteConfig with an optional angle correction.
 */
interface CatMoveConfig extends SpriteConfig {
    /**
     * (Optional) Angle correction in degrees to adjust the sprite's orientation.
     * Default rotation is 0°, which points to the right.
     * For top-down sprites facing upward, use `angleCorrection: 90`.
     * 
     * @default 0
     * @note Since catMove rotates based on the movement direction, a top-down view image is recommended for best results.
     */
    angleCorrection?: number
}

/**
 * Configuration object to customize PapiluCat's animations.
 */
interface PapiluCatConfig {
    /**
     * (Optional) Configuration for the initial loading animation 
     * shown before the cat appears.  
     * If omitted or missing required properties, a default loading animation is used.
     */
    loading?: Partial<SpriteConfig>

    /**
     * (Optional) Configuration for the idle animation when the cat 
     * is standing still.  
     * If any property is missing, it falls back to default settings.
     */
    catIdle?: Partial<SpriteConfig>

    /**
     * (Optional) Configuration for the moving animation when the cat 
     * is walking or moving around.  
     * If any property is missing, it falls back to default settings.
     */
    catMove?: Partial<CatMoveConfig>

    /**
     * (Optional) An array of additional custom animations for special 
     * cat actions such as reacting or stretching.  
     * Actions are independent of the default settings and have no initial configuration.  
     * If any required property is missing in an action, that action will be ignored.
     */
    catActions?: Partial<SpriteConfig>[]
}

/**
 * Starts the PapiluCat animation with optional customization.
 *
 * @param options Configuration object to customize the cat's animations and appearance.
 * - loading: Optional animation config shown before the cat appears.
 * - catIdle: Optional animation config when the cat is idle.
 * - catMove: Optional animation config when the cat is moving.
 * - catActions: Optional array of additional custom cat animations.
 *
 * If any property is missing from either catIdle or catMove, both will fall back to their default settings.
 * catActions are independent and optional; actions missing required properties will not be applied.
 * If loading is omitted or incomplete, a default loading animation will be used.
 */
declare function create(options?: PapiluCatConfig): void

/** Stops and removes the PapiluCat animation and cleans up DOM elements. */
declare function destroy(): void

declare const PapiluCat: {
    create: typeof create
    destroy: typeof destroy
}