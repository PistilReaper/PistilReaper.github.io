"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const scene = read("assets/room3d/scene.js");
const main = read("assets/room3d/main.js");
const layoutSource = read("assets/room3d/layout.js");

function test(name, run) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}: ${String(error.message).split("\n")[0]}`);
    process.exitCode = 1;
  }
}

function loadLayout() {
  const sandbox = { window: {} };
  vm.runInNewContext(layoutSource, sandbox);
  return sandbox.window.RustyRoomLayout;
}

test("both desks have independent wooden chairs with smooth push-pull state", () => {
  const layout = loadLayout();
  assert.match(scene, /function woodenChair\(/);
  assert.match(scene, /"writing-chair", "chair-about"/);
  assert.match(scene, /"typewriter-chair", "chair-blogs"/);
  assert.match(main, /action\.indexOf\("chair-"\) === 0/);
  assert.match(scene, /chair\.userData\.pulledOut \? chair\.userData\.pulledZ : chair\.userData\.tuckedZ/);
  assert.ok(layout.chairs.about.pulledZ > layout.chairs.about.tuckedZ);
  assert.ok(layout.chairs.blogs.pulledZ > layout.chairs.blogs.tuckedZ);
});

test("blogs wall spacing is compact and the task lamp stays above the cabinet", () => {
  const layout = loadLayout();
  const blog = Object.fromEntries(layout.walls.blogs.map((item) => [item.id, item]));
  assert.ok(blog["typewriter-table"].width < 3.20);
  assert.ok(blog.fireplace.x < 3.15);
  assert.match(scene, /tw\.scale\.setScalar\(0\.86\)/);
  assert.match(scene, /CylinderGeometry\(0\.10, 0\.50, 0\.76/);
  assert.match(scene, /cone\.position\.set\(0, 0\.48, 0\.04\)/);
  assert.doesNotMatch(scene, /CylinderGeometry\(0\.12, 0\.92, 1\.45/);
});

test("cola bubbles have a luminous sprite large enough to read", () => {
  assert.match(scene, /bubbleCount = 18/);
  assert.match(scene, /SphereGeometry\(0\.010, 8, 6\)/);
  assert.match(scene, /colaBubbleMeshes/);
  assert.match(scene, /renderOrder = 10/);
  assert.match(scene, /depthTest: false/);
  assert.match(scene, /opacity: 0\.88, depthWrite: false/);
});

test("speaker is smaller while record storage is larger and shifted left", () => {
  const layout = loadLayout();
  const beyond = Object.fromEntries(layout.walls.beyond.map((item) => [item.id, item]));
  assert.ok(beyond.speaker.width < 1.45);
  assert.ok(beyond["record-crate"].width > 2.40);
  assert.ok(beyond["record-crate"].x < 3.55);
  assert.match(scene, /function speaker\(width, height, depth\)/);
  assert.match(scene, /function recordCrate\(width, depth, registry, state\)/);
});

test("walls keep only the floor baseboard and the door has no filled black frame", () => {
  assert.doesNotMatch(scene, /C\.box\(11\.8, 0\.16, 0\.24, P\.wood\)/);
  assert.match(scene, /C\.box\(11\.8, 0\.30, 0\.20, P\.woodDark\)/);
  assert.doesNotMatch(scene, /C\.plane\(1\.58, 3\.72, 0x24201c\)/);
  assert.doesNotMatch(scene, /solidFrame\(1\.38, 3\.48, 0\.065, 0\.07, P\.ink\)/);
  assert.match(scene, /line-built-static-door/);
});

test("all revised wall placements still satisfy the full layout contract", () => {
  const layout = loadLayout();
  Object.entries(layout.walls).forEach(([wall, items]) => {
    items.forEach((item) => {
      assert.ok(item.x - item.width / 2 >= layout.usableMin, `${wall}.${item.id} crosses left edge`);
      assert.ok(item.x + item.width / 2 <= layout.usableMax, `${wall}.${item.id} crosses right edge`);
      assert.ok(item.z - item.depth / 2 >= layout.wallClearance, `${wall}.${item.id} crosses wall clearance`);
    });
    const sorted = [...items].sort((a, b) => a.x - b.x);
    for (let i = 1; i < sorted.length; i += 1) {
      const gap = sorted[i].x - sorted[i].width / 2 - (sorted[i - 1].x + sorted[i - 1].width / 2);
      assert.ok(gap >= layout.minimumGap, `${wall}.${sorted[i - 1].id} overlaps ${sorted[i].id}`);
    }
  });
});
