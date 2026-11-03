// Vercel Edge function: receives the "Contact us" form POST from the browser,
// drops bot submissions caught by the honeypot field, HMAC-signs the body
// with the shared secret and forwards it to the LNL CRM contact webhook.
// Same pattern and secret (VOZCLINIC_WEBHOOK_SECRET) as sign-referral.ts.

export const config = { runtime: "edge" };

const CRM_URL = "https://lnlcrm.com/api/webhooks/vozclinic-contact";

const ORIGIN_ALLOWLIST = [
  /^https:\/\/vozclinic\.com$/,
  /^https:\/\/www\.vozclinic\.com$/,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
];

// The form's hidden honeypot input. People never see it, so it stays empty;
// form-filling bots tend to fill every field.
const HONEYPOT = "company_website";

const json = (body: unknown, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin && ORIGIN_ALLOWLIST.some((re) => re.test(origin)) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  };
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default async function handler(req: Request): Promise<Response> {
  const cors = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, cors);
  }

  const secret = process.env.VOZCLINIC_WEBHOOK_SECRET;
  if (!secret) {
    return json({ error: "Signing proxy is not configured" }, 503, cors);
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    payload = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Body must be a JSON object" }, 400, cors);
  }

  // Bot: answer as if it worked so it doesn't retry, and send nothing on.
  const trap = payload[HONEYPOT];
  if (typeof trap === "string" && trap.trim() !== "") {
    return json({ data: { ok: true } }, 200, cors);
  }
  delete payload[HONEYPOT];

  const rawBody = JSON.stringify(payload);
  const signature = await hmacSha256Hex(secret, rawBody);

  try {
    const crmResponse = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": signature,
      },
      body: rawBody,
      signal: AbortSignal.timeout(15_000),
    });
    const text = await crmResponse.text();
    return new Response(text, {
      status: crmResponse.status,
      headers: {
        "Content-Type": crmResponse.headers.get("content-type") ?? "application/json",
        ...cors,
      },
    });
  } catch (err) {
    const message =
      err instanceof Error && err.name === "TimeoutError"
        ? "CRM did not respond in time"
        : "Failed to reach CRM";
    return json({ error: message }, 502, cors);
  }
}
