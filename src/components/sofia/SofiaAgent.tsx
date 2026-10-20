import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Room, TokenSource } from 'livekit-client';
import { useSession, useAgent } from '@livekit/components-react';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { AgentAudioVisualizerAura } from '@/components/agents-ui/agent-audio-visualizer-aura';
import { useLang } from '@/context/LangContext';
import { normalizeVisitorEmail } from '@/lib/visitor-email';
import { websiteParticipantAttributes } from '@/lib/website-token';

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
function SofiaLive({ email, proof, onEnd }: { email: string; proof: string; onEnd: () => void }) {
  const { t } = useLang();
  const participantAttributes = useMemo(
    () => websiteParticipantAttributes(email, proof),
    [email, proof],
  );

  // Own the Room so we can override the mic capture constraints. livekit-client's
  // defaults turn on `voiceIsolation` AND `autoGainControl` — aggressive Chrome
  // processing that, when laptop speakers couple back into the built-in mic,
  // suppresses the caller's own voice to near-silence. The agent then receives
  // no audio (STT never fires) and Sofía greets, then never responds. Verified:
  // the same failure hit BOTH our site and LiveKit's playground on speakers,
  // because both inherit these defaults. We keep echo cancellation + noise
  // suppression (needed for speaker echo) but drop the two over-suppressors.
  const room = useMemo(
    () =>
      new Room({
        audioCaptureDefaults: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
          voiceIsolation: false,
        },
      }),
    [],
  );
  const session = useSession(tokenSource, {
    agentName: 'vozclinic',
    room,
    participantAttributes,
  });
  // Distinguish WHY start() failed so the message isn't a misleading blanket
  // "check your microphone" — a token/connect/network failure has nothing to do
  // with the mic. We classify the rejection and always log the real error.
  const [error, setError] = useState<'mic' | 'connection' | null>(null);

  useEffect(() => {
    session.start().catch((err: unknown) => {
      console.error('[Sofía] session.start() failed:', err);
      const name = (err as { name?: string })?.name ?? '';
      const msg = String((err as { message?: string })?.message ?? err ?? '');
      const isMic =
        name === 'NotAllowedError' ||
        name === 'NotFoundError' ||
        name === 'NotReadableError' ||
        /permission|microphone|getusermedia|audio.*track/i.test(msg);
      setError(isMic ? 'mic' : 'connection');
    });
    return () => {
      session.end();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    const isMic = error === 'mic';
    return (
      <div className="text-center max-w-md mx-auto">
        <p className="text-charcoal font-semibold mb-2">
          {isMic
            ? t({ es: 'No pudimos acceder a tu micrófono.', en: 'We couldn’t access your microphone.' })
            : t({ es: 'No pudimos conectar con Sofía.', en: 'We couldn’t connect to Sofía.' })}
        </p>
        <p className="text-charcoal/70 text-sm mb-5">
          {isMic
            ? t({
                es: 'Revisa el permiso de micrófono del navegador (el ícono junto a la barra de dirección) y vuelve a intentarlo.',
                en: 'Check your browser’s microphone permission (the icon next to the address bar) and try again.',
              })
            : t({
                es: 'Puede ser tu red o una extensión que bloquea la llamada. Inténtalo de nuevo, o prueba en otro navegador.',
                en: 'It may be your network or an extension blocking the call. Try again, or try another browser.',
              })}
        </p>
        <button
          onClick={onEnd}
          className="inline-flex items-center justify-center bg-teal text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-dark transition-colors"
        >
          {t({ es: 'Reintentar', en: 'Try again' })}
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

type EmailGateCode = 'malformed' | 'invalid' | 'disposable' | 'locked' | 'unavailable';

function emailGateMessage(
  code: EmailGateCode,
  t: (copy: { es: string; en: string }) => string,
  suggestion?: string,
): string {
  const base = {
    malformed: t({
      es: 'Necesitamos un correo válido para iniciar la demostración.',
      en: 'A valid email is required to start the demo.',
    }),
    invalid: t({
      es: 'Ese correo no recibe mensajes. Usa uno que sí revises.',
      en: "That email doesn't accept mail. Use an inbox you actually check.",
    }),
    disposable: t({
      es: 'Los correos temporales no pueden iniciar la demostración. Usa tu correo de trabajo.',
      en: "Temporary inboxes can't start the demo. Use your work email.",
    }),
    locked: t({
      es: 'Demasiados intentos. Espera una hora y usa un correo real.',
      en: 'Too many attempts. Wait an hour and use a real email.',
    }),
    unavailable: t({
      es: 'No pudimos revisar ese correo. Inténtalo de nuevo en un momento.',
      en: "We couldn't check that email. Try again in a moment.",
    }),
  }[code];
  if (!suggestion) return base;
  return `${base} ${t({ es: `¿Quisiste decir ${suggestion}?`, en: `Did you mean ${suggestion}?` })}`;
}

function SofiaEmailGate({
  onSubmit,
  onCancel,
}: {
  onSubmit: (email: string, proof: string) => void;
  onCancel: () => void;
}) {
  const { t } = useLang();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = normalizeVisitorEmail(value);
    if (!email) {
      setError(
        emailGateMessage('malformed', t),
      );
      return;
    }
    setPending(true);
    try {
      const res = await fetch('/api/verify-visitor-email', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email }),
      });
      const json = (await res.json().catch(() => ({}))) as { proof?: string; code?: string; suggestion?: string };
      if (!res.ok || !json.proof) {
        const code: EmailGateCode =
          json.code === 'malformed' ||
          json.code === 'invalid' ||
          json.code === 'disposable' ||
          json.code === 'locked'
            ? json.code
            : 'unavailable';
        setError(emailGateMessage(code, t, json.suggestion));
        return;
      }
      onSubmit(email, json.proof);
    } catch {
      setError(emailGateMessage('unavailable', t));
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto w-full">
      <label htmlFor="sofia-visitor-email" className="text-center text-lg text-gray-200">
        {t({
          es: 'Antes de hablar con Sofía, deja tu correo.',
          en: 'Before talking to Sofía, leave your email.',
        })}
      </label>
      <input
        id="sofia-visitor-email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setError(null);
        }}
        disabled={pending}
        className="w-full rounded-xl bg-white text-charcoal px-4 py-3"
        placeholder={t({ es: 'tu@clinica.com', en: 'you@clinic.com' })}
      />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <p className="text-sm text-gray-400 text-center leading-relaxed">
        {t({
          es: 'Usamos este correo para iniciar la demostración y dar seguimiento sobre VozClinic. No es un consentimiento de marketing.',
          en: 'We use this email to start the demo and follow up about VozClinic. This is not marketing consent.',
        })}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-3 bg-teal text-white font-semibold px-8 py-3 rounded-2xl hover:bg-teal-dark transition-colors disabled:opacity-60"
        >
          {pending
            ? t({ es: 'Revisando…', en: 'Checking…' })
            : t({ es: 'Continuar', en: 'Continue' })}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-6 py-3 rounded-2xl border border-white/20 text-white hover:bg-white/10 transition-colors"
        >
          {t({ es: 'Cancelar', en: 'Cancel' })}
        </button>
      </div>
    </form>
  );
}

export default function SofiaAgent() {
  const { t } = useLang();
  const [phase, setPhase] = useState<'idle' | 'email' | 'live'>('idle');
  const [email, setEmail] = useState('');
  const [proof, setProof] = useState('');

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
          <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-5">
            {t({ es: 'Habla con Sofía ahora mismo', en: 'Talk to Sofía right now' })}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            {t({
              es: 'Tu recepcionista con IA, en vivo. Pulsa para hablar — responde en segundos, en español o inglés.',
              en: 'Your AI receptionist, live. Tap to talk — she answers in seconds, in Spanish or English.',
            })}
          </p>
        </div>

        {phase === 'live' && email && proof ? (
          <SofiaLive
            email={email}
            proof={proof}
            onEnd={() => {
              setPhase('idle');
              setEmail('');
              setProof('');
            }}
          />
        ) : phase === 'email' ? (
          <SofiaEmailGate
            onSubmit={(next, nextProof) => {
              setEmail(next);
              setProof(nextProof);
              setPhase('live');
            }}
            onCancel={() => setPhase('idle')}
          />
        ) : (
          <SofiaIdle onStart={() => setPhase('email')} />
        )}
      </div>
    </section>
  );
}
