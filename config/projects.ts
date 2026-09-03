import type { LucideIcon } from "lucide-react";
import { SlidersHorizontal, Orbit, ToggleRight, Waves } from "lucide-react";

export type WidgetKind = "color-slider" | "shader-orb" | "toggle" | "wave";

export interface Project {
  id: string;
  title: string;
  blurb: string;
  /** live UI element shown inside the floating portal tile */
  widget: WidgetKind;
  icon: LucideIcon;
  /** spatial depth of the tile, in px on the Z axis (negative = further back) */
  depth: number;
  /** anchor position around the central stage */
  anchor: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  accent: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "chroma",
    title: "CHROMA ENGINE",
    blurb:
      "Real-time palette system. Drag to remap an entire product theme from a single hue with OKLCH interpolation.",
    widget: "color-slider",
    icon: SlidersHorizontal,
    depth: -120,
    anchor: "top-left",
    accent: "#60a5fa",
  },
  {
    id: "orbfield",
    title: "ORBFIELD",
    blurb:
      "GPU refraction study — a transmission-material orb driven by noise, used as an ambient loader in production.",
    widget: "shader-orb",
    icon: Orbit,
    depth: -240,
    anchor: "top-right",
    accent: "#a78bfa",
  },
  {
    id: "statekit",
    title: "STATEKIT",
    blurb:
      "Toggle primitives with spring inertia and haptic-style feedback. Every state change is interruptible.",
    widget: "toggle",
    icon: ToggleRight,
    depth: -80,
    anchor: "bottom-left",
    accent: "#5eead4",
  },
  {
    id: "ripple",
    title: "RIPPLE UI",
    blurb:
      "Expansion-wave navigation. Any element can become a full-screen surface via a single portal transition.",
    widget: "wave",
    icon: Waves,
    depth: -180,
    anchor: "bottom-right",
    accent: "#fb7185",
  },
];
