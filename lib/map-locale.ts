import type { Locale } from "@/types/locale";

const MAP_HL: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  de: "de",
};

export const getMapEmbedUrl = (baseUrl: string, locale: Locale): string =>
  baseUrl.replace(/hl=[a-z]{2}/, `hl=${MAP_HL[locale]}`);
