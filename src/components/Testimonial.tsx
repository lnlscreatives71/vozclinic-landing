import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { testimonial } from '../data/content';

export default function Testimonial() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white py-20 sm:py-24" id="testimonio" aria-label="Testimonial">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#008080] to-[#006666] text-[#FAFAF7] p-8 sm:p-12 lg:p-14 shadow-2xl shadow-teal/20 overflow-hidden">
            {/* Subtle background decoration */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
              aria-hidden="true"
            />
            {/* Watermark Quote Icon */}
            <svg
              className="absolute -bottom-6 -right-6 w-44 h-44 text-white/5 pointer-events-none select-none"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <div className="relative z-10">
              {/* Kicker & Rating Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="text-white/80 text-xs sm:text-sm font-bold tracking-widest uppercase">
                  {t(testimonial.kicker)}
                </span>
                <a
                  href={testimonial.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-all backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/20 group"
                  title={t({ es: 'Ver reseña en Google Business Profile', en: 'View review on Google Business Profile' })}
                >
                  {/* 5 Stars */}
                  <div className="flex text-[#C9A961]" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white/90 group-hover:text-white flex items-center gap-1">
                    Google Review
                    <svg className="w-3 h-3 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </span>
                </a>
              </div>

              {/* Quote */}
              <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-snug sm:leading-relaxed text-[#FAFAF7] italic">
                {t(testimonial.quote)}
              </blockquote>

              {/* Attribution */}
              <div className="mt-8 pt-6 border-t border-white/25 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                    {testimonial.author.name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/85 mt-0.5">
                    {t(testimonial.author.role)}
                  </p>
                  <p className="text-xs text-white/70 italic mt-1.5 flex items-center gap-1.5">
                    <a
                      href={testimonial.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/30 hover:decoration-white hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {t(testimonial.author.source)}
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </p>
                </div>

                <div className="self-start sm:self-auto shrink-0">
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 text-teal-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Fertilité Tijuana
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Full Review */}
          <div className="mt-5 bg-[#FAFAF7] border border-gray-200 rounded-2xl overflow-hidden transition-all shadow-sm">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-100/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              aria-expanded={isOpen}
            >
              <span className="font-display font-bold text-sm sm:text-base text-teal-dark flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-teal shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {t(testimonial.fullReview.summary)}
              </span>
              <svg
                className={`w-5 h-5 text-teal transform transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 space-y-4 border-t border-gray-200/70">
                {testimonial.fullReview.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
                <p className="text-xs sm:text-sm text-gray-500 italic pt-2">
                  <a
                    href={testimonial.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal underline decoration-gray-300 hover:decoration-teal transition-colors inline-flex items-center gap-1"
                  >
                    {t(testimonial.fullReview.date)}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
