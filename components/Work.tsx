"use client";

import { site } from "@/config/site";
import Card from "@/components/ui/Card";

/** Straight to the projects — no skills list in front of them. */
export default function Work() {
  return (
    <div>
      <p className="label" style={{ color: "var(--accent)" }}>
        Projects
      </p>

      <div className="mt-6">
        {site.projects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
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
          <p className="max-w-md text-sm" style={{ color: "var(--text-dim)" }}>
            Project write-ups are going here next.
          </p>
        )}
      </div>
    </div>
  );
}
