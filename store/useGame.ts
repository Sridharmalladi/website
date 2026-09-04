"use client";

import { create } from "zustand";
import { DEFAULT_WORLD, WORLD_IDS, type WorldId } from "@/config/worlds";
import type { ZoneKind } from "@/config/zones";

const LS_KEY = "sm.world";

function readWorld(): WorldId {
  if (typeof window === "undefined") return DEFAULT_WORLD;
  try {
    const v = window.localStorage.getItem(LS_KEY);
    if (v && (WORLD_IDS as string[]).includes(v)) return v as WorldId;
  } catch {
    /* private mode / blocked storage */
  }
  return DEFAULT_WORLD;
}

interface GameState {
  world: WorldId;
  activeZone: ZoneKind | null;
  visited: ZoneKind[];
  hasMoved: boolean;
  reducedMotion: boolean;
  menuOpen: boolean;

  setWorld: (w: WorldId) => void;
  cycleWorld: (dir?: 1 | -1) => void;
  setActiveZone: (z: ZoneKind | null) => void;
  markMoved: () => void;
  setReducedMotion: (b: boolean) => void;
  setMenuOpen: (b: boolean) => void;
}

export const useGame = create<GameState>((set, get) => ({
  world: DEFAULT_WORLD,
  activeZone: null,
  visited: [],
  hasMoved: false,
  reducedMotion: false,
  menuOpen: false,

  setWorld: (world) => {
    set({ world });
    try {
      window.localStorage.setItem(LS_KEY, world);
    } catch {
      /* ignore */
    }
  },
  cycleWorld: (dir = 1) => {
    const ids = WORLD_IDS as WorldId[];
    const i = ids.indexOf(get().world);
    get().setWorld(ids[(i + dir + ids.length) % ids.length]);
  },
  setActiveZone: (activeZone) =>
    set((s) => ({
      activeZone,
      visited:
        activeZone && !s.visited.includes(activeZone)
          ? [...s.visited, activeZone]
          : s.visited,
    })),
  markMoved: () => set({ hasMoved: true }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}));

/** Call once on mount to hydrate the persisted world without SSR mismatch. */
export function hydrateWorld() {
  useGame.setState({ world: readWorld() });
}
