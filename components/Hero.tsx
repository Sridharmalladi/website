"use client";

import { site } from "@/config/site";
import SocialLinks from "@/components/SocialLinks";

/** Pure content — the Space zone owns the background, layout, and scrim. */
export default function Hero() {
  return (
    <div>
      <h1 className="mx-auto max-w-3xl text-[11vw] font-normal leading-[1.02] tracking-[0.01em] sm:text-6xl md:text-7xl">
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
