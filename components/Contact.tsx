"use client";

import { site } from "@/config/site";
import ScrollReveal from "@/components/ScrollReveal";

/** The end of the descent. Links live once, up with the name. */
export default function Contact() {
  return (
    <div>
      <ScrollReveal>
        <p className="label" style={{ color: "var(--core-hot)" }}>
          The Core
        </p>
        <h2 className="mx-auto mt-3 max-w-xl text-3xl font-normal tracking-[0.01em] sm:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed" style={{ color: "var(--text-dim)" }}>
          Open to interesting problems and good teams.{" "}
          <a href={`mailto:${site.socials.email}`} style={{ color: "var(--accent)" }}>
            {site.socials.email}
          </a>
        </p>
      </ScrollReveal>

      <footer className="mt-12 text-xs" style={{ color: "var(--text-dim)" }}>
        © {new Date().getFullYear()} {site.name}
      </footer>
    </div>
  );
}
