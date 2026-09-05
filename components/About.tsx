"use client";

import { site } from "@/config/site";
import ScrollReveal from "@/components/ScrollReveal";
import Card from "@/components/ui/Card";

/** Pure content — the Surface zone owns the background, layout, and scrim. */
export default function About() {
  return (
    <div>
      <ScrollReveal>
        <p className="label" style={{ color: "var(--accent)" }}>
          About
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
          What I do
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-6 max-w-2xl space-y-4">
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

      <ScrollReveal delay={0.16} className="mt-8 flex flex-wrap gap-3">
        {site.focus.map((f) => (
          <Card key={f} className="px-4 py-2 text-sm font-medium">
            {f}
          </Card>
        ))}
      </ScrollReveal>
    </div>
  );
}
