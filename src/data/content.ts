import type { Bilingual } from '../types/lang';

// ──────────────────────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────────────────────
export const nav = {
  cta: { es: 'Agenda una demo →', en: 'Book a demo →' } as Bilingual,
};

// ──────────────────────────────────────────────────────────────
// Section 1 — Hero
// ──────────────────────────────────────────────────────────────
export const hero = {
  h1: {
    es: 'El cuidado comienza cuando alguien responde.',
    en: 'Care begins when someone answers.',
  } as Bilingual,
  sub: {
    es: 'La primera experiencia de un paciente con tu clínica no sucede en la sala de espera. Sucede cuando llama o escribe por WhatsApp. Sofía responde en español e inglés, agenda la cita y reactiva a tus pacientes, incluso fuera del horario de atención.',
    en: "A patient's first experience with your clinic doesn't happen in the waiting room. It happens when they call or message on WhatsApp. Sofía answers in Spanish and English, books the appointment, and brings patients back, even after hours.",
  } as Bilingual,
  primaryCta: {
    es: 'Agenda una demo',
    en: 'Book a demo',
  } as Bilingual,
  secondaryCta: {
    es: 'Conoce a Sofía en 2 minutos',
    en: 'Meet Sofía in 2 minutes',
  } as Bilingual,
  trust: {
    es: 'HECHO EN TIJUANA · WHATSAPP BUSINESS API OFICIAL · CUMPLE LFPDPPP',
    en: 'MADE IN TIJUANA · OFFICIAL WHATSAPP BUSINESS API · LFPDPPP COMPLIANT',
  } as Bilingual,
};

// ──────────────────────────────────────────────────────────────
// Section 2 — Pain Points
// ──────────────────────────────────────────────────────────────
export const pain = {
  title: {
    es: 'Tu clínica está perdiendo pacientes, no solo llamadas.',
    en: 'Your clinic is losing patients, not just calls.',
  } as Bilingual,
  cards: [
    {
      title: { es: 'El 70% de tu mercado viene de Estados Unidos', en: '70% of your market comes from the United States' } as Bilingual,
      body: {
        es: 'Más del 70% de los pacientes de turismo médico en México provienen de Estados Unidos, según Baja Health Cluster. Si tu clínica atiende pacientes transfronterizos, ese flujo es tu negocio principal.',
        en: 'Over 70% of medical tourists in Mexico originate from the United States, according to Baja Health Cluster. If your clinic serves cross-border patients, that flow is your primary business.',
      } as Bilingual,
    },
    {
      title: { es: 'Mensajes sin contestar después de hora', en: 'Unanswered messages after hours' } as Bilingual,
      body: {
        es: 'Mensajes de WhatsApp sin contestar a las 11pm. Pacientes de San Diego, Los Ángeles y Phoenix preguntando por precios, preparación pre-quirúrgica y disponibilidad. Cuando nadie responde, contactan a la siguiente clínica de su lista.',
        en: 'Unanswered WhatsApp messages at 11pm. Patients from San Diego, Los Angeles, and Phoenix asking about pricing, pre-op instructions, and availability. When no one responds, they contact the next clinic on their list.',
      } as Bilingual,
    },
    {
      title: { es: 'Llamadas en inglés que no puedes atender', en: 'English calls you can\'t handle' } as Bilingual,
      body: {
        es: 'Llamadas en inglés que tu recepcionista no puede atender. Tu equipo está agotado contestando las mismas preguntas en dos idiomas, 50 veces al día. Y tú estás pagando por leads que se pierden.',
        en: 'English-language calls your receptionist can\'t handle. Your team is burned out answering the same questions in two languages, 50 times a day. And you\'re paying for leads that are slipping away.',
      } as Bilingual,
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Trust band — credibility strip (below demo, above pricing)
// ──────────────────────────────────────────────────────────────
export const trustBand = {
  items: [
    { es: 'Fundada y operada en Tijuana', en: 'Founded and operated in Tijuana' } as Bilingual,
    { es: 'WhatsApp Business API oficial', en: 'Official WhatsApp Business API' } as Bilingual,
    { es: 'Cumplimiento con LFPDPPP', en: 'LFPDPPP compliant' } as Bilingual,
    { es: 'Logs auditables', en: 'Audit-ready logs' } as Bilingual,
    { es: 'Onboarding en menos de 48 horas', en: 'Onboarding in under 48 hours' } as Bilingual,
  ],
};

// ──────────────────────────────────────────────────────────────
// Section 3 — How Sofía Works
// ──────────────────────────────────────────────────────────────
export const howItWorks = {
  title: { es: 'Cómo funciona Sofía', en: 'How Sofía works' } as Bilingual,
  steps: [
    {
      num: '01',
      title: { es: 'Conecta tu WhatsApp en 48 horas', en: 'Connect your WhatsApp in 48 hours' } as Bilingual,
      body: {
        es: 'Usamos tu número de clínica con el WhatsApp Business API oficial de Meta. Sin cambios para tus pacientes: el mismo número, el mismo nombre, mejor servicio.',
        en: 'We use your clinic\'s number on Meta\'s official WhatsApp Business API. No change for your patients: same number, same name, better service.',
      } as Bilingual,
    },
    {
      num: '02',
      title: { es: 'Aprende tu clínica en una sesión de 90 minutos', en: 'Learns your clinic in one 90-minute session' } as Bilingual,
      body: {
        es: 'Te entrevistamos sobre precios, servicios, doctores, horarios y preguntas frecuentes. Sofía contesta con la voz de tu clínica: tus palabras, tus precios, tus reglas.',
        en: "We interview you about pricing, services, doctors, hours, and FAQs. Sofía answers in your clinic's voice: your words, your prices, your rules.",
      } as Bilingual,
    },
    {
      num: '03',
      title: { es: 'Trabaja 24/7 y te entrega lo importante', en: 'Works 24/7 and hands you what matters' } as Bilingual,
      body: {
        es: 'Contesta preguntas, agenda citas, envía recordatorios, recolecta datos del paciente. Cuando alguien quiere hablar con un humano o pregunta algo fuera del libreto, escala a tu equipo en segundos.',
        en: 'Answers questions, books appointments, sends reminders, collects patient info. When someone wants a human or asks something off-script, it escalates to your team in seconds.',
      } as Bilingual,
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Section 4 — Features
// ──────────────────────────────────────────────────────────────
export const features = {
  title: { es: 'Lo que Sofía hace por tu clínica', en: 'What Sofía does for your clinic' } as Bilingual,
  tiles: [
    {
      icon: 'chat',
      title: { es: 'Responde 24/7 en español e inglés', en: 'Replies 24/7 in Spanish and English' } as Bilingual,
      body: { es: 'Sin esperar a la mañana. Respuesta en segundos, a cualquier hora.', en: 'No waiting until morning. Response in seconds, any time of day.' } as Bilingual,
      wide: true,
    },
    {
      icon: 'calendar',
      title: { es: 'Agenda citas directamente en tu calendario', en: 'Books appointments in your calendar' } as Bilingual,
      body: { es: 'Integra con Google Calendar, Outlook y Open Dental.', en: 'Integrates with Google Calendar, Outlook and Open Dental.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'bell',
      title: { es: 'Envía recordatorios automáticos', en: 'Sends automatic reminders' } as Bilingual,
      body: { es: '24h y 2h antes de cada cita. Reduce no-shows hasta 40%.', en: '24h and 2h before each appointment. Cuts no-shows by up to 40%.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'globe',
      title: { es: 'Atiende pacientes de Estados Unidos', en: 'Handles patients from the United States' } as Bilingual,
      body: { es: 'Instrucciones para cruzar la frontera, en inglés, incluidas automáticamente.', en: 'Border-crossing instructions in English, included automatically.' } as Bilingual,
      wide: true,
    },
    {
      icon: 'badge',
      title: { es: 'Verifica seguros antes de la cita', en: 'Verifies insurance before the visit' } as Bilingual,
      body: { es: 'Confirma cobertura y elegibilidad con el paciente antes de que llegue, para que no haya sorpresas ni citas que se caen.', en: 'Confirms coverage and eligibility with the patient before they arrive, so there are no surprises or cancelled visits.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'refresh',
      title: { es: 'Reactiva a tus pacientes inactivos', en: 'Reactivates your inactive patients' } as Bilingual,
      body: { es: 'Contacta a tu lista para exámenes anuales y seguimientos, y vuelve a llenar tu agenda con pacientes que ya confían en ti.', en: 'Reaches out to your list for annual exams and follow-ups, refilling your calendar with patients who already trust you.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'shield',
      title: { es: 'Escala solo cuando importa', en: 'Escalates only when it matters' } as Bilingual,
      body: { es: 'Emergencias, quejas y casos complejos van directo a tu equipo.', en: 'Emergencies, complaints, and complex cases go straight to your team.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'chart',
      title: { es: 'Reporte semanal por WhatsApp', en: 'Weekly WhatsApp report' } as Bilingual,
      body: { es: 'Citas agendadas, mensajes gestionados e ingresos potenciales, cada lunes.', en: 'Appointments booked, messages handled, and potential revenue, every Monday.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'megaphone',
      title: { es: 'Lanza promociones y campañas', en: 'Runs promotions and campaigns' } as Bilingual,
      body: { es: 'Envía ofertas y mensajes de seguimiento por WhatsApp a los pacientes correctos, en el momento correcto.', en: 'Sends offers and follow-up messages over WhatsApp to the right patients, at the right time.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'phone',
      title: { es: 'También contesta llamadas telefónicas', en: 'Also takes phone calls' } as Bilingual,
      body: {
        es: 'Voz IA en español e inglés para pacientes que prefieren llamar. Toma datos, agenda citas y escala a tu equipo igual que en WhatsApp.',
        en: 'AI voice in Spanish and English for patients who\'d rather call. Collects info, books appointments, and escalates to your team the same way WhatsApp does.',
      } as Bilingual,
      wide: true,
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Section 5 — Demo
// ──────────────────────────────────────────────────────────────
export const demo = {
  title: { es: 'Mira a Sofía en acción', en: 'See Sofía in action' } as Bilingual,
  body: {
    es: 'Un recorrido de menos de dos minutos: el cambio de idioma a media conversación, precios al instante, un horario ya ocupado que Sofía corrige sola, y dos citas resueltas en una sola visita. Momentos reales de WhatsApp.',
    en: 'An under-two-minute tour: the mid-conversation language switch, instant pricing, an already-booked time Sofía catches on her own, and two appointments handled in a single visit. Real WhatsApp moments.',
  } as Bilingual,
  cta: { es: 'Ver el recorrido →', en: 'Watch the tour →' } as Bilingual,
};

// ──────────────────────────────────────────────────────────────
// Section 7 — Pricing
// ──────────────────────────────────────────────────────────────
export const pricing = {
  title: { es: 'Precios mensuales', en: 'Monthly pricing' } as Bilingual,
  subtitle: {
    es: 'Precios más IVA, sin contratos a largo plazo. Cambia de plan cuando tu volumen cambie.',
    en: 'Prices plus VAT, no long-term contracts. Change plans when your volume changes.',
  } as Bilingual,
  plans: [
    {
      name: 'Esencial',
      usd: '$299',
      mxn: '$5,980 MXN',
      desc: { es: '1 doctor, 1 ubicación, hasta 600 conversaciones/mes', en: '1 doctor, 1 location, up to 600 conversations/mo' } as Bilingual,
      highlight: false,
    },
    {
      name: 'Profesional',
      usd: '$599',
      mxn: '$11,980 MXN',
      desc: { es: '2–4 doctores, 1 ubicación, hasta 1,500 conversaciones/mes', en: '2–4 doctors, 1 location, up to 1,500 conversations/mo' } as Bilingual,
      highlight: true,
    },
    {
      name: 'Pro Claims',
      usd: '$1,499',
      mxn: '$29,980 MXN',
      desc: { es: 'Multi-doctor con seguros y reclamaciones automáticas', en: 'Multi-doctor with insurance and automatic claims' } as Bilingual,
      highlight: false,
    },
    {
      name: 'White-label',
      usd: '$4,999',
      mxn: '$99,980 MXN',
      desc: { es: 'Tu agencia o grupo de clínicas, marca propia', en: 'Your agency or clinic group, your brand' } as Bilingual,
      highlight: false,
    },
  ],
  addons: {
    es: 'Las promociones, la verificación de seguros y la reactivación de listas son complementos opcionales, disponibles en cualquier plan.',
    en: 'Promotions, insurance verification, and list reactivation are optional add-ons, available on any plan.',
  } as Bilingual,
  footer: {
    es: 'Los precios no incluyen IVA. Se agrega el 16% de IVA al facturar, cuando aplica. Cobramos en USD; el monto en pesos es aproximado y varía según el tipo de cambio del día. Emitimos CFDI con tus datos fiscales. Sin contratos a largo plazo, cancela cuando quieras. Incluye WhatsApp Business API oficial y soporte en español.',
    en: 'Prices do not include VAT. Mexican VAT of 16% is added at invoicing where it applies. We bill in USD; the peso amount is approximate and moves with the daily exchange rate. CFDI invoicing available on request. No long-term contracts, cancel anytime. Includes official WhatsApp Business API and Spanish-language support.',
  } as Bilingual,
};

// ──────────────────────────────────────────────────────────────
// Section 8 — FAQ
// ──────────────────────────────────────────────────────────────
export const faq = {
  title: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' } as Bilingual,
  items: [
    {
      q: { es: '¿Necesito cambiar mi número de WhatsApp?', en: 'Do I need to change my WhatsApp number?' } as Bilingual,
      a: {
        es: 'No. Usamos tu número actual con el WhatsApp Business API oficial. Tus pacientes no notan nada, solo que ahora siempre les contestan rápido.',
        en: 'No. We use your current number on the official WhatsApp Business API. Your patients notice nothing, except that they\'re always answered quickly now.',
      } as Bilingual,
    },
    {
      q: { es: '¿Qué pasa si Sofía no sabe la respuesta?', en: 'What if Sofía doesn\'t know the answer?' } as Bilingual,
      a: {
        es: 'Escala automáticamente a tu equipo por WhatsApp interno o por el dashboard. Sofía nunca inventa precios, diagnósticos, ni promesas médicas.',
        en: 'It automatically escalates to your team via internal WhatsApp or the dashboard. Sofía never invents prices, diagnoses, or medical promises.',
      } as Bilingual,
    },
    {
      q: { es: '¿Habla inglés de verdad o es traducción de Google?', en: 'Does it really speak English or is it Google Translate?' } as Bilingual,
      a: {
        es: 'Habla inglés natural. Probada con pacientes reales de San Diego, Los Ángeles, y Phoenix. Si quieres, te mandamos transcripciones reales.',
        en: 'It speaks natural English. Tested with real patients from San Diego, LA, and Phoenix. If you want, we\'ll send you real transcripts.',
      } as Bilingual,
    },
    {
      q: { es: '¿Qué tan rápido se instala?', en: 'How quickly does it install?' } as Bilingual,
      a: {
        es: '48 horas desde que firmas el acuerdo. La sesión de entrenamiento de 90 minutos sucede en los primeros 5 días. Producción completa: día 7.',
        en: '48 hours from signing. The 90-minute training session happens in the first 5 days. Full production: day 7.',
      } as Bilingual,
    },
    {
      q: { es: '¿Cumple con la ley mexicana de protección de datos?', en: 'Does it comply with Mexican data protection law?' } as Bilingual,
      a: {
        es: 'Sí. Cumplimos con la LFPDPPP, la ley mexicana de protección de datos: consentimiento del paciente capturado en la conversación, Aviso de Privacidad publicado, registros auditables, y nunca compartimos datos con terceros.',
        en: "Yes. We comply with the LFPDPPP, Mexico's data protection law: patient consent captured in the conversation, a published Aviso de Privacidad, auditable logs, and we never share data with third parties.",
      } as Bilingual,
    },
    {
      q: { es: '¿Qué pasa si quiero cancelar?', en: 'What if I want to cancel?' } as Bilingual,
      a: {
        es: 'Cancela cuando quieras. Te exportamos tus conversaciones y datos en CSV. Sin penalización, sin papeleo. Es tu número y tus pacientes, siempre.',
        en: 'Cancel anytime. We export your conversations and data in CSV. No penalty, no paperwork. It\'s your number and your patients, always.',
      } as Bilingual,
    },
    {
      q: { es: '¿Pueden integrarse con mi sistema (Open Dental, Eaglesoft, etc.)?', en: 'Can it integrate with my system (Open Dental, Eaglesoft, etc.)?' } as Bilingual,
      a: {
        es: 'En el plan Profesional y arriba, sí. En Esencial, te damos un dashboard para ver todo. La mayoría de las clínicas empiezan sin integración y la agregan después.',
        en: 'On Professional and above, yes. On Essential, we give you a dashboard to see everything. Most clinics start without integration and add it later.',
      } as Bilingual,
    },
    {
      q: { es: '¿Puedo ganar comisión por recomendar VozClinic?', en: 'Can I earn commission for referring VozClinic?' } as Bilingual,
      a: {
        es: 'Sí. El programa de afiliados paga 20% de la suscripción de cada clínica que llegue por tu enlace, cada mes, mientras esa clínica siga activa. Está abierto a cualquiera, no solo a clínicas. Los detalles están en la página del programa de afiliados.',
        en: 'Yes. The affiliate program pays 20% of the subscription of every clinic that arrives through your link, every month, for as long as that clinic stays active. It is open to anyone, not just clinics. The details are on the affiliate program page.',
      } as Bilingual,
      href: { es: '/afiliados/', en: '/affiliates/' } as Bilingual,
      linkLabel: { es: 'Ver el programa de afiliados →', en: 'See the affiliate program →' } as Bilingual,
    },
    {
      q: { es: '¿Cómo empiezo?', en: 'How do I get started?' } as Bilingual,
      a: {
        es: 'Agenda una demo de 20 minutos. Te enseño a Sofía trabajando con los casos reales de tu clínica, revisamos qué plan te queda y, si te convence, arrancamos el onboarding esa misma semana.',
        en: "Book a 20-minute demo. I'll show you Sofía working through your clinic's real cases, we'll figure out which plan fits, and if it convinces you we start onboarding that same week.",
      } as Bilingual,
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Section 9 — Founder Note
// ──────────────────────────────────────────────────────────────
export const founder = {
  greeting: { es: 'Hola, soy Lainie.', en: 'Hi, I\'m Lainie.' } as Bilingual,
  body: {
    es: 'Vivo en Tijuana. Construí VozClinic porque mi propia dentista perdía citas todas las semanas: pacientes que escribían a las 9pm y nadie contestaba hasta el día siguiente.\n\nSoy una persona, en tu ciudad, que sabe cómo trabajan las clínicas de aquí. Si me escribes, te contesto yo.',
    en: "I live in Tijuana. I built VozClinic because my own dentist was losing appointments every week: patients who messaged at 9pm and got no reply until the next day.\n\nI'm one person, in your city, who understands how clinics here actually work. If you message me, I reply.",
  } as Bilingual,
  credentials: [
    'PMP',
    'Six Sigma Black Belt',
    'CSM',
    { es: '20+ años PM empresarial', en: '20+ yrs enterprise PM' } as Bilingual,
  ],
  highlight: {
    es: 'Si decides trabajar conmigo, te dedico el tiempo que sea necesario para que esto funcione para tu clínica.',
    en: "If you decide to work with me, I'll spend whatever time it takes to make this work for your clinic.",
  } as Bilingual,
  signature: '— Lainie Mayfield, fundadora / founder',
  cta: { es: 'Escríbeme a WhatsApp →', en: 'Message me on WhatsApp →' } as Bilingual,
  photoAlt: 'Lainie Mayfield, fundadora de VozClinic',
};

// ──────────────────────────────────────────────────────────────
// Section 10 — Final CTA
// ──────────────────────────────────────────────────────────────
export const finalCta = {
  title: { es: 'Cada paciente merece una respuesta.', en: 'Every patient deserves an answer.' } as Bilingual,
  sub: {
    es: 'Agenda una llamada de 20 minutos. Te enseño a Sofía contestando los casos reales de tu clínica, en español e inglés, y decides desde ahí.',
    en: "Book a 20-minute call. I'll show you Sofía handling your clinic's real cases, in Spanish and English, and you decide from there.",
  } as Bilingual,
  ctaDemo: { es: 'Agenda una llamada de demo', en: 'Book a demo call' } as Bilingual,
  ctaWhatsapp: { es: 'Escríbeme por WhatsApp', en: 'Message me on WhatsApp' } as Bilingual,
};

// ──────────────────────────────────────────────────────────────
// Section 11 — Footer
// ──────────────────────────────────────────────────────────────
export const footerData = {
  tagline: { es: 'Hecho con ☕ en Tijuana.', en: 'Made with ☕ in Tijuana.' } as Bilingual,
  product: {
    label: { es: 'Producto', en: 'Product' } as Bilingual,
    links: [
      { label: { es: 'Cómo funciona', en: 'How it works' } as Bilingual, href: '/#como-funciona' },
      { label: { es: 'Precios', en: 'Pricing' } as Bilingual, href: '/#precios' },
      { label: { es: 'Demo', en: 'Demo' } as Bilingual, href: '/#sofia' },
      { label: { es: 'FAQ', en: 'FAQ' } as Bilingual, href: '/#faq' },
    ],
  },
  legal: {
    label: { es: 'Legal', en: 'Legal' } as Bilingual,
    links: [
      { label: { es: 'Aviso de privacidad', en: 'Privacy notice' } as Bilingual, href: { es: '/aviso-de-privacidad/', en: '/privacy/' } as Bilingual },
      { label: { es: 'Términos', en: 'Terms' } as Bilingual, href: { es: '/terminos/', en: '/terms/' } as Bilingual },
      { label: { es: 'LFPDPPP', en: 'LFPDPPP' } as Bilingual, href: '/aviso-de-privacidad/' },
    ],
  },
  company: {
    label: { es: 'Empresa', en: 'Company' } as Bilingual,
    links: [
      { label: { es: 'Sobre nosotros', en: 'About us' } as Bilingual, href: '#' },
      { label: { es: 'Blog', en: 'Blog' } as Bilingual, href: '/blog/' },
      { label: { es: 'Contacto', en: 'Contact' } as Bilingual, href: '#' },
    ],
  },
};
