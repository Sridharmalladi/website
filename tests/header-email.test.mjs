import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../out/index.html", import.meta.url), "utf8");
const header = html.match(/<header class="masthead">.*?<\/header>/s)?.[0];

test("the exported header exposes one direct-copy email action", () => {
  assert.ok(header, "expected the portfolio masthead in the exported page");
  assert.equal(header.match(/aria-label="Copy my email address"/g)?.length ?? 0, 1);
  assert.doesNotMatch(header, /href="mailto:/);
  assert.doesNotMatch(header, /masthead__copy/);
  assert.match(header, />Email<\/button>/);
});
