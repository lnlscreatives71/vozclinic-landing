import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { emailProofMatches, localReject, verdictForCheck } from "../api/_email-gate.ts";
import { handleVerifyEmail, type NeverBounceOutcome } from "../api/verify-visitor-email.ts";

const SECRET = "secretsecretsecretsecretsecret12";

function req(email: string, cookie?: string): Request {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    origin: "https://vozclinic.com",
  };
  if (cookie) headers.cookie = cookie;
  return new Request("https://vozclinic.com/api/verify-visitor-email", {
    method: "POST",
    headers,
    body: JSON.stringify({ email }),
  });
}

function deps(check: (email: string) => Promise<NeverBounceOutcome>, failLockAfter = 5) {
  return {
    secret: SECRET,
    apiKey: "test-key",
    check: async (email: string) => check(email),
    now: () => 1_700_000_000_000,
    ipFails: new Map(),
    failLockAfter,
  };
}

describe("NeverBounce verdicts", () => {
  it("blocks invalid and disposable results", () => {
    assert.equal(verdictForCheck("invalid"), "invalid");
    assert.equal(verdictForCheck("disposable"), "disposable");
    assert.equal(verdictForCheck("unknown", ["disposable_email"]), "disposable");
  });

  it("allows a real address, a catch-all clinic domain, and an unknown server", () => {
    assert.equal(verdictForCheck("valid"), "allow");
    assert.equal(verdictForCheck("catchall"), "allow");
    assert.equal(verdictForCheck("unknown"), "allow");
  });

  it("rejects reserved and temporary domains before a paid check", () => {
    assert.equal(localReject("a@example.com"), "invalid");
    assert.equal(localReject("a@mailinator.com"), "disposable");
    assert.equal(localReject("ada@clinic.mx"), null);
  });
});

describe("visitor email verification", () => {
  it("returns a proof for an address NeverBounce calls valid", async () => {
    const res = await handleVerifyEmail(
      req("Ada@Clinic.mx"),
      deps(async () => ({ status: "success", result: "valid", flags: [] })),
    );
    assert.equal(res.status, 200);
    const json = (await res.json()) as { proof: string };
    assert.equal(emailProofMatches("ada@clinic.mx", json.proof, SECRET, 1_700_000_000_000), true);
  });

  it("does not call NeverBounce for a disposable domain", async () => {
    let calls = 0;
    const res = await handleVerifyEmail(
      req("person@mailinator.com"),
      deps(async () => {
        calls += 1;
        return { status: "success", result: "valid" };
      }),
    );
    assert.equal(res.status, 400);
    assert.equal(calls, 0);
    const json = (await res.json()) as { code: string };
    assert.equal(json.code, "disposable");
  });

  it("locks the browser after repeated fake addresses", async () => {
    let calls = 0;
    const check = async () => {
      calls += 1;
      return { status: "success", result: "invalid" } satisfies NeverBounceOutcome;
    };
    const gate = deps(check, 3);
    let cookie = "";
    for (let i = 0; i < 2; i += 1) {
      const res = await handleVerifyEmail(req(`fake${i}@clinic.mx`, cookie), gate);
      assert.equal(res.status, 400);
      cookie = res.headers.get("set-cookie")?.split(";")[0] ?? "";
    }
    const locked = await handleVerifyEmail(req("fake2@clinic.mx", cookie), gate);
    assert.equal(locked.status, 429);
    cookie = locked.headers.get("set-cookie")?.split(";")[0] ?? cookie;
    const again = await handleVerifyEmail(req("fake3@clinic.mx", cookie), gate);
    assert.equal(again.status, 429);
    assert.equal(calls, 3);
  });

  it("does not check again when NeverBounce is not configured", async () => {
    const res = await handleVerifyEmail(req("ada@clinic.mx"), {
      ...deps(async () => ({ status: "success", result: "valid" })),
      apiKey: "",
    });
    assert.equal(res.status, 503);
  });
});
