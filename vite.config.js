import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { copyFileSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Custom plugin: copy index.html → 404.html for GitHub Pages SPA routing
function copyIndex404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
      console.log('✅ Copied dist/index.html → dist/404.html')
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyIndex404()],
  assetsInclude: ['**/*.md'],
  base: '/'
})