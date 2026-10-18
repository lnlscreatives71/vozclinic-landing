import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const src = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/components/sofia/SofiaAgent.tsx"),
  "utf8",
);

describe("Sofía website email gate", () => {
  it("does not start the call until a validated email is submitted", () => {
    assert.match(src, /phase === 'email'/);
    assert.match(src, /SofiaEmailGate/);
    assert.match(src, /normalizeVisitorEmail/);
    assert.match(src, /websiteParticipantAttributes/);
    assert.doesNotMatch(src, /SofiaIdle[\s\S]*onStart=\{\(\) => setPhase\('live'\)\}/);
  });

  it("shows a bilingual privacy notice that is not marketing consent", () => {
    assert.match(src, /This is not marketing consent/);
    assert.match(src, /No es un consentimiento de marketing/);
  });
});
