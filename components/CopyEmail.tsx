"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

/**
 * Inline "here" link that copies the address instead of printing it or firing a
 * mailto. Falls back to a mail client where the clipboard is unavailable — an
 * insecure context, or an older browser.
 */
export default function CopyEmail({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
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
    <>
      <button type="button" onClick={copy} aria-label="Copy my email address">
        {copied ? "copied" : children}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
