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

      const routes = [
        { prefix: '/api/livekit-token', module: '/api/livekit-token.ts' },
        { prefix: '/api/verify-visitor-email', module: '/api/verify-visitor-email.ts' },
      ]
      server.middlewares.use(async (req, res, next) => {
        const route = routes.find((item) => req.url?.startsWith(item.prefix))
        if (!route) return next()
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end('Method not allowed')
        }
        try {
          const chunks: Buffer[] = []
          for await (const c of req) chunks.push(c as Buffer)
          const mod = await server.ssrLoadModule(route.module)
          const headers: Record<string, string> = {
            'content-type': 'application/json',
            origin: req.headers.origin || 'http://localhost:5173',
          }
          if (typeof req.headers.cookie === 'string') headers.cookie = req.headers.cookie
          const webReq = new Request(`http://localhost${route.prefix}`, {
            method: 'POST',
            headers,
            body: Buffer.concat(chunks).toString() || '{}',
          })
          const webRes: Response = await mod.POST(webReq)
          res.statusCode = webRes.status
          const cookies = typeof webRes.headers.getSetCookie === 'function' ? webRes.headers.getSetCookie() : []
          webRes.headers.forEach((value, key) => {
            if (key.toLowerCase() === 'set-cookie') return
            res.setHeader(key, value)
          })
          for (const cookie of cookies) res.appendHeader('set-cookie', cookie)
          res.end(await webRes.text())
        } catch {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Request failed' }))
        }
      })
    },
  }
}

// Single Vite entry: the marketing landing page (index.html). The retired
// /design-partner-enroll/ and waitlist URLs are handled by redirects in
// vercel.json, so they are not Vite build targets.
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
