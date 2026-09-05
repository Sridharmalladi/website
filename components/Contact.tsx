"use client";

import { site } from "@/config/site";
import ScrollReveal from "@/components/ScrollReveal";
import SocialLinks from "@/components/SocialLinks";

/** Pure content — the Core zone owns the background, layout, and scrim. */
export default function Contact() {
  return (
    <div>
      <ScrollReveal>
        <p className="font-pixel text-xs tracking-[0.3em]" style={{ color: "var(--core-center)" }}>
          THE CORE
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">
          Let&apos;s build something.
        </h2>
        <p className="mt-3 max-w-md" style={{ color: "var(--text-dim)" }}>
          Open to interesting problems and good teams. Fastest way to reach me is email.
        </p>
        <SocialLinks solid className="mt-7" />
      </ScrollReveal>

      <footer className="mt-24 border-t pt-6 text-xs" style={{ borderColor: "var(--panel-border)", color: "var(--text-dim)" }}>
        © {new Date().getFullYear()} {site.name}
      </footer>
    </div>
  );
}
