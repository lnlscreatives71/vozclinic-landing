import { LangProvider, useLang } from '../context/LangContext';
import type { Lang } from '../types/lang';
import AnnouncementBar from '../components/AnnouncementBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { qualifierUrl } from '../utils/links';
import { MoreFeatures } from './featureShared';

// Flagship feature page: the AI voice & WhatsApp receptionist. Rendered as an
// integrated, prerendered route (see routes.tsx + manifest.ts). Pre-launch, so
// copy stays capability-focused — no results/outcome claims.

function Hero() {
  const { lang, t } = useLang();
  return (
    <section className="relative bg-offwhite overflow-hidden pt-36 sm:pt-44 pb-20">
      <div className="section-container relative">
        {/* Omnichannel orb: Sofía connected to every channel, in one image */}
        <img
          src="/sofia-hub.webp"
          alt={t({
            es: 'Sofía, el agente de voz con IA de VozClinic, conectada a WhatsApp, teléfono, Telegram, SMS y tu sitio web',
            en: 'Sofía, VozClinic’s AI voice agent, connected to WhatsApp, phone, Telegram, SMS, and your website',
          })}
          width="1264"
          height="848"
          className="mx-auto w-full max-w-2xl lg:max-w-3xl h-auto select-none"
        />

        <div className="text-center max-w-3xl mx-auto mt-5">
          {/* Intro line: the copy around the orb */}
          <p className="text-base sm:text-lg font-semibold text-teal mb-4">
            {t({
              es: 'Un solo agente, todos tus canales, los dos idiomas.',
              en: 'One agent, every channel, both languages.',
            })}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
          {t({
            es: 'Sofía contesta cada llamada y mensaje, ',
            en: 'Sofía answers every call and message, ',
          })}
          <span className="text-teal">
            {t({ es: '24/7', en: '24/7' })}
          </span>
        </h1>
        <p className="text-gray-500 text-lg sm:text-xl mt-6 leading-relaxed">
          {t({
            es: 'En español e inglés, en el canal que tu paciente ya usa. Nunca al buzón, nunca fuera de horario. Agenda, reactiva y da seguimiento sin cargarle más trabajo a tu recepción.',
            en: 'In English and Spanish, on the channel your patient already uses. Never voicemail, never after-hours gaps. She books, reactivates, and follows up without adding to your front desk.',
          })}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={qualifierUrl(lang)}
            className="inline-flex items-center bg-teal text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-teal-dark transition-colors"
          >
            {t({ es: 'Únete a la lista de espera →', en: 'Join the waitlist →' })}
          </a>
          <a
            href="/calculadora/"
            className="inline-flex items-center border border-gray-300 text-charcoal font-semibold px-6 py-3.5 rounded-xl hover:bg-charcoal/5 transition-colors"
          >
            {t({ es: 'Calcula tu ROI', en: 'Calculate your ROI' })}
          </a>
        </div>
        {/* Capability facts (truthful, not results claims) */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { v: '24/7', l: { es: 'Siempre disponible', en: 'Always on' } },
            { v: 'ES + EN', l: { es: 'Bilingüe nativa', en: 'Natively bilingual' } },
            { v: '6', l: { es: 'Canales', en: 'Channels' } },
            { v: '0', l: { es: 'Llamadas al buzón', en: 'Calls to voicemail' } },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display text-3xl font-bold text-teal">{s.v}</div>
              <div className="text-gray-500 text-sm mt-1">{t(s.l)}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const { t } = useLang();
  const items = [
    { icon: '📞', t: { es: 'Contesta 24/7', en: 'Answers 24/7' }, d: { es: 'Cada llamada y mensaje, sin buzón y sin horario de oficina.', en: 'Every call and message, no voicemail and no office-hours gap.' } },
    { icon: '📅', t: { es: 'Agenda citas', en: 'Books appointments' }, d: { es: 'Califica al paciente y agenda directo en tu calendario.', en: 'Qualifies the patient and books straight into your calendar.' } },
    { icon: '🔁', t: { es: 'Reactivación de listas', en: 'List reactivation' }, d: { es: 'Contacta a pacientes dormidos y los vuelve a agendar.', en: 'Reaches dormant patients and gets them booked again.' } },
    { icon: '🔔', t: { es: 'Recall de pacientes', en: 'Patient recall' }, d: { es: 'Avisa a quien ya toca limpieza, retoque o seguimiento.', en: 'Nudges anyone due for a cleaning, touch-up, or follow-up.' } },
    { icon: '💬', t: { es: 'Seguimientos post-cita', en: 'Post-appointment follow-ups' }, d: { es: 'Da seguimiento después del tratamiento, en su idioma.', en: 'Follows up after treatment, in the patient’s language.' } },
    { icon: '🗓️', t: { es: 'Reagenda y cancelaciones', en: 'Reschedules & cancellations' }, d: { es: 'Mueve, confirma y llena huecos sin llamadas manuales.', en: 'Moves, confirms, and fills gaps with no manual calls.' } },
    { icon: '🎁', t: { es: 'Promociones y campañas', en: 'Promotions & campaigns' }, d: { es: 'Lanza una oferta, responde dudas y agenda a quien dice que sí.', en: 'Launches an offer, answers questions, and books the yeses.' } },
    { icon: '🛡️', t: { es: 'Verificación de seguros e intake', en: 'Insurance verification & intake' }, d: { es: 'Recopila datos y resuelve dudas de cobertura antes de la cita.', en: 'Collects details and clears coverage questions before the visit.' } },
    { icon: '🌐', t: { es: 'Bilingüe de verdad', en: 'Genuinely bilingual' }, d: { es: 'Detecta el idioma y cambia a media conversación.', en: 'Detects the language and switches mid-conversation.' } },
  ];
  return (
    <section className="bg-offwhite py-24" id="capacidades">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">
            {t({ es: 'Qué hace Sofía', en: 'What Sofía does' })}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t({ es: 'Una recepcionista que nunca duerme', en: 'A receptionist that never sleeps' })}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-teal/30 hover:shadow-lg transition-all">
              <div className="w-11 h-11 grid place-items-center rounded-xl bg-teal/10 text-xl mb-4" aria-hidden="true">{it.icon}</div>
              <h3 className="font-semibold text-charcoal mb-1.5">{t(it.t)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t(it.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Channels() {
  const { t } = useLang();
  const channels = [
    { icon: '🟢', name: 'WhatsApp', d: { es: 'Voz y texto, el canal que tus pacientes ya usan.', en: 'Voice and text, the channel your patients already use.' } },
    { icon: '✈️', name: 'Telegram', d: { es: 'Mismo agente, misma consistencia.', en: 'Same agent, same consistency.' } },
    { icon: '💼', name: 'Slack', d: { es: 'Para equipos que coordinan por Slack.', en: 'For teams that coordinate over Slack.' } },
    { icon: '💬', name: 'SMS', d: { es: 'Cuando tu clínica prefiere mensaje de texto.', en: 'When your clinic prefers a text message.' } },
    { icon: '📱', name: { es: 'Línea de voz', en: 'Voice line' }, d: { es: 'Número dedicado para llamadas entrantes y salientes.', en: 'A dedicated number for inbound and outbound calls.' } },
    { icon: '🌐', name: { es: 'Tu sitio web', en: 'Your website' }, d: { es: 'Integrada para agendar por voz sin salir de la página.', en: 'Embedded to book by voice without leaving the page.' } },
  ];
  return (
    <section className="bg-white py-24" id="canales">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">
            {t({ es: 'Dónde contesta', en: 'Where she answers' })}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t({ es: 'Un solo agente, en todos tus canales', en: 'One agent, across every channel' })}
          </h2>
          <p className="text-gray-500 mt-4">
            {t({ es: 'Tú eliges los canales. Sofía se mantiene consistente en todos, en los dos idiomas.', en: 'You pick the channels. Sofía stays consistent across all of them, in both languages.' })}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {channels.map((c, i) => (
            <div key={i} className="flex items-start gap-4 bg-offwhite border border-gray-100 rounded-2xl p-5">
              <span className="text-2xl shrink-0" aria-hidden="true">{c.icon}</span>
              <div>
                <div className="font-semibold text-charcoal">{typeof c.name === 'string' ? c.name : t(c.name)}</div>
                <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{t(c.d)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { lang, t } = useLang();
  return (
    <section className="bg-teal py-20">
      <div className="section-container text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
          {t({ es: 'Prepárate para dejar de perder llamadas en septiembre', en: 'Get ready to stop losing calls in September' })}
        </h2>
        <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
          {t({ es: 'Las primeras 25 clínicas en unirse a la lista de espera reciben su primer mes gratis.', en: 'The first 25 clinics to join the waitlist get their first month free.' })}
        </p>
        <a
          href={qualifierUrl(lang)}
          className="inline-flex items-center bg-white text-teal font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors"
        >
          {t({ es: 'Únete a la lista de espera →', en: 'Join the waitlist →' })}
        </a>
      </div>
    </section>
  );
}

export default function FeatureReceptionist({ initialLang = 'es' }: { initialLang?: Lang }) {
  return (
    <LangProvider initialLang={initialLang}>
      <div className="min-h-screen font-body">
        <AnnouncementBar />
        <TopBar />
        <main>
          <Hero />
          <Capabilities />
          <Channels />
          <MoreFeatures currentId="feature-receptionist" />
          <CTA />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
