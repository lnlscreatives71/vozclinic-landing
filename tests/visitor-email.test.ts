import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normalizeVisitorEmail } from "../src/lib/visitor-email.ts";
import {
  requiredWebsiteEmail,
  WEBSITE_CHANNEL,
  websiteParticipantAttributes,
  VOZ_CHANNEL_ATTR,
  VOZ_EMAIL_ATTR,
} from "../src/lib/website-token.ts";

describe("visitor email", () => {
  it("normalizes a valid address", () => {
    assert.equal(normalizeVisitorEmail("  Ada@Clinic.MX  "), "ada@clinic.mx");
  });

  it("rejects missing and malformed addresses", () => {
    assert.equal(normalizeVisitorEmail(""), null);
    assert.equal(normalizeVisitorEmail("not-an-email"), null);
    assert.equal(normalizeVisitorEmail("ada@clinic"), null);
  });
});

describe("website token attributes", () => {
  it("stamps the signed website channel and ignores client channel spoofing", () => {
    const email = requiredWebsiteEmail({
      visitor_email: "Ada@Clinic.mx",
      participant_attributes: {
        [VOZ_CHANNEL_ATTR]: "playground",
        [VOZ_EMAIL_ATTR]: "other@example.com",
      },
    });
    assert.equal(email, "ada@clinic.mx");
    const attrs = websiteParticipantAttributes(email!);
    assert.equal(attrs[VOZ_CHANNEL_ATTR], WEBSITE_CHANNEL);
    assert.equal(attrs[VOZ_EMAIL_ATTR], "ada@clinic.mx");
  });

  it("requires an email before a token can be minted", () => {
    assert.equal(requiredWebsiteEmail({}), null);
    assert.equal(
      requiredWebsiteEmail({ participant_attributes: { [VOZ_EMAIL_ATTR]: "nope" } }),
      null,
    );
  });
});
