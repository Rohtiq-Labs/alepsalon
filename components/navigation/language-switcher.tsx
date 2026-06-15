"use client";

import { useEffect, useId, useRef, useState } from "react";

import { useLocale } from "@/context/locale-context";
import type { Dictionary } from "@/types/dictionary";
import { LOCALES, type Locale } from "@/types/locale";

type LangKey = keyof Dictionary["lang"];

const localeMeta: Record<Locale, { code: LangKey; switch: LangKey }> = {
  en: { code: "en", switch: "switchToEn" },
  fr: { code: "fr", switch: "switchToFr" },
  de: { code: "de", switch: "switchToDe" },
};

export const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (next: Locale) => {
    if (next !== locale) {
      setLocale(next);
    }
    setOpen(false);
  };

  return (
    <div className={`lang-switcher${open ? " lang-switcher--open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="lang-switcher-trigger"
        aria-label={t.lang.label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span>{t.lang[localeMeta[locale].code]}</span>
        <span
          className={`lang-switcher-chevron${open ? " lang-switcher-chevron--open" : ""}`}
          aria-hidden="true"
        />
      </button>

      <ul
        id={menuId}
        className="lang-switcher-menu"
        role="menu"
        aria-label={t.lang.label}
        hidden={!open}
      >
        {LOCALES.map((value) => {
          const meta = localeMeta[value];

          return (
            <li key={value} role="none">
              <button
                type="button"
                className={`lang-switcher-option${locale === value ? " lang-switcher-option--active" : ""}`}
                role="menuitem"
                aria-label={t.lang[meta.switch]}
                aria-current={locale === value ? "true" : undefined}
                onClick={() => handleSelect(value)}
              >
                {t.lang[meta.code]}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
