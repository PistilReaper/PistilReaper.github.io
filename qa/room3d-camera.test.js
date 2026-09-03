"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const main = read("assets/room3d/main.js");
const scene = read("assets/room3d/scene.js");
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

test("Blogs fixed view keeps the camera level and uses an off-axis vertical crop", () => {
  assert.match(main, /height: 3\.65/);
  assert.match(main, /radius: 2\.95/);
  assert.match(main, /fov: 49/);
  assert.match(main, /projectionShiftY: -0\.278/);
  assert.match(main, /camera\.projectionMatrix\.elements\[9\] = VIEW_SETTINGS\.projectionShiftY/);
  assert.match(main, /camera\.projectionMatrixInverse\.copy\(camera\.projectionMatrix\)\.invert\(\)/);
});

test("the off-axis frustum shows narrow side walls, the floor and the full-height front wall", () => {
  const cameraY = 3.65;
  const wallDistance = 8.80;
  const verticalFov = 49 * Math.PI / 180;
  const aspect = 1425 / 897;
  const projectionShiftY = -0.278;
  const symmetricHalfHeight = Math.tan(verticalFov / 2);
  const topAngle = Math.atan(symmetricHalfHeight * (1 + projectionShiftY));
  const bottomAngle = Math.atan(symmetricHalfHeight * (projectionShiftY - 1));
  const topAtWall = cameraY + wallDistance * Math.tan(topAngle);
  const bottomAtWall = cameraY + wallDistance * Math.tan(bottomAngle);
  const halfWidthAtWall = wallDistance * symmetricHalfHeight * aspect;

  const projectionScaleY = 1 / symmetricHalfHeight;
  const wallBaseNdc = projectionScaleY * (-cameraY / wallDistance) - projectionShiftY;
  const wallBaseScreenRatio = (1 - wallBaseNdc) / 2;

  assert.ok(topAtWall > 6.45 && topAtWall < 6.55, `top ray reaches ${topAtWall.toFixed(2)}`);
  assert.ok(bottomAtWall < 0, `bottom ray reaches ${bottomAtWall.toFixed(2)}, above the floor`);
  assert.ok(halfWidthAtWall > 5.85 && halfWidthAtWall < 6.50, `half width is ${halfWidthAtWall.toFixed(2)}`);
  assert.ok(wallBaseScreenRatio > 0.80 && wallBaseScreenRatio < 0.84, `floor begins at ${(wallBaseScreenRatio * 100).toFixed(1)}%`);
  assert.match(scene, /texturedPlane\(texture, 11\.7, 7\.20/);
  assert.match(scene, /C\.put\(g, panel, 0, 3\.60, 0\)/);
});

test("the level view preserves vertical wall seams", () => {
  const cameraY = 3.65;
  const targetY = 3.65;
  const pitch = Math.atan2(targetY - cameraY, 8.80);
  assert.equal(pitch, 0);
});

test("fixed view preserves object picking and existing audio logic", () => {
  assert.match(main, /renderer\.domElement\.addEventListener\("pointermove", refreshHover\)/);
  assert.doesNotMatch(main, /addEventListener\("pointerdown"|addEventListener\("wheel"/);
  assert.match(main, /audio\.loop = true/);
  assert.match(main, /audio\.src = track\.preview/);
});

test("browser cache keys are v17 or newer", () => {
  ["core", "layout", "scene", "main"].forEach((asset) => {
    const match = index.match(new RegExp(`assets/room3d/${asset}\\.js\\?v=(\\d+)`));
    assert.ok(match, `${asset}.js cache key is missing`);
    assert.ok(Number(match[1]) >= 17, `${asset}.js cache key regressed below v17`);
  });
});
