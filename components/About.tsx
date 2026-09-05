"use client";

import { site } from "@/config/site";
import ScrollReveal from "@/components/ScrollReveal";

/** Read on the way down through the sky, before the city. */
export default function About() {
  return (
    <div>
      <ScrollReveal>
        <p className="label" style={{ color: "var(--accent)" }}>
          About
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mx-auto mt-5 max-w-2xl space-y-4">
        {site.about.map((line) => (
          <p
            key={line}
            className="text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-dim)" }}
          >
            {line}
          </p>
        ))}
      </ScrollReveal>
    </div>
  );
}
