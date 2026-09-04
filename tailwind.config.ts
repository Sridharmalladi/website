import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ["var(--font-pixel)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-ink": "var(--accent-ink)",
        panel: "var(--panel)",
        ink: "var(--text)",
        "ink-dim": "var(--text-dim)",
      },
      keyframes: {
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        blink: { "0%,90%,100%": { opacity: "1" }, "95%": { opacity: "0.15" } },
      },
      animation: {
        bob: "bob 2.2s ease-in-out infinite",
        "rise-in": "rise-in 260ms cubic-bezier(0.16,1,0.3,1) both",
        blink: "blink 3.5s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
