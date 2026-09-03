"use client";

import { projects } from "@/config/projects";
import PortalTile from "./PortalTile";

/** Places the floating portal tiles around the central stage at varied Z depth. */
export default function PortalField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20"
      style={{ perspective: 1400, transformStyle: "preserve-3d" }}
    >
      {projects.map((p) => (
        <PortalTile key={p.id} project={p} />
      ))}
    </div>
  );
}
