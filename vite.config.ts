import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const root = dirname(fileURLToPath(import.meta.url))

// Dev-only: serve the /api/livekit-token Vercel function under `vite` so the
// in-page Sofía agent can mint tokens locally (vite doesn't run api/ functions).
// In production Vercel runs api/livekit-token.ts directly. Creds come from
// .env.local (gitignored) -> process.env, which the handler reads.
function localTokenApi(): PluginOption {
  return {
    name: 'local-livekit-token',
    apply: 'serve',
    configureServer(server) {
      try {
        const txt = fs.readFileSync(resolve(root, '.env.local'), 'utf8')
        for (const line of txt.split('\n')) {
          const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
          if (m && process.env[m[1]] === undefined) {
            process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
          }
        }
      } catch {
        /* no .env.local — endpoint will report it's not configured */
      }

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/livekit-token')) return next()
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end('Method not allowed')
        }
        try {
          const chunks: Buffer[] = []
          for await (const c of req) chunks.push(c as Buffer)
          const mod = await server.ssrLoadModule('/api/livekit-token.ts')
          const webReq = new Request('http://localhost/api/livekit-token', {
            method: 'POST',
            headers: { 'content-type': 'application/json', origin: 'http://localhost:5173' },
            body: Buffer.concat(chunks).toString() || '{}',
          })
          const webRes: Response = await mod.POST(webReq)
          res.statusCode = webRes.status
          webRes.headers.forEach((v, k) => res.setHeader(k, v))
          res.end(await webRes.text())
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String((e as Error)?.message ?? e) }))
        }
      })
    },
  }
}

// Single Vite entry: the marketing landing page (index.html). The retired
// /design-partner-enroll/ URL is now a static meta-refresh redirect to
// /lista-espera/ (see design-partner-enroll/index.html) so it no longer
// needs to be a Vite build target.
export default defineConfig({
  plugins: [react(), tailwindcss(), localTokenApi()],
  resolve: {
    alias: {
      '@': resolve(root, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      },
    },
  },
})
