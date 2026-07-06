import type { Lang } from '../types/lang';
import {
  FeaturePageShell,
  FeatureHero,
  CapabilitiesSection,
  StepsSection,
  ChannelsRibbon,
  MoreFeatures,
  FeatureCTA,
} from './featureShared';

// Feature page: patient communication & reactivation. Prerendered bilingual
// route (/funciones/comunicacion/, /en/features/communication/).

export default function FeatureCommunication({ initialLang = 'es' }: { initialLang?: Lang }) {
  return (
    <FeaturePageShell initialLang={initialLang}>
      <FeatureHero
        kicker={{ es: 'Comunicación y reactivación', en: 'Communication & reactivation' }}
        title={{
          es: 'Cada paciente escucha de ti',
          en: 'Every patient hears from you',
        }}
        accent={{ es: 'en el momento justo', en: 'at the right moment' }}
        sub={{
          es: 'Reactivación de pacientes dormidos, recall de limpiezas y retoques, seguimientos post-cita y promociones que agendan solas. Todo en el idioma de cada paciente, sin cargarle nada a tu equipo.',
          en: 'Dormant-list reactivation, recall for cleanings and touch-ups, post-visit follow-ups, and promotions that book themselves. All in each patient’s language, with nothing added to your team’s plate.',
        }}
        facts={[
          { v: '1:1', l: { es: 'Conversaciones, no mensajes masivos', en: 'Conversations, not blasts' } },
          { v: 'ES + EN', l: { es: 'Cambia de idioma a media conversación', en: 'Switches language mid-conversation' } },
          { v: '24/7', l: { es: 'Responde cuando el paciente contesta', en: 'Replies whenever the patient does' } },
          { v: '0', l: { es: 'Trabajo extra para tu equipo', en: 'Extra work for your team' } },
        ]}
      />
      <CapabilitiesSection
        kicker={{ es: 'Qué hace Sofía', en: 'What Sofía does' }}
        title={{
          es: 'Tu lista de pacientes, trabajando de nuevo',
          en: 'Your patient list, working again',
        }}
        items={[
          {
            icon: '🔁',
            t: { es: 'Reactivación de listas', en: 'List reactivation' },
            d: {
              es: 'Contacta a pacientes que no regresan y los vuelve a agendar, uno por uno.',
              en: 'Reaches patients who stopped coming back and gets them booked again, one by one.',
            },
          },
          {
            icon: '🔔',
            t: { es: 'Recall de pacientes', en: 'Patient recall' },
            d: {
              es: 'Avisa a quien ya toca limpieza, retoque o revisión anual, y le propone fecha.',
              en: 'Nudges anyone due for a cleaning, touch-up, or yearly check, and proposes a date.',
            },
          },
          {
            icon: '💬',
            t: { es: 'Seguimientos post-cita', en: 'Post-visit follow-ups' },
            d: {
              es: 'Da seguimiento después del tratamiento y detecta a quien necesita atención.',
              en: 'Checks in after treatment and flags anyone who needs attention.',
            },
          },
          {
            icon: '🎁',
            t: { es: 'Promociones y campañas', en: 'Promotions & campaigns' },
            d: {
              es: 'Lanza una oferta, responde las dudas y agenda a quien dice que sí.',
              en: 'Launches an offer, answers the questions, and books the yeses.',
            },
          },
          {
            icon: '🌐',
            t: { es: 'Bilingüe de verdad', en: 'Genuinely bilingual' },
            d: {
              es: 'Detecta el idioma del paciente y cambia a media conversación si hace falta.',
              en: 'Detects the patient’s language and switches mid-conversation when needed.',
            },
          },
          {
            icon: '📈',
            t: { es: 'Reporte semanal por WhatsApp', en: 'Weekly WhatsApp report' },
            d: {
              es: 'Cada semana te llega lo importante: quién respondió, quién agendó y quién pide a un humano.',
              en: 'Each week you get what matters: who replied, who booked, and who asked for a human.',
            },
          },
        ]}
      />
      <StepsSection
        kicker={{ es: 'Cómo funciona', en: 'How it works' }}
        title={{ es: 'Así se reactiva una lista', en: 'How a list gets reactivated' }}
        steps={[
          {
            t: { es: 'Compartes tu lista', en: 'You share your list' },
            d: {
              es: 'Nos das tus pacientes inactivos o conectamos tu sistema de agenda.',
              en: 'You hand over your inactive patients or connect your scheduling system.',
            },
          },
          {
            t: { es: 'Sofía conversa', en: 'Sofía starts the conversation' },
            d: {
              es: 'Mensaje personalizado en el idioma del paciente, con tu tono y tus tratamientos.',
              en: 'A personalized message in the patient’s language, in your tone, about your treatments.',
            },
          },
          {
            t: { es: 'Tu agenda recibe', en: 'Your calendar fills' },
            d: {
              es: 'Quien dice que sí queda agendado. Quien pide a una persona pasa a tu equipo con contexto.',
              en: 'Yeses get booked. Anyone who asks for a person goes to your team with full context.',
            },
          },
        ]}
      />
      <ChannelsRibbon />
      <MoreFeatures currentId="feature-communication" />
      <FeatureCTA
        title={{
          es: 'Tu lista de pacientes ya pagó por sí misma. Úsala.',
          en: 'Your patient list already paid for itself. Put it to work.',
        }}
      />
    </FeaturePageShell>
  );
}
