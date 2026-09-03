"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

export interface PointerState {
  /** viewport px */
  x: number;
  y: number;
  /** -1..1 normalized, origin at viewport centre */
  nx: number;
  ny: number;
  down: boolean;
}

type Listener = (p: PointerState) => void;

interface PointerCtx {
  get: () => PointerState;
  subscribe: (fn: Listener) => () => void;
}

const Ctx = createContext<PointerCtx | null>(null);

/**
 * Cursor lighting engine — source of truth.
 * Ref-based + manual subscribe so high-frequency pointer moves never re-render React.
 */
export function PointerProvider({ children }: { children: ReactNode }) {
  const state = useRef<PointerState>({ x: 0, y: 0, nx: 0, ny: 0, down: false });
  const listeners = useRef<Set<Listener>>(new Set());

  useEffect(() => {
    const emit = () => listeners.current.forEach((fn) => fn(state.current));

    const onMove = (e: PointerEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      state.current = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / w) * 2 - 1,
        ny: (e.clientY / h) * 2 - 1,
        down: state.current.down,
      };
      emit();
    };
    const onDown = () => {
      state.current = { ...state.current, down: true };
      emit();
    };
    const onUp = () => {
      state.current = { ...state.current, down: false };
      emit();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const api: PointerCtx = {
    get: () => state.current,
    subscribe: (fn) => {
      listeners.current.add(fn);
      return () => listeners.current.delete(fn);
    },
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function usePointer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePointer must be used within <PointerProvider>");
  return ctx;
}
