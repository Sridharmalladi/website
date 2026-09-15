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
        <h2 className="mx-auto mt-3 max-w-xl text-3xl font-normal tracking-[0.01em] sm:text-4xl">
          What I do
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08} className="mt-7 flex flex-wrap justify-center gap-3">
        {site.focus.map((f) => (
          <Card key={f} className="px-4 py-2 text-sm">
            {f}
          </Card>
        ))}
      </ScrollReveal>

      <ScrollReveal delay={0.16} className="mt-12">
        <p className="label" style={{ color: "var(--text-dim)" }}>
          Selected Projects
        </p>
        {site.projects.length > 0 ? (
          <div className="mx-auto mt-5 grid max-w-3xl gap-4 sm:grid-cols-2">
            {site.projects.map((p) => {
              const inner = (
                <>
                  {p.shot && (
                    <span className="project-shot">
                      <img src={p.shot} alt={p.alt ?? `${p.name} homepage`} loading="lazy" />
                    </span>
                  )}
                  <span className="block p-5 text-left">
                    <span className="block text-base">{p.name}</span>
                    <span className="mt-1.5 block text-sm" style={{ color: "var(--text-dim)" }}>
                      {p.blurb}
                    </span>
                    {p.href && (
                      <span className="mt-3 inline-block text-sm" style={{ color: "var(--accent)" }}>
                        Visit site →
                      </span>
                    )}
                  </span>
                </>
              );

              return p.href ? (
                <Card
                  key={p.name}
                  as="a"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card block overflow-hidden no-underline"
                >
                  {inner}
                </Card>
              ) : (
                <Card key={p.name} className="project-card block overflow-hidden">
                  {inner}
                </Card>
              );
            })}
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
