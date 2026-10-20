import { normalizeVisitorEmail } from "./visitor-email.ts";

export const VOZ_CHANNEL_ATTR = "voz_channel";
export const VOZ_EMAIL_ATTR = "voz_email";
export const VOZ_EMAIL_PROOF_ATTR = "voz_email_proof";
export const WEBSITE_CHANNEL = "website";

export type TokenAttributeInput = {
  visitor_email?: string;
  participant_attributes?: Record<string, string>;
};

export function websiteParticipantAttributes(
  email: string,
  proof?: string,
): Record<string, string> {
  const attrs: Record<string, string> = {
    [VOZ_CHANNEL_ATTR]: WEBSITE_CHANNEL,
    [VOZ_EMAIL_ATTR]: email,
  };
  if (proof) attrs[VOZ_EMAIL_PROOF_ATTR] = proof;
  return attrs;
}

export function requiredWebsiteEmail(input: TokenAttributeInput): string | null {
  return normalizeVisitorEmail(
    input.visitor_email ?? input.participant_attributes?.[VOZ_EMAIL_ATTR],
  );
}
