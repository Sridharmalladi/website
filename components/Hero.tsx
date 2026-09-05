"use client";

import { site } from "@/config/site";
import SocialLinks from "@/components/SocialLinks";

/** Pure content — the Space zone owns the background, layout, and scrim. */
export default function Hero() {
  return (
    <div>
      <p className="font-pixel text-xs tracking-[0.3em]" style={{ color: "var(--accent)" }}>
        PORTFOLIO / 2026
      </p>

      <h1 className="mt-4 max-w-3xl text-[13vw] font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
        {site.name}
      </h1>

      <p className="mt-4 max-w-xl text-lg sm:text-xl" style={{ color: "var(--text-dim)" }}>
        {site.tagline}
      </p>

      <SocialLinks solid className="mt-8" />
    </div>
  );
}
