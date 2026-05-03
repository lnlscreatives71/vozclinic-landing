import { useLang } from '../context/LangContext';
import { howItWorks } from '../data/content';

const stepIcons = [
  // Connect — plug / link icon
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>,
  // Learn — academic cap
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>,
  // Work — bolt / lightning
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
];

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section className="bg-offwhite py-24" id="como-funciona" aria-label="How it works">
      <div className="section-container">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">
            {t({ es: 'El proceso', en: 'The process' })}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t(howItWorks.title)}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px"
            style={{ background: 'repeating-linear-gradient(to right, #008080 0, #008080 8px, transparent 8px, transparent 20px)' }}
            aria-hidden="true"
          />

          {howItWorks.steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
              {/* Step number + icon */}
              <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full bg-teal-light border-2 border-teal/20" />
                {/* Icon */}
                <div className="relative text-teal">
                  {stepIcons[idx]}
                </div>
                {/* Step number badge */}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center shadow">
                  {step.num}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-bold text-xl text-charcoal leading-snug mb-3">
                {t(step.title)}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(step.body)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
