// Single edit point for identity + contact + the product shelf.
export const site = {
  name: "SRIDHAR MALLADI",
  // Not printed on the page any more — this is the meta description and the
  // social card subtitle only.
  tagline: "Data scientist working on LLMs and models in production.",

  // Each entry is a product on the shelf: an image, a name, a live link.
  // `shot` is a 1440x900 picture of the project's own output, sitting in
  // /public/shots. `blurb` is what the tile says when you hover it — plain
  // words, no jargon, two sentences at most.
  projects: [
    {
      name: "Judge Loop",
      blurb:
        "An LLM writes an answer, a second one scores it, and the first tries again. You watch it improve round after round, and see where it stops improving.",
      href: "https://judge-loop.netlify.app/",
      shot: "/shots/judge-loop.png",
      alt: "Judge Loop landing page: pixel-art dusk highway with the mode picker",
    },
    {
      name: "dsbuddy",
      blurb:
        "Drop in a spreadsheet and walk out with answers. It profiles the data, trains models on it, and says in plain English what actually drives the numbers.",
      href: "https://www.dsbuddy.com/",
      shot: "/shots/dsbuddy.png",
      alt: "dsbuddy landing page showing a live dataset analysis panel",
    },
    {
      name: "signup-conversion-model",
      blurb:
        "Predicts who will not finish signing up. The honest finding: once a leaky feature is removed and the split respects time, knowing who will not convert turns out to be worth very little.",
      href: "https://github.com/Sridharmalladi/signup-conversion-model",
      shot: "/shots/signup-conversion-model.jpg",
      alt: "Bar chart: actual conversion rate by predicted-risk decile, 0.4% in the highest-risk tenth up to 43% in the lowest",
    },
    {
      name: "RAGLens",
      blurb:
        "Asks one question four ways — no search, dense search, hybrid, and hybrid with reranking — then has another model grade every answer, so you can see what searching actually bought.",
      href: "https://github.com/Sridharmalladi/RAGLens",
      shot: "/shots/raglens.jpg",
      alt: "RAGLens: the four retrieval configs side by side, from no RAG to hybrid with a cross-encoder rerank",
    },
    {
      name: "jobfinddaily",
      blurb:
        "An MCP server your assistant talks to. It finds remote AI and ML jobs, drops the ones you are not eligible for, and keeps track of the ones you applied to.",
      href: "https://github.com/Sridharmalladi/jobfinddaily",
      shot: "/shots/jobfinddaily.jpg",
      alt: "The jobfinddaily MCP server answering tools/list with its ten job-hunting tools",
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
