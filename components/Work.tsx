"use client";

import { site } from "@/config/site";
import ScrollReveal from "@/components/ScrollReveal";
import Card from "@/components/ui/Card";

/** Sits over the city: what I do, plus the project slots. */
export default function Work() {
  return (
    <div>
      <ScrollReveal>
        <p className="label" style={{ color: "var(--accent)" }}>
          Work
        </p>
        <h2 className="mx-auto mt-3 max-w-xl text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
          What I do
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-7 flex flex-wrap justify-center gap-3">
        {site.focus.map((f) => (
          <Card key={f} className="px-4 py-2 text-sm font-medium">
            {f}
          </Card>
        ))}
      </ScrollReveal>

      <ScrollReveal delay={0.16} className="mt-12">
        <p className="label" style={{ color: "var(--text-dim)" }}>
          Selected Projects
        </p>
        {site.projects.length > 0 ? (
          <div className="mx-auto mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
            {site.projects.map((p) => (
              <Card key={p.name} className="p-5 text-left">
                <h3 className="text-base font-semibold">{p.name}</h3>
                <p className="mt-1.5 text-sm" style={{ color: "var(--text-dim)" }}>
                  {p.blurb}
                </p>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    View →
                  </a>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: "var(--text-dim)" }}>
            Project write-ups are going here next.
          </p>
        )}
      </ScrollReveal>
    </div>
  );
}
