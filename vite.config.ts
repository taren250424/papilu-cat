import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'PapiluCat',      // Create global window.PapiluCat
            fileName: 'papilu-cat', // Final file name dist/papilu-cat.umd.js
        },
        // rollupOptions: {
        //     output: {
        //         globals: {
        //             phaser: 'Phaser'
        //         }
        //     }
        // }
    },
    // plugins: [dts()]
})