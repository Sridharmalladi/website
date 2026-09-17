"use client";

import { site } from "@/config/site";

/** Name, then one line about the work. Nothing else. */
export default function Hero() {
  return (
    <div>
      <h1 className="text-[13vw] font-normal leading-[1.05] tracking-[0.02em] sm:text-6xl">
        {site.name}
      </h1>
      <p className="mt-4 text-lg leading-snug sm:text-xl" style={{ color: "var(--text-dim)" }}>
        {site.tagline}
      </p>
    </div>
  );
}
