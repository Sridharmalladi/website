"use client";

import { forwardRef, useEffect, useRef, type HTMLAttributes } from "react";
import { usePointer } from "@/components/PointerProvider";
import { usePlayground } from "@/store/usePlayground";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & {
  /** disable the cursor-tracked specular highlight */
  inert?: boolean;
};

/**
 * Frosted-glass surface. Subscribes to the pointer engine and paints a moving
 * specular highlight on its border via CSS vars (--mx/--my). AMBIENT LIGHT mode
 * parks the highlight at the top-centre so borders still catch light.
 */
const GlassPanel = forwardRef<HTMLDivElement, Props>(function GlassPanel(
  { className, inert, children, ...rest },
  forwardedRef,
) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const pointer = usePointer();
  const lightingMode = usePlayground((s) => s.lightingMode);

  useEffect(() => {
    const el = localRef.current;
    if (!el || inert) return;

    if (lightingMode === "AMBIENT LIGHT") {
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "-10%");
      return;
    }

    let raf = 0;
    const unsub = pointer.subscribe((p) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${p.x - r.left}px`);
        el.style.setProperty("--my", `${p.y - r.top}px`);
      });
    });
    return () => {
      unsub();
      cancelAnimationFrame(raf);
    };
  }, [pointer, lightingMode, inert]);

  return (
    <div
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={cn("glass", className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export default GlassPanel;
