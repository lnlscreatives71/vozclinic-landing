import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { POST } from "../api/livekit-token.ts";
import { VOZ_CHANNEL_ATTR, VOZ_EMAIL_ATTR, WEBSITE_CHANNEL } from "../src/lib/website-token.ts";

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
    process.env.LIVEKIT_API_SECRET = "secretsecretsecretsecretsecret12";
    process.env.LIVEKIT_URL = "wss://example.livekit.cloud";
    const res = await POST(req({}));
    assert.equal(res.status, 400);
    const json = (await res.json()) as { error: string };
    assert.match(json.error, /email/i);
  });

  it("stamps signed website attributes from a valid email", async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = "secretsecretsecretsecretsecret12";
    process.env.LIVEKIT_URL = "wss://example.livekit.cloud";
    const res = await POST(
      req({
        visitor_email: "Ada@Clinic.mx",
        participant_attributes: {
          [VOZ_CHANNEL_ATTR]: "playground",
          [VOZ_EMAIL_ATTR]: "spoof@example.com",
        },
      }),
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
