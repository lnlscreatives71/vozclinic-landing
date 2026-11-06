import { useSyncExternalStore } from 'react';
import { useLang } from '../context/LangContext';
import { pricing } from '../data/content';
import { bookDemoUrl } from '../utils/links';

export default function Pricing() {
  const { lang, t } = useLang();
  // Prerendered as live; hidden on the client once the promotion has ended.
  const promoLive = useSyncExternalStore(
    () => () => {},
    () => Date.now() < Date.parse(pricing.promoEnds),
    () => true,
  );

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

        {/* Time-limited promotion */}
        {promoLive && (
          <div className="max-w-3xl mx-auto -mt-6 mb-12 rounded-2xl border border-gold/40 bg-gold/10 px-6 py-5 text-left sm:text-center">
            <h3 className="font-bold text-charcoal">{t(pricing.promo.title)}</h3>
            <p className="text-sm text-charcoal/80 mt-1 leading-relaxed">{t(pricing.promo.body)}</p>
            <a href={bookDemoUrl(lang)} className="inline-block mt-2 text-sm font-semibold text-teal hover:text-teal-dark underline underline-offset-2">
              {t(pricing.promo.cta)}
            </a>
          </div>
        )}

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
                  {t({ es: 'USD/mes', en: 'USD/mo' })}
                </span>
              </div>
              <p className={`text-xs mb-1 ${plan.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                {t({ es: 'Impuestos no incluidos', en: 'Taxes not included' })}
              </p>
              <p className={`text-sm mb-5 ${plan.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                {t({ es: `aprox. ${plan.mxn} / mes`, en: `approx. ${plan.mxn} / mo` })}
              </p>

              {/* Description */}
              <p className={`text-sm leading-relaxed flex-1 mb-7 ${plan.highlight ? 'text-white/85' : 'text-gray-500'}`}>
                {t(plan.desc)}
              </p>

              {/* CTA */}
              <a
                href={bookDemoUrl(lang)}
                className={`
                  w-full text-center font-semibold text-sm px-4 py-3 rounded-xl transition-colors
                  ${plan.highlight
                    ? 'bg-white text-teal hover:bg-teal-light'
                    : 'bg-teal text-white hover:bg-teal-dark'
                  }
                `}
              >
                {t({ es: 'Agendar una demo →', en: 'Book a demo →' })}
              </a>
            </div>
          ))}
        </div>

        {/* Footer note: one line here, the full billing detail is in the Terms */}
        <p className="text-center text-gray-400 text-sm mt-10 max-w-2xl mx-auto">
          {t(pricing.footer)}
          {promoLive && t(pricing.promo.footerNote)}{' '}
          <a
            href={lang === 'en' ? '/terms/#pricing' : '/terminos/#precios'}
            className="underline underline-offset-2 hover:text-teal transition-colors"
          >
            {t(pricing.termsLink)}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
