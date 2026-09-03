"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const exists = (relative) => fs.existsSync(path.join(root, relative));
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const countFiles = (relative) => fs.readdirSync(path.join(root, relative), { withFileTypes: true })
  .reduce((total, entry) => total + (entry.isDirectory()
    ? countFiles(path.join(relative, entry.name))
    : 1), 0);

function test(name, run) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}: ${String(error.message).split("\n")[0]}`);
    process.exitCode = 1;
  }
}

test("legacy asset drafts and generated QA screenshots are absent", () => {
  [
    "assets/room/v2",
    "assets/audio/cabin",
    "assets/covers/albowlly.png",
    "assets/covers/eason.png",
    "docs/superpower",
    "docs/superpowers",
    "docs/superpowers/plans/2026-08-27-personal-homepage-refresh.md",
  ].forEach((relative) => assert.equal(exists(relative), false, `${relative} should not exist`));

  const qaImages = fs.readdirSync(path.join(root, "qa")).filter((name) => /\.(png|jpe?g)$/i.test(name));
  assert.deepEqual(qaImages, []);
});

test("runtime assets use semantic production directories", () => {
  const index = read("index.html");
  const app = read("assets/app.js");
  const core = read("assets/room3d/core.js");
  const scene = read("assets/room3d/scene.js");
  const main = read("assets/room3d/main.js");
  const source = [index, app, core, scene, main].join("\n");

  assert.doesNotMatch(source, /assets\/room\/v2|assets\/audio\/cabin|assets\/photo\.png/);
  assert.doesNotMatch(app, /assets\/room\//);
  assert.match(main, /assets\/audio\/effects\/\$\{name\}\.mp3/);
  assert.match(index, /assets\/profile\/photo\.png/);
  assert.match(index, /assets\/audio\/effects\/fire\.mp3/);
});

test("every retained asset category contains only release inputs", () => {
  const expectedFolders = [
    "audio/effects",
    "audio/licenses",
    "brand",
    "covers",
    "post-images",
    "profile",
    "pub",
    "room",
    "room3d",
    "vendor",
  ];
  const actualFolders = fs.readdirSync(path.join(root, "assets"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  expectedFolders.forEach((relative) => assert.equal(exists(`assets/${relative}`), true));
  assert.deepEqual(actualFolders.sort(), ["audio", "brand", "covers", "post-images", "profile", "pub", "room", "room3d", "vendor"]);
  const expectedCounts = {
    "audio/effects": 10,
    "audio/licenses": 2,
    brand: 3,
    covers: 4,
    "post-images": 4,
    profile: 1,
    pub: 6,
    "room/about": 1,
    "room/beyond": 2,
    "room/global": 1,
    room: 4,
    room3d: 4,
    vendor: 1,
  };
  Object.entries(expectedCounts).forEach(([relative, count]) => {
    assert.equal(countFiles(`assets/${relative}`), count, `${relative} contains an unexpected file count`);
  });
});

test("Pages publishes only the production entrypoint and assets", () => {
  const workflow = read(".github/workflows/build.yml");
  assert.doesNotMatch(workflow, /jekyll/i);
  assert.match(workflow, /Copy-Item \.\/index\.html \.\/_site\/index\.html/);
  assert.match(workflow, /Copy-Item \.\/assets \.\/_site\/assets -Recurse/);
});
