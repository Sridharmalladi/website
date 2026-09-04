"use client";

import { useEffect, useRef, useState } from "react";
import {
  GROUND,
  PLATFORMS,
  PLAYER_SIZE,
  PLAYER_SPAWN,
  WORLD_H,
  WORLD_W,
  zones,
  type ZoneKind,
} from "@/config/zones";
import { createBody, step, type Body } from "@/lib/physics";
import { createInput, useKeyboard } from "@/hooks/useKeyboard";
import { useRaf } from "@/hooks/useRaf";
import { useViewportScale } from "@/hooks/useViewportScale";
import { hydrateWorld, useGame } from "@/store/useGame";

import Parallax from "./Parallax";
import Platform from "./Platform";
import Player from "./Player";
import ZoneCard from "./ZoneCard";
import Hud from "./Hud";
import ControlsHint from "./ControlsHint";
import Menu from "./Menu";
import TouchControls from "./TouchControls";
import StaticHero from "./StaticHero";

const CAMERA_PAN = 60; // parallax-only sway, the whole world is on screen at once

export default function GameStage() {
  const world = useGame((s) => s.world);
  const reduced = useGame((s) => s.reducedMotion);
  const activeZone = useGame((s) => s.activeZone);
  const markMoved = useGame((s) => s.markMoved);

  const fit = useViewportScale(WORLD_W, WORLD_H);
  const [cameraX, setCameraX] = useState(0);
  const [ready, setReady] = useState(false);

  const inputRef = useRef(createInput());
  const bodyRef = useRef<Body>(createBody(PLAYER_SPAWN.x, PLAYER_SPAWN.y));
  const playerElRef = useRef<HTMLDivElement>(null);
  const lastZoneRef = useRef<ZoneKind | null>(null);
  const camRef = useRef(0);

  useKeyboard(inputRef, markMoved);

  // one-time client setup
  useEffect(() => {
    hydrateWorld();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => useGame.getState().setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    setReady(true);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // reflect world onto <html> for the CSS palette
  useEffect(() => {
    document.documentElement.setAttribute("data-world", world);
  }, [world]);

  const compact = ready && (reduced || fit.vw < 780);

  useRaf((dt) => {
    const body = step(
      bodyRef.current,
      inputRef.current,
      dt,
      PLATFORMS,
      { w: WORLD_W, h: WORLD_H },
      PLAYER_SIZE,
    );
    inputRef.current.jump = false; // consume the one-shot
    bodyRef.current = body;

    // draw player imperatively — no per-frame React render
    const el = playerElRef.current;
    if (el) {
      el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) scaleX(${body.facing})`;
      el.dataset.moving = String(body.onGround && Math.abs(body.vx) > 25);
      el.dataset.air = String(!body.onGround);
    }

    // which platform are we standing on?
    let z: ZoneKind | null = null;
    if (body.onGround) {
      const feet = body.y + PLAYER_SIZE.h;
      for (const zone of zones) {
        const p = zone.platform;
        const over = body.x + PLAYER_SIZE.w > p.x + 6 && body.x < p.x + p.w - 6;
        if (over && Math.abs(feet - p.y) < 3) z = zone.id;
      }
    }
    if (z !== lastZoneRef.current) {
      lastZoneRef.current = z;
      useGame.getState().setActiveZone(z);
    }

    // damped parallax sway
    const target = Math.max(
      -CAMERA_PAN,
      Math.min(CAMERA_PAN, ((body.x + PLAYER_SIZE.w / 2) / WORLD_W - 0.5) * CAMERA_PAN * 2),
    );
    camRef.current += (target - camRef.current) * Math.min(1, dt * 6);
    if (Math.abs(camRef.current - cameraX) > 0.4) setCameraX(camRef.current);
  }, ready && !compact);

  if (compact) {
    return (
      <div className="world-fade min-h-screen">
        <Parallax cameraX={0} />
        <StaticHero />
        <Hud />
        <Menu />
      </div>
    );
  }

  return (
    <div className="world-fade fixed inset-0 overflow-hidden">
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: WORLD_W,
          height: WORLD_H,
          transform: `translate(${fit.ox}px, ${fit.oy}px) scale(${fit.scale})`,
        }}
      >
        <Parallax cameraX={cameraX} />

        <Platform ground rect={GROUND} />
        {zones.map((z) => (
          <Platform
            key={z.id}
            rect={z.platform}
            label={z.title}
            active={activeZone === z.id}
          />
        ))}

        <ZoneCard />
        <Player ref={playerElRef} />
      </div>

      <Hud />
      <ControlsHint />
      <Menu />
      <TouchControls input={inputRef} onFirstMove={markMoved} />
    </div>
  );
}
