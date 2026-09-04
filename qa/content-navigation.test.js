"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(siteRoot, file), "utf8");
const index = read("index.html");
const style = read("assets/style.css");
const app = read("assets/app.js");
const roomMain = read("assets/room3d/main.js");
const siteData = read("content/site-data.json");
const posts = fs.readdirSync(path.join(siteRoot, "content", "posts"))
  .filter((name) => name.endsWith(".md"))
  .map((name) => read(path.join("content", "posts", name)))
  .join("\n");

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
  assert.match(siteData, /href=\\"https:\/\/shi\.buaa\.edu\.cn\/08548\/en\/index\.htm\\"[^>]*>Prof\. Liang Zhang<\/a>/);
  assert.match(siteData, /In the future, I hope/);
  assert.doesNotMatch(siteData, /Looking ahead,/);
});

test("the removed post and broad category tags are gone", () => {
  assert.doesNotMatch(posts, /第一篇文章：新起点|letter_to_you/);
  assert.doesNotMatch(posts, /tags: \[[^\]]*"科研"/);
  assert.doesNotMatch(posts, /tags: \[[^\]]*"学习笔记"/);
  assert.doesNotMatch(posts, /tags: \[[^\]]*"论文阅读"/);
  assert.match(posts, /"符号回归"/);
  assert.match(posts, /"Agent"/);
  assert.equal(fs.existsSync(path.join(siteRoot, "_posts", "2026-03-10-letter_to_you.md")), false);
});

test("posts open in an internal reader and return to the blogs list", () => {
  assert.match(index, /id="blogs-list-view"[\s\S]*?id="post-reader"[\s\S]*?id="post-back"[\s\S]*?id="post-content"/);
  assert.doesNotMatch(index, /id="post-frame"/);
  assert.match(app, /function renderMarkdown\(markdown\)/);
  assert.match(app, /fetch\("content\/site-data\.json"/);
  assert.match(app, /fetch\("content\/posts\/index\.json"/);
  assert.match(app, /fetch\(post\.source/);
  ["Agent/react.png", "Agent/openspec.png", "SNIP/SNIP_overview.png", "SNIP/SNIP_for_SR.png"].forEach((file) => {
    assert.equal(fs.existsSync(path.join(siteRoot, "assets", "post-images", file)), true);
  });
  assert.match(app, /async function openPost\(id, options = \{\}\)/);
  assert.match(app, /postContent\.innerHTML = renderMarkdown\(markdown\)/);
  assert.match(app, /history\.pushState\([^\n]+`#\/blogs\/post\/\$\{post\.id\}`\)/);
  assert.match(app, /function closePost\(options = \{\}\)/);
  assert.match(app, /window\.scrollTo\(\{ top: blogsListScrollY/);
  assert.match(app, /window\.addEventListener\("popstate", syncRoute\)/);
  assert.doesNotMatch(app, /class="blog-title"><a href="\$\{post\.url\}" target="_blank"/);
});

test("cache keys advance for the edited frontend files", () => {
  assert.match(index, /assets\/style\.css\?v=12/);
  assert.doesNotMatch(index, /assets\/data\.js/);
  assert.match(index, /assets\/app\.js\?v=8/);
});

test("the 3D room waits for the shared site data before building vinyl records", () => {
  assert.match(app, /window\.SITE_DATA = D;[\s\S]*?dispatchEvent\(new CustomEvent\("sitedataready"\)\)/);
  assert.match(roomMain, /function tryBoot\(\)[\s\S]*?domReady && window\.SITE_DATA[\s\S]*?boot\(\)/);
  assert.match(roomMain, /addEventListener\("sitedataready", tryBoot, \{ once: true \}\)/);
});
