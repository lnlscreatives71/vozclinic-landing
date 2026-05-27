import { useLang } from '../context/LangContext';
import { founder } from '../data/content';
import { waUrl } from '../utils/links';


export default function FounderNote() {
  const { t } = useLang();

  const bodyParagraphs = t(founder.body).split('\n\n');

  return (
    <section className="bg-white py-24" id="fundadora" aria-label="Founder note">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10 lg:gap-16">
            {/* Photo */}
            <div className="shrink-0 flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
              <div className="relative w-48 h-60 md:w-56 md:h-72 mx-auto md:mx-0">
                {/* Teal border offset */}
                <div
                  className="absolute -inset-1.5 rounded-3xl border-2 border-teal/30"
                  aria-hidden="true"
                />
                <img
                  src="/lainie.png"
                  alt={founder.photoAlt}
                  className="relative w-full h-full object-cover rounded-2xl"
                  loading="eager"
                />
                {/* Overlay label */}
                <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl px-3 py-2 text-center"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                  <p className="text-white text-xs font-semibold">Lainie Mayfield</p>
                  <p className="text-white/70 text-[10px]">Tijuana, BC</p>
                </div>
              </div>

              {/* WhatsApp CTA under photo */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-semibold text-sm px-5 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-green-500/20 mx-auto md:mx-0"
              >
                {/* WhatsApp icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 w-5 h-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.524 5.847L.057 23.852a.5.5 0 00.609.609l6.086-1.456A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 01-5.036-1.374l-.362-.214-3.736.894.909-3.645-.235-.375A9.863 9.863 0 012.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z"/>
                </svg>
                {t(founder.cta)}
              </a>
            </div>

            {/* Text */}
            <div className="flex-1">
              {/* Greeting */}
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-5 leading-tight">
                {t(founder.greeting)}
              </h2>

              {/* Body paragraphs */}
              <div className="space-y-4 mb-5">
                {bodyParagraphs.map((para, idx) => (
                  <p key={idx} className="text-gray-600 text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Credentials chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {founder.credentials.map((cred, idx) => (
                  <span
                    key={idx}
                    className="inline-block text-[11px] font-semibold tracking-wide uppercase text-teal bg-teal/10 border border-teal/20 rounded-full px-2.5 py-1"
                  >
                    {typeof cred === 'string' ? cred : t(cred)}
                  </span>
                ))}
              </div>

              {/* Highlighted sentence */}
              <blockquote className="border-l-4 border-teal pl-5 py-1 mb-6">
                <p className="text-charcoal font-semibold text-base leading-relaxed italic">
                  "{t(founder.highlight)}"
                </p>
              </blockquote>

              {/* Signature */}
              <p className="text-gray-400 text-sm font-medium">
                {founder.signature}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
