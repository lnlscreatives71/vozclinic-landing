import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { POST } from "../api/livekit-token.ts";
import { signEmailProof } from "../api/_email-gate.ts";
import { VOZ_CHANNEL_ATTR, VOZ_EMAIL_ATTR, VOZ_EMAIL_PROOF_ATTR, WEBSITE_CHANNEL } from "../src/lib/website-token.ts";

const SECRET = "secretsecretsecretsecretsecret12";

function withProof(email: string, extra: Record<string, unknown> = {}) {
  const normalized = email.trim().toLowerCase();
  return {
    visitor_email: email,
    participant_attributes: {
      [VOZ_EMAIL_PROOF_ATTR]: signEmailProof(normalized, SECRET),
    },
    ...extra,
  };
}

function req(body: unknown, origin = "https://vozclinic.com"): Request {
  return new Request("https://vozclinic.com/api/livekit-token", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(body),
  });
}

describe("livekit token email gate", () => {
  it("refuses to mint a token without a valid email", async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = SECRET;
    process.env.LIVEKIT_URL = "wss://example.livekit.cloud";
    const res = await POST(req({}));
    assert.equal(res.status, 400);
    const json = (await res.json()) as { error: string };
    assert.match(json.error, /email/i);
  });

  it("stamps signed website attributes from a valid email", async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = SECRET;
    process.env.LIVEKIT_URL = "wss://example.livekit.cloud";
    const res = await POST(
      req(
        withProof("Ada@Clinic.mx", {
          participant_attributes: {
            [VOZ_CHANNEL_ATTR]: "playground",
            [VOZ_EMAIL_ATTR]: "spoof@example.com",
            [VOZ_EMAIL_PROOF_ATTR]: signEmailProof("ada@clinic.mx", SECRET),
          },
        }),
      ),
    );
    assert.equal(res.status, 201);
    const json = (await res.json()) as { participant_token: string; server_url: string };
    assert.equal(json.server_url, "wss://example.livekit.cloud");
    const payload = JSON.parse(
      Buffer.from(json.participant_token.split(".")[1], "base64url").toString(),
    ) as { attributes?: Record<string, string> };
    assert.equal(payload.attributes?.[VOZ_CHANNEL_ATTR], WEBSITE_CHANNEL);
    assert.equal(payload.attributes?.[VOZ_EMAIL_ATTR], "ada@clinic.mx");
  });
});

function claims(token: string): Record<string, unknown> {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString()) as Record<string, unknown>;
}

describe("livekit token: the server decides room, identity and agent", () => {
  it("ignores a caller-chosen room, identity and agent", async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = SECRET;
    process.env.LIVEKIT_URL = "wss://example.livekit.cloud";
    const res = await POST(
      req({
        ...withProof("a@b.co"),
        // A live outbound call's room, a spoofed identity, and the clinic's own agent.
        room_name: "outreach-16197342374-20260829-101019",
        participant_identity: "lia-fertilite",
        room_config: { agents: [{ agent_name: "lia-fertilite" }] },
      }),
      "https://evil.example",
    );
    assert.equal(res.status, 201);
    const c = claims(((await res.json()) as { participant_token: string }).participant_token);
    const video = c.video as { room: string };
    assert.match(video.room, /^sofia-web-[0-9a-f-]{36}$/);
    assert.match(String(c.sub), /^web-[0-9a-f-]{36}$/);
    const roomConfig = c.roomConfig as { agents: { agentName: string }[] };
    assert.deepEqual(roomConfig.agents.map((a) => a.agentName), ["vozclinic"]);
  });

  it("refuses a valid email that has not been checked", async () => {
    const res = await POST(req({ visitor_email: "ada@clinic.mx" }));
    assert.equal(res.status, 400);
  });

  it("gives every token its own room", async () => {
    const one = claims(((await (await POST(req(withProof("a@b.co")))).json()) as { participant_token: string }).participant_token);
    const two = claims(((await (await POST(req(withProof("b@c.co")))).json()) as { participant_token: string }).participant_token);
    assert.notEqual((one.video as { room: string }).room, (two.video as { room: string }).room);
  });
});
