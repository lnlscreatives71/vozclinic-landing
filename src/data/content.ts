import type { Bilingual } from '../types/lang';

// ──────────────────────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────────────────────
export const nav = {
  cta: { es: 'Únete a la lista →', en: 'Join the waitlist →' } as Bilingual,
};

// ──────────────────────────────────────────────────────────────
// Section 1 — Hero
// ──────────────────────────────────────────────────────────────
export const hero = {
  h1: {
    es: 'La recepcionista de WhatsApp y llamadas que nunca duerme y habla inglés perfecto.',
    en: 'The WhatsApp and call front desk that never sleeps and speaks perfect English.',
  } as Bilingual,
  sub: {
    es: 'Sofía contesta a tus pacientes en menos de 2 minutos, recupera consultas perdidas y atiende sin error en inglés, las 24 horas.',
    en: 'Sofía answers your patients in under 2 minutes, recovers lost inquiries, and handles English flawlessly, 24 hours a day.',
  } as Bilingual,
  primaryCta: {
    es: 'Aplica como socia de diseño',
    en: 'Apply as a design partner',
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
      title: { es: 'El 70% de tu mercado viene de EE.UU.', en: '70% of your market comes from the US' } as Bilingual,
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
      title: { es: 'Conecta su WhatsApp en 48 horas', en: 'Connect your WhatsApp in 48 hours' } as Bilingual,
      body: {
        es: 'Usamos su número de clínica con el WhatsApp Business API oficial de Meta. Sin cambios para sus pacientes: el mismo número, el mismo nombre, mejor servicio.',
        en: 'We use your clinic\'s number on Meta\'s official WhatsApp Business API. No change for your patients: same number, same name, better service.',
      } as Bilingual,
    },
    {
      num: '02',
      title: { es: 'Aprende su clínica en una sesión de 90 minutos', en: 'Learns your clinic in one 90-minute session' } as Bilingual,
      body: {
        es: 'Le entrevistamos sobre precios, servicios, doctores, horarios, preguntas frecuentes. Sofía habla con la voz de su clínica, no como un robot genérico.',
        en: 'We interview you about pricing, services, doctors, hours, FAQs. Sofía speaks in your clinic\'s voice, not like a generic robot.',
      } as Bilingual,
    },
    {
      num: '03',
      title: { es: 'Trabaja 24/7 y le entrega lo importante', en: 'Works 24/7 and hands you what matters' } as Bilingual,
      body: {
        es: 'Contesta preguntas, agenda citas, envía recordatorios, recolecta datos del paciente. Cuando alguien quiere hablar con un humano o pregunta algo fuera del libreto, escala a su equipo en segundos.',
        en: 'Answers questions, books appointments, sends reminders, collects patient info. When someone wants a human or asks something off-script, it escalates to your team in seconds.',
      } as Bilingual,
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Section 4 — Features
// ──────────────────────────────────────────────────────────────
export const features = {
  title: { es: 'Lo que Sofía hace por su clínica', en: 'What Sofía does for your clinic' } as Bilingual,
  tiles: [
    {
      icon: 'chat',
      title: { es: 'Responde 24/7 en español e inglés', en: 'Replies 24/7 in Spanish and English' } as Bilingual,
      body: { es: 'Sin esperar a la mañana. Respuesta en segundos, a cualquier hora.', en: 'No waiting until morning. Response in seconds, any time of day.' } as Bilingual,
      wide: true,
    },
    {
      icon: 'calendar',
      title: { es: 'Agenda citas directamente en su calendario', en: 'Books appointments in your calendar' } as Bilingual,
      body: { es: 'Integra con Google Calendar, Outlook y Dentrix.', en: 'Integrates with Google Calendar, Outlook and Dentrix.' } as Bilingual,
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
      title: { es: 'Atiende pacientes de EE.UU.', en: 'Handles US patients' } as Bilingual,
      body: { es: 'Instrucciones para cruzar la frontera, en inglés, incluidas automáticamente.', en: 'Border-crossing instructions in English, included automatically.' } as Bilingual,
      wide: true,
    },
    {
      icon: 'shield',
      title: { es: 'Escala solo cuando importa', en: 'Escalates only when it matters' } as Bilingual,
      body: { es: 'Emergencias, quejas y casos complejos van directo a su equipo.', en: 'Emergencies, complaints, and complex cases go straight to your team.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'chart',
      title: { es: 'Reporte semanal por WhatsApp', en: 'Weekly WhatsApp report' } as Bilingual,
      body: { es: 'Citas agendadas, mensajes gestionados e ingresos potenciales, cada lunes.', en: 'Appointments booked, messages handled, and potential revenue, every Monday.' } as Bilingual,
      wide: false,
    },
    {
      icon: 'phone',
      title: { es: 'También contesta llamadas telefónicas', en: 'Also takes phone calls' } as Bilingual,
      body: {
        es: 'Voz IA en español e inglés para pacientes que prefieren llamar. Toma datos, agenda citas y escala a su equipo igual que en WhatsApp.',
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
  title: { es: 'Vea a Sofía en acción', en: 'See Sofía in action' } as Bilingual,
  body: {
    es: 'Un recorrido de menos de dos minutos: el cambio de idioma a media conversación, precios al instante, un horario ya ocupado que Sofía corrige sola, y dos citas resueltas en una sola visita. Momentos reales de WhatsApp.',
    en: 'An under-two-minute tour: the mid-conversation language switch, instant pricing, an already-booked time Sofía catches on her own, and two appointments handled in a single visit. Real WhatsApp moments.',
  } as Bilingual,
  cta: { es: 'Ver el recorrido →', en: 'Watch the tour →' } as Bilingual,
};

// ──────────────────────────────────────────────────────────────
// Section 6 — Design Partner
// ──────────────────────────────────────────────────────────────
export const designPartner = {
  title: { es: 'Buscamos 3 clínicas socias en Baja California.', en: 'We\'re looking for 3 partner clinics in Baja California.' } as Bilingual,
  intro: {
    es: 'Estamos lanzando VozClinic con un grupo pequeño de clínicas que nos ayuden a perfeccionar el producto. A cambio:',
    en: 'We\'re launching VozClinic with a small group of clinics who help us perfect the product. In exchange:',
  } as Bilingual,
  benefits: [
    { es: '90 días gratis, sin compromiso, sin tarjeta', en: '90 days free, no commitment, no card' } as Bilingual,
    { es: '50% de descuento de por vida después de los 90 días', en: '50% off for life after the 90 days' } as Bilingual,
    { es: 'Setup gratis (valor $1,500 USD)', en: 'Free setup ($1,500 USD value)' } as Bilingual,
    { es: 'Acceso directo a la fundadora, sin tickets, sin call center', en: 'Direct access to the founder, no tickets, no call center' } as Bilingual,
  ],
  urgency: { es: 'Solo 3 lugares.', en: 'Only 3 spots.' } as Bilingual,
  urgencyBody: {
    es: 'Aplicaciones cierran el 15 de junio. Las socias de diseño arrancan antes del 1 de julio.',
    en: 'Applications close June 15. Design partners go live before July 1.',
  } as Bilingual,
  cta: { es: 'Solicitar uno de los 3 lugares →', en: 'Apply for one of the 3 spots →' } as Bilingual,
};

// ──────────────────────────────────────────────────────────────
// Section 7 — Pricing
// ──────────────────────────────────────────────────────────────
export const pricing = {
  title: { es: 'Precios después de los 90 días', en: 'Pricing after the 90 days' } as Bilingual,
  subtitle: {
    es: 'Para socias de diseño: 50% de todos estos precios, de por vida.',
    en: 'For design partners: 50% off all prices, for life.',
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
      desc: { es: 'Su agencia o grupo de clínicas, marca propia', en: 'Your agency or clinic group, your brand' } as Bilingual,
      highlight: false,
    },
  ],
  footer: {
    es: 'Sin contratos a largo plazo. Cancele cuando quiera. Precios incluyen WhatsApp Business API oficial y soporte en español.',
    en: 'No long-term contracts. Cancel anytime. Prices include official WhatsApp Business API and Spanish-language support.',
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
        es: 'No. Usamos su número actual con el WhatsApp Business API oficial. Sus pacientes no notan nada, solo que ahora siempre les contestan rápido.',
        en: 'No. We use your current number on the official WhatsApp Business API. Your patients notice nothing, except that they\'re always answered quickly now.',
      } as Bilingual,
    },
    {
      q: { es: '¿Qué pasa si Sofía no sabe la respuesta?', en: 'What if Sofía doesn\'t know the answer?' } as Bilingual,
      a: {
        es: 'Escala automáticamente a su equipo por WhatsApp interno o por el dashboard. Sofía nunca inventa precios, diagnósticos, ni promesas médicas.',
        en: 'It automatically escalates to your team via internal WhatsApp or the dashboard. Sofía never invents prices, diagnoses, or medical promises.',
      } as Bilingual,
    },
    {
      q: { es: '¿Habla inglés de verdad o es traducción de Google?', en: 'Does it really speak English or is it Google Translate?' } as Bilingual,
      a: {
        es: 'Habla inglés natural. Probada con pacientes reales de San Diego, Los Ángeles, y Phoenix. Si quiere, le mandamos transcripciones reales.',
        en: 'It speaks natural English. Tested with real patients from San Diego, LA, and Phoenix. If you want, we\'ll send you real transcripts.',
      } as Bilingual,
    },
    {
      q: { es: '¿Qué tan rápido se instala?', en: 'How quickly does it install?' } as Bilingual,
      a: {
        es: '48 horas desde que firma el acuerdo. La sesión de entrenamiento de 90 minutos sucede en los primeros 5 días. Producción completa: día 7.',
        en: '48 hours from signing. The 90-minute training session happens in the first 5 days. Full production: day 7.',
      } as Bilingual,
    },
    {
      q: { es: '¿Cumple con la ley mexicana de protección de datos?', en: 'Does it comply with Mexican data protection law?' } as Bilingual,
      a: {
        es: 'Sí. Cumplimos con la LFPDPPP. Los datos del paciente se guardan en servidores en México (o EE.UU. si lo prefiere) y nunca se comparten con terceros.',
        en: 'Yes. We comply with LFPDPPP. Patient data is stored on servers in Mexico (or the US if you prefer) and never shared with third parties.',
      } as Bilingual,
    },
    {
      q: { es: '¿Qué pasa si quiero cancelar?', en: 'What if I want to cancel?' } as Bilingual,
      a: {
        es: 'Cancela cuando quiera. Le exportamos sus conversaciones y datos en CSV. Sin penalización, sin papeleo. Es su número y sus pacientes, siempre.',
        en: 'Cancel anytime. We export your conversations and data in CSV. No penalty, no paperwork. It\'s your number and your patients, always.',
      } as Bilingual,
    },
    {
      q: { es: '¿Pueden integrarse con mi sistema (Dentrix, Eaglesoft, etc.)?', en: 'Can it integrate with my system (Dentrix, Eaglesoft, etc.)?' } as Bilingual,
      a: {
        es: 'En el plan Profesional y arriba, sí. En Esencial, le damos un dashboard para ver todo. La mayoría de clínicas socias empiezan sin integración y agregan después.',
        en: 'On Professional and above, yes. On Essential, we give you a dashboard to see everything. Most partner clinics start without integration and add it later.',
      } as Bilingual,
    },
    {
      q: { es: '¿Por qué solo 3 socias?', en: 'Why only 3 partners?' } as Bilingual,
      a: {
        es: 'Porque damos acceso directo a la fundadora y construimos el producto con cada una. Más de 3 y se rompe la calidad. Aplicaciones cierran el 15 de junio.',
        en: 'Because we give direct founder access and build the product with each one. More than 3 and quality breaks. Applications close June 15.',
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
    es: 'Vivo en Tijuana. Construí VozClinic porque mi propia dentista perdía citas todas las semanas: pacientes que escribían a las 9pm y nadie contestaba hasta el día siguiente.\n\nNo soy una empresa de software con call center en India. Soy una persona, en su ciudad, que sabe cómo trabajan las clínicas de aquí. Si me escribe usted, le contesto yo.',
    en: 'I live in Tijuana. I built VozClinic because my own dentist was losing appointments every week: patients who messaged at 9pm and got no reply until the next day.\n\nI\'m not a software company with a call center in India. I\'m one person, in your city, who understands how clinics here actually work. If you message me, I reply.',
  } as Bilingual,
  credentials: [
    'PMP',
    'Six Sigma Black Belt',
    'CSM',
    { es: '20+ años PM empresarial', en: '20+ yrs enterprise PM' } as Bilingual,
  ],
  highlight: {
    es: 'Si está pensando en ser una de las 3 socias de diseño, le dedico el tiempo que sea necesario para que esto funcione para su clínica.',
    en: 'If you\'re considering being one of the 3 design partners, I\'ll spend whatever time it takes to make this work for your clinic.',
  } as Bilingual,
  signature: '— Lainie Mayfield, fundadora / founder',
  cta: { es: 'Escríbame a WhatsApp →', en: 'Message me on WhatsApp →' } as Bilingual,
  photoAlt: 'Lainie Mayfield, fundadora de VozClinic',
};

// ──────────────────────────────────────────────────────────────
// Section 10 — Final CTA
// ──────────────────────────────────────────────────────────────
export const finalCta = {
  title: { es: '¿Lista para Sofía?', en: 'Ready for Sofía?' } as Bilingual,
  sub: {
    es: 'Si tu clínica encaja en el programa de socias de diseño (3 plazas, 90 días gratis, 50% de descuento de por vida), aplica abajo. Si prefieres esperar al lanzamiento general en septiembre 2026, únete a la lista de espera.',
    en: 'If your clinic fits the design partner program (3 spots, 90 days free, 50% off for life), apply below. If you\'d rather wait for the general launch in September 2026, join the waitlist.',
  } as Bilingual,
  ctaDp: { es: 'Aplicar como socia de diseño →', en: 'Apply as design partner →' } as Bilingual,
  ctaWaitlist: { es: 'Unirme a la lista de espera', en: 'Join the waitlist' } as Bilingual,
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
      { label: { es: 'Demo', en: 'Demo' } as Bilingual, href: '/#demo' },
      { label: { es: 'FAQ', en: 'FAQ' } as Bilingual, href: '/#faq' },
    ],
  },
  legal: {
    label: { es: 'Legal', en: 'Legal' } as Bilingual,
    links: [
      { label: { es: 'Aviso de privacidad', en: 'Privacy notice' } as Bilingual, href: '#' },
      { label: { es: 'Términos', en: 'Terms' } as Bilingual, href: '#' },
      { label: { es: 'LFPDPPP', en: 'LFPDPPP' } as Bilingual, href: '#' },
    ],
  },
  company: {
    label: { es: 'Empresa', en: 'Company' } as Bilingual,
    links: [
      { label: { es: 'Sobre nosotros', en: 'About us' } as Bilingual, href: '#' },
      { label: { es: 'Blog (próximamente)', en: 'Blog (coming soon)' } as Bilingual, href: '#' },
      { label: { es: 'Contacto', en: 'Contact' } as Bilingual, href: '#' },
    ],
  },
};
