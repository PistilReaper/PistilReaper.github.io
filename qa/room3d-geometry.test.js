"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const scenePath = path.join(root, "assets", "room3d", "scene.js");
const mainPath = path.join(root, "assets", "room3d", "main.js");
const layoutPath = path.join(root, "assets", "room3d", "layout.js");

function test(name, run) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}: ${String(error.message).split("\n")[0]}`);
    process.exitCode = 1;
  }
}

test("centralized layout keeps every wall object inside the usable span", () => {
  assert.equal(fs.existsSync(layoutPath), true, "layout.js is missing");
  const source = fs.readFileSync(layoutPath, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: layoutPath });
  const layout = sandbox.window.RustyRoomLayout;
  assert.ok(layout, "RustyRoomLayout was not exported");
  Object.entries(layout.walls).forEach(([wall, items]) => {
    items.forEach((item) => {
      assert.ok(item.x - item.width / 2 >= layout.usableMin, `${wall}.${item.id} crosses the left safe edge`);
      assert.ok(item.x + item.width / 2 <= layout.usableMax, `${wall}.${item.id} crosses the right safe edge`);
      assert.ok(item.z - item.depth / 2 >= layout.wallClearance, `${wall}.${item.id} intersects the wall or wood trim`);
    });
    const sorted = [...items].sort((a, b) => a.x - b.x);
    for (let i = 1; i < sorted.length; i += 1) {
      const gap = sorted[i].x - sorted[i].width / 2 - (sorted[i - 1].x + sorted[i - 1].width / 2);
      assert.ok(gap >= layout.minimumGap, `${wall}.${sorted[i - 1].id} overlaps ${sorted[i].id}`);
    }
  });
});

test("single-frame painting crops the framed source to its artwork", () => {
  const scene = fs.readFileSync(scenePath, "utf8");
  assert.match(scene, /function solidFrame\(/);
  assert.match(scene, /painting\.webp[\s\S]*crop:/);
  assert.doesNotMatch(scene, /frame\(painting/);
});

test("cropped textures wait for TextureLoader instead of forcing an empty upload", () => {
  const core = fs.readFileSync(path.join(root, "assets", "room3d", "core.js"), "utf8");
  assert.doesNotMatch(core, /texture\.offset\.set\([^\n]+\);\s*texture\.needsUpdate = true/);
});

test("door is static and clock follows real time", () => {
  const scene = fs.readFileSync(scenePath, "utf8");
  const main = fs.readFileSync(mainPath, "utf8");
  assert.doesNotMatch(scene, /C\.interactive\(door\(\), "door", "door"\)/);
  assert.doesNotMatch(main, /action === "door"/);
  assert.match(scene, /new Date\(\)/);
  assert.match(scene, /hourHand/);
  assert.match(scene, /minuteHand/);
  assert.match(scene, /secondHand/);
});

test("window, pillow and individual drawers have explicit interactions", () => {
  const scene = fs.readFileSync(scenePath, "utf8");
  const main = fs.readFileSync(mainPath, "utf8");
  assert.match(scene, /"window", "window"/);
  assert.match(scene, /"pillow", "pillow"/);
  assert.match(scene, /`drawer-\$\{i\}`/);
  assert.match(main, /action === "window"/);
  assert.match(main, /action === "pillow"/);
  assert.match(main, /action\.indexOf\("drawer-"\)/);
});

test("cabinet and bookshelf lower storage use closed carcasses", () => {
  const scene = fs.readFileSync(scenePath, "utf8");
  assert.match(scene, /g\.name = "filing-cabinet-closed-carcass"/);
  assert.match(scene, /lower\.name = "bookshelf-lower-closed-carcass"/);
});
