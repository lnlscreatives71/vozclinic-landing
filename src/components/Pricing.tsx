import { useLang } from '../context/LangContext';
import { pricing } from '../data/content';
import { waitlistUrl } from '../utils/links';

export default function Pricing() {
  const { t } = useLang();

  return (
    <section className="bg-white py-24" id="precios" aria-label="Pricing">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">
            {t({ es: 'Precios', en: 'Pricing' })}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t(pricing.title)}
          </h2>
        </div>

        {/* Partner discount note */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2">
            <span className="text-gold text-sm">★</span>
            <p className="text-sm text-charcoal">
              {t(pricing.subtitle)}
            </p>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {pricing.plans.map((plan, idx) => (
            <div
              key={idx}
              className={`
                relative flex flex-col rounded-2xl p-7 transition-all duration-300
                ${plan.highlight
                  ? 'bg-teal text-white shadow-2xl shadow-teal/30 ring-2 ring-teal scale-[1.02]'
                  : 'bg-offwhite border border-gray-100 hover:border-teal/30 hover:shadow-lg'
                }
              `}
            >
              {/* Recommended badge */}
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow whitespace-nowrap">
                    {t({ es: 'Más popular', en: 'Most popular' })}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className={`font-bold text-lg mb-4 ${plan.highlight ? 'text-white' : 'text-charcoal'}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-2">
                <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-charcoal'}`}>
                  {plan.usd}
                </span>
                <span className={`text-sm ml-1 ${plan.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                  USD/mes
                </span>
              </div>
              <p className={`text-sm mb-5 ${plan.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                {plan.mxn} / mes
              </p>

              {/* Description */}
              <p className={`text-sm leading-relaxed flex-1 mb-7 ${plan.highlight ? 'text-white/85' : 'text-gray-500'}`}>
                {t(plan.desc)}
              </p>

              {/* CTA */}
              <a
                href={waitlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  w-full text-center font-semibold text-sm px-4 py-3 rounded-xl transition-colors
                  ${plan.highlight
                    ? 'bg-white text-teal hover:bg-teal-light'
                    : 'bg-teal text-white hover:bg-teal-dark'
                  }
                `}
              >
                {t({ es: 'Unirme a la lista de espera →', en: 'Join waitlist →' })}
              </a>

              {/* Waitlist release note */}
              <p className={`text-xs text-center mt-3 ${plan.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                {t({
                  es: 'Lanzamiento previsto: septiembre 2026',
                  en: 'Expected release: September 2026',
                })}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-sm mt-10 max-w-2xl mx-auto">
          {t(pricing.footer)}
        </p>
      </div>
    </section>
  );
}
