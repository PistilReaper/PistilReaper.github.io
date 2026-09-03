"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const index = read("index.html");
const style = read("assets/style.css");
const app = read("assets/app.js");
const main = read("assets/room3d/main.js");

function test(name, run) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}: ${String(error.message).split("\n")[0]}`);
    process.exitCode = 1;
  }
}

test("the room keeps a centered 16:10 frame with a solid parchment matte", () => {
  assert.match(index, /<div class="stage-shell">[\s\S]*?<div class="stage" id="stage">/);
  assert.match(style, /--room-aspect:1\.6/);
  assert.match(style, /--room-matte:#d8c8b4/);
  assert.match(style, /\.stage-shell\{[\s\S]*?height:100svh[\s\S]*?place-items:center[\s\S]*?background:var\(--room-matte\)/);
  assert.match(style, /width:min\(100%,calc\(100svh\*var\(--room-aspect\)\)\)/);
  assert.match(style, /aspect-ratio:var\(--room-aspect\)/);
  assert.match(style, /max-height:100%/);
});

test("four wall views share one height, radius, FOV and off-axis crop", () => {
  assert.match(main, /const VIEW_ORDER = Object\.freeze\(\["about", "publications", "blogs", "beyond"\]\)/);
  assert.match(main, /about: Object\.freeze\(\{ yaw: 0 \}\)/);
  assert.match(main, /publications: Object\.freeze\(\{ yaw: Math\.PI \/ 2 \}\)/);
  assert.match(main, /blogs: Object\.freeze\(\{ yaw: Math\.PI \}\)/);
  assert.match(main, /beyond: Object\.freeze\(\{ yaw: Math\.PI \* 1\.5 \}\)/);
  assert.match(main, /height: 3\.65/);
  assert.match(main, /radius: 2\.95/);
  assert.match(main, /fov: 49/);
  assert.match(main, /projectionShiftY: -0\.278/);
});

test("the camera turns between adjacent walls along a smooth quarter-circle", () => {
  assert.match(main, /const TURN_DURATION = 640/);
  assert.match(main, /function smoothstep\(value\)/);
  assert.match(main, /camera\.position\.set\([\s\S]*?-VIEW_SETTINGS\.radius \* Math\.sin\(yaw\)[\s\S]*?VIEW_SETTINGS\.height[\s\S]*?VIEW_SETTINGS\.radius \* Math\.cos\(yaw\)/);
  assert.match(main, /window\.addEventListener\("roomwallchange"/);
  assert.match(app, /window\.dispatchEvent\(new CustomEvent\("roomwallchange", \{ detail: \{ name, direction \} \}\)\)/);
});

test("free-look controls and their UI are removed while object picking remains", () => {
  assert.doesNotMatch(main, /DRAG TO LOOK|room3d-free-hint|room3d-reset-view/);
  assert.doesNotMatch(main, /addEventListener\("pointerdown"|addEventListener\("wheel"/);
  assert.match(main, /addEventListener\("pointermove", refreshHover\)/);
  assert.match(main, /addEventListener\("click", activatePointerHit\)/);
  assert.match(main, /audio\.loop = true/);
});

test("fixed-view arrows are visible and room assets use the current cache keys", () => {
  assert.match(style, /\.stage\.is-fixed-view \.edge \.tri\{opacity:\.72;transform:none\}/);
  assert.match(index, /assets\/style\.css\?v=12/);
  assert.match(index, /assets\/data\.js\?v=5/);
  assert.match(index, /assets\/app\.js\?v=6/);
  assert.match(index, /assets\/room3d\/core\.js\?v=20/);
  assert.match(index, /assets\/room3d\/layout\.js\?v=20/);
  assert.match(index, /assets\/room3d\/scene\.js\?v=20/);
  assert.match(index, /assets\/room3d\/main\.js\?v=20/);
});
