import { useLang } from '../context/LangContext';
import { designPartner } from '../data/content';
import { qualifierUrl } from '../utils/links';

export default function DesignPartner() {
  const { lang, t } = useLang();

  return (
    <section
      className="py-24 relative overflow-hidden"
      id="socias"
      aria-label="Design partner offer"
      style={{ backgroundColor: 'rgba(201, 169, 97, 0.07)' }}
    >
      {/* Gold border top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold opacity-40" aria-hidden="true" />

      {/* Decorative gold circle */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A961 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-gold/15 text-gold-muted text-xs font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase border border-gold/30">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {t({ es: 'Programa de socias de diseño', en: 'Design Partner Program' })}
            </span>
          </div>

          {/* 3 / 3 FILLED stamp */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-col items-center border-[3px] border-gold rounded-2xl px-10 py-5 -rotate-2 shadow-xl shadow-gold/20 bg-offwhite">
              <span className="font-display text-6xl font-bold text-gold-muted leading-none">
                3<span className="text-gold/50">/</span>3
              </span>
              <span className="mt-2 text-xs font-extrabold uppercase tracking-[0.35em] text-gold-muted">
                {t({ es: 'Cupo lleno', en: 'Spots filled' })}
              </span>
            </div>
          </div>

          {/* Three filled slots */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-12">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="relative bg-white rounded-xl border border-gold/30 px-3 py-5 sm:px-4 sm:py-6 shadow-sm"
              >
                <span
                  className="absolute top-2.5 right-2.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold text-white"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="font-display text-lg sm:text-xl font-bold text-charcoal">
                  {t({ es: 'Clínica', en: 'Clinic' })} 0{n}
                </div>
                <div className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-gold-muted">
                  {t({ es: 'A bordo', en: 'On board' })}
                </div>
              </div>
            ))}
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-5">
            {t(designPartner.title)}
          </h2>

          {/* Intro */}
          <p className="text-gray-600 text-base sm:text-lg mb-9 max-w-2xl mx-auto">
            {t(designPartner.intro)}
          </p>

          {/* Waitlist offer band */}
          <div className="max-w-xl mx-auto rounded-2xl px-6 py-6 mb-8 bg-teal-dark">
            <p className="text-teal-light text-xs font-bold uppercase tracking-[0.2em] mb-1.5">
              {t({ es: 'Lo que sigue — la lista de espera', en: 'Next up — the waitlist' })}
            </p>
            <p className="text-white text-lg sm:text-xl font-bold leading-snug">
              {lang === 'es' ? (
                <>
                  Las primeras <span className="text-gold">25 clínicas</span> en unirse reciben su{' '}
                  <span className="text-gold">primer mes gratis</span>.
                </>
              ) : (
                <>
                  The first <span className="text-gold">25 clinics</span> to join get their{' '}
                  <span className="text-gold">first month free</span>.
                </>
              )}
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <a
              href={qualifierUrl(lang)}
              className="inline-flex items-center bg-gold text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-gold-muted transition-colors shadow-lg shadow-gold/30"
            >
              {t(designPartner.cta)}
            </a>
          </div>
        </div>
      </div>

      {/* Gold border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold opacity-40" aria-hidden="true" />
    </section>
  );
}
