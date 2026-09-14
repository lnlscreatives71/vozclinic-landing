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

// Keyword landing page: "bilingual virtual receptionist" (EN) /
// "recepcionista virtual bilingüe" (ES). Prerendered bilingual route
// (/recepcionista-virtual-bilingue/, /en/bilingual-virtual-receptionist/),
// see manifest.ts + routes.tsx.

export default function BilingualReceptionist({ initialLang = 'es' }: { initialLang?: Lang }) {
  return (
    <FeaturePageShell initialLang={initialLang}>
      <FeatureHero
        kicker={{ es: 'Recepcionista virtual bilingüe', en: 'Bilingual virtual receptionist' }}
        title={{
          es: 'La recepcionista virtual bilingüe que contesta',
          en: 'The bilingual virtual receptionist that answers',
        }}
        accent={{ es: 'en español e inglés, 24/7', en: 'in English and Spanish, 24/7' }}
        sub={{
          es: 'Sofía contesta cada llamada y mensaje de WhatsApp en el idioma de tu paciente y cambia de idioma a media conversación. Agenda la cita, envía recordatorios y le pasa a tu equipo solo lo que de verdad necesita a una persona.',
          en: 'Sofía answers every call and WhatsApp message in your patient’s language and switches languages mid-conversation. She books the appointment, sends reminders, and hands your team only what truly needs a person.',
        }}
        facts={[
          { v: '24/7', l: { es: 'Contesta siempre', en: 'Always answering' } },
          { v: 'ES + EN', l: { es: 'Cambia de idioma a media conversación', en: 'Switches languages mid-conversation' } },
          { v: '48 h', l: { es: 'Para conectar tu número', en: 'To connect your number' } },
          { v: '$299', l: { es: 'USD al mes, desde', en: 'USD a month, starting at' } },
        ]}
      />
      <CompareSection
        kicker={{ es: 'Bilingüe de verdad', en: 'Truly bilingual' }}
        title={{
          es: 'Bilingüe en cada turno, no solo cuando está quien habla inglés',
          en: 'Bilingual on every shift, not just when your English speaker is in',
        }}
        left={{
          title: { es: 'Una recepción que depende del turno', en: 'A front desk that depends on the shift' },
          points: [
            { es: 'Las llamadas en inglés esperan a la única persona bilingüe del equipo.', en: 'English calls wait for the one bilingual person on your team.' },
            { es: 'Fuera de horario, el paciente cae al buzón o a un mensaje automático.', en: 'After hours, the patient gets voicemail or an auto-reply.' },
            { es: 'Un chatbot traducido contesta con frases que suenan a traducción.', en: 'A translated chatbot replies in phrasing that reads like a translation.' },
            { es: 'Cubrir noches y fines de semana significa contratar más personal bilingüe.', en: 'Covering nights and weekends means hiring more bilingual staff.' },
          ],
        }}
        right={{
          title: { es: 'Sofía, tu recepcionista virtual bilingüe', en: 'Sofía, your bilingual virtual receptionist' },
          points: [
            { es: 'Contesta en el idioma en que el paciente escribe o habla.', en: 'Answers in the language the patient writes or speaks.' },
            { es: 'Cambia entre español e inglés a media conversación sin perder el hilo.', en: 'Switches between English and Spanish mid-conversation without losing the thread.' },
            { es: 'La misma atención a las 11 pm que a las 11 am.', en: 'The same service at 11 pm as at 11 am.' },
            { es: 'Un precio mensual, sin turnos extra que cubrir.', en: 'One monthly price, with no extra shifts to cover.' },
          ],
        }}
      />
      <CapabilitiesSection
        kicker={{ es: 'Qué hace Sofía', en: 'What Sofía does' }}
        title={{
          es: 'Todo lo que hace una buena recepción, en los dos idiomas',
          en: 'Everything a great front desk does, in both languages',
        }}
        items={[
          {
            icon: '🌐',
            t: { es: 'Detecta el idioma', en: 'Detects the language' },
            d: {
              es: 'Identifica si el paciente escribe en español o en inglés y contesta igual, por WhatsApp o por teléfono.',
              en: 'Recognizes whether the patient writes in English or Spanish and replies the same way, on WhatsApp or by phone.',
            },
          },
          {
            icon: '🗣️',
            t: { es: 'Inglés natural, no traducción', en: 'Natural English, not translation' },
            d: {
              es: 'Probada con pacientes reales de San Diego, Los Ángeles y Phoenix.',
              en: 'Tested with real patients from San Diego, Los Angeles, and Phoenix.',
            },
          },
          {
            icon: '📅',
            t: { es: 'Agenda la cita', en: 'Books the appointment' },
            d: {
              es: 'Revisa disponibilidad real y confirma la cita en la misma conversación.',
              en: 'Checks real availability and confirms the visit in the same conversation.',
            },
          },
          {
            icon: '🔔',
            t: { es: 'Recordatorios en su idioma', en: 'Reminders in the patient’s language' },
            d: {
              es: 'Cada paciente recibe sus recordatorios y seguimientos en el idioma en que te habló.',
              en: 'Each patient gets reminders and follow-ups in the language they used with you.',
            },
          },
          {
            icon: '🧭',
            t: { es: 'Indicaciones para cruzar la frontera', en: 'Border-crossing directions' },
            d: {
              es: 'Envía en inglés cómo cruzar, dónde estacionarse y qué tomar en cuenta antes de llegar.',
              en: 'Sends directions in English on how to cross, where to park, and what to plan for before arriving.',
            },
          },
          {
            icon: '🛡️',
            t: { es: 'Escala cuando importa', en: 'Escalates when it matters' },
            d: {
              es: 'Emergencias, quejas y casos complejos pasan a tu equipo en segundos.',
              en: 'Emergencies, complaints, and complex cases reach your team in seconds.',
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
          es: 'Preguntas frecuentes sobre la recepcionista virtual bilingüe',
          en: 'Bilingual virtual receptionist FAQ',
        }}
        bg="offwhite"
        items={[
          {
            q: { es: '¿Qué es una recepcionista virtual bilingüe?', en: 'What is a bilingual virtual receptionist?' },
            a: {
              es: 'Es una recepcionista con IA que contesta las llamadas y los mensajes de tus pacientes en dos idiomas. Sofía, de VozClinic, contesta en español e inglés por WhatsApp y por teléfono las 24 horas, agenda citas y le pasa a tu equipo lo que necesita a una persona.',
              en: 'It’s an AI receptionist that answers your patients’ calls and messages in two languages. VozClinic’s Sofía answers in English and Spanish on WhatsApp and by phone, 24/7, books appointments, and hands your team anything that needs a person.',
            },
          },
          {
            q: { es: '¿Habla inglés de verdad o es traducción automática?', en: 'Does it really speak English, or is it machine translation?' },
            a: {
              es: 'Habla inglés natural. Fue probada con pacientes reales de San Diego, Los Ángeles y Phoenix, y cambia de idioma a media conversación cuando el paciente lo hace.',
              en: 'It speaks natural English. It was tested with real patients from San Diego, Los Angeles, and Phoenix, and it switches languages mid-conversation when the patient does.',
            },
          },
          {
            q: { es: '¿Cuánto cuesta una recepcionista virtual bilingüe?', en: 'How much does a bilingual virtual receptionist cost?' },
            a: pricingAnswer,
          },
          {
            q: { es: '¿Tengo que cambiar el número de mi clínica?', en: 'Do I have to change my clinic’s number?' },
            a: {
              es: 'No. Sofía contesta en tu número actual con la WhatsApp Business API oficial. Tus pacientes escriben y llaman al mismo número de siempre.',
              en: 'No. Sofía answers on your existing number through the official WhatsApp Business API. Your patients message and call the same number as always.',
            },
          },
          fitFaq,
        ]}
      />
      <ChannelsRibbon />
      <MoreFeatures currentId="lp-bilingual-receptionist" />
      <FeatureCTA
        title={{ es: 'Contesta a cada paciente en su idioma', en: 'Answer every patient in their language' }}
      />
    </FeaturePageShell>
  );
}
