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

test("project context is available on cards without a details dialog", () => {
  assert.match(html, /class="work-tile__note"/);
  assert.doesNotMatch(html, /<dialog/);
  assert.doesNotMatch(html, />Details<\/button>/);
  assert.match(css, /work-tile__note/);
  assert.match(css, /focus-within/);
});

test("Focado offers the released DMG as its primary action", () => {
  assert.match(
    html,
    /href="https:\/\/github\.com\/Sridharmalladi\/focado\/releases\/latest\/download\/Focado\.dmg"[^>]*>.*?Download for Mac/s,
  );
  assert.match(html, /href="https:\/\/github\.com\/Sridharmalladi\/focado"[^>]*>Source code/);
});

test("ReadHelp opens its hosted demo without exposing the private repository", () => {
  const titleIndex = html.indexOf(">ReadHelp<");
  assert.notEqual(titleIndex, -1, "ReadHelp card should be present");

  const articleStart = html.lastIndexOf("<article", titleIndex);
  const articleEnd = html.indexOf("</article>", titleIndex);
  const card = html.slice(articleStart, articleEnd + "</article>".length);

  assert.match(card, /href="https:\/\/sridharmalladi\.online\/readhelp\/\?demo=1"/);
  assert.match(card, /Try demo/);
  assert.doesNotMatch(card, /github\.com\/Sridharmalladi\/readhelp/);
});
