import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { useLang } from '../context/LangContext';
import { designPartner } from '../data/content';
import { formActionUrl, formUrl, waUrl } from '../utils/links';
import Footer from '../components/Footer';

// ── Google Form field map ───────────────────────────────────────────────
// Each key is an entry.<id> from the live VozClinic design-partner Google
// Form. POSTing to formActionUrl with these names lands every response in the
// exact same Google Sheet as the original unbranded form.
const ENTRY = {
  name: 'entry.1096601393',
  whatsapp: 'entry.613559452',
  clinicType: 'entry.615098522',
  volume: 'entry.965788630',
  fixOne: 'entry.1880039663',
  tools: 'entry.1473062399',
  heard: 'entry.2104983565',
} as const;

type Opt = { v: string; es: string; en: string };

// `v` is the EXACT option string defined in the Google Form — it must match
// for choice/dropdown answers to be recorded against the right option.
const CLINIC_TYPES: Opt[] = [
  { v: 'Dental general', es: 'Dental general', en: 'General dental' },
  { v: 'Dental — implantes / cirugía', es: 'Dental — implantes / cirugía', en: 'Dental — implants / surgery' },
  { v: 'Med spa / estética facial', es: 'Med spa / estética facial', en: 'Med spa / facial aesthetics' },
  { v: 'Cirugía plástica', es: 'Cirugía plástica', en: 'Plastic surgery' },
  { v: 'Otro: ____', es: 'Otra', en: 'Other' },
];

const VOLUMES: Opt[] = [
  { v: 'Menos de 20 / Under 20', es: 'Menos de 20 al día', en: 'Under 20 a day' },
  { v: '20–50', es: '20–50 al día', en: '20–50 a day' },
  { v: '50–150', es: '50–150 al día', en: '50–150 a day' },
  { v: 'Más de 150 / Over 150', es: 'Más de 150 al día', en: 'Over 150 a day' },
  { v: 'No estoy segura/o / Not sure', es: 'No estoy segura/o', en: 'Not sure' },
];

const TOOLS: Opt[] = [
  { v: 'Google Calendar / Outlook', es: 'Google Calendar / Outlook', en: 'Google Calendar / Outlook' },
  { v: 'Dentrix', es: 'Dentrix', en: 'Dentrix' },
  { v: 'Eaglesoft', es: 'Eaglesoft', en: 'Eaglesoft' },
  { v: 'Open Dental', es: 'Open Dental', en: 'Open Dental' },
  { v: 'Nextech / otro sistema med spa', es: 'Nextech u otro sistema med spa', en: 'Nextech / other med spa system' },
  {
    v: 'Solo cuaderno / WhatsApp / Notas / Just paper, WhatsApp, or notes',
    es: 'Solo cuaderno, WhatsApp o notas',
    en: 'Just paper, WhatsApp, or notes',
  },
];

const HEARD: Opt[] = [
  { v: 'Recomendación de [nombre] / Referral from [name]', es: 'Recomendación personal', en: 'Personal referral' },
  {
    v: 'Mi dentista / médico me lo mencionó / My dentist or doctor mentioned it',
    es: 'Mi dentista o médico lo mencionó',
    en: 'My dentist or doctor mentioned it',
  },
  {
    v: 'WhatsApp directo de Lainie / WhatsApp directly from Lainie',
    es: 'WhatsApp directo de Lainie',
    en: 'WhatsApp directly from Lainie',
  },
  { v: 'Instagram / Facebook', es: 'Instagram / Facebook', en: 'Instagram / Facebook' },
  { v: 'Búsqueda en Google / Google search', es: 'Búsqueda en Google', en: 'Google search' },
];

type FormState = {
  name: string;
  whatsapp: string;
  clinicType: string;
  volume: string;
  fixOne: string;
  tools: string;
  heard: string;
};

const EMPTY: FormState = {
  name: '',
  whatsapp: '',
  clinicType: '',
  volume: '',
  fixOne: '',
  tools: '',
  heard: '',
};

const fieldCls =
  'w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-[15px] text-charcoal ' +
  'placeholder:text-gray-400 focus:border-teal focus:ring-2 focus:ring-teal/20 focus:outline-none transition-colors';

const checkPath =
  'M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z';

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-charcoal mb-2">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-gray-400 mt-1.5">{hint}</p> : null}
    </div>
  );
}

export default function EnrollPage() {
  const { lang, setLang, t } = useLang();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const ol = (o: Opt) => (lang === 'es' ? o.es : o.en);

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const body = new URLSearchParams();
    body.append(ENTRY.name, form.name);
    body.append(ENTRY.whatsapp, form.whatsapp);
    body.append(ENTRY.clinicType, form.clinicType);
    body.append(ENTRY.volume, form.volume);
    body.append(ENTRY.fixOne, form.fixOne);
    body.append(ENTRY.tools, form.tools);
    body.append(ENTRY.heard, form.heard);

    try {
      // Google Forms does not send CORS headers; `no-cors` lets the POST
      // through (the response is opaque, but the submission is recorded).
      await fetch(formActionUrl, { method: 'POST', mode: 'no-cors', body });
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
    }
  };

  const header = (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-charcoal/5">
      <div className="section-container flex items-center justify-between h-16 gap-4">
        <a
          href="/"
          className="flex items-baseline font-bold text-xl tracking-tight text-charcoal"
          aria-label="VozClinic"
        >
          <span className="relative inline-block">
            V
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-teal" aria-hidden="true" />
          </span>
          <span>ozClinic</span>
        </a>
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className="flex items-center gap-1 text-sm font-semibold"
            role="group"
            aria-label="Language selection"
          >
            <button
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'es' ? 'text-teal bg-teal/10' : 'text-gray-400 hover:text-charcoal'
              }`}
            >
              ES
            </button>
            <span className="text-gray-300 select-none">|</span>
            <button
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'en' ? 'text-teal bg-teal/10' : 'text-gray-400 hover:text-charcoal'
              }`}
            >
              EN
            </button>
          </div>
          <a
            href="/"
            className="text-sm font-semibold text-gray-500 hover:text-charcoal transition-colors"
          >
            {t({ es: '← Volver', en: '← Back' })}
          </a>
        </div>
      </div>
    </header>
  );

  if (status === 'done') {
    return (
      <div className="min-h-screen flex flex-col font-body bg-offwhite">
        {header}
        <main className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="max-w-lg text-center">
            <div className="w-16 h-16 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8" aria-hidden="true">
                <path fillRule="evenodd" d={checkPath} clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              {t({ es: '¡Solicitud recibida!', en: 'Application received!' })}
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {t({
                es: 'Gracias. Revisaré su solicitud personalmente y le escribiré por WhatsApp en menos de 24 horas. Si quiere adelantar la conversación, escríbame directo.',
                en: "Thank you. I'll review your application personally and message you on WhatsApp within 24 hours. If you'd like a head start, message me directly.",
              })}
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-teal text-white font-bold px-7 py-3.5 rounded-xl hover:bg-teal-dark transition-colors"
            >
              {t({ es: 'Escribir a Lainie por WhatsApp', en: 'Message Lainie on WhatsApp' })}
            </a>
            <p className="mt-6">
              <a
                href="/"
                className="text-sm font-semibold text-teal hover:underline underline-offset-2"
              >
                {t({ es: 'Volver al inicio', en: 'Back to home' })}
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-body bg-offwhite">
      {header}
      <main className="flex-1">
        {/* Offer band */}
        <section
          className="relative overflow-hidden pt-16 pb-12"
          style={{ backgroundColor: 'rgba(201, 169, 97, 0.07)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold opacity-40" aria-hidden="true" />
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #C9A961 0%, transparent 60%)' }}
            aria-hidden="true"
          />
          <div className="section-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 bg-gold/20 text-gold-muted text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase border border-gold/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {t({ es: 'Solo 3 plazas — cohort de lanzamiento', en: 'Only 3 spots — launch cohort' })}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-5">
                {t({
                  es: 'Solicite una de las 3 plazas de socia de diseño.',
                  en: 'Apply for one of the 3 design-partner spots.',
                })}
              </h1>

              {/* Intro */}
              <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto mb-8">
                {t({
                  es: 'Elegimos 3 clínicas en Baja California para pilotar a Sofía con pacientes reales antes del lanzamiento de agosto. Usted nos ayuda a afinar el producto con los datos reales de su clínica — nosotros la cuidamos a usted.',
                  en: "We're choosing 3 clinics in Baja California to pilot Sofía with real patients ahead of the August launch. You help us refine the product with your clinic's real data — we take care of you.",
                })}
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-6 text-left">
                {designPartner.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white/70 backdrop-blur rounded-xl px-4 py-3.5 border border-gold/20"
                  >
                    <span className="text-teal mt-0.5 shrink-0">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                        <path fillRule="evenodd" d={checkPath} clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-charcoal font-medium text-sm leading-snug">{t(benefit)}</span>
                  </div>
                ))}
              </div>

              {/* Urgency */}
              <p className="text-charcoal font-bold text-base">
                {t(designPartner.urgency)}{' '}
                <span className="text-gray-500 font-normal">{t(designPartner.urgencyBody)}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-14">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl border border-charcoal/10 shadow-xl shadow-charcoal/5 p-6 sm:p-10">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-1.5">
                  {t({ es: 'Cuéntenos de su clínica', en: 'Tell us about your clinic' })}
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                  {t({
                    es: 'Toma 2 minutos. Reviso cada solicitud personalmente. — Lainie',
                    en: 'Takes 2 minutes. I review every application personally. — Lainie',
                  })}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                  <Field
                    id="name"
                    label={t({
                      es: 'Su nombre y el nombre de su clínica',
                      en: "Your name and your clinic's name",
                    })}
                  >
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      className={fieldCls}
                      placeholder={t({
                        es: 'Dra. Ana López — Clínica Dental Sonrisa',
                        en: 'Dr. Ana López — Sonrisa Dental Clinic',
                      })}
                    />
                  </Field>

                  <Field
                    id="whatsapp"
                    label={t({
                      es: 'Su WhatsApp (con lada)',
                      en: 'Your WhatsApp (with country code)',
                    })}
                  >
                    <input
                      id="whatsapp"
                      type="tel"
                      inputMode="tel"
                      required
                      value={form.whatsapp}
                      onChange={set('whatsapp')}
                      className={fieldCls}
                      placeholder="+52 664 123 4567"
                    />
                  </Field>

                  <Field
                    id="clinicType"
                    label={t({ es: '¿Qué tipo de clínica es?', en: 'What type of clinic is it?' })}
                  >
                    <select
                      id="clinicType"
                      required
                      value={form.clinicType}
                      onChange={set('clinicType')}
                      className={fieldCls}
                    >
                      <option value="" disabled>
                        {t({ es: 'Seleccione…', en: 'Select…' })}
                      </option>
                      {CLINIC_TYPES.map((o) => (
                        <option key={o.v} value={o.v}>
                          {ol(o)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="volume"
                    label={t({
                      es: '¿Cuántos mensajes de WhatsApp recibe al día?',
                      en: 'How many WhatsApp messages do you get a day?',
                    })}
                  >
                    <select
                      id="volume"
                      required
                      value={form.volume}
                      onChange={set('volume')}
                      className={fieldCls}
                    >
                      <option value="" disabled>
                        {t({ es: 'Seleccione…', en: 'Select…' })}
                      </option>
                      {VOLUMES.map((o) => (
                        <option key={o.v} value={o.v}>
                          {ol(o)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="tools"
                    label={t({
                      es: '¿Qué usan hoy para citas y expedientes?',
                      en: 'What do you use today for appointments and records?',
                    })}
                    hint={t({
                      es: 'Si usan varios, elija el principal.',
                      en: 'If you use several, pick the main one.',
                    })}
                  >
                    <select
                      id="tools"
                      required
                      value={form.tools}
                      onChange={set('tools')}
                      className={fieldCls}
                    >
                      <option value="" disabled>
                        {t({ es: 'Seleccione…', en: 'Select…' })}
                      </option>
                      {TOOLS.map((o) => (
                        <option key={o.v} value={o.v}>
                          {ol(o)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="fixOne"
                    label={t({
                      es: 'Si pudiera arreglar UNA cosa de WhatsApp en su clínica, ¿cuál sería?',
                      en: 'If you could fix ONE thing about WhatsApp at your clinic, what would it be?',
                    })}
                  >
                    <textarea
                      id="fixOne"
                      required
                      rows={3}
                      value={form.fixOne}
                      onChange={set('fixOne')}
                      className={`${fieldCls} resize-y`}
                      placeholder={t({
                        es: 'Cuéntenos con sus palabras…',
                        en: 'Tell us in your own words…',
                      })}
                    />
                  </Field>

                  <Field
                    id="heard"
                    label={t({ es: '¿Cómo se enteró de VozClinic?', en: 'How did you hear about VozClinic?' })}
                  >
                    <select
                      id="heard"
                      required
                      value={form.heard}
                      onChange={set('heard')}
                      className={fieldCls}
                    >
                      <option value="" disabled>
                        {t({ es: 'Seleccione…', en: 'Select…' })}
                      </option>
                      {HEARD.map((o) => (
                        <option key={o.v} value={o.v}>
                          {ol(o)}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {status === 'error' ? (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                      {t({
                        es: 'No pudimos enviar su solicitud. Revise su conexión e intente de nuevo, o ',
                        en: "We couldn't send your application. Check your connection and try again, or ",
                      })}
                      <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                      >
                        {t({ es: 'use el formulario clásico', en: 'use the classic form' })}
                      </a>
                      .
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center bg-gold text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-gold-muted transition-colors shadow-lg shadow-gold/30 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting'
                      ? t({ es: 'Enviando…', en: 'Submitting…' })
                      : t({ es: 'Enviar mi solicitud →', en: 'Submit my application →' })}
                  </button>

                  <p className="text-xs text-gray-400 text-center leading-relaxed">
                    {t({
                      es: 'Sus datos se usan solo para evaluar su solicitud y nunca se comparten con terceros.',
                      en: 'Your information is used only to review your application and is never shared with third parties.',
                    })}
                  </p>
                </form>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                {t({ es: '¿Prefiere hablar primero? ', en: 'Prefer to talk first? ' })}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-teal hover:underline underline-offset-2"
                >
                  {t({ es: 'Escríbame por WhatsApp', en: 'Message me on WhatsApp' })}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
