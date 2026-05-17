import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Multi-page build: the marketing landing page (index.html) plus the branded
// design-partner enrollment page served at /design-partner-enroll/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        enroll: resolve(root, 'design-partner-enroll/index.html'),
      },
    },
  },
})
