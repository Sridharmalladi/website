"use client";

import { forwardRef } from "react";
import { PLAYER_SIZE } from "@/config/zones";

/**
 * Presentational sprite. GameStage owns the physics body and writes this node's
 * transform imperatively every frame; this component only draws the character.
 * A sleek vector guy, not a sprite sheet — reads crisp at any scale.
 */
const Player = forwardRef<HTMLDivElement>(function Player(_props, ref) {
  return (
    <div
      ref={ref}
      className="player absolute left-0 top-0 will-change-transform"
      style={{ width: PLAYER_SIZE.w, height: PLAYER_SIZE.h }}
      aria-hidden
    >
      <div className="relative h-full w-full">
        {/* shadow */}
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-black/25 blur-[1px]" />
        {/* body */}
        <span
          className="absolute inset-x-0 top-1 bottom-3 rounded-[6px] border-2"
          style={{
            background: "var(--accent)",
            borderColor: "var(--accent-ink)",
          }}
        />
        {/* visor */}
        <span
          className="absolute left-1 right-1 top-2 h-2.5 rounded-[3px]"
          style={{ background: "var(--accent-ink)", opacity: 0.9 }}
        />
        {/* eye */}
        <span
          className="player-eye absolute right-1.5 top-[9px] h-1.5 w-1.5 rounded-[1px]"
          style={{ background: "var(--accent)" }}
        />
        {/* legs */}
        <span
          className="player-leg player-leg--l absolute bottom-0 left-1.5 h-3 w-2 rounded-[2px]"
          style={{ background: "var(--accent-ink)" }}
        />
        <span
          className="player-leg player-leg--r absolute bottom-0 right-1.5 h-3 w-2 rounded-[2px]"
          style={{ background: "var(--accent-ink)" }}
        />
      </div>
    </div>
  );
});

export default Player;
