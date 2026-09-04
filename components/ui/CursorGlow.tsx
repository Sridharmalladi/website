"use client";

import { useRef, type ElementType, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * Wraps content in a surface that lights up under the cursor (the effect the
 * user liked). Pure CSS radial gradient positioned from local pointer coords —
 * no global listener, no re-renders.
 */
export default function CursorGlow<T extends ElementType = "div">({
  as,
  className,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `-200px`);
    el.style.setProperty("--my", `-200px`);
  };

  return (
    <Tag
      ref={ref as never}
      className={cn("cursor-glow", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    />
  );
}
