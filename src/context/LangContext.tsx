import { createContext, useContext, useEffect, useState } from 'react';
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

// SSR/SSG: initial render is always ES so server HTML matches the first client
// paint. A useEffect then upgrades to the visitor's saved preference (a brief
// flicker for returning EN-saved visitors is acceptable; most traffic is ES).
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('vc-lang');
    if (stored === 'es' || stored === 'en') setLangState(stored);
  }, []);

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
