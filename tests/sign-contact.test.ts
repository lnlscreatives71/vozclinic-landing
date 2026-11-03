import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, it } from "node:test";

import handler from "../api/sign-contact.ts";

const SECRET = "test-vozclinic-secret";
const realFetch = globalThis.fetch;

type Call = { url: string; init: RequestInit };
let calls: Call[];
let crmResponse: () => Response | Promise<Response>;

function req(body: unknown): Request {
  return new Request("https://www.vozclinic.com/api/sign-contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://www.vozclinic.com" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const VALID = {
  name: "Ana López",
  email: "ana@clinica.mx",
  message: "¿Funciona con mi número actual?",
  language: "es",
  page: "/",
  company_website: "",
};

describe("sign-contact proxy", () => {
  beforeEach(() => {
    process.env.VOZCLINIC_WEBHOOK_SECRET = SECRET;
    calls = [];
    crmResponse = () =>
      new Response(JSON.stringify({ data: { contact_id: "c1", created: true } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), init: init ?? {} });
      return crmResponse();
    }) as typeof fetch;
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
  });

  it("signs the body with the shared secret and forwards it to the CRM, minus the honeypot", async () => {
    const res = await handler(req(VALID));
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://lnlcrm.com/api/webhooks/vozclinic-contact");

    const sent = String(calls[0].init.body);
    const headers = calls[0].init.headers as Record<string, string>;
    const expected = createHmac("sha256", SECRET).update(sent).digest("hex");
    assert.equal(headers["X-Webhook-Signature"], expected);

    const forwarded = JSON.parse(sent);
    assert.equal("company_website" in forwarded, false);
    assert.equal(forwarded.message, VALID.message);
  });

  it("drops a submission with the honeypot filled, but answers 200 so bots move on", async () => {
    const res = await handler(req({ ...VALID, company_website: "https://spam.example" }));
    assert.equal(res.status, 200);
    assert.equal(calls.length, 0);
  });

  it("passes a CRM error status through so the form shows its fallback", async () => {
    crmResponse = () => new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
    const res = await handler(req(VALID));
    assert.equal(res.status, 400);
  });

  it("returns 502 when the CRM can't be reached", async () => {
    crmResponse = () => {
      throw new TypeError("network down");
    };
    const res = await handler(req(VALID));
    assert.equal(res.status, 502);
  });

  it("rejects a non-object body and does not call the CRM", async () => {
    const res = await handler(req("[1,2]"));
    assert.equal(res.status, 400);
    assert.equal(calls.length, 0);
  });

  it("returns 503 when the secret is not configured", async () => {
    delete process.env.VOZCLINIC_WEBHOOK_SECRET;
    const res = await handler(req(VALID));
    assert.equal(res.status, 503);
    assert.equal(calls.length, 0);
  });
});
