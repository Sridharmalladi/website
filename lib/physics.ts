import type { Rect } from "@/config/zones";

/** Screen-space physics: y increases downward, gravity is +y. Pure + testable. */

export interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  onGround: boolean;
  facing: 1 | -1;
  /** seconds of "still allowed to jump" after leaving a ledge */
  coyote: number;
}

export interface Input {
  left: boolean;
  right: boolean;
  /** true only on the frame the jump key goes down (caller edge-detects) */
  jump: boolean;
}

export const CONFIG = {
  gravity: 2600,
  moveSpeed: 430,
  accel: 3600,
  groundFriction: 2400,
  airFriction: 600,
  jumpVel: 880,
  terminalVel: 1700,
  coyoteTime: 0.08,
  /** cap on a single frame's dt so tab-out doesn't fling the body */
  maxDt: 1 / 30,
  /** fixed sub-step for stable collision */
  subStep: 1 / 120,
};

export function createBody(x: number, y: number): Body {
  return { x, y, vx: 0, vy: 0, onGround: false, facing: 1, coyote: 0 };
}

function approach(value: number, target: number, delta: number): number {
  if (value < target) return Math.min(value + delta, target);
  if (value > target) return Math.max(value - delta, target);
  return target;
}

function landsOnTop(
  b: Body,
  size: { w: number; h: number },
  prevBottom: number,
  p: Rect,
): boolean {
  const bottom = b.y + size.h;
  const horizontallyOver = b.x + size.w > p.x && b.x < p.x + p.w;
  return (
    b.vy >= 0 &&
    horizontallyOver &&
    prevBottom <= p.y + 1 &&
    bottom >= p.y &&
    bottom <= p.y + p.h
  );
}

function integrate(
  b: Body,
  input: Input,
  dt: number,
  platforms: Rect[],
  bounds: { w: number; h: number },
  size: { w: number; h: number },
): Body {
  const next: Body = { ...b };

  // horizontal
  const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  if (dir !== 0) {
    next.vx = approach(next.vx, dir * CONFIG.moveSpeed, CONFIG.accel * dt);
    next.facing = dir > 0 ? 1 : -1;
  } else {
    const f = next.onGround ? CONFIG.groundFriction : CONFIG.airFriction;
    next.vx = approach(next.vx, 0, f * dt);
  }

  // jump (with coyote grace)
  if (input.jump && (next.onGround || next.coyote > 0)) {
    next.vy = -CONFIG.jumpVel;
    next.onGround = false;
    next.coyote = 0;
  }

  // gravity
  next.vy = Math.min(next.vy + CONFIG.gravity * dt, CONFIG.terminalVel);

  const prevBottom = b.y + size.h;

  next.x += next.vx * dt;
  next.y += next.vy * dt;

  // world bounds (x clamp, floor is a platform so no y clamp needed except safety)
  next.x = Math.max(0, Math.min(next.x, bounds.w - size.w));

  // one-way platform landing
  let grounded = false;
  for (const p of platforms) {
    if (landsOnTop(next, size, prevBottom, p)) {
      next.y = p.y - size.h;
      next.vy = 0;
      grounded = true;
    }
  }

  if (grounded) {
    next.onGround = true;
    next.coyote = CONFIG.coyoteTime;
  } else {
    next.onGround = false;
    next.coyote = Math.max(0, next.coyote - dt);
  }

  // safety net if it ever falls out of the world
  if (next.y > bounds.h + 400) {
    next.y = 0;
    next.vy = 0;
  }

  return next;
}

export function step(
  b: Body,
  input: Input,
  dt: number,
  platforms: Rect[],
  bounds: { w: number; h: number },
  size: { w: number; h: number },
): Body {
  let remaining = Math.min(dt, CONFIG.maxDt);
  let state = b;
  let firstSlice = true;
  while (remaining > 0) {
    const slice = Math.min(CONFIG.subStep, remaining);
    // only honour the one-shot jump on the first sub-step
    state = integrate(state, firstSlice ? input : { ...input, jump: false }, slice, platforms, bounds, size);
    remaining -= slice;
    firstSlice = false;
  }
  return state;
}
