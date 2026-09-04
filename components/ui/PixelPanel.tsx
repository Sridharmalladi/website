"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import CursorGlow from "./CursorGlow";

export default function PixelPanel({
  children,
  className,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <CursorGlow
      className={cn("pixel-panel", !glow && "cursor-glow-off", className)}
    >
      {children}
    </CursorGlow>
  );
}
