import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true
      }
    }
  },
  server: {
    port: 3000
  }
}) 