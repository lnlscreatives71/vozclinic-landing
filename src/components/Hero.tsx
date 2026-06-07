import { useLang } from '../context/LangContext';
import { hero } from '../data/content';
import { qualifierUrl, demoUrl } from '../utils/links';
import PhoneMockup from './PhoneMockup';

export default function Hero() {
  const { lang, t } = useLang();

  return (
    <section
      className="relative min-h-screen flex items-center bg-offwhite dot-grid overflow-hidden pt-32 sm:pt-36"
      aria-label="Hero"
    >
      {/* Subtle teal glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #008080 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="section-container w-full py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-10 max-w-6xl mx-auto">
          {/* Left — copy */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            {/* Spots-filled callout */}
            <a
              href="#socias"
              className="inline-flex items-center gap-2 bg-gold/15 text-gold-muted text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 border border-gold/40 tracking-wide uppercase hover:bg-gold/25 transition-colors"
            >
              <span
                className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gold text-white shrink-0"
                aria-hidden="true"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </span>
              {t({
                es: 'Las 3 plazas de socia: llenas · lista abierta',
                en: 'All 3 design partner spots filled · waitlist open',
              })}
            </a>

            {/* H1 — Fraunces (serif moment) */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold leading-[1.05] tracking-tight text-charcoal mb-6 text-balance">
              {t(hero.h1)}
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 font-body text-pretty">
              {t(hero.sub)}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-10">
              <a
                href={qualifierUrl(lang)}
                className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-gold text-white font-semibold px-7 py-4 rounded-xl text-base hover:bg-gold-muted transition-colors shadow-lg shadow-gold/20"
              >
                {t(hero.primaryCta)}
              </a>
              <a
                href={demoUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap text-charcoal font-semibold px-4 py-4 rounded-xl text-base hover:text-teal transition-colors"
              >
                {t(hero.secondaryCta)}
              </a>
            </div>

            {/* Trust strip */}
            <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 leading-relaxed">
              {t(hero.trust)}
            </p>
          </div>

          {/* Right — phone mockup */}
          <div className="relative shrink-0 w-full max-w-[300px] lg:max-w-[340px]">
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FAFAF7)' }}
        aria-hidden="true"
      />
    </section>
  );
}
