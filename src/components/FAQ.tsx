import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { faq } from '../data/content';

function FAQItem({ question, answer, isOpen, onToggle, index }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? 'text-teal' : 'text-charcoal group-hover:text-teal'}`}>
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5 ${
            isOpen ? 'border-teal bg-teal text-white rotate-45' : 'border-gray-200 text-gray-400 group-hover:border-teal group-hover:text-teal'
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <path d="M6 2v8M2 6h8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-gray-500 text-sm leading-relaxed pb-5 pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIdx(openIdx === idx ? null : idx);

  const col1 = faq.items.slice(0, 4);
  const col2 = faq.items.slice(4, 8);

  return (
    <section className="bg-offwhite py-24" id="faq" aria-label="FAQ">
      <div className="section-container">
        {/* Title */}
        <div className="text-center mb-14">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">FAQ</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t(faq.title)}
          </h2>
        </div>

        {/* Two-column accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0">
          {/* Column 1 */}
          <div className="bg-white rounded-2xl px-6 py-2 border border-gray-100">
            {col1.map((item, idx) => (
              <FAQItem
                key={idx}
                index={idx}
                question={t(item.q)}
                answer={t(item.a)}
                isOpen={openIdx === idx}
                onToggle={() => toggle(idx)}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="bg-white rounded-2xl px-6 py-2 border border-gray-100 mt-4 lg:mt-0">
            {col2.map((item, idx) => (
              <FAQItem
                key={idx + 4}
                index={idx + 4}
                question={t(item.q)}
                answer={t(item.a)}
                isOpen={openIdx === idx + 4}
                onToggle={() => toggle(idx + 4)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
