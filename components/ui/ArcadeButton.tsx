"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Common = {
  children: ReactNode;
  className?: string;
};

type AsButton = Common & {
  href?: undefined;
  onClick?: () => void;
  ariaPressed?: boolean;
  type?: "button" | "submit";
};

type AsLink = Common & {
  href: string;
  external?: boolean;
};

export default function ArcadeButton(props: AsButton | AsLink) {
  if ("href" in props && props.href) {
    const { href, external, children, className } = props;
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn("arcade-btn", className)}
      >
        {children}
      </a>
    );
  }
  const { children, className, onClick, ariaPressed, type = "button" } = props as AsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={ariaPressed}
      className={cn("arcade-btn", className)}
    >
      {children}
    </button>
  );
}
