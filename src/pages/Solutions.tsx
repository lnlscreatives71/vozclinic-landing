import { useLang } from '../context/LangContext';
import type { Lang } from '../types/lang';
import {
  FeaturePageShell,
  FeatureHero,
  ChannelsRibbon,
  MoreFeatures,
  FeatureCTA,
} from './featureShared';

// Solutions by practice type: dental, med spa, cosmetic surgery. Prerendered
// bilingual route (/soluciones/, /en/solutions/), see manifest.ts + routes.tsx.

type B = { es: string; en: string };

interface Practice {
  icon: string;
  name: B;
  pain: B;
  points: B[];
}

const practices: Practice[] = [
  {
    icon: '🦷',
    name: { es: 'Clínicas dentales', en: 'Dental clinics' },
    pain: {
      es: 'Limpiezas vencidas que nadie persigue, huecos por cancelación y pacientes de San Diego preguntando precios en inglés a las 10 pm.',
      en: 'Overdue cleanings nobody chases, cancellation gaps, and San Diego patients asking about pricing in English at 10 pm.',
    },
    points: [
      { es: 'Recall automático de limpiezas y revisiones anuales', en: 'Automatic recall for cleanings and yearly checks' },
      { es: 'Agenda 24/7 en español e inglés, directo en tu calendario', en: '24/7 booking in English and Spanish, straight into your calendar' },
      { es: 'Recopila datos de seguros dentales antes de la cita', en: 'Collects dental insurance details before the visit' },
      { es: 'Reactiva a pacientes que no regresaron', en: 'Reactivates patients who never came back' },
      { es: 'Llena huecos de cancelación con quien espera cita', en: 'Fills cancellation gaps with patients waiting for a slot' },
    ],
  },
  {
    icon: '✨',
    name: { es: 'Medspas', en: 'Med spas' },
    pain: {
      es: 'Tratamientos que viven de la recompra: si nadie da seguimiento al retoque, la paciente se enfría y la promoción del mes se queda sin leer.',
      en: 'Treatments that live on rebooking: when nobody follows up on the touch-up, the client goes cold and the monthly promo goes unread.',
    },
    points: [
      { es: 'Recordatorios de retoque en el momento indicado', en: 'Touch-up reminders timed to the treatment' },
      { es: 'Promociones y campañas que responden dudas y agendan', en: 'Promotions and campaigns that answer questions and book' },
      { es: 'Seguimiento post-tratamiento en el idioma de cada clienta', en: 'Post-treatment follow-up in each client’s language' },
      { es: 'Responde sobre paquetes, membresías y precios 24/7', en: 'Answers about packages, memberships, and pricing 24/7' },
      { es: 'Reagenda sin fricción cuando la clienta lo pide', en: 'Frictionless rescheduling whenever the client asks' },
    ],
  },
  {
    icon: '🩺',
    name: { es: 'Cirugía cosmética', en: 'Cosmetic surgery' },
    pain: {
      es: 'Leads de Estados Unidos que preguntan por procedimientos, presupuesto y preparación, y esperan respuesta inmediata en inglés antes de decidir entre tres clínicas.',
      en: 'US leads asking about procedures, budget, and prep, expecting an instant answer in English while they decide between three clinics.',
    },
    points: [
      { es: 'Responde preguntas pre-consulta en inglés y español', en: 'Answers pre-consult questions in English and Spanish' },
      { es: 'Califica al lead y agenda la valoración', en: 'Qualifies the lead and books the consultation' },
      { es: 'Intake e historial completos antes de la visita', en: 'Complete intake and history before the visit' },
      { es: 'Seguimiento post-operatorio programado', en: 'Scheduled post-op follow-up' },
      { es: 'Escala casos delicados a tu coordinadora con contexto', en: 'Escalates sensitive cases to your coordinator with context' },
    ],
  },
];

function PracticeBlocks() {
  const { t } = useLang();
  return (
    <section className="bg-offwhite py-24">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">
            {t({ es: 'Por tipo de práctica', en: 'By practice type' })}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t({ es: 'La misma Sofía, entrenada en lo tuyo', en: 'The same Sofía, trained on your work' })}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {practices.map((p, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-7 flex flex-col">
              <div className="w-12 h-12 grid place-items-center rounded-xl bg-teal/10 text-2xl mb-4" aria-hidden="true">
                {p.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-charcoal">{t(p.name)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mt-2 mb-5">{t(p.pain)}</p>
              <ul className="space-y-2.5 mt-auto">
                {p.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-charcoal">
                    <span className="text-teal font-bold shrink-0" aria-hidden="true">✓</span>
                    <span>{t(pt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Solutions({ initialLang = 'es' }: { initialLang?: Lang }) {
  return (
    <FeaturePageShell initialLang={initialLang}>
      <FeatureHero
        kicker={{ es: 'Soluciones', en: 'Solutions' }}
        title={{
          es: 'Sofía habla el idioma',
          en: 'Sofía speaks the language',
        }}
        accent={{ es: 'de tu práctica', en: 'of your practice' }}
        sub={{
          es: 'La misma agente, entrenada en lo que tu clínica hace todos los días: dental, medspa o cirugía cosmética. Aprende tus tratamientos, precios y políticas en una sesión de 90 minutos.',
          en: 'The same agent, trained on what your clinic does every day: dental, med spa, or cosmetic surgery. She learns your treatments, pricing, and policies in one 90-minute session.',
        }}
        facts={[
          { v: '3', l: { es: 'Tipos de práctica atendidos hoy', en: 'Practice types served today' } },
          { v: '90 min', l: { es: 'Una sesión para aprender tu clínica', en: 'One session to learn your clinic' } },
          { v: 'ES + EN', l: { es: 'En los dos idiomas', en: 'In both languages' } },
          { v: '24/7', l: { es: 'En todos tus canales', en: 'Across all your channels' } },
        ]}
      />
      <PracticeBlocks />
      <ChannelsRibbon />
      <MoreFeatures currentId="solutions" />
      <FeatureCTA
        title={{
          es: 'Sofía se entrena para tu clínica, no al revés',
          en: 'Sofía trains for your clinic, not the other way around',
        }}
        sub={{
          es: '¿Otro tipo de práctica? Escríbenos igual. Las primeras 25 clínicas en la lista de espera reciben su primer mes gratis.',
          en: 'A different kind of practice? Reach out anyway. The first 25 clinics on the waitlist get their first month free.',
        }}
      />
    </FeaturePageShell>
  );
}
