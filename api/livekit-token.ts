// Vercel Node.js function: mints a LiveKit access token so the in-page Sofía
// voice agent can connect. Follows LiveKit's standard token-endpoint format
// (POST { room_config, ... } -> 201 { server_url, participant_token }).
//
// The client SDK (useSession with { agentName: 'vozclinic' }) packages the
// agent-dispatch info into room_config. It is IGNORED: this endpoint is public,
// so the server alone decides the room, the identity and the agent. A caller
// who could choose them could join a live call by its (predictable) room name,
// or dispatch a clinic's own agent (lia-fertilite) from the marketing site.
// Found 2026-08-29, fixed 2026-10-19 (vozclinic-admin bead vozapp-ies).
// API key/secret/url live in Vercel env vars only:
//   LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET
//
// Runtime notes:
// - Node.js (NOT edge): livekit-server-sdk uses node:crypto, which edge rejects.
// - Named method exports (POST/OPTIONS) so Vercel passes a Web Request on the
//   Node runtime; a default export would receive legacy (req, res) instead.
// - RoomConfiguration is imported from livekit-server-sdk (not @livekit/protocol
//   directly) so it's the same protobuf instance the SDK serializes with — the
//   app also pulls a newer @livekit/protocol, and mixing the two breaks toJwt.

export const config = { runtime: "nodejs" };

import { randomUUID } from "node:crypto";
import { AccessToken, RoomConfiguration } from "livekit-server-sdk";

/** The only agent this endpoint ever dispatches: Sofía, the website demo. */
const WEBSITE_AGENT = "vozclinic";

// Keep these helpers local. Vercel Node functions do not reliably load
// `src/lib/*.ts` with explicit extensions, and a failed import 500s before
// the email gate can run.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VOZ_CHANNEL_ATTR = "voz_channel";
const VOZ_EMAIL_ATTR = "voz_email";
const WEBSITE_CHANNEL = "website";

function normalizeVisitorEmail(raw: string | null | undefined): string | null {
  const email = (raw ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return null;
  return email;
}

function websiteParticipantAttributes(email: string): Record<string, string> {
  return {
    [VOZ_CHANNEL_ATTR]: WEBSITE_CHANNEL,
    [VOZ_EMAIL_ATTR]: email,
  };
}

function requiredWebsiteEmail(input: {
  visitor_email?: string;
  participant_attributes?: Record<string, string>;
}): string | null {
  return normalizeVisitorEmail(
    input.visitor_email ?? input.participant_attributes?.[VOZ_EMAIL_ATTR],
  );
}

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
  // Sent by the SDK; ignored (see the header).
  room_name?: string;
  participant_identity?: string;
  participant_name?: string;
  participant_metadata?: string;
  participant_attributes?: Record<string, string>;
  visitor_email?: string;
  // RoomConfiguration as proto JSON — the client packs agent dispatch here,
  // using snake_case proto field names (e.g. agent_name).
  room_config?: Record<string, unknown>;
}

export async function OPTIONS(req: Request): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin")),
  });
}

export async function POST(req: Request): Promise<Response> {
  const cors = corsHeaders(req.headers.get("origin"));

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const serverUrl = process.env.LIVEKIT_URL;
  if (!apiKey || !apiSecret || !serverUrl) {
    return new Response(JSON.stringify({ error: "LiveKit is not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  let body: TokenRequestBody;
  try {
    body = (await req.json()) as TokenRequestBody;
  } catch {
    body = {};
  }

  const email = requiredWebsiteEmail({
    visitor_email: body.visitor_email,
    participant_attributes: body.participant_attributes,
  });
  if (!email) {
    return new Response(JSON.stringify({ error: "A valid email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  // Unguessable and server-made: a fresh room nobody else is in, and an
  // identity the caller cannot choose. body.room_name and
  // body.participant_identity are deliberately not read.
  const id = randomUUID();
  const roomName = `sofia-web-${id}`;
  const identity = `web-${id}`;

  const at = new AccessToken(apiKey, apiSecret, {
    identity,
    name: body.participant_name || "Web visitor",
    metadata: body.participant_metadata || "",
    attributes: websiteParticipantAttributes(email),
    ttl: "15m",
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  // The agent is pinned here, never taken from body.room_config. fromJson (not
  // the constructor) so the snake_case proto field name parses.
  at.roomConfig = RoomConfiguration.fromJson({ agents: [{ agent_name: WEBSITE_AGENT }] });

  const participantToken = await at.toJwt();

  return new Response(
    JSON.stringify({ server_url: serverUrl, participant_token: participantToken }),
    { status: 201, headers: { "Content-Type": "application/json", ...cors } },
  );
}
