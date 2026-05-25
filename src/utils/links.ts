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
