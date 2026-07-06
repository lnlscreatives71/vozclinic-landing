import type { ReactNode } from 'react';
import { LangProvider, useLang } from '../context/LangContext';
import type { Lang } from '../types/lang';
import AnnouncementBar from '../components/AnnouncementBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { qualifierUrl } from '../utils/links';
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
        <AnnouncementBar />
        <TopBar />
        <main>{children}</main>
        <Footer />
      </div>
    </LangProvider>
  );
}

export interface HeroFact {
  v: string;
  l: B;
}

// Text-first hero: same layout language as the flagship receptionist page
// (teal kicker, display h1 with teal accent, CTA pair, facts row) minus the
// orb art, which stays unique to that page.
export function FeatureHero({
  kicker,
  title,
  accent,
  sub,
  facts,
}: {
  kicker: B;
  title: B;
  accent: B;
  sub: B;
  facts: HeroFact[];
}) {
  const { lang, t } = useLang();
  return (
    <section className="relative bg-offwhite overflow-hidden pt-36 sm:pt-44 pb-20">
      <div className="section-container relative">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-base sm:text-lg font-semibold text-teal mb-4">{t(kicker)}</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
            {t(title)} <span className="text-teal">{t(accent)}</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl mt-6 leading-relaxed">{t(sub)}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={qualifierUrl(lang)}
              className="inline-flex items-center bg-teal text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-teal-dark transition-colors"
            >
              {t({ es: 'Únete a la lista de espera →', en: 'Join the waitlist →' })}
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
  const others = featurePages.filter((p) => p.id !== currentId);
  return (
    <section className="bg-offwhite py-20">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
            {t({ es: 'Explora todo lo que hace Sofía', en: 'Explore everything Sofía does' })}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
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
              es: 'Las primeras 25 clínicas en unirse a la lista de espera reciben su primer mes gratis.',
              en: 'The first 25 clinics to join the waitlist get their first month free.',
            },
          )}
        </p>
        <a
          href={qualifierUrl(lang)}
          className="inline-flex items-center bg-white text-teal font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors"
        >
          {t({ es: 'Únete a la lista de espera →', en: 'Join the waitlist →' })}
        </a>
      </div>
    </section>
  );
}
