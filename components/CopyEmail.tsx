"use client";

import { useEffect, useRef, useState } from "react";
export default function CopyEmail({
  children,
  className,
  email,
}: {
  children: React.ReactNode;
  className?: string;
  email: string;
}) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setFailed(false);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setCopied(false);
        timer.current = null;
      }, 2200);
    } catch {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      setCopied(false);
      setFailed(true);
    }
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={copy}
        aria-label="Copy my email address"
      >
        {copied ? "Copied" : children}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : failed ? `Could not copy. Select ${email} manually.` : ""}
      </span>
      {failed && <p className="copy-error">Copy failed.<span className="copy-error__address">{email}</span></p>}
    </>
  );
}
