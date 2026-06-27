import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Lang, Bilingual } from '../types/lang';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (content: Bilingual) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'es',
  setLang: () => {},
  t: (c) => c.es,
});

// Language is route-driven: `/` is prerendered in Spanish, `/en/` in English.
// `initialLang` is supplied by the SSR/prerender step (per route) and by the
// client from the URL path (see main.tsx), so the hydrated tree always matches
// the prerendered HTML — no flicker, no hydration mismatch. We intentionally do
// NOT auto-switch from localStorage: a JS-driven locale swap is invisible to
// crawlers and would desync from the canonical URL. The toggle navigates
// between `/` and `/en/` (see TopBar) so each language has a real, indexable URL.
export function LangProvider({
  children,
  initialLang = 'es',
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('vc-lang', l);
    }
    setLangState(l);
  };

  const t = (content: Bilingual) => content[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
