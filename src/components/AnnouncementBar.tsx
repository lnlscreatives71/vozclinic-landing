import { useLang } from '../context/LangContext';

export default function AnnouncementBar() {
  const { t } = useLang();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gold text-white text-center text-xs sm:text-sm font-semibold py-2 px-3">
      <span aria-hidden="true">🎤</span>{' '}
      {t({
        es: 'Presentando en Futura Médica 2026 · 27 de mayo · Tijuana',
        en: 'Presenting at Futura Médica 2026 · May 27 · Tijuana',
      })}
    </div>
  );
}
