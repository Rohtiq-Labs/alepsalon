import { de } from "@/data/dictionaries/de";
import { en } from "@/data/dictionaries/en";
import { fr } from "@/data/dictionaries/fr";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/types/locale";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  fr,
  de,
};

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
