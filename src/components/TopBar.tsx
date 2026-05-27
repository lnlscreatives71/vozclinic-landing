import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { nav } from '../data/content';
import { qualifierUrl } from '../utils/links';

export default function TopBar() {
  const { lang, setLang, t } = useLang();
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
      <div className="section-container flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center shrink-0"
          aria-label="VozClinic home"
        >
          <img
            src="/vozclinic-logo.png"
            alt="VozClinic"
            className="h-8 sm:h-9 w-auto"
            width="220"
            height="44"
          />
        </a>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language toggle */}
          <div
            className="flex items-center gap-1 text-sm font-semibold"
            role="group"
            aria-label="Language selection"
          >
            <button
              onClick={() => setLang('es')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'es'
                  ? 'text-teal bg-teal/10'
                  : 'text-gray-400 hover:text-charcoal'
              }`}
              aria-pressed={lang === 'es'}
            >
              ES
            </button>
            <span className="text-gray-300 select-none">|</span>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'en'
                  ? 'text-teal bg-teal/10'
                  : 'text-gray-400 hover:text-charcoal'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
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
