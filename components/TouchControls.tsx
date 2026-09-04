"use client";

import { useEffect, useState, type MutableRefObject } from "react";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import type { InputState } from "@/hooks/useKeyboard";

/** On-screen D-pad for touch devices. Feeds the same input ref as the keyboard. */
export default function TouchControls({
  input,
  onFirstMove,
}: {
  input: MutableRefObject<InputState>;
  onFirstMove: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (!show) return null;

  const hold = (key: "left" | "right") => (e: React.PointerEvent) => {
    e.preventDefault();
    input.current[key] = true;
    onFirstMove();
  };
  const release = (key: "left" | "right") => () => {
    input.current[key] = false;
  };
  const jump = (e: React.PointerEvent) => {
    e.preventDefault();
    input.current.jump = true;
    onFirstMove();
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-end justify-between p-4 sm:hidden">
      <div className="pointer-events-auto flex gap-2">
        <Pad label="Left" onDown={hold("left")} onUp={release("left")}>
          <ArrowLeft aria-hidden />
        </Pad>
        <Pad label="Right" onDown={hold("right")} onUp={release("right")}>
          <ArrowRight aria-hidden />
        </Pad>
      </div>
      <div className="pointer-events-auto">
        <Pad label="Jump" onDown={jump}>
          <ArrowUp aria-hidden />
        </Pad>
      </div>
    </div>
  );
}

function Pad({
  label,
  onDown,
  onUp,
  children,
}: {
  label: string;
  onDown: (e: React.PointerEvent) => void;
  onUp?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onUp}
      className="grid h-16 w-16 select-none place-items-center rounded-xl border-2 active:translate-y-0.5"
      style={{
        background: "var(--panel)",
        borderColor: "var(--panel-border)",
        color: "var(--text)",
        touchAction: "none",
      }}
    >
      {children}
    </button>
  );
}
