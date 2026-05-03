export default function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 285, maxWidth: '100%' }}>
      {/* Subtle glow behind phone */}
      <div
        className="absolute inset-0 rounded-[44px] blur-2xl opacity-25"
        style={{ background: 'radial-gradient(ellipse, #008080 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Phone outer frame */}
      <div className="relative rounded-[44px] bg-[#0D0D0D] p-[10px] shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0D0D0D] rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="rounded-[36px] overflow-hidden bg-[#ECE5DD]" style={{ height: 560 }}>
          {/* WhatsApp header */}
          <div className="bg-[#075E54] pt-8 pb-3 px-4 flex items-center gap-3">
            {/* Back arrow + Avatar + Info */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm shrink-0">
                S
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">
                  Sofía · VozClinic
                </p>
                <p className="text-[#7FD4C6] text-[11px] mt-0.5">En línea · Siempre</p>
              </div>
            </div>
            {/* Icons placeholder */}
            <div className="flex gap-3 text-[#7FD4C6] text-xs shrink-0">
              <span>📞</span>
              <span>⋮</span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="p-3 space-y-2.5 overflow-y-auto" style={{ height: 'calc(560px - 82px - 48px)' }}>
            {/* Date divider */}
            <div className="flex justify-center">
              <span className="text-[10px] text-[#667781] bg-white/70 rounded-full px-3 py-0.5 shadow-xs">
                HOY · 10:47 PM
              </span>
            </div>

            {/* Patient message 1 */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-xs max-w-[82%]">
                <p className="text-[#111] text-[11.5px] leading-relaxed">
                  Hola, ¿tienen cita mañana para limpieza? Vengo de San Diego.
                </p>
                <p className="text-[#999] text-[9px] text-right mt-1">10:47 PM</p>
              </div>
            </div>

            {/* Sofía message */}
            <div className="flex justify-end">
              <div className="bg-[#D9FDD3] rounded-2xl rounded-tr-sm px-3 py-2 shadow-xs max-w-[85%]">
                <p className="text-[#111] text-[11.5px] leading-relaxed">
                  ¡Hola! Sí, tenemos disponibilidad mañana a las 11:00 AM o 2:30 PM con la Dra. Ruiz. ¿Cuál le acomoda? Le envío la ubicación y un mapa para cruzar por San Ysidro 🗺️
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[#999] text-[9px]">10:47 PM</span>
                  <span className="text-[#53BDEB] text-[10px]">✓✓</span>
                </div>
              </div>
            </div>

            {/* Patient reply */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-xs max-w-[72%]">
                <p className="text-[#111] text-[11.5px] leading-relaxed">
                  Las 2:30 está perfecto.
                </p>
                <p className="text-[#999] text-[9px] text-right mt-1">10:48 PM</p>
              </div>
            </div>

            {/* Sofía confirmation */}
            <div className="flex justify-end">
              <div className="bg-[#D9FDD3] rounded-2xl rounded-tr-sm px-3 py-2 shadow-xs max-w-[85%]">
                <p className="text-[#111] text-[11.5px] leading-relaxed">
                  Listo ✅ Cita confirmada para mañana 2:30 PM con la Dra. Ruiz. Le mandaré recordatorio 24h y 2h antes. ¿Algo más?
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[#999] text-[9px]">10:48 PM</span>
                  <span className="text-[#53BDEB] text-[10px]">✓✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="bg-[#F0F2F5] px-3 py-2 flex items-center gap-2" style={{ height: 48 }}>
            <div className="flex-1 bg-white rounded-full px-4 py-1.5 text-[10px] text-gray-400">
              Mensaje
            </div>
            <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center text-white text-xs">
              ➤
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — response time */}
      <div
        className="absolute -left-8 top-24 bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-100"
        style={{ minWidth: 130 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-teal text-lg">⚡</span>
          <div>
            <p className="text-[10px] font-bold text-charcoal leading-none">Respuesta</p>
            <p className="text-[10px] text-teal font-semibold mt-0.5">&lt; 2 segundos</p>
          </div>
        </div>
      </div>

      {/* Floating badge — 24/7 */}
      <div
        className="absolute -right-6 bottom-28 bg-teal rounded-2xl px-3 py-2 shadow-lg"
        style={{ minWidth: 100 }}
      >
        <p className="text-white text-[10px] font-bold">24/7 Activo</p>
        <p className="text-teal-light text-[9px] mt-0.5">sin días libres</p>
      </div>
    </div>
  );
}
