// Single edit point for identity + contact.
export const site = {
  name: "SRIDHAR MALLADI",
  handle: "PLAYER 1",
  tagline: "Developer who builds interfaces that feel like they have weight.",
  about: [
    "I make web things — interactive UI, playful motion, small game-shaped experiments.",
    "This page is one of them: a tiny sleek platformer. Walk around, poke at it.",
    "Projects load onto their own platforms soon.",
  ],
  socials: {
    github: "https://github.com/Sridharmalladi",
    // TODO(sridhar): confirm your real LinkedIn handle.
    linkedin: "https://www.linkedin.com/in/sridharmalladi/",
    email: "shridhar123malladi@gmail.com",
  },
} as const;

export type Site = typeof site;
