import type { Lang } from '../types/lang';

// All conversion CTAs (Hero, TopBar, FinalCTA, DesignPartner, Pricing)
// route through the qualifier form. The form decides Phase 1 fit
// (-> Appointy demo booking at /agendar-demo or /book-demo) vs
// waitlist (-> /lista-gracias or /waitlist-thanks). Calendly and the
// two Google Forms (design-partner + waitlist) are retired.
export const qualifierUrl = (lang: Lang): string =>
  lang === 'en' ? '/waitlist/' : '/lista-espera/';

export const waUrl =
  `https://wa.me/526633154686?text=${encodeURIComponent('Hola Lainie, vi VozClinic y quiero saber más sobre las 3 plazas de socia de diseño.')}`;

export const demoUrl = '#demo';

// Legacy — Design Partner Google Form. The /design-partner-enroll/ page
// (src/enroll/EnrollPage.tsx) still posts here, but nothing on the main
// site links to that page anymore -- all CTAs route through qualifierUrl
// above. Kept exported so EnrollPage builds; remove once the enroll
// route is fully retired.
export const formUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSe42ad2xbkXbk33RldTl2-BKyKWF6ZUHudJ25WrDw8CVX9fDg/viewform';
export const formActionUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSe42ad2xbkXbk33RldTl2-BKyKWF6ZUHudJ25WrDw8CVX9fDg/formResponse';
