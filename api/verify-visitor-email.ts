// Confirms a website demo email with NeverBounce before Sofía can connect.
// NEVERBOUNCE_API_KEY stays in the server environment. The browser receives a
// short-lived proof, which api/livekit-token.ts requires before minting a token.
// Invalid and disposable addresses are rejected. After repeated rejects, the
// browser is locked for an hour so the same person cannot keep trying fakes.

export const config = { runtime: "nodejs" };

import {
  EMAIL_GATE_COOKIE,
  FAIL_LOCK_AFTER,
  FAIL_LOCK_MS,
  IP_FAIL_LOCK_AFTER,
  clientIp,
  emailHash,
  ipIsLocked,
  localReject,
  normalizeVisitorEmail,
  noteIpFailure,
  openGate,
  readCookie,
  sealGate,
  signEmailProof,
  verdictForCheck,
  type GateState,
  type IpFailMap,
  type RejectCode,
} from "./_email-gate.ts";

const ORIGIN_ALLOWLIST = [
  /^https:\/\/vozclinic\.com$/,
  /^https:\/\/www\.vozclinic\.com$/,
  /^https:\/\/[a-z0-9-]+-vozclinic\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
];

const ipFails: IpFailMap = new Map();

export type NeverBounceOutcome = {
  status: "success" | "timeout" | "error";
  result?: string;
  flags?: string[];
  suggestion?: string;
};

export type VerifyDeps = {
  secret: string;
  apiKey: string;
  check: (email: string, apiKey: string) => Promise<NeverBounceOutcome>;
  now?: () => number;
  ipFails?: IpFailMap;
  failLockAfter?: number;
  ipFailLockAfter?: number;
};

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ORIGIN_ALLOWLIST.some((re) => re.test(origin)) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  };
}

function cookieHeader(state: GateState, secret: string, secure: boolean): string {
  const value = encodeURIComponent(sealGate(state, secret));
  const parts = [
    `${EMAIL_GATE_COOKIE}=${value}`,
    "HttpOnly",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${Math.ceil(FAIL_LOCK_MS / 1000)}`,
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function jsonResponse(
  status: number,
  body: Record<string, string>,
  cors: Record<string, string>,
  setCookie?: string,
): Response {
  const headers: Record<string, string> = { "Content-Type": "application/json", ...cors };
  if (setCookie) headers["Set-Cookie"] = setCookie;
  return new Response(JSON.stringify(body), { status, headers });
}

function rememberReject(state: GateState, email: string, code: RejectCode, now: number, limit: number): GateState {
  const hash = emailHash(email);
  const known = state.r.some((item) => item.h === hash);
  const next: GateState = {
    f: state.f + 1,
    u: state.u,
    r: known ? state.r : [...state.r, { h: hash, c: code }].slice(-8),
  };
  if (next.f >= limit) next.u = now + FAIL_LOCK_MS;
  return next;
}

export async function checkWithNeverBounce(email: string, apiKey: string): Promise<NeverBounceOutcome> {
  const body = new URLSearchParams({ key: apiKey, email, timeout: "8" });
  try {
    const res = await fetch("https://api.neverbounce.com/v4/single/check", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { status: "error" };
    const json = (await res.json()) as {
      status?: string;
      result?: string;
      flags?: string[];
      suggested_correction?: string;
    };
    if (json.status !== "success") return { status: "error" };
    return {
      status: "success",
      result: json.result ?? "",
      flags: Array.isArray(json.flags) ? json.flags : [],
      suggestion: json.suggested_correction ?? "",
    };
  } catch (err) {
    if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
      return { status: "timeout" };
    }
    return { status: "error" };
  }
}

export async function handleVerifyEmail(req: Request, deps: VerifyDeps): Promise<Response> {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);
  const now = deps.now?.() ?? Date.now();
  const failLockAfter = deps.failLockAfter ?? FAIL_LOCK_AFTER;
  const ipFailLockAfter = deps.ipFailLockAfter ?? IP_FAIL_LOCK_AFTER;
  const failures = deps.ipFails ?? ipFails;
  const secure = (origin ?? "").startsWith("https://");

  if (!deps.secret || !deps.apiKey) {
    return jsonResponse(503, { error: "Email check is not configured", code: "unavailable" }, cors);
  }

  let payload: { email?: string };
  try {
    payload = (await req.json()) as { email?: string };
  } catch {
    payload = {};
  }

  const email = normalizeVisitorEmail(payload.email);
  if (!email) {
    return jsonResponse(400, { error: "A valid email is required", code: "malformed" }, cors);
  }

  const ip = clientIp(req);
  let state = openGate(readCookie(req.headers.get("cookie"), EMAIL_GATE_COOKIE), deps.secret);
  const locked = state.u > now || ipIsLocked(failures, ip, now);
  if (locked) {
    return jsonResponse(
      429,
      { error: "Too many attempts", code: "locked" },
      cors,
      cookieHeader(state, deps.secret, secure),
    );
  }

  const known = state.r.find((item) => item.h === emailHash(email));
  const local = localReject(email);
  const early = known?.c ?? local;
  if (early) {
    state = rememberReject(state, email, early, now, failLockAfter);
    if (ip) noteIpFailure(failures, ip, now, ipFailLockAfter);
    const code = state.u > now ? "locked" : early;
    return jsonResponse(
      code === "locked" ? 429 : 400,
      { error: "That email cannot start the demo", code },
      cors,
      cookieHeader(state, deps.secret, secure),
    );
  }

  const outcome = await deps.check(email, deps.apiKey);
  if (outcome.status === "error") {
    return jsonResponse(
      503,
      { error: "We couldn't check that email", code: "unavailable" },
      cors,
      cookieHeader(state, deps.secret, secure),
    );
  }

  const verdict = outcome.status === "timeout" ? "allow" : verdictForCheck(outcome.result ?? "", outcome.flags ?? []);
  if (verdict === "allow") {
    return jsonResponse(
      200,
      { proof: signEmailProof(email, deps.secret, now) },
      cors,
      cookieHeader(state, deps.secret, secure),
    );
  }

  const code: RejectCode = verdict === "disposable" ? "disposable" : "invalid";
  state = rememberReject(state, email, code, now, failLockAfter);
  if (ip) noteIpFailure(failures, ip, now, ipFailLockAfter);
  const lockedNow = state.u > now;
  const suggestion = normalizeVisitorEmail(outcome.suggestion);
  const body: Record<string, string> = {
    error: "That email cannot start the demo",
    code: lockedNow ? "locked" : code,
  };
  if (!lockedNow && suggestion && suggestion !== email) body.suggestion = suggestion;
  return jsonResponse(lockedNow ? 429 : 400, body, cors, cookieHeader(state, deps.secret, secure));
}

export async function OPTIONS(req: Request): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders(req.headers.get("origin")) });
}

export async function POST(req: Request): Promise<Response> {
  return handleVerifyEmail(req, {
    secret: process.env.LIVEKIT_API_SECRET ?? "",
    apiKey: process.env.NEVERBOUNCE_API_KEY ?? "",
    check: checkWithNeverBounce,
  });
}
