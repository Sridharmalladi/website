import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("out/index.html", root), "utf8");
const cssDirectory = new URL("out/_next/static/css/", root);
const css = readdirSync(cssDirectory)
  .filter(file => file.endsWith(".css"))
  .map(file => readFileSync(new URL(file, cssDirectory), "utf8"))
  .join("\n");

test("the exported landscape has a small bee flight, not a swarm", () => {
  const beeCount = html.match(/data-ambient="bee"/g)?.length ?? 0;

  assert.ok(beeCount >= 1, "expected at least one bee in the exported landscape");
  assert.ok(beeCount <= 2, `expected no more than two bees, found ${beeCount}`);
  assert.match(css, /@keyframes sky-bee-flight/);
});

test("ambient motion stops when reduced motion is requested", () => {
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /\.sky \*\{animation:none!important;transition:none!important\}/);
});
