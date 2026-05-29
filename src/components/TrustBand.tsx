import { useLang } from '../context/LangContext';
import { trustBand } from '../data/content';

export default function TrustBand() {
  const { t } = useLang();

  return (
    <section className="bg-charcoal py-10" aria-label="Trust">
      <div className="section-container">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustBand.items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 text-teal shrink-0"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-sm font-medium text-gray-300">{t(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
