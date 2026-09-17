// Single edit point for identity + contact + the product shelf.
export const site = {
  name: "SRIDHAR MALLADI",
  // Not printed on the page any more — this is the meta description and the
  // social card subtitle only.
  tagline: "Data scientist working on LLMs and models in production.",

  // Each entry is a product on the shelf: an image, a name, a live link.
  // `shot` is either a 1440x900 screenshot of the live site or a piece of
  // art that stands in for what the project does, sitting in /public/shots.
  projects: [
    {
      name: "Judge Loop",
      href: "https://judge-loop.netlify.app/",
      shot: "/shots/judge-loop.png",
      alt: "Judge Loop landing page: pixel-art dusk highway with the mode picker",
    },
    {
      name: "dsbuddy",
      href: "https://www.dsbuddy.com/",
      shot: "/shots/dsbuddy.png",
      alt: "dsbuddy landing page showing a live dataset analysis panel",
    },
    {
      name: "RAGLens",
      href: "https://github.com/Sridharmalladi/RAGLens",
      shot: "/shots/raglens.jpg",
      alt: "White light split into a band of colour against a dark wall",
    },
    {
      name: "jobfinddaily",
      href: "https://github.com/Sridharmalladi/jobfinddaily",
      shot: "/shots/jobfinddaily.jpg",
      alt: "A single amber filament of light sweeping across black",
    },
  ] as {
    name: string;
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
