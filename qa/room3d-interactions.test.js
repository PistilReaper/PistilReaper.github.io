"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const scene = read("assets/room3d/scene.js");
const main = read("assets/room3d/main.js");
const core = read("assets/room3d/core.js");
const layout = read("assets/room3d/layout.js");
const style = read("assets/style.css");
const index = read("index.html");

function test(name, run) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}: ${String(error.message).split("\n")[0]}`);
    process.exitCode = 1;
  }
}

test("hover feedback preserves object geometry", () => {
  assert.doesNotMatch(core, /hover \* 0\.035/);
  assert.match(core, /group\.scale\.copy\(group\.userData\.baseScale\)/);
});

test("publication books have layered construction, clear the shelf, and navigate to the section heading", () => {
  assert.match(scene, /function detailedBook\(/);
  assert.match(scene, /book\.userData\.pullGoal/);
  assert.match(scene, /obj\.userData\.homeZ \+ obj\.userData\.pull \* 0\.82/);
  assert.match(main, /navigateContent\("publications", "#content-publications"\)/);
  assert.doesNotMatch(main, /#pubs-root \.pub-item/);
  assert.match(style, /#content-publications\.current\{min-height:100vh\}/);
  const styleVersion = index.match(/assets\/style\.css\?v=(\d+)/);
  assert.ok(styleVersion, "style.css cache key is missing");
  assert.ok(Number(styleVersion[1]) >= 7, "style.css cache key regressed below v7");
});

test("door and cola are static while cola bubbles continuously", () => {
  assert.doesNotMatch(main, /action === "door"/);
  assert.doesNotMatch(main, /action === "water"/);
  assert.match(scene, /function colaGlass\(/);
  assert.match(scene, /colaBubbleMeshes/);
  assert.doesNotMatch(scene, /"water-glass"/);
});

test("plant leaves sway and the rim is above the soil", () => {
  assert.match(scene, /"plant-leaves", "plant"/);
  assert.match(main, /action === "plant"/);
  assert.match(scene, /plant\.userData\.swayEnergy/);
  assert.match(scene, /pot-rim-above-soil/);
});

test("fireplace has chimney, bricks, deep chamber and permanent varied logs", () => {
  assert.match(scene, /brick-chimney/);
  assert.match(scene, /deep-firebox/);
  assert.match(scene, /permanent-varied-logs/);
  assert.match(scene, /baseY: 0\.68/);
});

test("record transfer has an explicit source-to-platter animation", () => {
  assert.match(scene, /function beginRecordTransfer\(/);
  assert.match(scene, /recordTransfer\.progress/);
  assert.match(scene, /recordTransfer\.start/);
  assert.match(scene, /recordTransfer\.end/);
  assert.match(main, /room\.selectRecord\(index\)/);
});

test("gramophone is supported by feet and a continuous horn neck", () => {
  assert.match(scene, /gramophone-cabinet-feet/);
  assert.match(scene, /continuous-horn-neck/);
  assert.match(scene, /hornGroup, 0\.60, 1\.35, -0\.18, 0, 0, 0\.55/);
  assert.match(scene, /recordLoaded/);
});

test("record cabinet is enlarged without violating the wall span", () => {
  assert.match(layout, /id: "record-crate"[^\n]+width: 2\.80/);
});
