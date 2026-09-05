"use client";

import { site } from "@/config/site";
import ScrollReveal from "@/components/ScrollReveal";
import PixelPanel from "@/components/ui/PixelPanel";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-20 sm:px-10">
      <ScrollReveal>
        <p className="font-pixel text-xs tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          ABOUT
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">
          What I do
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-6 max-w-2xl space-y-4">
        {site.about.map((line) => (
          <p key={line} className="text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-dim)" }}>
            {line}
          </p>
        ))}
      </ScrollReveal>

      <ScrollReveal delay={0.16} className="mt-8 flex flex-wrap gap-3">
        {site.focus.map((f) => (
          <PixelPanel key={f} className="px-4 py-2 text-sm font-semibold">
            {f}
          </PixelPanel>
        ))}
      </ScrollReveal>
    </section>
  );
}
