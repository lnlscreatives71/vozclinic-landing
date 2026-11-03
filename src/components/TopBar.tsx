import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';
import { nav } from '../data/content';
import { bookDemoUrl, calculatorUrl } from '../utils/links';
import { featureNavPages, solutionsPage } from '../pages/manifest';

export default function TopBar() {
  const { lang, t } = useLang();
  const menuRef = useRef<HTMLDetailsElement>(null);

  // The mobile menu is a native <details>, so it opens and closes with no JS
  // (it works in the prerendered HTML before hydration). This only adds the
  // niceties: close on a tap outside it, or on Escape.
  useEffect(() => {
    const close = (e: Event) => {
      const menu = menuRef.current;
      if (!menu?.open) return;
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !menu.contains(e.target as Node)) {
        menu.open = false;
      }
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', close);
    };
  }, []);

  const otherLang = lang === 'es'
    ? { href: '/en/', hrefLang: 'en', label: 'English' }
    : { href: '/', hrefLang: 'es', label: 'Español' };

  // Sits at the top of the page and scrolls away with the content. It used to
  // be position:fixed and slide in and out with the scroll direction, which
  // read as the menu following you down the page.
  return (
    <header className="absolute top-0 left-0 right-0 z-40 bg-white/95 shadow-sm">
      <div className="section-container px-4 sm:px-6 flex items-center justify-between h-20 sm:h-32 gap-3 sm:gap-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center shrink-0"
          aria-label="VozClinic home"
        >
          <img
            src="/vozclinic-logo.png"
            alt="VozClinic"
            className="h-11 sm:h-28 w-auto"
            width="440"
            height="88"
          />
        </a>

        {/* Primary nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-charcoal">
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
          <a href={calculatorUrl(lang)} className="hover:text-teal transition-colors">
            {t({ es: 'Calculadora', en: 'Calculator' })}
          </a>
          <a href={lang === 'en' ? '/en/blog/' : '/blog/'} className="hover:text-teal transition-colors">
            Blog
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language toggle — real URLs so each language is indexable. On phones it
              moves into the menu below, to keep the bar inside a 320px screen. */}
          <div
            className="hidden sm:flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-semibold"
            role="group"
            aria-label="Language selection"
          >
            <a
              href="/"
              hrefLang="es"
              className={`px-1.5 sm:px-2 py-1 rounded transition-colors ${
                lang === 'es'
                  ? 'hidden sm:inline text-teal bg-teal/10'
                  : 'text-gray-400 hover:text-charcoal'
              }`}
              aria-current={lang === 'es' ? 'page' : undefined}
            >
              ES
            </a>
            <span className="hidden sm:inline text-gray-300 select-none">|</span>
            <a
              href="/en/"
              hrefLang="en"
              className={`px-1.5 sm:px-2 py-1 rounded transition-colors ${
                lang === 'en'
                  ? 'hidden sm:inline text-teal bg-teal/10'
                  : 'text-gray-400 hover:text-charcoal'
              }`}
              aria-current={lang === 'en' ? 'page' : undefined}
            >
              EN
            </a>
          </div>

          {/* CTA */}
          <a
            href={bookDemoUrl(lang)}
            className="inline-flex items-center whitespace-nowrap bg-teal text-white text-xs sm:text-sm font-semibold px-2.5 py-2 sm:px-4 rounded-xl hover:bg-teal-dark transition-colors"
          >
            {/* The arrow is dropped on phones so the bar fits a 320px screen. */}
            {t(nav.cta).replace(/\s*→$/, '')}
            <span aria-hidden="true" className="hidden sm:inline">&nbsp;→</span>
          </a>

          {/* Mobile / tablet menu: the full nav only fits from 1024px (lg). */}
          <details ref={menuRef} className="group/menu lg:hidden">
            <summary
              className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center justify-center w-9 sm:w-10 h-10 -mr-1.5 rounded-xl text-charcoal hover:bg-gray-100 transition-colors"
              aria-label={t({ es: 'Menú', en: 'Menu' })}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path className="group-open/menu:hidden" d="M4 7h16M4 12h16M4 17h16" />
                <path className="hidden group-open/menu:block" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </summary>
            <nav
              className="absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto"
              aria-label={t({ es: 'Menú principal', en: 'Main menu' })}
            >
              <div className="section-container px-4 sm:px-6 py-3 text-sm font-semibold text-charcoal">
                <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {t({ es: 'Funciones', en: 'Features' })}
                </p>
                {featureNavPages.map((p) => (
                  <a
                    key={p.id}
                    href={p.path[lang]}
                    className="block rounded-xl px-3 py-2.5 hover:bg-teal/5 transition-colors"
                  >
                    {p.label[lang]}
                  </a>
                ))}
                <div className="my-2 border-t border-gray-100" />
                <a href={solutionsPage.path[lang]} className="block rounded-xl px-3 py-2.5 hover:bg-teal/5 transition-colors">
                  {t({ es: 'Soluciones', en: 'Solutions' })}
                </a>
                <a href={calculatorUrl(lang)} className="block rounded-xl px-3 py-2.5 hover:bg-teal/5 transition-colors">
                  {t({ es: 'Calculadora', en: 'Calculator' })}
                </a>
                <a href={lang === 'en' ? '/en/blog/' : '/blog/'} className="block rounded-xl px-3 py-2.5 hover:bg-teal/5 transition-colors">
                  Blog
                </a>
                <div className="my-2 border-t border-gray-100" />
                <a
                  href={otherLang.href}
                  hrefLang={otherLang.hrefLang}
                  className="block rounded-xl px-3 py-2.5 text-gray-500 hover:bg-teal/5 transition-colors"
                >
                  {otherLang.label}
                </a>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
