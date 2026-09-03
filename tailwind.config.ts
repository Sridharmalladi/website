import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#05060a",
          900: "#0a0c14",
          800: "#11141f",
          700: "#181c2b",
        },
        spectral: {
          cyan: "#5eead4",
          blue: "#60a5fa",
          violet: "#a78bfa",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.06)",
        glow: "0 0 40px -8px var(--glow-color, rgba(96,165,250,0.5))",
      },
      backdropBlur: { xs: "2px" },
      transitionTimingFunction: {
        spatial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "grid-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        "pulse-slow": {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "grid-drift": "grid-drift 12s linear infinite",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
