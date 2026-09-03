// Single edit point for identity + contact. Swap values freely.
export const site = {
  name: "SRIDHAR MALLADI",
  role: "CREATIVE DEVELOPER / SPATIAL DESIGNER",
  bioLines: [
    "I build interactive UI where interface behaves like a material — weight, light and depth.",
    "Custom shaders, spring-driven motion systems and spatial design mechanics.",
    "Frontend engineering with a bias toward things that feel alive.",
  ],
  // Back-of-card deep dive.
  summary:
    "Currently focused on spatial interface R&D: cursor-driven lighting engines, " +
    "GPU-cheap ambient environments, and physics presets that let a whole UI switch " +
    "personality (spring / liquid / rigid) at runtime. Previously shipped design systems, " +
    "WebGL product configurators and motion-heavy marketing sites.",
  codeSnippet: `// spring personality, swapped live from the sidebar
const DYNAMICS = {
  SPRING: { stiffness: 220, damping: 18, mass: 1 },
  LIQUID: { stiffness: 90,  damping: 26, mass: 1.6 },
  RIGID:  { stiffness: 600, damping: 40, mass: 0.6 },
} as const

useSpring(target, DYNAMICS[mode])`,
  socials: {
    github: "https://github.com/Sridharmalladi",
    // TODO(sridhar): confirm your real LinkedIn handle — this is a guess.
    linkedin: "https://www.linkedin.com/in/sridharmalladi/",
    email: "shridhar123malladi@gmail.com",
  },
} as const;

export type Site = typeof site;
