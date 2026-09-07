import { useLang } from '../context/LangContext';

export default function ChannelsAndAddons() {
  const { t, lang } = useLang();

  const channelsPageHref = lang === 'en' ? '/channels/' : '/canales/';

  return (
    <section className="bg-offwhite py-24 border-t border-gray-100" id="canales" aria-label="Channels and add-ons">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal text-xs font-bold tracking-widest uppercase">
            {t({ es: 'Canales y complementos', en: 'Channels and add-ons' })}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-3 leading-tight">
            {t({
              es: 'Donde tus pacientes ya escriben, ahí responde tu recepción.',
              en: "Wherever your patients already write, that's where your front desk answers.",
            })}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-4 leading-relaxed">
            {t({
              es: 'Cada clínica recibe los canales donde llega la mayoría de sus pacientes, incluidos en todos los planes. Y cuando tu operación necesita más, se agregan complementos sin cambiar de plan.',
              en: 'Every clinic gets the channels where most of its patients arrive, included in every plan. And when your operation needs more, add-ons attach without changing plans.',
            })}
          </p>
        </div>

        {/* Section: Included in every plan */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-charcoal">
              {t({ es: 'Incluido en todos los planes', en: 'Included in every plan' })}
            </h3>
            <span className="bg-teal/10 text-teal text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {t({ es: 'Base 24/7', en: '24/7 Base' })}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border-t-4 border-teal flex flex-col justify-between">
              <div>
                <span className="text-teal text-xs font-bold uppercase tracking-wider block mb-2">
                  {t({ es: 'Incluido', en: 'Included' })}
                </span>
                <h4 className="text-xl font-bold text-charcoal mb-2.5 flex items-center gap-2">
                  <span>WhatsApp</span>
                  <span className="text-sm font-normal text-gray-500">
                    {t({ es: '(Principal)', en: '(Primary)' })}
                  </span>
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t({
                    es: 'El canal donde llegan la mayoría de los mensajes de pacientes en la región. Respuestas en español e inglés, 24/7, sin costo por mensaje.',
                    en: 'The channel where most patient messages in the region arrive. Replies in Spanish and English, 24/7, with no per-message cost.',
                  })}
                </p>
              </div>
            </div>

            {/* Phone calls Card */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border-t-4 border-teal flex flex-col justify-between">
              <div>
                <span className="text-teal text-xs font-bold uppercase tracking-wider block mb-2">
                  {t({ es: 'Incluido', en: 'Included' })}
                </span>
                <h4 className="text-xl font-bold text-charcoal mb-2.5">
                  {t({ es: 'Llamadas telefónicas', en: 'Phone calls' })}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t({
                    es: 'Tu recepcionista contesta las llamadas de la clínica, agenda citas y, cuando un caso lo requiere, transfiere la llamada a la línea de escalación que tu clínica designa.',
                    en: "Your receptionist answers the clinic's calls, books appointments and, when a case requires it, transfers the call to the escalation line your clinic designates.",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Included points */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm">
            <p className="text-sm font-semibold text-charcoal mb-4">
              {t({ es: 'Además, todos los planes incluyen:', en: 'Every plan also includes:' })}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal mt-2 shrink-0" aria-hidden="true" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-charcoal font-semibold">
                    {t({ es: 'Resumen diario: ', en: 'Daily digest: ' })}
                  </strong>
                  {t({
                    es: 'cada mañana, un informe de lo que pasó en las últimas 24 horas.',
                    en: 'each morning, a summary of what happened over the last 24 hours.',
                  })}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal mt-2 shrink-0" aria-hidden="true" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-charcoal font-semibold">
                    {t({ es: 'Reporte semanal por WhatsApp: ', en: 'Weekly WhatsApp report: ' })}
                  </strong>
                  {t({
                    es: 'conversaciones, citas agendadas y casos escalados.',
                    en: 'conversations, booked appointments, and escalated cases.',
                  })}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal mt-2 shrink-0" aria-hidden="true" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-charcoal font-semibold">
                    {t({ es: 'Transferencia de casos urgentes: ', en: 'Urgent-case transfers: ' })}
                  </strong>
                  {t({
                    es: 'a la línea de escalación de tu clínica, separada de la línea del agente.',
                    en: "to your clinic's escalation line, separate from the agent's own line.",
                  })}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal mt-2 shrink-0" aria-hidden="true" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-charcoal font-semibold">
                    {t({ es: 'Integración con calendario y PMS: ', en: 'Calendar & PMS integration: ' })}
                  </strong>
                  {t({
                    es: 'trabajamos con cualquier PMS que cuente con una API disponible, como Open Dental entre otros.',
                    en: 'we work with any PMS that has an available API, Open Dental among others.',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Optional Add-ons */}
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-charcoal">
                {t({ es: 'Complementos opcionales', en: 'Optional add-ons' })}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {t({
                  es: 'Se agregan a cualquier plan, solo cuando tu clínica los necesita.',
                  en: 'They attach to any plan, only when your clinic needs them.',
                })}
              </p>
            </div>
            <a
              href={channelsPageHref}
              className="text-xs sm:text-sm font-semibold text-teal hover:text-teal-dark flex items-center gap-1 transition-colors"
            >
              {t({ es: 'Ver página de canales y complementos →', en: 'View full channels and add-ons page →' })}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-gold flex flex-col justify-between">
              <div>
                <span className="text-gold text-xs font-bold uppercase tracking-wider block mb-2">
                  {t({ es: 'Complemento', en: 'Add-on' })}
                </span>
                <h4 className="font-bold text-lg text-charcoal mb-2">
                  {t({ es: 'Widget en tu sitio web', en: 'Website widget' })}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t({
                    es: 'El mismo asistente que contesta WhatsApp y llamadas, disponible como chat en tu página para agendar sin salir del sitio.',
                    en: 'The same assistant that answers WhatsApp and calls, available as chat on your page so visitors book without leaving.',
                  })}
                </p>
              </div>
            </div>

            {/* Slack & Telegram */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-gold flex flex-col justify-between">
              <div>
                <span className="text-gold text-xs font-bold uppercase tracking-wider block mb-2">
                  {t({ es: 'Complemento', en: 'Add-on' })}
                </span>
                <h4 className="font-bold text-lg text-charcoal mb-2">
                  {t({ es: 'Slack y Telegram', en: 'Slack and Telegram' })}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t({
                    es: 'Canales adicionales para clínicas que coordinan a su equipo o atienden pacientes en estas plataformas.',
                    en: 'Additional channels for clinics that coordinate their team or serve patients on these platforms.',
                  })}
                </p>
              </div>
            </div>

            {/* SMS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-gold flex flex-col justify-between">
              <div>
                <span className="text-gold text-xs font-bold uppercase tracking-wider block mb-2">
                  {t({ es: 'Complemento', en: 'Add-on' })}
                </span>
                <h4 className="font-bold text-lg text-charcoal mb-2">
                  {t({ es: 'Mensajes SMS', en: 'SMS text messages' })}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t({
                    es: 'Confirmaciones y recordatorios por texto. Requiere registro de campaña A2P (exigido por operadoras en EE.UU.) y costo por volumen.',
                    en: 'Confirmations and reminders by text. Carries cost for A2P compliance campaign registration (required by US carriers) and volume.',
                  })}
                </p>
              </div>
            </div>

            {/* WhatsApp Promotions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-gold flex flex-col justify-between">
              <div>
                <span className="text-gold text-xs font-bold uppercase tracking-wider block mb-2">
                  {t({ es: 'Complemento', en: 'Add-on' })}
                </span>
                <h4 className="font-bold text-lg text-charcoal mb-2">
                  {t({ es: 'Promociones WhatsApp', en: 'WhatsApp promotions' })}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t({
                    es: 'Campañas a tu base de pacientes: reactivación, temporadas y anuncios de la clínica con plantillas oficiales aprobadas.',
                    en: 'Campaigns to your patient base: reactivation, seasonal offers, and clinic announcements with approved templates.',
                  })}
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            {t({
              es: 'Los complementos se cotizan por separado y pueden agregarse o retirarse en cualquier momento.',
              en: 'Add-ons are quoted separately and can be added or removed at any time.',
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
