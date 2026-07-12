import { Section } from "../type/Section"

export default class SectionHelper {
    private static instance: SectionHelper | null = null
    private section: Section[][] = Array.from({ length: 4 }, () => Array(4).fill(null))
    private directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    private isThrottled: boolean = false

    private constructor() {
        this.resetSection()
        
        window.addEventListener('resize', () => {
            if (this.isThrottled) return
            this.isThrottled = true

            this.resetSection()

            setTimeout(() => { this.isThrottled = false }, 200)
        })
    }

    static getInstance(): SectionHelper {
        if (this.instance === null) {
            this.instance = new SectionHelper()
        }
        return this.instance
    }

    private resetSection() {
        const width = window.innerWidth / 4
        const height = window.innerHeight / 4
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.section[i][j] = {
                    start: {
                        x: j * width,
                        y: i * height
                    },
                    end: {
                        x: (j + 1) * width,
                        y: (i + 1) * height
                    }
                }
            }
        }
    }

    getRandomPositionAroundTarget(x: number, y: number, away_x?: number, away_y?: number): Section {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (
                    (this.section[i][j].start.x <= x && x <= this.section[i][j].end.x) &&
                    (this.section[i][j].start.y <= y && y <= this.section[i][j].end.y)
                ) {
                    const arr = []
                    for (const [di, dj] of this.directions) {
                        const ni = i + di
                        const nj = j + dj
                        if (ni >= 0 && ni < 4 && nj >= 0 && nj < 4) { arr.push({ row: ni, col: nj }) }
                    }

                    // When fleeing from a threat, prefer sections farther away from it.
                    let candidates = arr
                    if (away_x !== undefined && away_y !== undefined) {
                        const farther = arr.filter(({ row, col }) => {
                            const s = this.section[row][col]
                            const cx = (s.start.x + s.end.x) / 2
                            const cy = (s.start.y + s.end.y) / 2
                            return Math.hypot(cx - away_x, cy - away_y) > Math.hypot(x - away_x, y - away_y)
                        })
                        if (farther.length > 0) candidates = farther
                    }

                    const idx = Math.floor(Math.random() * candidates.length)
                    const { row, col } = candidates[idx]

                    return this.section[row][col]
                }
            }
        }

        return {
            start: { x: 0, y: 0 },
            end: { x: window.innerWidth, y: window.innerHeight }
        }
    }
}

