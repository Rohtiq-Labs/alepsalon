export type Service = {
  num: string;
  name: string;
  desc: string;
  price: string;
  duration: string;
  signature?: boolean;
};

export const services: Service[] = [
  {
    num: "01",
    name: "Classic Haircut",
    desc: "Cut to your face and lifestyle — wash, scissor or clipper work, clean finish.",
    price: "CHF 35",
    duration: "45 min",
  },
  {
    num: "02",
    name: "Fade & Taper",
    desc: "Skin to high — blended from neckline up, taper that holds as it grows.",
    price: "CHF 40",
    duration: "50 min",
  },
  {
    num: "03",
    name: "Burst Fade",
    desc: "The house cut. Curved fade around the ear — structure for any length on top.",
    price: "CHF 45",
    duration: "55 min",
    signature: true,
  },
  {
    num: "04",
    name: "Beard Trim",
    desc: "Line-up, shape, detail. Beard work matched to the sharpness of the cut.",
    price: "CHF 20",
    duration: "25 min",
  },
  {
    num: "05",
    name: "Cut + Beard",
    desc: "Full session — haircut, fade, and beard finished in one sitting.",
    price: "CHF 55",
    duration: "70 min",
  },
  {
    num: "06",
    name: "Kids' Cut",
    desc: "Patient, careful cuts for boys. Quick when needed — never sloppy.",
    price: "CHF 25",
    duration: "30 min",
  },
];
