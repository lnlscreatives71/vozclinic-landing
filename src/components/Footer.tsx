import { useLang } from '../context/LangContext';
import { footerData } from '../data/content';

export default function Footer() {
  const { t, lang } = useLang();

  const linkGroups = [footerData.product, footerData.legal, footerData.company];

  // The blog has per-locale routes (/blog/ es, /en/blog/ en); other footer
  // links are shared across languages.
  const localizeHref = (href: string) =>
    href === '/blog/' && lang === 'en' ? '/en/blog/' : href;

  return (
    <footer className="bg-charcoal text-gray-400 py-16" role="contentinfo">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="font-bold text-xl text-white tracking-tight font-body">
              VozClinic
            </a>
            <p className="text-sm mt-3 leading-relaxed text-gray-500">
              Tijuana, Baja California, MX
            </p>
            <div className="mt-3 space-y-1 text-sm">
              <a href="mailto:hola@vozclinic.com" className="block hover:text-white transition-colors">
                hola@vozclinic.com
              </a>
              <a href="tel:+526633154686" className="block hover:text-white transition-colors">
                +52 663 315 4686
              </a>
            </div>
            <p className="text-xs mt-4 text-gray-600">
              {t(footerData.tagline)}
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h3 className="text-white font-semibold text-sm mb-4">
                {t(group.label)}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={localizeHref(link.href)}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © 2026 VozClinic.{' '}
            {t({ es: 'Todos los derechos reservados.', en: 'All rights reserved.' })}
          </p>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3" aria-label="Online">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-70 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-teal" />
            </span>
            <span className="text-base font-semibold text-teal-light">
              {t({ es: 'Sofía está en línea ahora', en: 'Sofía is online now' })}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
