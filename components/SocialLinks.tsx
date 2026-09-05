"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/config/site";
import ArcadeButton from "@/components/ui/ArcadeButton";
import { cn } from "@/lib/cn";

export default function SocialLinks({
  solid = false,
  className,
}: {
  solid?: boolean;
  className?: string;
}) {
  const variant = solid ? "arcade-btn arcade-btn--solid" : "arcade-btn";
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <ArcadeButton href={site.socials.github} external className={variant}>
        <Github size={16} aria-hidden /> GITHUB
      </ArcadeButton>
      <ArcadeButton href={site.socials.linkedin} external className={variant}>
        <Linkedin size={16} aria-hidden /> LINKEDIN
      </ArcadeButton>
      <ArcadeButton href={`mailto:${site.socials.email}`} className={variant}>
        <Mail size={16} aria-hidden /> EMAIL
      </ArcadeButton>
    </div>
  );
}
