// Single edit point for identity + contact + the product shelf.
export const site = {
  name: "SRIDHAR MALLADI",
  // Not printed on the page any more — this is the meta description and the
  // social card subtitle only.
  tagline: "Data scientist working on LLMs and models in production.",

  // Each entry is a product on the shelf: an image, a name, a live link.
  //
  // `shot` is a 1440x900 picture of the project's own output — a screenshot of
  // the thing running, a chart drawn from its real artifacts, a diagram of what
  // it actually wires together. Never stock art: the picture has to say what
  // the project does. It sits in /public/shots.
  //
  // `blurb` is what appears when the tile is hovered, and it is written off the
  // project's README, in three beats and under about forty-five words:
  //
  //   1. what it does, in the plainest words that are still true
  //   2. how it works, in one clause — the mechanism, not the stack
  //   3. what it is actually good for, or the thing it found out
  //
  // No jargon that the README itself does not earn, and no adjectives doing
  // work that a number could do. Same recipe for every project added later.
  projects: [
    {
      name: "Judge Loop",
      blurb:
        "An LLM answers, a second model grades the answer, and the first rewrites it — round after round. Three modes: refine against itself, judge across models, or tune the prompt. Every round streams over a websocket, so you watch exactly where it stops getting better.",
      href: "https://judge-loop.netlify.app/",
      shot: "/shots/judge-loop.png",
      alt: "Judge Loop landing page: pixel-art dusk highway with the mode picker",
    },
    {
      name: "dsbuddy",
      blurb:
        "Pick a dataset, name the column you care about, and it runs the whole pipeline: 200-odd statistics, then real model fits scored on a fifth of the data they never saw. Claude writes it up and flags leakage. Say \"drop that column\" and it genuinely reruns.",
      href: "https://www.dsbuddy.com/",
      shot: "/shots/dsbuddy.png",
      alt: "dsbuddy landing page showing a live dataset analysis panel",
    },
    {
      name: "signup-conversion-model",
      blurb:
        "Predicts who will not finish signing up. Removing one leaky feature took it from 0.93 to 0.78, and splitting by time took it to 0.68 — and then the real finding: with 84% failing anyway, knowing who will not convert buys 1.19x over picking at random.",
      href: "https://github.com/Sridharmalladi/signup-conversion-model",
      shot: "/shots/signup-conversion-model.jpg",
      alt: "Bar chart: actual conversion rate by predicted-risk decile, 0.4% in the highest-risk tenth up to 43% in the lowest",
    },
    {
      name: "RAGLens",
      blurb:
        "Runs one question four ways at once — no search, dense, hybrid, and hybrid with a reranker — over a shelf of 50 papers, and has a second model grade every answer. Each card opens to show the exact chunks retrieval fed the model, so you can see what searching actually bought.",
      href: "https://github.com/Sridharmalladi/RAGLens",
      shot: "/shots/raglens.jpg",
      alt: "RAGLens: the four retrieval configs side by side, from no RAG to hybrid with a cross-encoder rerank",
    },
    {
      name: "jobfinddaily",
      blurb:
        "An MCP server your assistant talks to in plain English. It pulls remote AI/ML roles from HN Who Is Hiring, RemoteOK and Tavily, drops the senior and no-sponsorship ones with plain regex rather than an LLM, scores the rest, and tracks what you applied to.",
      href: "https://github.com/Sridharmalladi/jobfinddaily",
      shot: "/shots/jobfinddaily-mcp.jpg",
      alt: "How jobfinddaily is wired: Claude Desktop's MCP client on the left, the server over stdio, and the three things it does — find jobs, find people, track applications",
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
