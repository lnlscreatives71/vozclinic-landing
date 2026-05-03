import { useLang } from '../context/LangContext';
import { pain } from '../data/content';

const icons = [
  // Message bubble with X
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>,
  // Clock with exclamation
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // User exhausted
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  </svg>,
];

export default function PainPoints() {
  const { t } = useLang();

  return (
    <section className="bg-charcoal py-24" id="problemas" aria-label="Pain points">
      <div className="section-container">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto">
            {t(pain.title)}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pain.cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-charcoal-light rounded-2xl p-7 border border-white/5 hover:border-teal/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Teal left border accent */}
              <div
                className="absolute left-0 top-6 bottom-6 w-1 bg-teal rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />

              {/* Icon */}
              <div className="text-teal mb-5">
                {icons[idx]}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-white leading-snug mb-3">
                {t(card.title)}
              </h3>

              {/* Body */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {t(card.body)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
