import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools(), tailwindcss()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@Components': fileURLToPath(
                new URL('./src/components', import.meta.url)
            ),
            '@Composables': fileURLToPath(
                new URL('./src/composables', import.meta.url)
            ),
            '@Css': fileURLToPath(new URL('./src/css', import.meta.url)),
            '@Layout': fileURLToPath(new URL('./src/layout', import.meta.url)),
            '@Pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@Router': fileURLToPath(new URL('./src/router', import.meta.url)),
            '@Utils': fileURLToPath(new URL('./src/utils', import.meta.url))
        }
    }
})
