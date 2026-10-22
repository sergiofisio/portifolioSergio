export const contactReasons = ["project", "job", "other"] as const;
export type ContactReason = (typeof contactReasons)[number];

export function isContactEmailEnabled() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.CONTACT_TO_EMAIL);
}

export function whatsappLink(phoneUrl: string, text: string) {
  return `${phoneUrl}?text=${encodeURIComponent(text)}`;
}
