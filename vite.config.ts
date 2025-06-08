import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'CatWidget',      // Create global window.CatWidget
            fileName: 'cat-widget', // Final file name dist/cat-widget.umd.js
        },
    }
});