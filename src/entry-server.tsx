import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { faq } from './data/content';
import type { Lang } from './types/lang';
import { renderRoute, type RouteId } from './routes';
export { featurePages } from './pages/manifest';

export function render(lang: Lang = 'es'): string {
  return renderToString(
    <StrictMode>
      <App initialLang={lang} />
    </StrictMode>,
  );
}

// Render any registered route (landing or a feature page) to a string, for the
// per-route prerender step in scripts/prerender.mjs.
export function renderById(id: RouteId, lang: Lang): string {
  return renderToString(<StrictMode>{renderRoute(id, lang)}</StrictMode>);
}

// Build the FAQPage JSON-LD for a locale straight from content.ts so the
// structured data can never drift from the rendered FAQ. Injected by the
// prerender step (scripts/prerender.mjs) into each locale's <head>.
export function faqJsonLd(lang: Lang = 'es'): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[lang],
      },
    })),
  };
  // Escape `<` so an answer can never break out of the <script> element.
  const json = JSON.stringify(data, null, 2).replaceAll('<', '\\u003c');
  return `<script type="application/ld+json">\n${json}\n    </script>`;
}
