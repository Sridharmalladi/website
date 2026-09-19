// Single edit point for identity + contact + the product shelf.
export const site = {
  name: "SRIDHAR MALLADI",
  // Not printed on the page any more. This is the meta description and the
  // social card subtitle only.
  tagline: "Data scientist. I work on LLMs and on models that run in production.",

  // Each entry is a product on the shelf: an image, a name, a live link.
  //
  // `shot` is a 1440x900 picture of the project's own output. It can be a shot of
  // the thing running, a chart drawn from its real artifacts, a diagram of what
  // it actually wires together. Never stock art: the picture has to say what
  // the project does. It sits in /public/shots.
  //
  // `blurb` is what appears when the tile is hovered, and it is written off the
  // project's README, in three beats:
  //
  //   1. what it does, in the plainest words that are still true
  //   2. how it works, which means the mechanism and not the stack
  //   3. what it is actually good for, or the thing it found out
  //
  // House style for every word a visitor reads on this site: simple Indian
  // English, short sentences, and no dashes anywhere. If a sentence wants a
  // dash, it wants a full stop instead. No jargon the README does not earn, and
  // no adjective doing work a number could do. Same recipe for whatever gets
  // added next.
  projects: [
    {
      name: "Judge Loop",
      inspiration:
        "Model council: LLMs debate and judge each other to a better answer.",
      blurb:
        "One model writes an answer. A second model scores it. Then the first one tries again, and this keeps going round after round. You can pick self refinement, judging across models, or prompt tuning. Every round streams live, so you can see the exact point where it stops getting better.",
      href: "https://judge-loop.netlify.app/",
      shot: "/shots/judge-loop.png",
      alt: "Judge Loop landing page, a pixel art highway at dusk with the mode picker",
    },
    {
      name: "dsbuddy",
      inspiration:
        "Data science is repetitive, so I built a buddy to automate it.",
      blurb:
        "Pick a dataset and tell it which column matters. It runs about two hundred checks on the data, trains real models, and scores them on a fifth of the rows they never saw. Claude reads all of that, writes a plain summary, and warns you about leakage. Say drop that column and the whole thing runs again for real.",
      href: "https://www.dsbuddy.com/",
      shot: "/shots/dsbuddy.png",
      alt: "dsbuddy landing page with a live dataset analysis panel",
    },
    {
      name: "signup-conversion-model",
      inspiration:
        "Curious what changing one variable reveals in the data.",
      blurb:
        "This predicts who will not finish signing up. Taking out one leaky feature pulled the score from 0.93 down to 0.78, and splitting the data by time pulled it down to 0.68. The real lesson is that 84 percent do not convert anyway, so knowing who will not convert is only 1.19 times better than picking people at random.",
      href: "https://github.com/Sridharmalladi/signup-conversion-model",
      shot: "/shots/signup-conversion-model.jpg",
      alt: "Bar chart of the actual conversion rate in each predicted risk decile, going from 0.4 percent in the riskiest tenth up to 43 percent in the safest",
    },
    {
      name: "RAGLens",
      inspiration:
        "Wanted every retrieval strategy to answer one prompt, side by side.",
      blurb:
        "It asks one question in four ways at the same time. No search, dense search, hybrid, and hybrid with a reranker, all over a shelf of 50 papers. A second model then grades every answer. Each card opens up to show the exact chunks that were fed in, so you can see what the search step really bought you.",
      href: "https://huggingface.co/spaces/Malladi05/raglens",
      shot: "/shots/raglens.jpg",
      alt: "RAGLens running, with its four retrieval setups laid out side by side, from no search up to hybrid search with a cross encoder rerank",
    },
    {
      name: "jobfinddaily",
      inspiration:
        "Job hunting is repetitive, so I built an assistant to do it.",
      blurb:
        "This is an MCP server that your assistant talks to in plain English. It pulls remote AI and ML jobs from HN Who Is Hiring, RemoteOK, Tavily and Firecrawl, throws out the senior roles and the ones without visa sponsorship using plain regex instead of an LLM, scores whatever is left, and keeps track of what you applied to.",
      href: "https://github.com/Sridharmalladi/jobfinddaily",
      shot: "/shots/jobfinddaily-mcp.jpg",
      alt: "How jobfinddaily is wired. The MCP client of the host app on the left, the server over stdio in the middle, and on the right the three things it does: find jobs, find people, track applications",
    },
    {
      name: "Scroll Miles",
      inspiration:
        "People scroll compulsively, so I made the habit visible.",
      blurb:
        "A Chrome extension that counts how far you scroll and turns it into miles. It sits quietly in the background, keeps a dashboard of the day and the week, and hands out achievements as the miles add up. The point is not to stop you scrolling. It is to make an invisible habit visible.",
      href: "https://chromewebstore.google.com/detail/scroll-miles/kdeibhcngffpofgiaglnbhfpiocffihh",
      shot: "/shots/scroll-miles.jpg",
      alt: "The Scroll Miles site, with the extension logo, the line about turning scrolling into meaningful metrics, and the store badges",
    },
    {
      name: "focado",
      inspiration:
        "I could not focus, so I built a timer to keep the phone away.",
      blurb:
        "A pomodoro timer for macOS that sits on your desktop as a small pixel avocado. Press enter and it starts a 25 minute block, then a break, and the time left shows in the pit. Written in Swift with the art drawn pixel by pixel in code, so it is one little window and nothing else.",
      href: "https://github.com/Sridharmalladi/focado",
      shot: "/shots/focado.jpg",
      alt: "The focado avocado timer on a desktop, showing 25:00 and a start prompt in its pit",
    },
    {
      name: "HungerHeal",
      inspiration:
        "A hackathon idea: let surplus food find people who need it.",
      blurb:
        "Restaurants, bakeries and grocery stores post the food they have left over, with the place, the quantity and the time it goes bad. Adding an ID lifts its trust score, and NGOs, shelters and neighbours find it on a live map and go and collect it. A post deletes itself once it expires, so nobody turns up for food that is already gone.",
      href: "https://healhunger.streamlit.app/",
      shot: "/shots/hungerheal.jpg",
      alt: "HungerHeal running, with its three tabs and the figures on how much food the world throws away",
    },
    {
      name: "prepify",
      inspiration:
        "A hackathon interview buddy with a talking avatar, built with a friend.",
      blurb:
        "Practice for an interview against a digital avatar that plays the interviewer, listening and speaking back to you. Give it the role, the company, your resume and the job description, and it runs the whole interview, follows up on your answers, and scores you at the end. Past attempts are kept, so you can see if you are actually improving.",
      href: "https://github.com/Sridharmalladi/prepify",
      shot: "/shots/prepify.jpg",
      alt: "The prepify dashboard, showing past interview counts and scores above the form that starts a new practice interview",
    },
  ] as {
    name: string;
    inspiration: string;
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
