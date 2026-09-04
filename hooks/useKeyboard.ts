"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

export interface InputState {
  left: boolean;
  right: boolean;
  /** one-shot: set on keydown, cleared by the game loop after it's consumed */
  jump: boolean;
}

export function createInput(): InputState {
  return { left: false, right: false, jump: false };
}

const LEFT = new Set(["ArrowLeft", "KeyA"]);
const RIGHT = new Set(["ArrowRight", "KeyD"]);
const JUMP = new Set(["ArrowUp", "KeyW", "Space"]);

/**
 * Writes keyboard state into the shared `input` ref (also fed by TouchControls).
 * Ref, not state, so held keys never re-render. `onFirstMove` fires once.
 */
export function useKeyboard(
  input: MutableRefObject<InputState>,
  onFirstMove?: () => void,
) {
  const moved = useRef(false);

  useEffect(() => {
    const firstMove = () => {
      if (moved.current) return;
      moved.current = true;
      onFirstMove?.();
    };
    const isGameKey = (c: string) => LEFT.has(c) || RIGHT.has(c) || JUMP.has(c);

    const down = (e: KeyboardEvent) => {
      if (!isGameKey(e.code)) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      )
        return;
      e.preventDefault();
      if (LEFT.has(e.code)) input.current.left = true;
      if (RIGHT.has(e.code)) input.current.right = true;
      if (JUMP.has(e.code) && !e.repeat) input.current.jump = true;
      firstMove();
    };
    const up = (e: KeyboardEvent) => {
      if (LEFT.has(e.code)) input.current.left = false;
      if (RIGHT.has(e.code)) input.current.right = false;
    };
    const blur = () => {
      input.current.left = false;
      input.current.right = false;
      input.current.jump = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [input, onFirstMove]);
}
