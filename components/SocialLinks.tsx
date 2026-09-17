"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * The only set of links on the page. Email isn't printed as text and doesn't
 * fire a mailto on its own — clicking copies the address, and falls back to
 * opening a mail client if the clipboard isn't available (older Safari, or a
 * page served without a secure context).
 */
export default function SocialLinks({
  solid = false,
  className,
}: {
  solid?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.socials.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.socials.email}`;
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      <Button href={site.socials.github} external solid={solid}>
        <Github size={16} aria-hidden /> GitHub
      </Button>
      <Button href={site.socials.linkedin} external>
        <Linkedin size={16} aria-hidden /> LinkedIn
      </Button>
      <Button onClick={copyEmail} aria-label={copied ? "Email address copied" : "Copy email address"}>
        {copied ? <Check size={16} aria-hidden /> : <Mail size={16} aria-hidden />}
        {copied ? "Copied" : "Email"}
        <Copy size={13} aria-hidden className="opacity-45" />
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
