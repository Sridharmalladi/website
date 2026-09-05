"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function SocialLinks({
  solid = false,
  className,
}: {
  solid?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button href={site.socials.github} external solid={solid}>
        <Github size={17} aria-hidden /> GitHub
      </Button>
      <Button href={site.socials.linkedin} external>
        <Linkedin size={17} aria-hidden /> LinkedIn
      </Button>
      <Button href={`mailto:${site.socials.email}`}>
        <Mail size={17} aria-hidden /> Email
      </Button>
    </div>
  );
}
