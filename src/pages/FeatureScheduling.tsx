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

// Feature page: scheduling & reminders. Prerendered bilingual route
// (/funciones/agenda/, /en/features/scheduling/), see manifest.ts + routes.tsx.

export default function FeatureScheduling({ initialLang = 'es' }: { initialLang?: Lang }) {
  return (
    <FeaturePageShell initialLang={initialLang}>
      <FeatureHero
        image={{
          src: '/feature-agenda.webp',
          width: 1264,
          height: 848,
          alt: {
            es: 'Sofía, el agente de voz con IA de VozClinic, conectada a la agenda de citas, los recordatorios, el reagendado, las confirmaciones y las cancelaciones',
            en: 'Sofía, VozClinic’s AI voice agent, connected to appointment booking, reminders, reschedules, confirmations, and cancellations',
          },
        }}
        kicker={{ es: 'Agenda y recordatorios', en: 'Scheduling & reminders' }}
        title={{
          es: 'Citas agendadas, confirmadas y recuperadas,',
          en: 'Appointments booked, confirmed, and recovered,',
        }}
        accent={{ es: 'sin trabajo manual', en: 'with no manual work' }}
        sub={{
          es: 'Sofía agenda directo en tu calendario, envía recordatorios que el paciente puede responder y convierte cancelaciones en huecos llenos. Tu recepción se dedica a los pacientes que ya están en la clínica.',
          en: 'Sofía books straight into your calendar, sends reminders patients can actually reply to, and turns cancellations into filled slots. Your front desk focuses on the patients already in the clinic.',
        }}
        facts={[
          { v: '24/7', l: { es: 'Agenda sin horario de oficina', en: 'Books around the clock' } },
          { v: 'ES + EN', l: { es: 'En los dos idiomas', en: 'In both languages' } },
          { v: '2 vías', l: { es: 'Recordatorios que se responden', en: '2-way reminders patients answer' } },
          { v: '0', l: { es: 'Llamadas manuales de confirmación', en: 'Manual confirmation calls' } },
        ]}
      />
      <CapabilitiesSection
        kicker={{ es: 'Qué hace Sofía', en: 'What Sofía does' }}
        title={{ es: 'Tu agenda, administrada de punta a punta', en: 'Your calendar, managed end to end' }}
        items={[
          {
            icon: '📅',
            t: { es: 'Agenda directo en tu calendario', en: 'Books straight into your calendar' },
            d: {
              es: 'Revisa disponibilidad real y confirma la cita en el momento, sin idas y vueltas.',
              en: 'Checks real availability and confirms on the spot, no back and forth.',
            },
          },
          {
            icon: '🧭',
            t: { es: 'Califica antes de agendar', en: 'Qualifies before booking' },
            d: {
              es: 'Pregunta lo esencial: tratamiento, urgencia e idioma, antes de apartar el espacio.',
              en: 'Asks the essentials: treatment, urgency, and language, before holding the slot.',
            },
          },
          {
            icon: '🔔',
            t: { es: 'Recordatorios con respuesta', en: 'Reminders patients can answer' },
            d: {
              es: 'No es un mensaje de una sola vía: el paciente confirma, mueve su cita o pregunta ahí mismo.',
              en: 'Not a one-way blast: the patient confirms, moves the visit, or asks a question right there.',
            },
          },
          {
            icon: '🗓️',
            t: { es: 'Reagenda y cancelaciones', en: 'Reschedules & cancellations' },
            d: {
              es: 'Mueve citas, confirma cambios y avisa a tu equipo sin que nadie levante el teléfono.',
              en: 'Moves visits, confirms changes, and updates your team without anyone picking up a phone.',
            },
          },
          {
            icon: '🕳️',
            t: { es: 'Llena los huecos', en: 'Fills the gaps' },
            d: {
              es: 'Cuando alguien cancela, Sofía ofrece el espacio a quien está esperando una cita.',
              en: 'When someone cancels, Sofía offers the slot to patients waiting for an appointment.',
            },
          },
          {
            icon: '💬',
            t: { es: 'Confirmaciones el mismo día', en: 'Same-day confirmations' },
            d: {
              es: 'Un toque final antes de la cita para que tu agenda del día sea la agenda real.',
              en: 'A final touch before the visit so the day you planned is the day you get.',
            },
          },
        ]}
      />
      <StepsSection
        kicker={{ es: 'Un ejemplo de secuencia', en: 'An example sequence' }}
        title={{ es: 'Así se cuida una cita', en: 'How a booking gets protected' }}
        sub={{
          es: 'Tú defines los tiempos y el tono. Esta es una secuencia típica.',
          en: 'You set the timing and the tone. This is a typical sequence.',
        }}
        steps={[
          {
            t: { es: 'Una semana antes', en: 'One week out' },
            d: {
              es: 'Recordatorio en el idioma del paciente, con opción de confirmar o mover la cita.',
              en: 'A reminder in the patient’s language, with the option to confirm or move the visit.',
            },
          },
          {
            t: { es: 'Un día antes', en: 'One day out' },
            d: {
              es: 'Confirmación final. Si el paciente cancela, Sofía ofrece el espacio a alguien más.',
              en: 'Final confirmation. If the patient cancels, Sofía offers the slot to someone else.',
            },
          },
          {
            t: { es: 'Después de la cita', en: 'After the visit' },
            d: {
              es: 'Seguimiento y, cuando toca, la siguiente cita queda propuesta antes de que se olvide.',
              en: 'A follow-up and, when due, the next visit gets proposed before it slips.',
            },
          },
        ]}
      />
      <ChannelsRibbon />
      <MoreFeatures currentId="feature-scheduling" />
      <FeatureCTA
        title={{
          es: 'Deja que tu agenda se administre sola',
          en: 'Let your calendar run itself',
        }}
      />
    </FeaturePageShell>
  );
}
