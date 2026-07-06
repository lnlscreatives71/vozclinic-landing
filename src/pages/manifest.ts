import type { Lang } from '../types/lang';

export interface PageHead {
  title: string;
  description: string;
}

// Feature pages are rendered as integrated, prerendered React routes: they share
// the site's TopBar/Footer and language toggle, and each is emitted per locale
// by scripts/prerender.mjs. To add one: append an entry here, map its id to a
// component in routes.tsx, and the prerender step picks it up automatically.
export interface FeaturePageDef {
  id: string;
  path: Record<Lang, string>; // site-absolute, trailing slash (served by Vercel as index.html)
  head: Record<Lang, PageHead>;
}

export const featurePages: FeaturePageDef[] = [
  {
    id: 'feature-receptionist',
    path: {
      es: '/funciones/recepcionista/',
      en: '/en/features/receptionist/',
    },
    head: {
      es: {
        title: 'Recepcionista de voz y WhatsApp con IA, 24/7 | VozClinic',
        description:
          'Sofía contesta cada llamada y mensaje 24/7 en español e inglés, en WhatsApp, Telegram, Slack, SMS, línea de voz y tu sitio web. Agenda, reactiva, da seguimiento y reagenda pacientes. Únete a la lista de espera.',
      },
      en: {
        title: 'AI Voice & WhatsApp Receptionist, 24/7 | VozClinic',
        description:
          'Sofía answers every call and message 24/7 in English and Spanish, on WhatsApp, Telegram, Slack, SMS, a voice line, and your website. She books, reactivates, follows up, and reschedules patients. Join the waitlist.',
      },
    },
  },
];

// pathname (no trailing slash) -> { id, lang }, for the client/SSR route resolver.
export const featurePathToRoute: Record<string, { id: string; lang: Lang }> =
  Object.fromEntries(
    featurePages.flatMap((p) =>
      (['es', 'en'] as Lang[]).map((l) => [
        p.path[l].replace(/\/+$/, ''),
        { id: p.id, lang: l },
      ]),
    ),
  );
