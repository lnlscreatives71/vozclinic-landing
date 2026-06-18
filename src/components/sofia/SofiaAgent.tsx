import { useEffect, useRef, useState } from 'react';
import { TokenSource } from 'livekit-client';
import { useSession, useAgent } from '@livekit/components-react';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { AgentAudioVisualizerAura } from '@/components/agents-ui/agent-audio-visualizer-aura';
import { useLang } from '@/context/LangContext';

// Our own token endpoint (api/livekit-token.ts). The SDK packs the
// `vozclinic` agent dispatch into room_config before POSTing here.
const tokenSource = TokenSource.endpoint('/api/livekit-token');

// VozClinic teal so the orb is on-brand (was LiveKit's default cyan #1FD5F9).
const AURA_COLOR = '#008080';
const AURA_CLASS = 'aspect-square size-auto w-full max-w-sm mx-auto';

/** The live orb: reads agent state + audio from session context. */
function LiveOrb({ onEnd }: { onEnd: () => void }) {
  const { state } = useAgent();
  const wasLive = useRef(false);

  // Return to idle ONLY if the agent disconnects/fails AFTER it went live
  // (the initial state is 'disconnected' before connecting — don't tear down
  // on that, or the session ends the instant it starts).
  useEffect(() => {
    const LIVE = ['initializing', 'idle', 'listening', 'thinking', 'speaking'];
    if (LIVE.includes(state)) {
      wasLive.current = true;
    } else if (wasLive.current && (state === 'disconnected' || state === 'failed')) {
      onEnd();
    }
  }, [state, onEnd]);

  return (
    <AgentAudioVisualizerAura
      size="xl"
      color={AURA_COLOR}
      colorShift={0.3}
      state={state}
      themeMode="light"
      className={AURA_CLASS}
    />
  );
}

// NOTE: No frontend noise filter here on purpose. The agent runs LiveKit Cloud
// background-voice cancellation (BVC) on the inbound web track (sofia_demo.py
// room_input_options). LiveKit's docs warn against stacking a frontend NC model
// on top of agent-side NC — the doubly-processed audio confused turn detection
// and Sofía went silent after her greeting on laptop speakers. We keep only the
// browser's native WebRTC echo cancellation (on by default) + agent-side BVC.
// https://docs.livekit.io/transport/media/noise-cancellation/#agents

/** Live session: connects on mount, cleans up on unmount. */
function SofiaLive({ onEnd }: { onEnd: () => void }) {
  const { t } = useLang();
  const session = useSession(tokenSource, { agentName: 'vozclinic' });
  const [error, setError] = useState(false);

  useEffect(() => {
    session.start().catch(() => setError(true));
    return () => {
      session.end();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-charcoal font-medium mb-4">
          {t({
            es: 'No pudimos iniciar el micrófono. Revisa los permisos del navegador e inténtalo de nuevo.',
            en: 'We could not start your microphone. Check your browser permissions and try again.',
          })}
        </p>
        <button
          onClick={onEnd}
          className="inline-flex items-center justify-center bg-teal text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-dark transition-colors"
        >
          {t({ es: 'Volver', en: 'Back' })}
        </button>
      </div>
    );
  }

  return (
    <AgentSessionProvider session={session}>
      <div className="flex flex-col items-center gap-6">
        <LiveOrb onEnd={onEnd} />
        <button
          onClick={onEnd}
          className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
        >
          <span aria-hidden="true">✕</span>
          {t({ es: 'Terminar llamada', en: 'End call' })}
        </button>
      </div>
    </AgentSessionProvider>
  );
}

/** Idle state: a calm orb plus the call-to-action. */
function SofiaIdle({ onStart }: { onStart: () => void }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col items-center gap-6">
      <AgentAudioVisualizerAura
        size="xl"
        color={AURA_COLOR}
        colorShift={0.3}
        state="listening"
        themeMode="light"
        className={AURA_CLASS}
      />
      <button
        onClick={onStart}
        className="inline-flex items-center gap-3 bg-teal text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-teal/25 hover:bg-teal-dark transition-colors"
      >
        <span aria-hidden="true">🎙️</span>
        {t({ es: 'Hablar con Sofía', en: 'Talk to Sofía' })}
      </button>
    </div>
  );
}

export default function SofiaAgent() {
  const { t } = useLang();
  const [connected, setConnected] = useState(false);

  return (
    <section
      id="sofia"
      className="relative bg-charcoal text-white pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden"
    >
      <div className="dot-grid absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="section-container relative">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 bg-teal/20 text-teal-light text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-teal/40 tracking-wide uppercase">
            {t({ es: 'Demostración en vivo', en: 'Live demo' })}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-5">
            {t({ es: 'Habla con Sofía ahora mismo', en: 'Talk to Sofía right now' })}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            {t({
              es: 'Tu recepcionista con IA, en vivo. Pulsa para hablar — responde en segundos, en español o inglés.',
              en: 'Your AI receptionist, live. Tap to talk — she answers in seconds, in Spanish or English.',
            })}
          </p>
        </div>

        {connected ? (
          <SofiaLive onEnd={() => setConnected(false)} />
        ) : (
          <SofiaIdle onStart={() => setConnected(true)} />
        )}
      </div>
    </section>
  );
}
