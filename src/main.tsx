import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import type { Lang } from './types/lang'

// Language is route-driven so the client initial render matches the prerendered
// HTML (`/` = es, `/en/` = en). Deriving from the path — not localStorage —
// avoids a hydration mismatch on the English route.
const initialLang: Lang = window.location.pathname.startsWith('/en') ? 'en' : 'es'

const container = document.getElementById('root')!
const tree = (
  <StrictMode>
    <App initialLang={initialLang} />
  </StrictMode>
)

// If the server prerendered content, hydrate it. Otherwise mount fresh
// (e.g. local dev, or any path that bypasses the prerender step).
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
