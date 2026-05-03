import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { nav } from '../data/content';
import { calendlyUrl } from '../utils/links';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-baseline font-bold text-xl tracking-tight text-charcoal font-body shrink-0"
          aria-label="VozClinic home"
        >
          <span className="relative inline-block">
            V
            <span
              className="absolute bottom-0 left-0 h-0.5 bg-teal transition-all duration-500 ease-out"
              style={{ width: scrolled ? '100%' : '0%' }}
              aria-hidden="true"
            />
          </span>
          <span>ozClinic</span>
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
            href={calendlyUrl('topbar')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-teal text-white text-sm font-semibold px-3 py-2 sm:px-4 rounded-xl hover:bg-teal-dark transition-colors"
          >
            {t(nav.cta)}
          </a>
        </div>
      </div>
    </header>
  );
}
