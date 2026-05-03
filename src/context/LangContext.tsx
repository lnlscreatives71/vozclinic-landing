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

function getDefaultLang(): Lang {
  const stored = localStorage.getItem('vc-lang');
  if (stored === 'es' || stored === 'en') return stored;
  return navigator.language?.startsWith('es') ? 'es' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getDefaultLang);

  const setLang = (l: Lang) => {
    localStorage.setItem('vc-lang', l);
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
