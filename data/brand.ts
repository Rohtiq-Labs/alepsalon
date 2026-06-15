export const brand = {
  name: "Alep Salon",
  monogram: "A",
  tagline: "Barber studio · Rue de Morat",
  city: {
    de: "Biel",
    fr: "Bienne",
    full: "Biel / Bienne",
    country: "Switzerland",
  },
  address: {
    street: "Rue de morat 10",
    postal: "2502",
  },
  hours: "Mon – Sat · 09:00 – 19:00",
  instagram: "@alepsalon",
  bookingLabel: "Salonkee",
} as const;

export const tickerItems = [
  "Rue de Morat 10",
  "Burst Fade",
  "Précision Suisse",
  "Biel · Bienne",
  "Walk-ins Welcome",
  "Fade & Taper",
  brand.instagram,
];
