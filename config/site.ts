export type Project = {
  id: string;
  name: string;
  category: "Data & ML" | "AI systems" | "Experiments";
  teaser: string;
  summary: string;
  detail: string;
  href: string;
  shot: string;
  alt: string;
  featured: boolean;
  tags: string[];
  linkLabel: "Open project" | "View source" | "Try it" | "View extension";
};

export const site = {
  name: "Sridhar Malladi",
  url: "https://sridharmalladi.online",
  tagline: "Associate AI Engineer. Curious, collaborative, pragmatic.",
  projects: [
    {
      id: "cityfit",
      teaser: "Find a city that fits your life.",
      name: "CityFit",
      category: "Data & ML",
      summary:
        "Explore 32,333 US places through the things that matter to you: rent, commute, air quality, and climate. See how changing your priorities changes the ranking, with uncertainty and data age in view.",
      detail:
        "Census, EPA, and NOAA data feed a transparent ranking, while a trained model finds similar places and estimates missing rent. On places in states held out from training, the rent model averages $188 error, compared with $320 for the median baseline.",
      href: "https://sridharmalladi.github.io/cityfit/",
      shot: "/shots/cityfit.png",
      alt: "CityFit map with priority sliders and places ranked by rent, commute, and climate",
      featured: true,
      tags: ["Analytics", "Forecasting"],
      linkLabel: "Open project",
    },
    {
      id: "prior-auth-criteria-engine",
      teaser: "Make policy decisions traceable.",
      name: "Prior Auth Criteria Engine",
      category: "AI systems",
      summary:
        "A prototype that checks clinical notes against a published Medicare coverage policy. It turns policy clauses into explicit criteria and points to the clause behind each decision.",
      detail:
        "The policy becomes a tree of true, false, and unknown criteria, evaluated against structured facts from the note. In a small internal evaluation, it matched all expected decisions and identified the correct blocking clause for 6 of 8 denials. Those results do not establish clinical reliability.",
      href: "https://sridharmalladi.github.io/prior-auth-criteria-engine/",
      shot: "/shots/prior-auth-criteria-engine.jpg",
      alt: "Policy criteria tree beside a clinical note, highlighted evidence, and a decision breakdown",
      featured: true,
      tags: ["Healthcare", "GenAI"],
      linkLabel: "Open project",
    },
    {
      id: "judge-loop",
      teaser: "See where iteration helps.",
      name: "Judge Loop",
      category: "AI systems",
      summary:
        "Watch a model write, receive feedback, and revise its answer over successive rounds. Compare refinement modes and inspect the point where another round stops making a difference.",
      detail:
        "Choose self refinement, judging across models, or prompt tuning. Each round streams live, exposing the answers and scores so you can inspect what changed instead of seeing only the final response.",
      href: "https://judge-loop.netlify.app/",
      shot: "/shots/judge-loop.png",
      alt: "Judge Loop mode picker over a pixel art highway at dusk",
      featured: true,
      tags: ["GenAI", "Evaluation"],
      linkLabel: "Try it",
    },
    {
      id: "dsbuddy",
      teaser: "Find the weak spots in your data.",
      name: "dsbuddy",
      category: "Data & ML",
      summary:
        "Give it a dataset and a target column. It checks the data, trains models, and explains the results, with an emphasis on catching leakage before trusting a score.",
      detail:
        "The workflow runs about 200 checks and evaluates models on a held out fifth of the rows. Claude summarizes the findings and flags potential leakage; requests such as dropping a column rerun the analysis and training.",
      href: "https://www.dsbuddy.com/",
      shot: "/shots/dsbuddy.png",
      alt: "dsbuddy landing page with a dataset analysis panel",
      featured: true,
      tags: ["Analytics", "ML"],
      linkLabel: "Try it",
    },
    {
      id: "partycam",
      teaser: "Turn gestures into play.",
      name: "PartyCam",
      category: "Experiments",
      summary:
        "A webcam playground where face and hand gestures control virtual props. Pinch a pizza slice or blow out birthday candles, with tracking running directly in your browser.",
      detail:
        "MediaPipe tracks hands and faces on the device without uploading camera footage. The interactions turn those landmarks into gestures for pizza, candles, and a pixel cigarette, with no app installation required.",
      href: "https://sridharmalladi.github.io/partycam/",
      shot: "/shots/partycam.jpg",
      alt: "PartyCam start screen listing face and hand gestures above the camera button",
      featured: false,
      tags: ["Vision", "Play"],
      linkLabel: "Try it",
    },
    {
      id: "signup-conversion-model",
      teaser: "Catch the score that misleads.",
      name: "Signup conversion",
      category: "Data & ML",
      summary:
        "A study in how a promising prediction score can unravel. Removing a leaky feature and testing on a later time period exposed the limits of predicting signup abandonment.",
      detail:
        "Removing one leaky feature reduced the reported score from 0.93 to 0.78; a time based split reduced it to 0.68. With 84% of users already not converting, targeting predicted nonconverters was only 1.19 times better than random selection.",
      href: "https://github.com/Sridharmalladi/signup-conversion-model",
      shot: "/shots/signup-conversion-model.jpg",
      alt: "Conversion rates by predicted risk decile, from 0.4% in the highest risk group to 43% in the lowest",
      featured: false,
      tags: ["Analytics", "ML"],
      linkLabel: "View source",
    },
    {
      id: "raglens",
      teaser: "See what retrieval changed.",
      name: "RAGLens",
      category: "AI systems",
      summary:
        "Ask one question and compare four retrieval setups side by side. Inspect the answers, model grades, and source chunks to see what each search strategy contributes to the response.",
      detail:
        "The comparison runs no retrieval, dense search, hybrid search, and hybrid search with reranking over 50 papers. A second model grades each answer, while expandable cards reveal the exact chunks supplied as context.",
      href: "https://huggingface.co/spaces/Malladi05/raglens",
      shot: "/shots/raglens.jpg",
      alt: "Four RAGLens answer panels comparing no retrieval, dense search, hybrid search, and reranking",
      featured: false,
      tags: ["RAG", "Evaluation"],
      linkLabel: "Try it",
    },
    {
      id: "jobfinddaily",
      teaser: "Make job search less manual.",
      name: "Job Find Daily",
      category: "AI systems",
      summary:
        "An MCP server that lets an assistant search remote AI and ML jobs, filter listings, and track applications. Explicit text rules handle seniority and sponsorship filtering before results are scored.",
      detail:
        "It gathers listings through HN Who Is Hiring, RemoteOK, Tavily, and Firecrawl. Regular expressions filter senior roles and listings without visa sponsorship before the remaining opportunities are scored and application progress is recorded.",
      href: "https://github.com/Sridharmalladi/jobfinddaily",
      shot: "/shots/jobfinddaily-mcp.jpg",
      alt: "Job Find Daily architecture connecting an MCP client to job search, people search, and application tracking",
      featured: false,
      tags: ["MCP", "Automation"],
      linkLabel: "View source",
    },
    {
      id: "scroll-miles",
      teaser: "See your scrolling add up.",
      name: "Scroll Miles",
      category: "Experiments",
      summary:
        "A Chrome extension that turns scrolling into distance. Daily and weekly views make an easy to overlook habit visible, with achievements marking the miles as they add up.",
      detail:
        "The extension counts scrolling in the background and converts it into miles. A dashboard shows daily and weekly activity, giving the habit a concrete measure you can check over time.",
      href: "https://chromewebstore.google.com/detail/scroll-miles/kdeibhcngffpofgiaglnbhfpiocffihh",
      shot: "/shots/scroll-miles.jpg",
      alt: "Scroll Miles website introducing the scrolling distance extension",
      featured: false,
      tags: ["Analytics", "Browser"],
      linkLabel: "View extension",
    },
    {
      id: "focado",
      teaser: "A tiny timer for deep work.",
      name: "focado",
      category: "Experiments",
      summary:
        "A small avocado on your Mac desktop keeps time for a focused work session. Start a 25 minute block, then take a break, with the countdown in its pit.",
      detail:
        "Built in Swift, the timer starts with the Enter key and moves from a focus block to a break. The avocado is drawn pixel by pixel in code and lives in a single small window.",
      href: "https://github.com/Sridharmalladi/focado",
      shot: "/shots/focado.jpg",
      alt: "Pixel avocado timer with a 25:00 countdown and a start prompt in its pit",
      featured: false,
      tags: ["macOS", "Focus"],
      linkLabel: "View source",
    },
    {
      id: "hungerheal",
      teaser: "Put surplus food to use.",
      name: "HungerHeal",
      category: "Experiments",
      summary:
        "A hackathon project connecting surplus food with nearby people and organizations. Businesses post what is available and when it expires, while a map helps others find it for collection.",
      detail:
        "Listings include location, quantity, and expiry time; adding identification increases the listing's trust score. NGOs, shelters, and neighbours can find food on a live map, and expired posts are removed automatically.",
      href: "https://healhunger.streamlit.app/",
      shot: "/shots/hungerheal.jpg",
      alt: "HungerHeal interface with navigation tabs and food waste figures",
      featured: false,
      tags: ["Community", "Maps"],
      linkLabel: "Try it",
    },
    {
      id: "prepify",
      teaser: "Practice the questions that matter.",
      name: "Prepify",
      category: "AI systems",
      summary:
        "An interview practice tool built with a friend at a hackathon. A speaking avatar asks questions tailored to a role, follows up on answers, and scores the completed session.",
      detail:
        "Provide the company, role, resume, and job description to shape the interview. The avatar listens and speaks back, while saved attempts let you compare scores across practice sessions.",
      href: "https://github.com/Sridharmalladi/prepify",
      shot: "/shots/prepify.jpg",
      alt: "Prepify dashboard showing previous interview scores and a form to start a practice session",
      featured: false,
      tags: ["GenAI", "Voice"],
      linkLabel: "View source",
    },
  ] satisfies Project[],
  socials: {
    github: "https://github.com/Sridharmalladi",
    linkedin: "https://www.linkedin.com/in/sridhar-malladi/",
    email: "sridhar.malladi05@gmail.com",
  },
} as const;

export type Site = typeof site;
