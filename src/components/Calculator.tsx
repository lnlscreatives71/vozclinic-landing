import { useLang } from '../context/LangContext';

// Teaser band linking to the standalone ROI calculator at /calculadora/.
// The full interactive tool lives on its own page to keep the funnel lean;
// this band is the in-funnel entry point to it.
export default function Calculator() {
  const { t } = useLang();

  return (
    <section className="bg-offwhite py-16" id="roi" aria-label="ROI calculator">
      <div className="section-container">
        <div className="relative max-w-3xl mx-auto text-center rounded-3xl bg-gradient-to-br from-teal to-teal-dark px-8 py-14 shadow-2xl shadow-teal/20 overflow-hidden">
          {/* Subtle dot pattern, matching FinalCTA's treatment */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <span className="text-white/70 text-xs font-bold tracking-widest uppercase">
              {t({ es: 'Calculadora de ROI', en: 'ROI Calculator' })}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-4 leading-tight">
              {t({
                es: '¿Cuánto recupera tu clínica con Sofía?',
                en: 'How much does your clinic recover with Sofía?',
              })}
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              {t({
                es: 'Ajusta los números de tu clínica y mira, en menos de dos minutos, cuántos ingresos recuperas y cuántas horas ahorras.',
                en: "Plug in your clinic's numbers and see, in under two minutes, how much revenue you recover and how many hours you save.",
              })}
            </p>
            <a
              href="/calculadora/"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-muted text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
            >
              {t({ es: 'Abrir la calculadora →', en: 'Open the calculator →' })}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
