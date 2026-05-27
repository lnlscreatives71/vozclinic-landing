import { useLang } from '../context/LangContext';

const PHONE = '526633154686';

const PREFILL = {
  es: 'Hola Lainie, vi VozClinic en Futura Médica.',
  en: 'Hi Lainie, I saw VozClinic at Futura Médica.',
};

export default function FloatingWhatsApp() {
  const { lang, t } = useLang();
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(PREFILL[lang])}`;
  const label = t({ es: 'Chatear por WhatsApp', en: 'Chat on WhatsApp' });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:bg-[#1ebe57] transition-colors"
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
        className="w-7 h-7"
      >
        <path d="M16.004 3C9.376 3 4 8.376 4 15c0 2.36.69 4.56 1.88 6.42L4 29l7.78-1.84A11.93 11.93 0 0 0 16.004 27C22.633 27 28 21.624 28 15S22.633 3 16.004 3zm0 21.6c-1.86 0-3.6-.55-5.05-1.5l-.36-.23-4.62 1.1 1.13-4.51-.24-.37A9.5 9.5 0 0 1 6.4 15c0-5.3 4.3-9.6 9.6-9.6s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6zm5.27-7.18c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.6-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49-.16-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.17 2.95.14.19 2.01 3.07 4.87 4.3.68.29 1.21.47 1.63.6.68.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34z" />
      </svg>
    </a>
  );
}
