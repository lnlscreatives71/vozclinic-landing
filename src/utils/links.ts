import type { Lang } from '../types/lang';

// Single intake form: the waitlist. The 3 design-partner spots are now
// filled, so all CTAs point here.
//   - qualifierUrl: waitlist intent ("notify me at launch"). First 25
//     clinics that join get their first month free.
//   - dpUrl: retained for backward-compat (the ?intent=dp JS branch still
//     tags dp-applicant in the CRM), but no longer linked from the site
//     now that the design-partner cohort is closed.
export const qualifierUrl = (lang: Lang): string =>
  lang === 'en' ? '/waitlist/' : '/lista-espera/';

export const dpUrl = (lang: Lang): string =>
  `${qualifierUrl(lang)}?intent=dp`;

export const waUrl =
  `https://wa.me/526633154686?text=${encodeURIComponent('Hola Lainie, vi VozClinic y quiero unirme a la lista de espera.')}`;

export const demoUrl = '#demo';
