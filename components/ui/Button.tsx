"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Common = { children: ReactNode; className?: string; solid?: boolean; "aria-label"?: string };
type AsButton = Common & { href?: undefined; onClick?: () => void };
type AsLink = Common & { href: string; external?: boolean };

export default function Button(props: AsButton | AsLink) {
  const { children, className, solid } = props;
  const classes = cn("btn", solid && "btn--solid", className);

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        target={props.external ? "_blank" : undefined}
        rel={props.external ? "noopener noreferrer" : undefined}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={(props as AsButton).onClick}
      aria-label={props["aria-label"]}
      className={classes}
    >
      {children}
    </button>
  );
}
