import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

// Single Vite entry: the marketing landing page (index.html). The retired
// /design-partner-enroll/ URL is now a static meta-refresh redirect to
// /lista-espera/ (see design-partner-enroll/index.html) so it no longer
// needs to be a Vite build target.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      },
    },
  },
})
