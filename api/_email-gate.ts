import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const VOZ_EMAIL_PROOF_ATTR = "voz_email_proof";
export const EMAIL_GATE_COOKIE = "voz_email_gate";
export const PROOF_TTL_MS = 10 * 60 * 1000;
export const FAIL_LOCK_AFTER = 5;
export const FAIL_LOCK_MS = 60 * 60 * 1000;
export const IP_FAIL_LOCK_AFTER = 12;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESERVED_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "localhost",
]);

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamailblock.com",
  "sharklasers.com",
  "yopmail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "trashmail.com",
  "dispostable.com",
  "maildrop.cc",
  "getnada.com",
  "fakeinbox.com",
  "throwawaymail.com",
]);

export type RejectCode = "invalid" | "disposable";

export type GateState = {
  f: number;
  u: number;
  r: { h: string; c: RejectCode }[];
};

export function normalizeVisitorEmail(raw: string | null | undefined): string | null {
  const email = (raw ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return null;
  return email;
}

export function localReject(email: string): RejectCode | null {
  const domain = email.split("@")[1] ?? "";
  if (RESERVED_DOMAINS.has(domain)) return "invalid";
  if (DISPOSABLE_DOMAINS.has(domain)) return "disposable";
  return null;
}

export function verdictForCheck(result: string, flags: string[] = []): "allow" | RejectCode | "malformed" {
  if (flags.includes("bad_syntax")) return "malformed";
  if (result === "disposable" || flags.includes("disposable_email")) return "disposable";
  if (result === "invalid") return "invalid";
  if (result === "valid" || result === "catchall" || result === "unknown") return "allow";
  return "invalid";
}

export function signEmailProof(email: string, secret: string, now = Date.now()): string {
  const exp = now + PROOF_TTL_MS;
  const mac = createHmac("sha256", secret).update(`${email}|${exp}`).digest("base64url");
  return `${exp}.${mac}`;
}

export function emailProofMatches(
  email: string,
  proof: string | undefined,
  secret: string,
  now = Date.now(),
): boolean {
  if (!proof || !secret) return false;
  const dot = proof.lastIndexOf(".");
  if (dot <= 0) return false;
  const expRaw = proof.slice(0, dot);
  const mac = proof.slice(dot + 1);
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < now) return false;
  const expected = createHmac("sha256", secret).update(`${email}|${expRaw}`).digest("base64url");
  const left = Buffer.from(mac);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function emptyGate(): GateState {
  return { f: 0, u: 0, r: [] };
}

export function emailHash(email: string): string {
  return createHash("sha256").update(email).digest("hex").slice(0, 16);
}

function macMatches(payload: string, mac: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const left = Buffer.from(mac);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function sealGate(state: GateState, secret: string): string {
  const payload = Buffer.from(JSON.stringify(state)).toString("base64url");
  const mac = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}

export function openGate(raw: string | undefined, secret: string): GateState {
  if (!raw || !secret) return emptyGate();
  const dot = raw.lastIndexOf(".");
  if (dot <= 0) return emptyGate();
  const payload = raw.slice(0, dot);
  const mac = raw.slice(dot + 1);
  if (!macMatches(payload, mac, secret)) return emptyGate();
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as GateState;
    if (typeof parsed?.f !== "number" || typeof parsed?.u !== "number" || !Array.isArray(parsed.r)) {
      return emptyGate();
    }
    return {
      f: parsed.f,
      u: parsed.u,
      r: parsed.r
        .filter((item) => item && (item.c === "invalid" || item.c === "disposable") && typeof item.h === "string")
        .slice(0, 8),
    };
  } catch {
    return emptyGate();
  }
}

export function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    if (trimmed.slice(0, eq) === name) return decodeURIComponent(trimmed.slice(eq + 1));
  }
  return undefined;
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const first = forwarded.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip") || "";
}

export type IpFailMap = Map<string, { f: number; u: number }>;

export function noteIpFailure(map: IpFailMap, ip: string, now: number, limit = IP_FAIL_LOCK_AFTER): boolean {
  if (!ip) return false;
  const row = map.get(ip) ?? { f: 0, u: 0 };
  if (row.u > now) {
    map.set(ip, row);
    return true;
  }
  row.f += 1;
  if (row.f >= limit) row.u = now + FAIL_LOCK_MS;
  map.set(ip, row);
  if (map.size > 500) {
    const first = map.keys().next().value;
    if (first) map.delete(first);
  }
  return row.u > now;
}

export function ipIsLocked(map: IpFailMap, ip: string, now: number): boolean {
  if (!ip) return false;
  const row = map.get(ip);
  return !!row && row.u > now;
}
