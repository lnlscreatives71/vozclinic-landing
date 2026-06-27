import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { Lang } from './types/lang';

export function render(lang: Lang = 'es'): string {
  return renderToString(
    <StrictMode>
      <App initialLang={lang} />
    </StrictMode>,
  );
}
