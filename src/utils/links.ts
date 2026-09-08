import type { Lang } from '../types/lang';

// Primary CTA for the whole site: book a demo call. The design-partner cohort
// and the waitlist are both closed, so there is no intake form left in front
// of the calendar — every CTA goes straight to booking.
export const bookDemoUrl = (lang: Lang): string =>
  lang === 'en' ? '/book-demo/' : '/agendar-demo/';

export const waUrl =
  `https://wa.me/526633154686?text=${encodeURIComponent('Hola Lainie, vi VozClinic y quiero agendar una demo.')}`;

// The interactive Sofía section at the top of the page — the actual live
// demo. The #demo anchor further down is the recorded video tour.
export const demoUrl = '#sofia';

// The booking calendar the /agendar-demo/ and /book-demo/ pages embed.
// The ?src tag names the entry point on the booking record in the CRM. The two
// demo pages carry their own tags, so this one marks a click straight from the
// site itself. Bookings with no tag and no referrer came from a pasted link.
export const bookingUrl = 'https://lnlcrm.com/book/vozclinic?src=vozclinic-site';
