import { test } from "node:test";
import assert from "node:assert/strict";
import { CONFIG, createBody, step } from "./physics.ts";

const BOUNDS = { w: 1280, h: 720 };
const SIZE = { w: 34, h: 46 };
const GROUND = { x: -200, y: 640, w: 1680, h: 200 };
const LEDGE = { x: 100, y: 400, w: 200, h: 20 };
const PLATFORMS = [GROUND, LEDGE];
const IDLE = { left: false, right: false, jump: false };

function run(body: ReturnType<typeof createBody>, input = IDLE, frames = 1, dt = 1 / 120) {
  let b = body;
  for (let i = 0; i < frames; i++) b = step(b, input, dt, PLATFORMS, BOUNDS, SIZE);
  return b;
}

test("gravity accelerates a body downward while airborne", () => {
  const b = run(createBody(600, 100), IDLE, 10);
  assert.ok(b.vy > 0, "vy should be positive (falling)");
  assert.ok(b.y > 100, "y should have increased");
});

test("body lands on the ground platform and stops", () => {
  const b = run(createBody(600, 100), IDLE, 600);
  assert.equal(b.onGround, true);
  assert.equal(b.vy, 0);
  assert.ok(Math.abs(b.y + SIZE.h - GROUND.y) < 0.001, "feet rest on ground top");
});

test("jump produces upward motion then settles back on the ground", () => {
  let b = run(createBody(600, GROUND.y - SIZE.h), IDLE, 5); // settle
  assert.equal(b.onGround, true);
  b = step(b, { left: false, right: false, jump: true }, 1 / 120, PLATFORMS, BOUNDS, SIZE);
  assert.ok(b.vy < 0, "moving up right after jump");
  const apex = run(b, IDLE, 40);
  assert.ok(apex.y < GROUND.y - SIZE.h - 40, "clears a meaningful height");
  const landed = run(b, IDLE, 600);
  assert.equal(landed.onGround, true);
});

test("walking off a ledge drops the body", () => {
  let b = createBody(LEDGE.x + 40, LEDGE.y - SIZE.h);
  b = run(b, IDLE, 5);
  assert.equal(b.onGround, true, "starts standing on the ledge");
  const walked = run(b, { left: false, right: true, jump: false }, 240);
  assert.ok(walked.x > LEDGE.x + LEDGE.w - SIZE.w, "moved past the ledge edge");
  assert.ok(walked.y > LEDGE.y - SIZE.h, "started falling after the edge");
});

test("fast fall does not tunnel through a platform (sub-stepped collision)", () => {
  const b = createBody(LEDGE.x + 80, LEDGE.y - SIZE.h - 28);
  b.vy = CONFIG.terminalVel;
  const after = step(b, IDLE, 1 / 20, PLATFORMS, BOUNDS, SIZE);
  assert.equal(after.onGround, true, "caught by the ledge");
  assert.ok(after.y + SIZE.h <= LEDGE.y + 0.5, "did not pass through");
});

test("a single frame's fall is clamped so tab-out can't fling the body", () => {
  const b = createBody(600, 100);
  b.vy = CONFIG.terminalVel;
  const after = step(b, IDLE, 5, PLATFORMS, BOUNDS, SIZE); // 5s hitch
  assert.ok(after.y - 100 <= CONFIG.terminalVel * CONFIG.maxDt + 1, "moved at most one clamped frame");
});

test("vertical speed is clamped to terminal velocity", () => {
  const b = run(createBody(600, -5000), IDLE, 2000);
  assert.ok(b.vy <= CONFIG.terminalVel + 0.001);
});

test("x position is clamped inside the world bounds", () => {
  const left = run(createBody(5, 300), { left: true, right: false, jump: false }, 120);
  assert.ok(left.x >= 0);
  const right = run(createBody(BOUNDS.w - 40, 300), { left: false, right: true, jump: false }, 240);
  assert.ok(right.x <= BOUNDS.w - SIZE.w + 0.001);
});
