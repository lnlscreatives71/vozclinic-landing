import type { ReactElement } from 'react';
import type { Lang } from './types/lang';
import App from './App';
import FeatureReceptionist from './pages/FeatureReceptionist';
import { featurePathToRoute } from './pages/manifest';

// One place that maps a URL to (which page component, which language). Used by
// both the client entry (main.tsx) and the SSR/prerender step (entry-server.tsx)
// so the hydrated tree always matches the prerendered HTML for every route.
export type RouteId = 'landing' | 'feature-receptionist';

export function resolveRoute(pathname: string): { id: RouteId; lang: Lang } {
  const p = pathname.replace(/\/+$/, '') || '/';
  const feat = featurePathToRoute[p];
  if (feat) return { id: feat.id as RouteId, lang: feat.lang };
  // Landing: `/` = es, `/en` (and anything under /en) = en.
  if (p === '/en' || p.startsWith('/en/')) return { id: 'landing', lang: 'en' };
  return { id: 'landing', lang: 'es' };
}

export function renderRoute(id: RouteId, lang: Lang): ReactElement {
  if (id === 'feature-receptionist')
    return <FeatureReceptionist initialLang={lang} />;
  return <App initialLang={lang} />;
}
