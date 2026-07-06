import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { resolveRoute, renderRoute } from './routes'

// Route + language are derived from the path so the client initial render matches
// the prerendered HTML for every route (landing `/` and `/en/`, plus the feature
// pages). Deriving from the path (not localStorage) avoids hydration mismatches.
const { id, lang } = resolveRoute(window.location.pathname)

const container = document.getElementById('root')!
const tree = <StrictMode>{renderRoute(id, lang)}</StrictMode>

// If the server prerendered content, hydrate it. Otherwise mount fresh
// (e.g. local dev, or any path that bypasses the prerender step).
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
