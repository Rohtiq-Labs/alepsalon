"use client";

import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { useLocale } from "@/context/locale-context";
import { brand } from "@/data/brand";

const BOOKING_URL = "https://salonkee.ch/salon/alep-salon";

const navHrefs = [
  { href: "#menu", key: "menu" as const },
  { href: "#studio", key: "studio" as const },
  { href: "#work", key: "work" as const },
  { href: "#visit", key: "visit" as const },
];

export const SiteNav = () => {
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navClass = [
    "site-nav",
    scrolled ? "site-nav--solid" : "site-nav--over-media",
    menuOpen ? "nav-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav className={navClass}>
        <a className="nav-logo" href="#" onClick={closeMenu}>
          <span className="nav-logo-mark">{brand.monogram}</span>
          <span className="nav-logo-text">lep</span>
        </a>

        <ul className="nav-links nav-links-desktop">
          {navHrefs.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{t.nav[link.key]}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <LanguageSwitcher />
          <a
            className="nav-book nav-book-desktop"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener"
          >
            {t.nav.book}
          </a>

          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav-panel"
        className={`nav-mobile-panel${menuOpen ? " nav-mobile-panel-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav-links nav-links-mobile">
          {navHrefs.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {t.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="nav-book nav-book-mobile"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener"
          onClick={closeMenu}
        >
          {t.nav.bookChair}
        </a>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="nav-overlay"
          aria-label={t.nav.closeMenu}
          onClick={closeMenu}
        />
      )}
    </>
  );
};
