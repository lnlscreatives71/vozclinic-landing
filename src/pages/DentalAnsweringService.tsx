import type { Lang } from '../types/lang';
import {
  FeaturePageShell,
  FeatureHero,
  CompareSection,
  CapabilitiesSection,
  StepsSection,
  FaqSection,
  ChannelsRibbon,
  MoreFeatures,
  FeatureCTA,
  onboardingSteps,
  pricingAnswer,
  fitFaq,
} from './featureShared';

// Keyword landing page: "dental answering service" (EN) /
// "servicio de contestación dental" (ES). Prerendered bilingual route
// (/servicio-de-contestacion-dental/, /en/dental-answering-service/),
// see manifest.ts + routes.tsx.

export default function DentalAnsweringService({ initialLang = 'es' }: { initialLang?: Lang }) {
  return (
    <FeaturePageShell initialLang={initialLang}>
      <FeatureHero
        kicker={{ es: 'Servicio de contestación dental', en: 'Dental answering service' }}
        title={{ es: 'El servicio de contestación dental que', en: 'The dental answering service that' }}
        accent={{ es: 'agenda la cita, no toma un recado', en: 'books the appointment, not a message' }}
        sub={{
          es: 'Sofía contesta las llamadas y los WhatsApp de tu clínica dental 24/7, en español e inglés. Revisa tu agenda real, confirma la cita y hace recall de limpiezas, en lugar de dejarte una lista de recados para la mañana.',
          en: 'Sofía answers your dental clinic’s calls and WhatsApp messages 24/7, in English and Spanish. She checks your real calendar, confirms the appointment, and recalls patients due for cleanings, instead of leaving you a stack of messages for the morning.',
        }}
        facts={[
          { v: '24/7', l: { es: 'Llamadas y WhatsApp', en: 'Calls and WhatsApp' } },
          { v: 'ES + EN', l: { es: 'En los dos idiomas', en: 'In both languages' } },
          { v: '24h + 2h', l: { es: 'Recordatorios antes de cada cita', en: 'Reminders before each visit' } },
          { v: '$299', l: { es: 'USD al mes, desde', en: 'USD a month, starting at' } },
        ]}
      />
      <CompareSection
        kicker={{ es: 'Contestar no es lo mismo que agendar', en: 'Answering is not the same as booking' }}
        title={{
          es: 'Un recado para la mañana contra una cita confirmada esta noche',
          en: 'A message for the morning versus a booking confirmed tonight',
        }}
        left={{
          title: { es: 'Un servicio de contestación tradicional', en: 'A traditional answering service' },
          points: [
            { es: 'Toma el recado y te lo manda para que tú devuelvas la llamada.', en: 'Takes a message and passes it to you to call back.' },
            { es: 'No ve tu agenda, así que el paciente sigue sin horario.', en: 'Can’t see your schedule, so the patient still has no time booked.' },
            { es: 'El idioma depende de quién conteste esa noche.', en: 'The language depends on who picks up that night.' },
            { es: 'Suele cobrar por minuto o por llamada.', en: 'Often billed by the minute or by the call.' },
          ],
        }}
        right={{
          title: { es: 'Sofía, un servicio de contestación con IA', en: 'Sofía, an AI dental answering service' },
          points: [
            { es: 'Responde la pregunta del paciente con tus precios y tus reglas.', en: 'Answers the patient’s question with your prices and your rules.' },
            { es: 'Revisa tu agenda real y confirma el horario en la misma conversación.', en: 'Checks your real calendar and confirms the time in the same conversation.' },
            { es: 'Contesta en español o inglés y cambia a media conversación.', en: 'Answers in English or Spanish and switches mid-conversation.' },
            { es: 'Plan mensual fijo según tu volumen de conversaciones.', en: 'A flat monthly plan based on your conversation volume.' },
          ],
        }}
      />
      <CapabilitiesSection
        kicker={{ es: 'Hecho para clínicas dentales', en: 'Built for dental clinics' }}
        title={{
          es: 'Lo que haría tu recepción si nunca se fuera a casa',
          en: 'What your front desk would do if it never went home',
        }}
        items={[
          {
            icon: '📞',
            t: { es: 'Contesta fuera de horario', en: 'Answers after hours' },
            d: {
              es: 'Llamadas y WhatsApp de noche, en fin de semana y a la hora de la comida, sin buzón.',
              en: 'Calls and WhatsApp at night, on weekends, and over lunch, with no voicemail.',
            },
          },
          {
            icon: '📅',
            t: { es: 'Agenda la cita', en: 'Books the appointment' },
            d: {
              es: 'Ofrece un horario abierto y lo confirma en tu calendario o en Open Dental.',
              en: 'Offers an open time and confirms it in your calendar or in Open Dental.',
            },
          },
          {
            icon: '🦷',
            t: { es: 'Recall de limpiezas', en: 'Cleaning recall' },
            d: {
              es: 'Avisa a los pacientes a quienes ya les toca limpieza o revisión anual y los agenda.',
              en: 'Reaches patients due for a cleaning or yearly checkup and gets them booked.',
            },
          },
          {
            icon: '🗓️',
            t: { es: 'Llena huecos de cancelación', en: 'Fills cancellation gaps' },
            d: {
              es: 'Cuando alguien cancela, ofrece el espacio a quien espera cita.',
              en: 'When someone cancels, offers the slot to patients waiting for one.',
            },
          },
          {
            icon: '🛡️',
            t: { es: 'Datos del seguro antes de la cita', en: 'Insurance details before the visit' },
            d: {
              es: 'Recopila los datos del seguro dental para que tu equipo esté listo antes de que llegue el paciente.',
              en: 'Collects dental insurance details so your team is ready before the patient arrives.',
            },
          },
          {
            icon: '🚨',
            t: { es: 'Urgencias a tu equipo', en: 'Emergencies to your team' },
            d: {
              es: 'Una urgencia dental escala a tu línea designada en segundos. Sofía nunca da diagnósticos.',
              en: 'A dental emergency escalates to your designated line in seconds. Sofía never gives diagnoses.',
            },
          },
        ]}
        bg="offwhite"
      />
      <StepsSection
        kicker={{ es: 'Cómo empiezas', en: 'How you get started' }}
        title={{ es: 'En vivo en cerca de una semana', en: 'Live in about a week' }}
        steps={onboardingSteps}
      />
      <FaqSection
        title={{
          es: 'Preguntas frecuentes sobre el servicio de contestación dental',
          en: 'Dental answering service FAQ',
        }}
        bg="offwhite"
        items={[
          {
            q: { es: '¿Qué hace un servicio de contestación dental?', en: 'What does a dental answering service do?' },
            a: {
              es: 'Contesta a los pacientes cuando tu recepción está ocupada o cerrada. Un servicio tradicional toma un recado. Sofía, de VozClinic, responde la pregunta, revisa tu agenda y confirma la cita, en español e inglés, las 24 horas.',
              en: 'It answers patients when your front desk is busy or closed. A traditional service takes a message. VozClinic’s Sofía answers the question, checks your calendar, and confirms the appointment, in English and Spanish, 24/7.',
            },
          },
          {
            q: { es: '¿Puede agendar directo en Open Dental?', en: 'Can it book directly into Open Dental?' },
            a: {
              es: 'Sí. En el plan Profesional y superiores se integra con Open Dental o con cualquier sistema que tenga una API disponible. En Esencial te damos un dashboard para ver todo; la mayoría de las clínicas empieza sin integración y la agrega después.',
              en: 'Yes. On Professional and above it integrates with Open Dental or any practice management system that has an available API. On Essential you get a dashboard to see everything; most clinics start without the integration and add it later.',
            },
          },
          {
            q: { es: '¿Qué pasa con una urgencia dental fuera de horario?', en: 'What happens with a dental emergency after hours?' },
            a: {
              es: 'Sofía escala emergencias, quejas y casos complejos a la línea de escalación que designa tu clínica, en segundos. Nunca inventa precios, diagnósticos ni promesas médicas.',
              en: 'Sofía escalates emergencies, complaints, and complex cases to the escalation line your clinic designates, in seconds. She never invents prices, diagnoses, or medical promises.',
            },
          },
          {
            q: { es: '¿Cuánto cuesta un servicio de contestación dental con IA?', en: 'How much does an AI dental answering service cost?' },
            a: pricingAnswer,
          },
          fitFaq,
        ]}
      />
      <ChannelsRibbon />
      <MoreFeatures currentId="lp-dental-answering" />
      <FeatureCTA
        title={{ es: 'Deja de mandar pacientes al buzón', en: 'Stop sending patients to voicemail' }}
      />
    </FeaturePageShell>
  );
}
