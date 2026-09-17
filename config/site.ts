// Single edit point for identity + contact + copy.
export const site = {
  name: "SRIDHAR MALLADI",
  role: "Data Scientist",
  tagline: "Data scientist working on LLMs and models in production.",
  about: [
    "Data science with a focus on AI — fine-tuning LLMs, putting models into production, and monitoring them once they run.",
    "On top of that I build interfaces that make a model's output legible enough to act on.",
  ],

  // Drop real entries in here whenever you're ready; the section renders
  // a placeholder while the list is empty. `shot` is a 1440x900 screenshot of
  // the live site, sitting in /public/shots.
  projects: [
    {
      name: "Judge Loop",
      blurb:
        "Watch an LLM improve its own answer round after round \u2014 it writes, gets judged on six axes, revises, and tries again.",
      href: "https://judge-loop.netlify.app/",
      shot: "/shots/judge-loop.png",
      alt: "Judge Loop landing page: pixel-art dusk highway with the mode picker",
    },
    {
      name: "dsbuddy",
      blurb:
        "Drop in a spreadsheet and get it profiled, modelled, and explained in plain English in under a minute.",
      href: "https://www.dsbuddy.com/",
      shot: "/shots/dsbuddy.png",
      alt: "dsbuddy landing page showing a live dataset analysis panel",
    },
  ] as {
    name: string;
    blurb: string;
    href?: string;
    shot?: string;
    alt?: string;
  }[],

  socials: {
    github: "https://github.com/Sridharmalladi",
    linkedin: "https://www.linkedin.com/in/sridhar-malladi/",
    email: "sridhar.malladi05@gmail.com",
  },
} as const;

export type Site = typeof site;
