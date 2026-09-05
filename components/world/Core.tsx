"use client";

import Contact from "@/components/Contact";

const CRACKS = [
  "M800 350 L760 280 L790 220 L750 150",
  "M800 350 L860 260 L830 190 L870 120",
  "M800 350 L720 380 L680 330 L630 360",
  "M800 350 L900 400 L940 350 L1000 390",
  "M800 350 L780 440 L810 500 L780 560",
];

/** Zone 7: the Earth's core. The finale — holds the contact content. */
export default function Core() {
  return (
    <section
      className="relative min-h-[115vh] overflow-hidden"
      style={{ background: "linear-gradient(to bottom, var(--fossil-3), var(--core-outer) 30%, var(--core-outer) 100%)" }}
    >
      <span className="zone-label">CORE</span>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {CRACKS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--core-mid)" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
        ))}

        <g className="cityscape-anim" style={{ animation: "sun-pulse 5s ease-in-out infinite" }}>
          <circle cx="800" cy="350" r="260" fill="var(--core-mid)" opacity="0.22" />
          <circle cx="800" cy="350" r="170" fill="var(--core-mid)" opacity="0.55" />
          <circle cx="800" cy="350" r="100" fill="var(--core-center)" />
        </g>
      </svg>

      <div className="relative z-10 flex min-h-[100vh] flex-col justify-center px-6 py-24 sm:px-10">
        <Contact />
      </div>
    </section>
  );
}
