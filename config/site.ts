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
  // a placeholder while the list is empty.
  projects: [] as { name: string; blurb: string; href?: string }[],

  socials: {
    github: "https://github.com/Sridharmalladi",
    // TODO(sridhar): confirm your real LinkedIn handle.
    linkedin: "https://www.linkedin.com/in/sridharmalladi/",
    email: "shridhar123malladi@gmail.com",
  },
} as const;

export type Site = typeof site;
