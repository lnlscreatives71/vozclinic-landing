import type { Lang } from '../types/lang';

// Single intake form: the waitlist. All CTAs point here (the design-partner
// cohort is closed and its ?intent=dp branch was removed). First 25 clinics
// that join get their first month free.
export const qualifierUrl = (lang: Lang): string =>
  lang === 'en' ? '/waitlist/' : '/lista-espera/';

export const waUrl =
  `https://wa.me/526633154686?text=${encodeURIComponent('Hola Lainie, vi VozClinic y quiero unirme a la lista de espera.')}`;

// The interactive Sofía section at the top of the page — the actual live
// demo. The #demo anchor further down is the recorded video tour.
export const demoUrl = '#sofia';

// Direct demo-call booking page hosted on the LNL CRM.
export const bookingUrl = 'https://lnlcrm.com/book/vozclinic';
