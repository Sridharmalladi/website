"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import CursorGlow from "./CursorGlow";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <CursorGlow className={cn("card", className)}>{children}</CursorGlow>;
}
