"use client";

import { site } from "@/config/site";

/** Kept short and specific: what the work actually involves. */
export default function About() {
  return (
    <div>
      <p className="label" style={{ color: "var(--accent)" }}>
        About
      </p>
      <div className="mt-4 space-y-3">
        {site.about.map((line) => (
          <p key={line} className="text-base leading-relaxed" style={{ color: "var(--text-dim)" }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
