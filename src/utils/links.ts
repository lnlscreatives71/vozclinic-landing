export const calendlyUrl = (campaign: string) =>
  `https://calendly.com/lainiem-lnlcreatives/30min?utm_source=landing&utm_medium=cta&utm_campaign=${campaign}`;

export const waUrl =
  `https://wa.me/526633154686?text=${encodeURIComponent('Hola Lainie, vi VozClinic y quiero saber más sobre las 3 plazas de socia de diseño.')}`;

// Branded design-partner enrollment page (same site). The Design Partner CTA
// used to point straight at the raw Google Form — it now routes through this
// branded page, which submits into the same form behind the scenes.
export const enrollUrl = '/design-partner-enroll/';

// The underlying Google Form. `formActionUrl` is the POST endpoint the branded
// enrollment form submits into, so responses land in the same Google Sheet as
// before. `formUrl` is the public form, kept as a fallback link.
export const formUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSe42ad2xbkXbk33RldTl2-BKyKWF6ZUHudJ25WrDw8CVX9fDg/viewform';
export const formActionUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSe42ad2xbkXbk33RldTl2-BKyKWF6ZUHudJ25WrDw8CVX9fDg/formResponse';

export const demoUrl = '#demo';
