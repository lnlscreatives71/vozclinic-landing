// Vercel serverless function: receives a referral form POST from the
// browser, signs the body with HMAC-SHA256 using the shared secret, and
// forwards to the LNL CRM referral webhook. Returns the CRM response
// back to the browser so the front-end can react to success/failure.
//
// The secret lives in Vercel env vars only (VOZCLINIC_WEBHOOK_SECRET),
// never in the SPA bundle. Mirror the same value on the CRM side at
// /var/www/lnl-crm/.env on the VPS.

import { createHmac } from "node:crypto";

const CRM_URL = "https://lnlcrm.com/api/webhooks/vozclinic-referral";

// Allowed origins for CORS. Includes prod + Vercel preview deploys.
const ORIGIN_ALLOWLIST = [
  /^https:\/\/vozclinic\.com$/,
  /^https:\/\/www\.vozclinic\.com$/,
  /^https:\/\/[a-z0-9-]+-vozclinic\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
];

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

export const config = { runtime: "nodejs" };

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  const secret = process.env.VOZCLINIC_WEBHOOK_SECRET;
  if (!secret) {
    return new Response(
      JSON.stringify({ error: "Signing proxy is not configured" }),
      {
        status: 503,
        headers: { "Content-Type": "application/json", ...cors },
      },
    );
  }

  const rawBody = await req.text();
  const signature = createHmac("sha256", secret).update(rawBody).digest("hex");

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
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }
}
