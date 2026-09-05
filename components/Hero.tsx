"use client";

import { site } from "@/config/site";
import SocialLinks from "@/components/SocialLinks";

/** Pure content — the Space zone owns the background, layout, and scrim. */
export default function Hero() {
  return (
    <div>
      <h1 className="mx-auto max-w-3xl text-[12vw] font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-6xl md:text-7xl">
        {site.name}
      </h1>

      <p
        className="mx-auto mt-5 max-w-xl text-lg leading-relaxed sm:text-xl"
        style={{ color: "var(--text-dim)" }}
      >
        {site.tagline}
      </p>

      <SocialLinks solid className="mt-9 justify-center" />
    </div>
  );
}
