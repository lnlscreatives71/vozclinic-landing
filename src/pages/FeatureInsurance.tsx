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

// Feature page: insurance verification & intake, the cross-border edge.
// Prerendered bilingual route (/funciones/seguros/, /en/features/insurance/).
// The >70% stat is the approved sourced claim (Baja Health Cluster), same
// phrasing as the homepage pain card in content.ts.

export default function FeatureInsurance({ initialLang = 'es' }: { initialLang?: Lang }) {
  return (
    <FeaturePageShell initialLang={initialLang}>
      <FeatureHero
        kicker={{ es: 'Seguros e intake', en: 'Insurance & intake' }}
        title={{
          es: 'El papeleo listo',
          en: 'Paperwork done',
        }}
        accent={{
          es: 'antes de que llegue el paciente',
          en: 'before the patient walks in',
        }}
        sub={{
          es: 'Sofía recopila los datos del seguro, resuelve dudas de cobertura y completa el intake por WhatsApp o por teléfono. Tu equipo recibe al paciente con todo listo, en lugar de perseguir formularios.',
          en: 'Sofía collects insurance details, clears coverage questions, and completes intake over WhatsApp or by phone. Your team greets the patient with everything ready instead of chasing forms.',
        }}
        facts={[
          { v: '>70%', l: { es: 'De turistas médicos en México vienen de EE. UU., según Baja Health Cluster', en: 'Of medical tourists in Mexico come from the US, per Baja Health Cluster' } },
          { v: 'ES + EN', l: { es: 'Dudas de cobertura en los dos idiomas', en: 'Coverage questions in both languages' } },
          { v: '24/7', l: { es: 'Responde antes, durante y después de hora', en: 'Answers before, during, and after hours' } },
          { v: '0', l: { es: 'Papeleo el día de la cita', en: 'Day-of paperwork' } },
        ]}
      />
      <CapabilitiesSection
        kicker={{ es: 'Qué hace Sofía', en: 'What Sofía does' }}
        title={{
          es: 'Del primer mensaje al expediente completo',
          en: 'From first message to complete file',
        }}
        items={[
          {
            icon: '🛡️',
            t: { es: 'Recopila los datos del seguro', en: 'Collects insurance details' },
            d: {
              es: 'Aseguradora, número de póliza y titular, capturados en la misma conversación.',
              en: 'Carrier, policy number, and holder, captured right in the conversation.',
            },
          },
          {
            icon: '❓',
            t: { es: 'Resuelve dudas de cobertura', en: 'Clears coverage questions' },
            d: {
              es: 'Explica qué acepta tu clínica y qué necesita confirmar tu equipo antes de la cita.',
              en: 'Explains what your clinic accepts and what your team needs to confirm before the visit.',
            },
          },
          {
            icon: '📋',
            t: { es: 'Completa el intake', en: 'Completes intake' },
            d: {
              es: 'Historial, alergias, medicamentos y motivo de consulta, antes de la visita.',
              en: 'History, allergies, medications, and reason for the visit, gathered ahead of time.',
            },
          },
          {
            icon: '🇺🇸',
            t: { es: 'Pacientes de Estados Unidos', en: 'Patients from the United States' },
            d: {
              es: 'Responde en inglés sobre precios, cobertura de seguros dentales y logística transfronteriza.',
              en: 'Answers in English about pricing, dental insurance coverage, and cross-border logistics.',
            },
          },
          {
            icon: '🚨',
            t: { es: 'Escala lo complejo', en: 'Escalates the complex' },
            d: {
              es: 'Los casos fuera de guion pasan a tu equipo con todo el contexto de la conversación.',
              en: 'Off-script cases go to your team with the full context of the conversation.',
            },
          },
          {
            icon: '🗂️',
            t: { es: 'Entrega un expediente ordenado', en: 'Hands over an organized file' },
            d: {
              es: 'Tu equipo recibe la información completa y organizada antes de que el paciente llegue.',
              en: 'Your team gets the complete, organized information before the patient arrives.',
            },
          },
        ]}
      />
      <StepsSection
        kicker={{ es: 'La ventaja transfronteriza', en: 'The cross-border edge' }}
        title={{
          es: 'Hecha para clínicas que atienden a Estados Unidos',
          en: 'Built for clinics that serve US patients',
        }}
        sub={{
          es: 'Más del 70% de los pacientes de turismo médico en México provienen de Estados Unidos, según Baja Health Cluster. Sus preguntas de cobertura llegan en inglés y fuera de horario.',
          en: 'Over 70% of medical tourists in Mexico originate from the United States, according to Baja Health Cluster. Their coverage questions arrive in English, and after hours.',
        }}
        steps={[
          {
            t: { es: 'El paciente pregunta', en: 'The patient asks' },
            d: {
              es: '"Do you take my insurance?" a las 9 pm desde San Diego. Sofía contesta en el momento.',
              en: '"Do you take my insurance?" at 9 pm from San Diego. Sofía answers on the spot.',
            },
          },
          {
            t: { es: 'Sofía arma el expediente', en: 'Sofía builds the file' },
            d: {
              es: 'Póliza, historial e intake completos en la conversación, en el idioma del paciente.',
              en: 'Policy, history, and intake completed in the conversation, in the patient’s language.',
            },
          },
          {
            t: { es: 'Tu equipo confirma', en: 'Your team confirms' },
            d: {
              es: 'Recibe todo organizado, confirma la cobertura y la cita queda cerrada.',
              en: 'They get everything organized, confirm coverage, and the visit is locked in.',
            },
          },
        ]}
      />
      <ChannelsRibbon />
      <MoreFeatures currentId="feature-insurance" />
      <FeatureCTA
        title={{
          es: 'Recibe pacientes, no formularios pendientes',
          en: 'Greet patients, not unfinished forms',
        }}
      />
    </FeaturePageShell>
  );
}
