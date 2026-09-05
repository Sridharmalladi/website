"use client";

import { site } from "@/config/site";
import ScrollReveal from "@/components/ScrollReveal";
import SocialLinks from "@/components/SocialLinks";

/** Pure content — the Core zone owns the background, layout, and scrim. */
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
          Open to interesting problems and good teams. Fastest way to reach me is email.
        </p>
        <SocialLinks solid className="mt-8 justify-center" />
      </ScrollReveal>

      <footer
        className="mt-24 border-t pt-6 text-xs"
        style={{ borderColor: "var(--panel-border)", color: "var(--text-dim)" }}
      >
        © {new Date().getFullYear()} {site.name}
      </footer>
    </div>
  );
}
