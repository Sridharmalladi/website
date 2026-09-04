"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/config/site";
import PixelPanel from "@/components/ui/PixelPanel";
import ArcadeButton from "@/components/ui/ArcadeButton";
import WorldSwitch from "@/components/WorldSwitch";

/** Shown on small screens / reduced-motion: the whole page, no game required. */
export default function StaticHero() {
  return (
    <div className="relative z-10 mx-auto min-h-screen w-full max-w-lg px-4 py-20">
      <PixelPanel className="space-y-5 p-6">
        <div className="space-y-1">
          <p className="font-pixel text-xs tracking-widest" style={{ color: "var(--accent)" }}>
            {site.handle}
          </p>
          <h1 className="font-pixel text-2xl" style={{ color: "var(--text)" }}>
            {site.name}
          </h1>
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            {site.tagline}
          </p>
        </div>

        <div className="space-y-2">
          {site.about.map((l) => (
            <p key={l} className="text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {l}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <ArcadeButton href={site.socials.github} external>
            <Github size={14} aria-hidden /> GITHUB
          </ArcadeButton>
          <ArcadeButton href={site.socials.linkedin} external>
            <Linkedin size={14} aria-hidden /> LINKEDIN
          </ArcadeButton>
          <ArcadeButton href={`mailto:${site.socials.email}`}>
            <Mail size={14} aria-hidden /> EMAIL
          </ArcadeButton>
        </div>

        <div className="space-y-2">
          <p className="font-pixel text-[11px] tracking-widest" style={{ color: "var(--text-dim)" }}>
            WORLD
          </p>
          <WorldSwitch variant="panel" />
        </div>
      </PixelPanel>
    </div>
  );
}
