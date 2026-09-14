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
        title: 'Recepcionista virtual con IA bilingüe: voz y WhatsApp 24/7 | VozClinic',
        description:
          'Sofía, tu recepcionista virtual con IA bilingüe, contesta cada llamada y mensaje de WhatsApp 24/7 en español e inglés, y también en Telegram, Slack, SMS y tu sitio web. Agenda, reactiva y reagenda pacientes. Agenda una demo.',
      },
      en: {
        title: 'AI Receptionist & Phone Answering Service for Clinics, 24/7 | VozClinic',
        description:
          'Sofía, the bilingual AI virtual receptionist for dental and medical clinics, answers every call and WhatsApp message 24/7 in English and Spanish, plus Telegram, Slack, SMS, and your website. She books, reactivates, and reschedules patients. Book a demo.',
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
          'Sofía agenda citas directo en tu calendario, envía recordatorios que el paciente puede responder, reagenda cancelaciones y llena huecos, 24/7 en español e inglés. Agenda una demo.',
      },
      en: {
        title: 'AI Scheduling: Booking, Reminders & Reschedules 24/7 | VozClinic',
        description:
          'Sofía books appointments straight into your calendar, sends reminders patients can reply to, reschedules cancellations, and fills gaps, 24/7 in English and Spanish. Book a demo.',
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
          'Sofía reactiva tu lista de pacientes dormidos, envía recall y seguimientos post-cita, y lanza promociones que agendan solas, en español e inglés. Agenda una demo.',
      },
      en: {
        title: 'AI Patient Communication & Reactivation | VozClinic',
        description:
          'Sofía reactivates your dormant patient list, sends recall and post-visit follow-ups, and runs promotions that book themselves, in English and Spanish. Book a demo.',
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
          'Sofía recopila los datos del seguro, resuelve dudas de cobertura y completa el intake antes de la cita, ideal para clínicas con pacientes de Estados Unidos. Agenda una demo.',
      },
      en: {
        title: 'AI Insurance Verification & Patient Intake | VozClinic',
        description:
          'Sofía collects insurance details, clears coverage questions, and completes intake before the visit, built for clinics with patients from the United States. Book a demo.',
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
        title: 'Recepcionista virtual con IA para dental, medspa y cirugía | VozClinic',
        description:
          'Cómo Sofía, la recepcionista virtual con IA bilingüe, atiende clínicas dentales, medspas y prácticas de cirugía cosmética: agenda 24/7, reactivación de pacientes, seguimientos y verificación de seguros en español e inglés.',
      },
      en: {
        title: 'AI Receptionist for Dental Clinics, Med Spas & Surgery | VozClinic',
        description:
          'How Sofía, the bilingual AI receptionist and dental answering service, serves dental clinics, med spas, and cosmetic surgery practices: 24/7 booking, patient reactivation, follow-ups, and insurance verification in English and Spanish.',
      },
    },
    label: { es: 'Soluciones por práctica', en: 'Solutions by practice' },
    blurb: {
      es: 'Dental, medspa y cirugía cosmética.',
      en: 'Dental, med spa, and cosmetic surgery.',
    },
  },
  {
    id: 'lp-bilingual-receptionist',
    path: {
      es: '/recepcionista-virtual-bilingue/',
      en: '/en/bilingual-virtual-receptionist/',
    },
    head: {
      es: {
        title: 'Recepcionista virtual bilingüe para clínicas, 24/7 | VozClinic',
        description:
          'Una recepcionista virtual bilingüe que contesta llamadas y WhatsApp en español e inglés, 24/7. Sofía agenda citas, envía recordatorios y escala a tu equipo. Desde $299 USD al mes. Agenda una demo.',
      },
      en: {
        title: 'Bilingual Virtual Receptionist for Clinics, 24/7 | VozClinic',
        description:
          'A bilingual virtual receptionist that answers calls and WhatsApp in English and Spanish, 24/7. Sofía books appointments, sends reminders, and escalates to your team. From $299 USD a month. Book a demo.',
      },
    },
    label: { es: 'Recepcionista virtual bilingüe', en: 'Bilingual virtual receptionist' },
    blurb: {
      es: 'Contesta en español e inglés, en cada turno.',
      en: 'Answers in English and Spanish, on every shift.',
    },
  },
  {
    id: 'lp-dental-answering',
    path: {
      es: '/servicio-de-contestacion-dental/',
      en: '/en/dental-answering-service/',
    },
    head: {
      es: {
        title: 'Servicio de contestación para clínicas dentales, 24/7 | VozClinic',
        description:
          'Un servicio de contestación con IA para clínicas dentales que no solo toma recados: Sofía contesta llamadas y WhatsApp 24/7 en español e inglés, agenda la cita y hace recall de limpiezas. Agenda una demo.',
      },
      en: {
        title: 'Dental Answering Service That Books Appointments, 24/7 | VozClinic',
        description:
          'An AI dental answering service that does more than take messages: Sofía answers calls and WhatsApp 24/7 in English and Spanish, books the appointment, and recalls patients due for cleanings. Book a demo.',
      },
    },
    label: { es: 'Servicio de contestación dental', en: 'Dental answering service' },
    blurb: {
      es: 'Agenda la cita en lugar de tomar un recado.',
      en: 'Books the appointment instead of taking a message.',
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
