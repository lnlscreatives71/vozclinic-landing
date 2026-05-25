import { useLang } from '../context/LangContext';
import { demo } from '../data/content';
import { qualifierUrl } from '../utils/links';

export default function Demo() {
  const { lang, t } = useLang();

  return (
    <section className="bg-offwhite py-24" id="demo" aria-label="Demo">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <span className="text-teal text-xs font-bold tracking-widest uppercase">
            {t({ es: 'Demo en vivo', en: 'Live demo' })}
          </span>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 mb-5 leading-tight">
            {t(demo.title)}
          </h2>

          {/* Body */}
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            {t(demo.body)}
          </p>

          {/* Product video */}
          <div
            className="relative rounded-3xl overflow-hidden mb-8 bg-charcoal shadow-2xl shadow-charcoal/20 ring-1 ring-charcoal/5"
            style={{ aspectRatio: '16 / 9' }}
          >
            <video
              className="absolute inset-0 h-full w-full"
              src="/sofia-overview.mp4"
              poster="/sofia-overview-poster.jpg"
              controls
              playsInline
              preload="metadata"
            >
              {t({
                es: 'Su navegador no reproduce este video.',
                en: 'Your browser does not support this video.',
              })}
            </video>
          </div>

          {/* CTA link */}
          <a
            href={qualifierUrl(lang)}
            className="inline-flex items-center gap-2 text-teal font-semibold hover:underline underline-offset-2"
          >
            {t({ es: 'Solicitar una de las 3 plazas →', en: 'Apply for one of the 3 spots →' })}
          </a>
        </div>
      </div>
    </section>
  );
}
