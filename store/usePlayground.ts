"use client";

import { create } from "zustand";
import type { Dynamics } from "@/lib/motion";

export type LightingMode = "CURSOR FOLLOW" | "AMBIENT LIGHT";
export type ThemeState = "OBSIDIAN" | "FROSTED GLASS" | "WIREFRAME";

interface PlaygroundState {
  dynamics: Dynamics;
  lightingMode: LightingMode;
  theme: ThemeState;
  /** 0..1 -> multiplies the ±10° tilt ceiling */
  tiltIntensity: number;
  /** 0.4..2 -> scales spring stiffness / drift speed */
  motionVelocity: number;
  flipped: boolean;
  activeProject: string | null;
  reducedMotion: boolean;

  setDynamics: (d: Dynamics) => void;
  setLightingMode: (l: LightingMode) => void;
  setTheme: (t: ThemeState) => void;
  setTiltIntensity: (n: number) => void;
  setMotionVelocity: (n: number) => void;
  toggleFlip: () => void;
  setActiveProject: (id: string | null) => void;
  setReducedMotion: (b: boolean) => void;
}

export const usePlayground = create<PlaygroundState>((set) => ({
  dynamics: "SPRING",
  lightingMode: "CURSOR FOLLOW",
  theme: "FROSTED GLASS",
  tiltIntensity: 0.7,
  motionVelocity: 1,
  flipped: false,
  activeProject: null,
  reducedMotion: false,

  setDynamics: (dynamics) => set({ dynamics }),
  setLightingMode: (lightingMode) => set({ lightingMode }),
  setTheme: (theme) => set({ theme }),
  setTiltIntensity: (tiltIntensity) => set({ tiltIntensity }),
  setMotionVelocity: (motionVelocity) => set({ motionVelocity }),
  toggleFlip: () => set((s) => ({ flipped: !s.flipped })),
  setActiveProject: (activeProject) => set({ activeProject }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}));
