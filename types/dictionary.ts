export type ServiceCopy = {
  name: string;
  desc: string;
  duration: string;
};

export type TestimonialCopy = {
  quote: string;
  name: string;
  detail: string;
};

export type PillarCopy = {
  title: string;
  desc: string;
};

export type GalleryCopy = {
  alt: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    menu: string;
    studio: string;
    work: string;
    visit: string;
    book: string;
    bookChair: string;
    openMenu: string;
    closeMenu: string;
  };
  lang: {
    label: string;
    en: string;
    fr: string;
    de: string;
    enFull: string;
    frFull: string;
    deFull: string;
    switchToEn: string;
    switchToFr: string;
    switchToDe: string;
  };
  hero: {
    lead: string;
    note: string;
    reserve: string;
    seeWork: string;
    videoAlt: string;
  };
  prologue: {
    ariaLabel: string;
    quote: string;
    walkIns: string;
  };
  menu: {
    title: string;
    intro: string;
    houseCut: string;
  };
  services: ServiceCopy[];
  studio: {
    label: string;
    heading: string;
    body: string;
    videoAlt: string;
  };
  pillars: PillarCopy[];
  reel: {
    label: string;
    title: string;
  };
  gallery: GalleryCopy[];
  voices: {
    ariaLabel: string;
  };
  testimonials: TestimonialCopy[];
  visit: {
    label: string;
    headingLine1: string;
    headingEm: string;
    body: string;
    bookVia: string;
    directions: string;
    country: string;
    hoursNote: string;
  };
  map: {
    directions: string;
    iframeTitle: string;
    ariaLabel: string;
  };
  footer: {
    ariaLabel: string;
    rights: string;
  };
  brand: {
    tagline: string;
    hours: string;
  };
};
