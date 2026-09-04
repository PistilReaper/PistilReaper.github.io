"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(siteRoot, file), "utf8");
const index = read("index.html");
const style = read("assets/style.css");
const app = read("assets/app.js");
const data = read("assets/data.js");

function test(name, run) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}: ${String(error.message).split("\n")[0]}`);
    process.exitCode = 1;
  }
}

test("global controls anchor to the browser page, not the room frame", () => {
  assert.match(style, /\.tools\{[\s\S]*?top:16px;[\s\S]*?right:18px;/);
  assert.doesNotMatch(style, /\.tools\{[\s\S]*?calc\(\(100svh/);
  assert.match(index, /id="room-home-btn"[\s\S]*?aria-label="return to room"/);
  assert.match(style, /\.room-home-fab\{[\s\S]*?position:fixed;[\s\S]*?left:18px;[\s\S]*?bottom:18px;/);
  assert.match(app, /room-home-btn[\s\S]*?window\.scrollTo\(\{ top: 0, behavior: reduced \? "auto" : "smooth" \}\)/);
});

test("biography copy and professor link are updated", () => {
  assert.match(data, /href=\\"https:\/\/shi\.buaa\.edu\.cn\/08548\/en\/index\.htm\\"[^>]*>Prof\. Liang Zhang<\/a>/);
  assert.match(data, /In the future, I hope/);
  assert.doesNotMatch(data, /Looking ahead,/);
});

test("the removed post and broad category tags are gone", () => {
  assert.doesNotMatch(data, /第一篇文章：新起点|letter_to_you/);
  assert.doesNotMatch(data, /"tags": \[[^\]]*"科研"/);
  assert.doesNotMatch(data, /"tags": \[[^\]]*"学习笔记"/);
  assert.doesNotMatch(data, /"tags": \[[^\]]*"论文阅读"/);
  assert.match(data, /"符号回归"/);
  assert.match(data, /"Agent"/);
  assert.equal(fs.existsSync(path.join(siteRoot, "_posts", "2026-03-10-letter_to_you.md")), false);
});

test("posts open in an internal reader and return to the blogs list", () => {
  assert.match(index, /id="blogs-list-view"[\s\S]*?id="post-reader"[\s\S]*?id="post-back"[\s\S]*?id="post-content"/);
  assert.doesNotMatch(index, /id="post-frame"/);
  assert.match(app, /function renderMarkdown\(markdown\)/);
  assert.equal((data.match(/"content":/g) || []).length, 6);
  ["Agent/react.png", "Agent/openspec.png", "SNIP/SNIP_overview.png", "SNIP/SNIP_for_SR.png"].forEach((file) => {
    assert.equal(fs.existsSync(path.join(siteRoot, "assets", "post-images", file)), true);
  });
  assert.match(app, /function openPost\(index, options = \{\}\)/);
  assert.match(app, /postContent\.innerHTML = renderMarkdown\(post\.content\)/);
  assert.match(app, /history\.pushState\([^\n]+`#\/blogs\/post\/\$\{index \+ 1\}`\)/);
  assert.match(app, /function closePost\(options = \{\}\)/);
  assert.match(app, /window\.scrollTo\(\{ top: blogsListScrollY/);
  assert.match(app, /window\.addEventListener\("popstate", syncRoute\)/);
  assert.doesNotMatch(app, /class="blog-title"><a href="\$\{post\.url\}" target="_blank"/);
});

test("cache keys advance for the edited frontend files", () => {
  assert.match(index, /assets\/style\.css\?v=12/);
  assert.match(index, /assets\/data\.js\?v=6/);
  assert.match(index, /assets\/app\.js\?v=6/);
});
