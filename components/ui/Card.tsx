"use client";

import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import CursorGlow from "./CursorGlow";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export default function Card<T extends ElementType = "div">({
  as,
  className,
  ...rest
}: Props<T>) {
  return (
    <CursorGlow
      as={(as ?? "div") as ElementType}
      className={cn("card", className)}
      {...rest}
    />
  );
}
