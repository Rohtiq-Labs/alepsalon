export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I come from Delémont every three weeks. The fade is always clean — same neckline, same blend. That consistency is rare.",
    name: "Yannick B.",
    detail: "Biel · Regular",
  },
  {
    quote:
      "Walked in on a Saturday without booking. Still got a proper cut, not a rushed job. Felt like the only client in the room.",
    name: "Samir H.",
    detail: "Walk-in",
  },
  {
    quote:
      "The burst fade is why people know this place. Curved clean around the ear — you see the difference immediately.",
    name: "Noah F.",
    detail: "Burst Fade",
  },
];
