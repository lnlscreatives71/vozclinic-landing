import { useState, type FormEvent } from 'react';
import { useLang } from '../context/LangContext';
import { waUrl } from '../utils/links';

// "Contact us" for visitors who want to be reached without booking a demo.
// Posts to api/sign-contact.ts, which signs the body and forwards it to the
// LNL CRM (webhook vozclinic-contact): the CRM saves the contact, keeps the
// message as a note and emails Lainie.

type Status = 'idle' | 'sending' | 'sent' | 'error';

declare global {
  interface Window {
    whop?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition';

export default function Contact() {
  const { lang, t } = useLang();
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const field = (k: string) => String(fd.get(k) ?? '').trim();

    setStatus('sending');
    try {
      const res = await fetch('/api/sign-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: field('name'),
          email: field('email'),
          phone: field('phone') || undefined,
          clinic_name: field('clinic_name') || undefined,
          message: field('message'),
          language: lang,
          page: window.location.pathname,
          company_website: field('company_website'),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      form.reset();
      // Whop Pixel: count the request as a lead. No personal data is sent.
      window.whop?.track('lead');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="bg-offwhite py-24" id="contacto" aria-label={t({ es: 'Contacto', en: 'Contact' })}>
      <div className="section-container grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        {/* Left: pitch + direct channels */}
        <div>
          <span className="text-teal text-xs font-bold tracking-widest uppercase">
            {t({ es: 'Contacto', en: 'Contact' })}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t({ es: '¿Prefieres que te contactemos?', en: 'Rather we reach out to you?' })}
          </h2>
          <p className="text-gray-500 text-lg mt-4 leading-relaxed max-w-md">
            {t({
              es: 'Déjanos tus datos y tu pregunta, y te contactamos. No necesitas agendar una demo.',
              en: "Leave your details and your question, and we'll get back to you. No demo booking needed.",
            })}
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <p className="text-gray-400 font-semibold">
              {t({ es: 'O escríbenos directo:', en: 'Or reach us directly:' })}
            </p>
            <a href={waUrl} className="flex items-center gap-3 text-charcoal font-semibold hover:text-teal transition-colors">
              <span className="w-9 h-9 rounded-full bg-[#25D366]/15 text-[#1a9e4b] flex items-center justify-center" aria-hidden="true">WA</span>
              WhatsApp
            </a>
            <a href="mailto:hola@vozclinic.com" className="flex items-center gap-3 text-charcoal font-semibold hover:text-teal transition-colors">
              <span className="w-9 h-9 rounded-full bg-teal/10 text-teal flex items-center justify-center" aria-hidden="true">@</span>
              hola@vozclinic.com
            </a>
            <a href="tel:+526633154686" className="flex items-center gap-3 text-charcoal font-semibold hover:text-teal transition-colors">
              <span className="w-9 h-9 rounded-full bg-teal/10 text-teal flex items-center justify-center" aria-hidden="true">☎</span>
              +52 663 315 4686
            </a>
          </div>
        </div>

        {/* Right: the form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8">
          {status === 'sent' ? (
            <div role="status" className="py-10 text-center">
              <p className="font-display text-2xl font-bold text-charcoal">
                {t({ es: '¡Listo!', en: 'Got it!' })}
              </p>
              <p className="text-gray-500 mt-3">
                {t({
                  es: 'Recibimos tu mensaje y te contactaremos pronto.',
                  en: "We received your message and we'll be in touch soon.",
                })}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-semibold text-teal hover:underline"
              >
                {t({ es: 'Enviar otro mensaje', en: 'Send another message' })}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-sm font-semibold text-charcoal mb-1.5">
                    {t({ es: 'Nombre', en: 'Name' })} <span className="text-teal">*</span>
                  </span>
                  <input name="name" required maxLength={240} autoComplete="name" className={inputClass} />
                </label>
                <label className="block">
                  <span className="block text-sm font-semibold text-charcoal mb-1.5">
                    {t({ es: 'Correo', en: 'Email' })} <span className="text-teal">*</span>
                  </span>
                  <input name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
                </label>
                <label className="block">
                  <span className="block text-sm font-semibold text-charcoal mb-1.5">
                    {t({ es: 'WhatsApp o teléfono', en: 'WhatsApp or phone' })}{' '}
                    <span className="font-normal text-gray-400">{t({ es: '(opcional)', en: '(optional)' })}</span>
                  </span>
                  <input name="phone" type="tel" maxLength={64} autoComplete="tel" className={inputClass} />
                </label>
                <label className="block">
                  <span className="block text-sm font-semibold text-charcoal mb-1.5">
                    {t({ es: 'Clínica', en: 'Clinic' })}{' '}
                    <span className="font-normal text-gray-400">{t({ es: '(opcional)', en: '(optional)' })}</span>
                  </span>
                  <input name="clinic_name" maxLength={255} autoComplete="organization" className={inputClass} />
                </label>
              </div>
              <label className="block">
                <span className="block text-sm font-semibold text-charcoal mb-1.5">
                  {t({ es: '¿En qué te podemos ayudar?', en: 'How can we help?' })} <span className="text-teal">*</span>
                </span>
                <textarea name="message" required maxLength={2000} rows={4} className={`${inputClass} resize-y`} />
              </label>

              {/* Honeypot: hidden from people, bots fill it and get dropped server-side */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label>
                  Website
                  <input name="company_website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {status === 'error' && (
                <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                  {t({
                    es: 'No pudimos enviar tu mensaje. Escríbenos por ',
                    en: "We couldn't send your message. Please reach us on ",
                  })}
                  <a href={waUrl} className="font-semibold underline">WhatsApp</a>
                  {t({ es: ' o a ', en: ' or at ' })}
                  <a href="mailto:hola@vozclinic.com" className="font-semibold underline">hola@vozclinic.com</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-teal text-white font-semibold text-sm px-4 py-3.5 rounded-xl hover:bg-teal-dark transition-colors disabled:opacity-60 disabled:cursor-wait"
              >
                {status === 'sending'
                  ? t({ es: 'Enviando…', en: 'Sending…' })
                  : t({ es: 'Enviar', en: 'Send' })}
              </button>
              <p className="text-xs text-gray-400 text-center">
                {t({ es: 'Al enviar, aceptas nuestro ', en: 'By sending, you agree to our ' })}
                <a
                  href={lang === 'en' ? '/privacy/' : '/aviso-de-privacidad/'}
                  className="underline hover:text-teal"
                >
                  {t({ es: 'Aviso de privacidad', en: 'Privacy notice' })}
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
