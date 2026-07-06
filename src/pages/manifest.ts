import type { Lang } from '../types/lang';

export interface PageHead {
  title: string;
  description: string;
}

// Feature pages are rendered as integrated, prerendered React routes: they share
// the site's TopBar/Footer and language toggle, and each is emitted per locale
// by scripts/prerender.mjs. To add one: append an entry here, map its id to a
// component in routes.tsx, and the prerender step picks it up automatically.
// `label`/`blurb` feed the nav dropdown and the cross-link strip on each page.
export interface FeaturePageDef {
  id: string;
  path: Record<Lang, string>; // site-absolute, trailing slash (served by Vercel as index.html)
  head: Record<Lang, PageHead>;
  label: Record<Lang, string>;
  blurb: Record<Lang, string>;
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
    label: { es: 'Recepcionista 24/7', en: '24/7 receptionist' },
    blurb: {
      es: 'Cada llamada y mensaje contestado, en los dos idiomas.',
      en: 'Every call and message answered, in both languages.',
    },
  },
  {
    id: 'feature-scheduling',
    path: {
      es: '/funciones/agenda/',
      en: '/en/features/scheduling/',
    },
    head: {
      es: {
        title: 'Agenda con IA: citas, recordatorios y reagendado 24/7 | VozClinic',
        description:
          'Sofía agenda citas directo en tu calendario, envía recordatorios que el paciente puede responder, reagenda cancelaciones y llena huecos, 24/7 en español e inglés. Únete a la lista de espera.',
      },
      en: {
        title: 'AI Scheduling: Booking, Reminders & Reschedules 24/7 | VozClinic',
        description:
          'Sofía books appointments straight into your calendar, sends reminders patients can reply to, reschedules cancellations, and fills gaps, 24/7 in English and Spanish. Join the waitlist.',
      },
    },
    label: { es: 'Agenda y recordatorios', en: 'Scheduling & reminders' },
    blurb: {
      es: 'Citas, confirmaciones y reagendado sin trabajo manual.',
      en: 'Bookings, confirmations, and reschedules with no manual work.',
    },
  },
  {
    id: 'feature-communication',
    path: {
      es: '/funciones/comunicacion/',
      en: '/en/features/communication/',
    },
    head: {
      es: {
        title: 'Comunicación y reactivación de pacientes con IA | VozClinic',
        description:
          'Sofía reactiva tu lista de pacientes dormidos, envía recall y seguimientos post-cita, y lanza promociones que agendan solas, en español e inglés. Únete a la lista de espera.',
      },
      en: {
        title: 'AI Patient Communication & Reactivation | VozClinic',
        description:
          'Sofía reactivates your dormant patient list, sends recall and post-visit follow-ups, and runs promotions that book themselves, in English and Spanish. Join the waitlist.',
      },
    },
    label: { es: 'Comunicación y reactivación', en: 'Communication & reactivation' },
    blurb: {
      es: 'Recall, seguimientos y promociones que llenan tu agenda.',
      en: 'Recall, follow-ups, and promotions that fill your calendar.',
    },
  },
  {
    id: 'feature-insurance',
    path: {
      es: '/funciones/seguros/',
      en: '/en/features/insurance/',
    },
    head: {
      es: {
        title: 'Verificación de seguros e intake con IA para clínicas | VozClinic',
        description:
          'Sofía recopila los datos del seguro, resuelve dudas de cobertura y completa el intake antes de la cita, ideal para clínicas con pacientes de Estados Unidos. Únete a la lista de espera.',
      },
      en: {
        title: 'AI Insurance Verification & Patient Intake | VozClinic',
        description:
          'Sofía collects insurance details, clears coverage questions, and completes intake before the visit, built for clinics with patients from the United States. Join the waitlist.',
      },
    },
    label: { es: 'Seguros e intake', en: 'Insurance & intake' },
    blurb: {
      es: 'Papeleo y dudas de cobertura resueltos antes de la cita.',
      en: 'Paperwork and coverage questions settled before the visit.',
    },
  },
  {
    id: 'solutions',
    path: {
      es: '/soluciones/',
      en: '/en/solutions/',
    },
    head: {
      es: {
        title: 'Soluciones por tipo de práctica: dental, medspa, cirugía | VozClinic',
        description:
          'Cómo Sofía atiende clínicas dentales, medspas y prácticas de cirugía cosmética: agenda 24/7, reactivación de pacientes, seguimientos y verificación de seguros en español e inglés.',
      },
      en: {
        title: 'Solutions by Practice Type: Dental, Med Spa, Surgery | VozClinic',
        description:
          'How Sofía serves dental clinics, med spas, and cosmetic surgery practices: 24/7 booking, patient reactivation, follow-ups, and insurance verification in English and Spanish.',
      },
    },
    label: { es: 'Soluciones por práctica', en: 'Solutions by practice' },
    blurb: {
      es: 'Dental, medspa y cirugía cosmética.',
      en: 'Dental, med spa, and cosmetic surgery.',
    },
  },
];

// The pages listed under the "Funciones" nav dropdown (solutions is its own
// top-level nav item).
export const featureNavPages = featurePages.filter((p) =>
  p.id.startsWith('feature-'),
);

export const solutionsPage = featurePages.find((p) => p.id === 'solutions')!;

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
