// Single edit point for identity + contact + copy.
export const site = {
  name: "SRIDHAR MALLADI",
  role: "Developer",
  tagline: "I build interfaces that feel like they have weight to them.",
  about: [
    "I make interactive UI, playful motion, and the small details that make software feel considered rather than assembled.",
    "Comfortable across the stack, happiest on the front end — animation, layout systems, and interactions that hold up under real use.",
  ],
  focus: [
    "Frontend Engineering",
    "Interaction Design",
    "Motion Systems",
    "Creative Coding",
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
    email: "shridhar123malladi@gmail.com",
  },
} as const;

export type Site = typeof site;
