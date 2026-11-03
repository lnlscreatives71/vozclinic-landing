// Copy shared by the keyword landing pages (ids prefixed `lp-` in
// manifest.ts). Kept out of featureShared.tsx so that file only exports
// components (react-refresh/only-export-components).

import type { FaqItem, Step } from './featureShared';

type B = { es: string; en: string };

export const onboardingSteps: Step[] = [
  {
    t: { es: 'Conecta tu número en 48 horas', en: 'Connect your number in 48 hours' },
    d: {
      es: 'Usamos el número actual de tu clínica con la WhatsApp Business API oficial de Meta. Para tus pacientes no cambia nada.',
      en: 'We use your clinic’s existing number through Meta’s official WhatsApp Business API. Nothing changes for your patients.',
    },
  },
  {
    t: { es: 'Una sesión de entrenamiento de 90 minutos', en: 'One 90-minute training session' },
    d: {
      es: 'Te entrevistamos sobre precios, servicios, doctores, horarios y preguntas frecuentes. Sofía contesta con tus palabras, tus precios y tus reglas.',
      en: 'We interview you about pricing, services, doctors, hours, and FAQs. Sofía answers with your words, your prices, and your rules.',
    },
  },
  {
    t: { es: 'En vivo con tus pacientes', en: 'Live with your patients' },
    d: {
      es: 'La sesión sucede en los primeros 5 días y la producción completa llega alrededor del día 7.',
      en: 'The session happens in the first 5 days, and full production arrives around day 7.',
    },
  },
];

export const pricingAnswer: B = {
  es: 'Desde $299 USD al mes en el plan Esencial (impuestos no incluidos): 1 doctor, 1 ubicación y hasta 600 conversaciones. El plan Profesional cuesta $599 USD para 2 a 4 doctores y hasta 1,500 conversaciones. Sin contratos a largo plazo.',
  en: 'From $299 USD a month on Essential (taxes not included): 1 doctor, 1 location, and up to 600 conversations. Professional is $599 USD for 2 to 4 doctors and up to 1,500 conversations. No long-term contracts.',
};

export const fitFaq: FaqItem = {
  q: { es: '¿Para qué clínicas está hecho VozClinic?', en: 'Who is VozClinic built for?' },
  a: {
    es: 'Para clínicas en México que atienden pacientes de los dos lados de la frontera: dentales, medspas, cirugía cosmética y consultorios médicos. VozClinic opera bajo la LFPDPPP, la ley mexicana de protección de datos. Si tu práctica está en Estados Unidos, agenda una demo y te decimos con honestidad si te queda.',
    en: 'Clinics in Mexico that serve patients from both sides of the border: dental, med spa, cosmetic surgery, and medical practices. VozClinic operates under the LFPDPPP, Mexico’s data protection law. If your practice is in the United States, book a demo and we’ll tell you honestly whether it’s a fit.',
  },
};
