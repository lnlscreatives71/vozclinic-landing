import type { Lang } from '../types/lang';

// Single intake form, two ways in:
//   - qualifierUrl: generic waitlist intent ("notify me at launch")
//   - dpUrl: design-partner intent (same form, ?intent=dp tells the JS
//     to send source=design_partner_intent so the CRM tags the contact
//     dp-applicant). CRM redirects DP intent + Phase 1 fit visitors to
//     the Appointy demo booking; everyone else lands on the waitlist
//     thank-you.
export const qualifierUrl = (lang: Lang): string =>
  lang === 'en' ? '/waitlist/' : '/lista-espera/';

export const dpUrl = (lang: Lang): string =>
  `${qualifierUrl(lang)}?intent=dp`;

export const waUrl =
  `https://wa.me/526633154686?text=${encodeURIComponent('Hola Lainie, vi VozClinic y quiero saber más sobre las 3 plazas de socia de diseño.')}`;

export const demoUrl = '#demo';
