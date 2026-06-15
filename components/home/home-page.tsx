"use client";

import { AboutMedia } from "@/components/about/about-media";
import { GalleryVideo } from "@/components/gallery/gallery-video";
import { HeroVideo } from "@/components/hero/hero-video";
import { SiteNav } from "@/components/navigation/site-nav";
import { StyledMap } from "@/components/visit/styled-map";
import { useLocale } from "@/context/locale-context";
import { brand } from "@/data/brand";
import { contactInfo } from "@/data/contact";
import { gallerySources, pillarNums, serviceMeta } from "@/data/site-content";

const INSTAGRAM_URL = "https://www.instagram.com/alepsalon/";
const BOOKING_URL = "https://salonkee.ch/salon/alep-salon";

export const HomePage = () => {
  const { t } = useLocale();
  const [featuredVoice, ...otherVoices] = t.testimonials;

  return (
    <>
      <SiteNav />

      <header className="opener">
        <div className="opener-media" aria-hidden="true">
          <HeroVideo alt={t.hero.videoAlt} />
        </div>
        <div className="opener-shade" aria-hidden="true" />
        <div className="opener-layout">
          <div className="opener-copy">
            <p className="opener-kicker">
              {brand.address.street} · {brand.city.full}
            </p>
            <h1 className="opener-title">
              Alep
              <br />
              <em>Salon</em>
            </h1>
            <p className="opener-lead">{t.hero.lead}</p>
          </div>
          <div className="opener-aside">
            <p className="opener-note">{t.hero.note}</p>
            <div className="opener-actions">
              <a
                className="btn-light"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener"
              >
                {t.hero.reserve}
              </a>
              <a className="btn-text-light" href="#work">
                {t.hero.seeWork}
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="prologue" aria-label={t.prologue.ariaLabel}>
        <div className="prologue-inner">
          <p className="prologue-quote">{t.prologue.quote}</p>
          <div className="prologue-meta">
            <span>{t.brand.hours}</span>
            <span className="prologue-divider" aria-hidden="true" />
            <span>{t.prologue.walkIns}</span>
            <span className="prologue-divider" aria-hidden="true" />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
              {brand.instagram}
            </a>
          </div>
        </div>
      </section>

      <section className="menu" id="menu">
        <div className="menu-head">
          <h2 className="menu-title">{t.menu.title}</h2>
          <p className="menu-intro">{t.menu.intro}</p>
        </div>
        <ul className="menu-list">
          {serviceMeta.map((meta, index) => {
            const service = t.services[index];
            return (
              <li
                className={`menu-row${meta.signature ? " menu-row--signature" : ""}`}
                key={meta.num}
              >
                <span className="menu-row-num">{meta.num}</span>
                <div className="menu-row-body">
                  <div className="menu-row-top">
                    <h3 className="menu-row-name">{service.name}</h3>
                    {meta.signature ? (
                      <span className="menu-row-tag">{t.menu.houseCut}</span>
                    ) : null}
                  </div>
                  <p className="menu-row-desc">{service.desc}</p>
                </div>
                <div className="menu-row-price">
                  <span>{meta.price}</span>
                  <span className="menu-row-duration">{service.duration}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="studio" id="studio">
        <div className="studio-media">
          <AboutMedia alt={t.studio.videoAlt} />
          <div className="studio-media-caption">
            <span>{brand.city.de}</span>
            <span>{brand.city.fr}</span>
          </div>
        </div>
        <div className="studio-copy">
          <p className="studio-label">{t.studio.label}</p>
          <h2 className="studio-heading">{t.studio.heading}</h2>
          <p className="studio-body">{t.studio.body}</p>
          <ul className="studio-pillars">
            {pillarNums.map((num, index) => {
              const pillar = t.pillars[index];
              return (
                <li className="studio-pillar" key={num}>
                  <span className="studio-pillar-title">{pillar.title}</span>
                  <span className="studio-pillar-desc">{pillar.desc}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="reel" id="work">
        <div className="reel-head">
          <div>
            <p className="reel-label">{t.reel.label}</p>
            <h2 className="reel-title">{t.reel.title}</h2>
          </div>
          <a
            className="reel-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
          >
            {brand.instagram} →
          </a>
        </div>
        <div className="reel-track" role="list">
          {gallerySources.map((src, index) => (
            <article
              className={`reel-item reel-item--${index % 3}`}
              key={src}
              role="listitem"
            >
              <GalleryVideo src={src} alt={t.gallery[index].alt} />
              <span className="reel-item-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="voices" id="voices" aria-label={t.voices.ariaLabel}>
        <blockquote className="voice-lead">
          <p>&ldquo;{featuredVoice.quote}&rdquo;</p>
          <footer>
            <cite>{featuredVoice.name}</cite>
            <span>{featuredVoice.detail}</span>
          </footer>
        </blockquote>
        <div className="voice-rest">
          {otherVoices.map((voice) => (
            <blockquote className="voice-card" key={voice.name}>
              <p>&ldquo;{voice.quote}&rdquo;</p>
              <footer>
                <cite>{voice.name}</cite>
                <span>{voice.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="visit" id="visit">
        <div className="visit-grid">
          <div className="visit-copy">
            <p className="visit-label">{t.visit.label}</p>
            <h2 className="visit-heading">
              {t.visit.headingLine1}
              <br />
              <em>{t.visit.headingEm}</em>
            </h2>
            <p className="visit-body">{t.visit.body}</p>

            <address className="visit-address">
              {contactInfo.address.street}
              <br />
              {contactInfo.address.city}
              <br />
              {t.visit.country}
            </address>

            <p className="visit-hours">{t.brand.hours}</p>
            <p className="visit-note">{t.visit.hoursNote}</p>

            <div className="visit-links">
              <a
                className="btn-dark"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener"
              >
                {t.visit.bookVia}
              </a>
              <a
                className="btn-ghost-dark"
                href={contactInfo.directionsUrl}
                target="_blank"
                rel="noopener"
              >
                {t.visit.directions}
              </a>
              <a
                className="btn-ghost-dark"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener"
              >
                {brand.instagram}
              </a>
            </div>
          </div>
          <StyledMap />
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <span className="site-footer-logo">
              {brand.monogram}lep Salon
            </span>
            <p>{t.brand.tagline}</p>
          </div>
          <nav className="site-footer-nav" aria-label={t.footer.ariaLabel}>
            <a href="#menu">{t.nav.menu}</a>
            <a href="#studio">{t.nav.studio}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#visit">{t.nav.visit}</a>
            <a href={BOOKING_URL} target="_blank" rel="noopener">
              {t.nav.book}
            </a>
          </nav>
          <p className="site-footer-copy">
            © {new Date().getFullYear()} {brand.name} · {brand.address.street},{" "}
            {brand.city.full} · {t.footer.rights}
          </p>
        </div>
      </footer>
    </>
  );
};
