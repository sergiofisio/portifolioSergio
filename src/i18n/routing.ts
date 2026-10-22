import { defineRouting } from "next-intl/routing";

export const locales = ["pt", "en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "pt",
});
