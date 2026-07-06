import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { nav } from '../data/content';
import { qualifierUrl } from '../utils/links';
import { featureNavPages, solutionsPage } from '../pages/manifest';

export default function TopBar() {
  const { lang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-24 sm:h-32 gap-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center shrink-0"
          aria-label="VozClinic home"
        >
          <img
            src="/vozclinic-logo.png"
            alt="VozClinic"
            className="h-20 sm:h-28 w-auto"
            width="440"
            height="88"
          />
        </a>

        {/* Primary nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-charcoal">
          {/* CSS-only dropdown (hover + focus-within) so it works prerendered, no JS */}
          <div className="relative group">
            <a
              href={featureNavPages[0].path[lang]}
              className="inline-flex items-center gap-1 hover:text-teal transition-colors"
              aria-haspopup="true"
            >
              {t({ es: 'Funciones', en: 'Features' })}
              <span aria-hidden="true" className="text-[10px] translate-y-px">▾</span>
            </a>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-2 w-64">
                {featureNavPages.map((p) => (
                  <a
                    key={p.id}
                    href={p.path[lang]}
                    className="block rounded-xl px-3.5 py-2.5 hover:bg-teal/5 transition-colors"
                  >
                    <span className="block text-charcoal">{p.label[lang]}</span>
                    <span className="block text-gray-400 text-xs font-normal mt-0.5">
                      {p.blurb[lang]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href={solutionsPage.path[lang]} className="hover:text-teal transition-colors">
            {t({ es: 'Soluciones', en: 'Solutions' })}
          </a>
          <a href="/calculadora/" className="hover:text-teal transition-colors">
            {t({ es: 'Calculadora', en: 'Calculator' })}
          </a>
          <a href={lang === 'en' ? '/en/blog/' : '/blog/'} className="hover:text-teal transition-colors">
            Blog
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language toggle — real URLs so each language is indexable */}
          <div
            className="flex items-center gap-1 text-sm font-semibold"
            role="group"
            aria-label="Language selection"
          >
            <a
              href="/"
              hrefLang="es"
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'es'
                  ? 'text-teal bg-teal/10'
                  : 'text-gray-400 hover:text-charcoal'
              }`}
              aria-current={lang === 'es' ? 'page' : undefined}
            >
              ES
            </a>
            <span className="text-gray-300 select-none">|</span>
            <a
              href="/en/"
              hrefLang="en"
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'en'
                  ? 'text-teal bg-teal/10'
                  : 'text-gray-400 hover:text-charcoal'
              }`}
              aria-current={lang === 'en' ? 'page' : undefined}
            >
              EN
            </a>
          </div>

          {/* CTA */}
          <a
            href={qualifierUrl(lang)}
            className="inline-flex items-center bg-teal text-white text-sm font-semibold px-3 py-2 sm:px-4 rounded-xl hover:bg-teal-dark transition-colors"
          >
            {t(nav.cta)}
          </a>
        </div>
      </div>
    </header>
  );
}
