import { useLang } from '../context/LangContext';
import { designPartner } from '../data/content';
import { dpUrl } from '../utils/links';

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
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-gold/20 text-gold-muted text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase border border-gold/30">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {t({ es: 'Oferta de lanzamiento', en: 'Launch offer' })}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal text-center leading-tight mb-6">
            {t(designPartner.title)}
          </h2>

          {/* Intro */}
          <p className="text-center text-gray-600 text-base mb-10 max-w-2xl mx-auto">
            {t(designPartner.intro)}
          </p>

          {/* Benefits list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-2xl mx-auto">
            {designPartner.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white/70 backdrop-blur rounded-xl px-4 py-3.5 border border-gold/20"
              >
                <span className="text-teal mt-0.5 shrink-0">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-charcoal font-medium text-sm leading-snug">
                  {t(benefit)}
                </span>
              </div>
            ))}
          </div>

          {/* Urgency */}
          <div className="text-center mb-8">
            <p className="text-charcoal font-bold text-lg">
              {t(designPartner.urgency)}{' '}
              <span className="text-gray-500 font-normal text-base">
                {t(designPartner.urgencyBody)}
              </span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <a
              href={dpUrl(lang)}
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
