"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/config/site";
import { zones, type Zone } from "@/config/zones";
import { useGame } from "@/store/useGame";
import PixelPanel from "@/components/ui/PixelPanel";
import ArcadeButton from "@/components/ui/ArcadeButton";
import WorldSwitch from "@/components/WorldSwitch";

/** The reward panel that rises off a platform when the player stands on it. */
export default function ZoneCard() {
  const activeZone = useGame((s) => s.activeZone);
  const zone = zones.find((z) => z.id === activeZone);
  if (!zone) return null;

  // anchor above the platform, clamped inside the world
  const cardW = 340;
  const left = Math.max(
    16,
    Math.min(zone.platform.x + zone.platform.w / 2 - cardW / 2, 1280 - cardW - 16),
  );
  const top = Math.max(16, zone.platform.y - 220);

  return (
    <div
      key={zone.id}
      className="animate-rise-in absolute z-20"
      style={{ left, top, width: cardW }}
    >
      <PixelPanel className="p-4">
        <ZoneBody zone={zone} />
      </PixelPanel>
    </div>
  );
}

function ZoneBody({ zone }: { zone: Zone }) {
  if (zone.id === "about") {
    return (
      <div className="space-y-2">
        <p className="font-pixel text-xs tracking-widest" style={{ color: "var(--accent)" }}>
          {site.handle}
        </p>
        <h2 className="font-pixel text-lg" style={{ color: "var(--text)" }}>
          {site.name}
        </h2>
        {site.about.map((line) => (
          <p key={line} className="text-[13px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  if (zone.id === "links") {
    return (
      <div className="space-y-3">
        <p className="font-pixel text-xs tracking-widest" style={{ color: "var(--accent)" }}>
          FIND ME
        </p>
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
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="font-pixel text-xs tracking-widest" style={{ color: "var(--accent)" }}>
        PICK A WORLD
      </p>
      <WorldSwitch variant="panel" />
    </div>
  );
}
