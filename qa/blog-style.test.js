"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const postsRoot = path.join(root, "content", "posts");

test("blogs other than the user-edited SNIP post avoid negative contrast formulas", () => {
  const source = fs.readdirSync(postsRoot)
    .filter((name) => name.endsWith(".md") && name !== "2026-03-11-snip.md")
    .map((name) => fs.readFileSync(path.join(postsRoot, name), "utf8"))
    .join("\n");
  const negativeContrast = /(?:(?:并)?不是|不再是|并非|不在于)[^。\n]{0,180}[，,；;]\s*(?:而是|而在于)/g;
  assert.deepEqual(source.match(negativeContrast) || [], []);
});
