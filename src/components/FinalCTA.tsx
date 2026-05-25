import { useLang } from '../context/LangContext';
import { finalCta } from '../data/content';
import { qualifierUrl } from '../utils/links';

export default function FinalCTA() {
  const { lang, t } = useLang();

  return (
    <section
      className="relative bg-teal py-24 overflow-hidden"
      aria-label="Final call to action"
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Glow effects */}
      <div
        className="absolute -top-24 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#00b3b3' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#006666' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 text-center">
        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
          {t(finalCta.title)}
        </h2>

        {/* Sub */}
        <p className="text-white/75 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          {t(finalCta.sub)}
        </p>

        {/* CTA button */}
        <a
          href={qualifierUrl(lang)}
          className="inline-flex items-center bg-white text-teal font-bold px-10 py-4 rounded-xl text-lg hover:bg-teal-light transition-colors shadow-2xl shadow-black/20"
        >
          {t(finalCta.cta)}
        </a>

        {/* Trust micro-copy */}
        <p className="text-white/50 text-sm mt-6">
          {t({ es: 'Sin tarjeta. Sin compromiso. Cancele cuando quiera.', en: 'No card. No commitment. Cancel anytime.' })}
        </p>
      </div>
    </section>
  );
}
