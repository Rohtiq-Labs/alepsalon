export const serviceMeta = [
  { num: "01", price: "CHF 35", signature: false },
  { num: "02", price: "CHF 40", signature: false },
  { num: "03", price: "CHF 45", signature: true },
  { num: "04", price: "CHF 20", signature: false },
  { num: "05", price: "CHF 55", signature: false },
  { num: "06", price: "CHF 25", signature: false },
] as const;

export const gallerySources = [
  "/assets/videos/gallery/gal-.mp4",
  "/assets/videos/gallery/gal-02.mp4",
  "/assets/videos/gallery/gal-03.mp4",
  "/assets/videos/gallery/gal-04.mp4",
  "/assets/videos/gallery/gal-05.mp4",
  "/assets/videos/gallery/gal-06.mp4",
] as const;

export const pillarNums = ["01", "02", "03", "04"] as const;
