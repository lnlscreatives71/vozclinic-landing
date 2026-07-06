import type { ReactElement } from 'react';
import type { Lang } from './types/lang';
import App from './App';
import FeatureReceptionist from './pages/FeatureReceptionist';
import FeatureScheduling from './pages/FeatureScheduling';
import FeatureCommunication from './pages/FeatureCommunication';
import FeatureInsurance from './pages/FeatureInsurance';
import Solutions from './pages/Solutions';
import { featurePathToRoute } from './pages/manifest';

// One place that maps a URL to (which page component, which language). Used by
// both the client entry (main.tsx) and the SSR/prerender step (entry-server.tsx)
// so the hydrated tree always matches the prerendered HTML for every route.
export type RouteId =
  | 'landing'
  | 'feature-receptionist'
  | 'feature-scheduling'
  | 'feature-communication'
  | 'feature-insurance'
  | 'solutions';

export function resolveRoute(pathname: string): { id: RouteId; lang: Lang } {
  const p = pathname.replace(/\/+$/, '') || '/';
  const feat = featurePathToRoute[p];
  if (feat) return { id: feat.id as RouteId, lang: feat.lang };
  // Landing: `/` = es, `/en` (and anything under /en) = en.
  if (p === '/en' || p.startsWith('/en/')) return { id: 'landing', lang: 'en' };
  return { id: 'landing', lang: 'es' };
}

const pageComponents: Record<
  Exclude<RouteId, 'landing'>,
  (props: { initialLang?: Lang }) => ReactElement
> = {
  'feature-receptionist': FeatureReceptionist,
  'feature-scheduling': FeatureScheduling,
  'feature-communication': FeatureCommunication,
  'feature-insurance': FeatureInsurance,
  solutions: Solutions,
};

export function renderRoute(id: RouteId, lang: Lang): ReactElement {
  if (id !== 'landing') {
    const Page = pageComponents[id];
    return <Page initialLang={lang} />;
  }
  return <App initialLang={lang} />;
}
