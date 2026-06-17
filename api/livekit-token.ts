// Vercel Edge function: mints a LiveKit access token so the in-page Sofía
// voice agent can connect. Follows LiveKit's standard token-endpoint format
// (POST { room_config, ... } -> 201 { server_url, participant_token }).
//
// The client SDK (useSession with { agentName: 'vozclinic' }) packages the
// agent-dispatch info into room_config, so we just pass it through to the
// token. API key/secret/url live in Vercel env vars only, never in the bundle.
//   LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET
// (same project as the agent: lnl-ai-agency).

export const config = { runtime: "edge" };

import { AccessToken } from "livekit-server-sdk";
import { RoomConfiguration } from "@livekit/protocol";

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

interface TokenRequestBody {
  room_name?: string;
  participant_identity?: string;
  participant_name?: string;
  participant_metadata?: string;
  participant_attributes?: Record<string, string>;
  // RoomConfiguration as proto JSON — the client packs agent dispatch here,
  // using snake_case proto field names (e.g. agent_name).
  room_config?: Record<string, unknown>;
}

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

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const serverUrl = process.env.LIVEKIT_URL;
  if (!apiKey || !apiSecret || !serverUrl) {
    return new Response(
      JSON.stringify({ error: "LiveKit is not configured" }),
      { status: 503, headers: { "Content-Type": "application/json", ...cors } },
    );
  }

  let body: TokenRequestBody = {};
  try {
    body = (await req.json()) as TokenRequestBody;
  } catch {
    // empty body is fine — defaults below
  }

  const stamp = Date.now();
  const roomName = body.room_name || `sofia-web-${stamp}`;
  const identity = body.participant_identity || `web-${stamp}`;

  const at = new AccessToken(apiKey, apiSecret, {
    identity,
    name: body.participant_name || "Web visitor",
    metadata: body.participant_metadata || "",
    attributes: body.participant_attributes || {},
    ttl: "15m",
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  // Pass agent dispatch (and any other room config) straight through.
  // Use fromJson (NOT the constructor) so snake_case proto fields like
  // `agent_name` that the client sends are parsed correctly — the constructor
  // expects camelCase and would silently drop the agent name.
  if (body.room_config) {
    at.roomConfig = RoomConfiguration.fromJson(body.room_config as Parameters<typeof RoomConfiguration.fromJson>[0]);
  }

  const participantToken = await at.toJwt();

  return new Response(
    JSON.stringify({ server_url: serverUrl, participant_token: participantToken }),
    { status: 201, headers: { "Content-Type": "application/json", ...cors } },
  );
}
