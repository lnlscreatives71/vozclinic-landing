import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LangProvider, useLang } from '../context/LangContext';
import type { Lang } from '../types/lang';
import TopBar from '../components/TopBar';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Footer from '../components/Footer';
import { bookDemoUrl } from '../utils/links';
import { featurePages } from './manifest';

// Shared building blocks for the feature pages (see manifest.ts). Pre-launch:
// all copy stays capability-focused, no results/outcome claims.

type B = { es: string; en: string };

export function FeaturePageShell({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  return (
    <LangProvider initialLang={initialLang}>
      <div className="min-h-screen font-body">
        <TopBar />
        <main>{children}</main>
        <FloatingWhatsApp />
        <Footer />
        <SpeedInsights />
      </div>
      <Analytics />
    </LangProvider>
  );
}

export interface HeroFact {
  v: string;
  l: B;
}

export interface HeroImage {
  src: string;
  width: number;
  height: number;
  alt: B;
}

// Hero shared by the feature pages: same layout language as the flagship
// receptionist page (teal kicker, display h1 with teal accent, CTA pair, facts
// row). Pass `image` to show a transparent orb illustration above the copy (as
// on the receptionist page); omit it for a text-only hero.
export function FeatureHero({
  kicker,
  title,
  accent,
  sub,
  facts,
  image,
}: {
  kicker: B;
  title: B;
  accent: B;
  sub: B;
  facts: HeroFact[];
  image?: HeroImage;
}) {
  const { lang, t } = useLang();
  return (
    <section className="relative bg-offwhite overflow-hidden pt-36 sm:pt-44 pb-20">
      <div className="section-container relative">
        {image && (
          <img
            src={image.src}
            alt={t(image.alt)}
            width={image.width}
            height={image.height}
            className="mx-auto w-full max-w-2xl lg:max-w-3xl h-auto select-none"
          />
        )}
        <div className={`text-center max-w-3xl mx-auto${image ? ' mt-5' : ''}`}>
          <p className="text-base sm:text-lg font-semibold text-teal mb-4">{t(kicker)}</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
            {t(title)} <span className="text-teal">{t(accent)}</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl mt-6 leading-relaxed">{t(sub)}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={bookDemoUrl(lang)}
              className="inline-flex items-center bg-teal text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-teal-dark transition-colors"
            >
              {t({ es: 'Agenda una demo →', en: 'Book a demo →' })}
            </a>
            <a
              href="/calculadora/"
              className="inline-flex items-center border border-gray-300 text-charcoal font-semibold px-6 py-3.5 rounded-xl hover:bg-charcoal/5 transition-colors"
            >
              {t({ es: 'Calcula tu ROI', en: 'Calculate your ROI' })}
            </a>
          </div>
          {/* Capability facts (truthful, not results claims) */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {facts.map((s, i) => (
              <div key={i}>
                <div className="font-display text-3xl font-bold text-teal">{s.v}</div>
                <div className="text-gray-500 text-sm mt-1">{t(s.l)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export interface CapabilityItem {
  icon: string;
  t: B;
  d: B;
}

export function CapabilitiesSection({
  kicker,
  title,
  sub,
  items,
  bg = 'offwhite',
}: {
  kicker: B;
  title: B;
  sub?: B;
  items: CapabilityItem[];
  bg?: 'offwhite' | 'white';
}) {
  const { t } = useLang();
  return (
    <section className={`${bg === 'white' ? 'bg-white' : 'bg-offwhite'} py-24`}>
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">{t(kicker)}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t(title)}
          </h2>
          {sub && <p className="text-gray-500 mt-4">{t(sub)}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-teal/30 hover:shadow-lg transition-all"
            >
              <div className="w-11 h-11 grid place-items-center rounded-xl bg-teal/10 text-xl mb-4" aria-hidden="true">
                {it.icon}
              </div>
              <h3 className="font-semibold text-charcoal mb-1.5">{t(it.t)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t(it.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface Step {
  t: B;
  d: B;
}

export function StepsSection({
  kicker,
  title,
  sub,
  steps,
  bg = 'white',
}: {
  kicker: B;
  title: B;
  sub?: B;
  steps: Step[];
  bg?: 'offwhite' | 'white';
}) {
  const { t } = useLang();
  return (
    <section className={`${bg === 'white' ? 'bg-white' : 'bg-offwhite'} py-24`}>
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">{t(kicker)}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t(title)}
          </h2>
          {sub && <p className="text-gray-500 mt-4">{t(sub)}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="bg-offwhite border border-gray-100 rounded-2xl p-6">
              <div className="font-display text-teal text-3xl font-bold mb-3" aria-hidden="true">
                {i + 1}
              </div>
              <h3 className="font-semibold text-charcoal mb-1.5">{t(s.t)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t(s.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Two-column comparison: the status quo on the left, Sofía on the right.
export interface CompareColumn {
  title: B;
  points: B[];
}

export function CompareSection({
  kicker,
  title,
  sub,
  left,
  right,
  bg = 'white',
}: {
  kicker: B;
  title: B;
  sub?: B;
  left: CompareColumn;
  right: CompareColumn;
  bg?: 'offwhite' | 'white';
}) {
  const { t } = useLang();
  return (
    <section className={`${bg === 'white' ? 'bg-white' : 'bg-offwhite'} py-24`}>
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">{t(kicker)}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t(title)}
          </h2>
          {sub && <p className="text-gray-500 mt-4">{t(sub)}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="bg-offwhite border border-gray-100 rounded-2xl p-7">
            <h3 className="font-display text-xl font-bold text-gray-500 mb-4">{t(left.title)}</h3>
            <ul className="space-y-3">
              {left.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500 leading-relaxed">
                  <span className="shrink-0 font-bold" aria-hidden="true">✕</span>
                  <span>{t(p)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-teal/5 border border-teal/30 rounded-2xl p-7">
            <h3 className="font-display text-xl font-bold text-charcoal mb-4">{t(right.title)}</h3>
            <ul className="space-y-3">
              {right.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal leading-relaxed">
                  <span className="text-teal shrink-0 font-bold" aria-hidden="true">✓</span>
                  <span>{t(p)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ with matching FAQPage JSON-LD rendered alongside it, so the structured
// data can never drift from the visible questions.
export interface FaqItem {
  q: B;
  a: B;
}

export function FaqSection({
  title,
  items,
  bg = 'white',
}: {
  title: B;
  items: FaqItem[];
  bg?: 'offwhite' | 'white';
}) {
  const { lang, t } = useLang();
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: it.a[lang] },
    })),
  }).replaceAll('<', '\\u003c');
  return (
    <section className={`${bg === 'white' ? 'bg-white' : 'bg-offwhite'} py-24`}>
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal text-center leading-tight mb-10">
            {t(title)}
          </h2>
          <div className="space-y-3">
            {items.map((it, i) => (
              <details key={i} className="group bg-white border border-gray-100 rounded-2xl p-5 open:border-teal/30">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-charcoal">
                  <span>{t(it.q)}</span>
                  <span className="text-teal text-xl leading-none shrink-0 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="text-gray-500 text-sm leading-relaxed mt-3">{t(it.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </section>
  );
}

// Shared by the keyword landing pages (ids prefixed `lp-` in manifest.ts).
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
  es: 'Desde $299 USD al mes más impuestos en el plan Esencial: 1 doctor, 1 ubicación y hasta 600 conversaciones. El plan Profesional cuesta $599 USD para 2 a 4 doctores y hasta 1,500 conversaciones. Sin contratos a largo plazo.',
  en: 'From $299 USD a month plus tax on Essential: 1 doctor, 1 location, and up to 600 conversations. Professional is $599 USD for 2 to 4 doctors and up to 1,500 conversations. No long-term contracts.',
};

export const fitFaq: FaqItem = {
  q: { es: '¿Para qué clínicas está hecho VozClinic?', en: 'Who is VozClinic built for?' },
  a: {
    es: 'Para clínicas en México que atienden pacientes de los dos lados de la frontera: dentales, medspas, cirugía cosmética y consultorios médicos. VozClinic opera bajo la LFPDPPP, la ley mexicana de protección de datos. Si tu práctica está en Estados Unidos, agenda una demo y te decimos con honestidad si te queda.',
    en: 'Clinics in Mexico that serve patients from both sides of the border: dental, med spa, cosmetic surgery, and medical practices. VozClinic operates under the LFPDPPP, Mexico’s data protection law. If your practice is in the United States, book a demo and we’ll tell you honestly whether it’s a fit.',
  },
};

// Compact strip: every channel Sofía covers, linking to the flagship page
// where the full channel grid lives.
export function ChannelsRibbon() {
  const { lang, t } = useLang();
  const channels = [
    'WhatsApp',
    'Telegram',
    'Slack',
    'SMS',
    t({ es: 'Línea de voz', en: 'Voice line' }),
    t({ es: 'Tu sitio web', en: 'Your website' }),
  ];
  const receptionist = featurePages.find((p) => p.id === 'feature-receptionist')!;
  return (
    <section className="bg-charcoal py-12">
      <div className="section-container text-center">
        <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-5">
          {t({ es: 'Disponible en todos tus canales', en: 'Available on every channel' })}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {channels.map((c, i) => (
            <span
              key={i}
              className="bg-white/10 border border-white/15 text-white text-sm font-semibold rounded-full px-4 py-1.5"
            >
              {c}
            </span>
          ))}
        </div>
        <a
          href={receptionist.path[lang]}
          className="inline-block text-white/80 hover:text-white text-sm font-semibold mt-6 transition-colors underline-offset-2 hover:underline"
        >
          {t({ es: 'Conoce a la recepcionista 24/7 →', en: 'Meet the 24/7 receptionist →' })}
        </a>
      </div>
    </section>
  );
}

// Cross-links to the sibling feature pages, for readers and crawlers alike.
export function MoreFeatures({ currentId }: { currentId: string }) {
  const { lang, t } = useLang();
  // Keyword landing pages (`lp-`) stay out of the feature grid; the footer links them.
  const others = featurePages.filter((p) => p.id !== currentId && !p.id.startsWith('lp-'));
  return (
    <section className="bg-offwhite py-20">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
            {t({ es: 'Explora todo lo que hace Sofía', en: 'Explore everything Sofía does' })}
          </h2>
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto ${
            others.length >= 5 ? 'lg:grid-cols-5 max-w-6xl' : 'lg:grid-cols-4 max-w-5xl'
          }`}
        >
          {others.map((p) => (
            <a
              key={p.id}
              href={p.path[lang]}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-teal/30 hover:shadow-lg transition-all"
            >
              <div className="font-semibold text-charcoal">{p.label[lang]}</div>
              <p className="text-gray-500 text-sm leading-relaxed mt-1">{p.blurb[lang]}</p>
              <span className="text-teal text-sm font-semibold mt-3 inline-block">
                {t({ es: 'Ver más →', en: 'Learn more →' })}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureCTA({ title, sub }: { title: B; sub?: B }) {
  const { lang, t } = useLang();
  return (
    <section className="bg-teal py-20">
      <div className="section-container text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
          {t(title)}
        </h2>
        <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
          {t(
            sub ?? {
              es: 'Una llamada de 20 minutos. Te enseñamos a Sofía trabajando con los casos de tu clínica.',
              en: 'A 20-minute call. We show you Sofía working through your clinic\'s own cases.',
            },
          )}
        </p>
        <a
          href={bookDemoUrl(lang)}
          className="inline-flex items-center bg-white text-teal font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors"
        >
          {t({ es: 'Agenda una demo →', en: 'Book a demo →' })}
        </a>
      </div>
    </section>
  );
}
