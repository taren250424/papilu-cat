import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'PapiluCat',
            fileName: (format) => {
                if (format === 'umd') return 'papilu-cat.umd.js'
                return `papilu-cat.${format}.js`
            },
            formats: ['es', 'umd'],
        },
    },
})