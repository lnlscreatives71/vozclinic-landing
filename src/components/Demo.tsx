import { useLang } from '../context/LangContext';
import { demo } from '../data/content';
import { demoUrl } from '../utils/links';

export default function Demo() {
  const { t } = useLang();

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

          {/* Video placeholder */}
          <div
            className="relative rounded-3xl overflow-hidden mb-8 cursor-pointer group"
            style={{
              background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
              aspectRatio: '16 / 9',
            }}
          >
            {/* Subtle teal glow */}
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'radial-gradient(ellipse at center, #008080 0%, transparent 65%)' }}
              aria-hidden="true"
            />

            {/* WhatsApp icon in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none" aria-hidden="true">
              <span className="text-[160px]">💬</span>
            </div>

            {/* Play button */}
            <a
              href={demoUrl}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              aria-label={t(demo.cta)}
            >
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:bg-teal/80 group-hover:border-teal transition-all duration-300 shadow-xl">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white ml-1" aria-hidden="true">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {t(demo.cta)}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  {t({ es: 'Sin guion. Sin edición.', en: 'No script. No edits.' })}
                </p>
              </div>
            </a>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-mono px-2.5 py-1 rounded-lg">
              5:00
            </div>
          </div>

          {/* CTA link */}
          <a
            href={demoUrl}
            className="inline-flex items-center gap-2 text-teal font-semibold hover:underline underline-offset-2"
          >
            {t(demo.cta)}
          </a>
        </div>
      </div>
    </section>
  );
}
