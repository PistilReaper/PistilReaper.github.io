"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const scene = read("assets/room3d/scene.js");
const layout = read("assets/room3d/layout.js");
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

test("gramophone platter rests directly on the cabinet without a clipping support disk", () => {
  const gramophone = scene.match(/function gramophone\(\) \{([\s\S]*?)\n  function speaker/);
  assert.ok(gramophone, "gramophone function is missing");
  assert.doesNotMatch(gramophone[1], /C\.cylinder\(0\.76, 0\.76, 0\.045/);
  assert.match(gramophone[1], /C\.put\(g, platter, -0\.27, 1\.03, 0\.08\)/);
});

test("record cabinet is taller and keeps every sleeve inside its side walls", () => {
  const cabinet = scene.match(/function recordCrate\([\s\S]*?\n  function transferRecord/);
  assert.ok(cabinet, "record cabinet function is missing");
  assert.match(cabinet[0], /C\.box\(0\.16, 1\.38, depth, P\.woodDark\)/);
  assert.match(cabinet[0], /C\.box\(width - 0\.22, 1\.02, 0\.10, P\.woodDark\)/);
  assert.match(cabinet[0], /const sleeveSpan = width - 1\.18/);
  assert.match(cabinet[0], /0\.82 \+ i \* 0\.025/);
});

test("door and clock move right together and the door leaf has no stripe overlay", () => {
  assert.match(layout, /doorX: -3\.88, clockX: -2\.41/);
  const door = scene.match(/function door\(\) \{([\s\S]*?)\n  function clock/);
  assert.ok(door, "door function is missing");
  assert.doesNotMatch(door[1], /\[-0\.39, 0, 0\.39\]/);
  assert.doesNotMatch(door[1], /C\.roundedBox\(1\.25, 0\.035, 0\.025/);
});

test("window shifts right without changing its construction", () => {
  assert.match(layout, /beyond: Object\.freeze\(\{ windowX: -3\.70 \}\)/);
  assert.match(scene, /C\.put\(wall, windowObj, L\.mounted\.beyond\.windowX, 4\.05, 0\.12\)/);
});

test("browser cache keys are v10 or newer", () => {
  ["core", "layout", "scene", "main"].forEach((asset) => {
    const match = index.match(new RegExp(`assets/room3d/${asset}\\.js\\?v=(\\d+)`));
    assert.ok(match, `${asset}.js cache key is missing`);
    assert.ok(Number(match[1]) >= 10, `${asset}.js cache key regressed below v10`);
  });
});
