import { useLang } from '../context/LangContext';
import { qualifierUrl } from '../utils/links';

export default function AnnouncementBar() {
  const { lang, t } = useLang();

  return (
    <a
      href={qualifierUrl(lang)}
      className="fixed top-0 left-0 right-0 z-50 block bg-gold text-white text-center text-xs sm:text-sm font-semibold py-2 px-3 hover:bg-gold-muted transition-colors"
    >
      <span aria-hidden="true">✨</span>{' '}
      {t({
        es: 'Las 3 plazas de socia de diseño: llenas · Lista de espera abierta — las primeras 25 clínicas reciben su primer mes gratis →',
        en: 'All 3 design partner spots filled · Waitlist open — first 25 clinics get their first month free →',
      })}
    </a>
  );
}
