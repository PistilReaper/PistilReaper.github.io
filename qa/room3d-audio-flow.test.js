"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const scene = read("assets/room3d/scene.js");
const main = read("assets/room3d/main.js");
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

test("pillow throws from the left cushion to the right and back with cloth foley", () => {
  assert.match(scene, /pillow\.userData\.onRight = false/);
  assert.match(scene, /pillow\.userData\.travel = 0/);
  assert.match(scene, /THREE\.MathUtils\.lerp\(-0\.78, 0\.68, ease\)/);
  assert.match(scene, /Math\.sin\(pillow\.userData\.travel \* Math\.PI\)/);
  assert.match(main, /object\.userData\.onRight = !object\.userData\.onRight/);
  assert.match(main, /SND\.cloth\(object\.userData\.onRight\)/);
  assert.match(main, /function playClothThrow\(/);
  assert.doesNotMatch(main, /action === "pillow"[\s\S]{0,180}SND\.play\([^\n]+"cast"/);
});

test("fire uses the supplied exact loop and only follows flame state", () => {
  const firePath = path.join(root, "assets", "audio", "effects", "fire.mp3");
  const digest = crypto.createHash("sha256").update(fs.readFileSync(firePath)).digest("hex");
  assert.equal(digest, "2554f1b325b65d7f566e45409e77f22f0697b2d6fce165ab5d756c631820c880");
  assert.match(index, /id="fire-audio"[^>]+loop[^>]+src="assets\/audio\/effects\/fire\.mp3"/);
  assert.match(scene, /g\.userData\.fireLevel = 0/);
  assert.match(scene, /g\.userData\.fireGoal = 0/);
  assert.match(main, /function syncFireAudio\(lit\)/);
  assert.match(main, /fireAudio\.loop = true/);
  assert.doesNotMatch(main, /action === "fire"[\s\S]{0,180}SND\.play\("fire"/);
});

test("fire and vinyl are independent persistent channels and vinyl loops", () => {
  assert.match(index, /id="vinyl-audio"[^>]+loop/);
  assert.match(main, /audio\.loop = true/);
  assert.match(main, /function syncPersistentAudio\(/);
  const fireBranch = main.match(/else if \(action === "fire"\) \{([\s\S]*?)\n\s*\} else if/);
  assert.ok(fireBranch, "fire action branch is missing");
  assert.doesNotMatch(fireBranch[1], /vinyl|gramophone/);
  const recordToggle = main.match(/function toggleRecord\(player\) \{([\s\S]*?)\n\s*\}/);
  assert.ok(recordToggle, "record toggle is missing");
  assert.doesNotMatch(recordToggle[1], /fireAudio|fireGoal/);
});

test("publication books require pull then confirm and return before navigation", () => {
  assert.match(scene, /book\.userData\.ready = false/);
  assert.match(main, /const wasReady = Boolean\(object\.userData\.ready\)/);
  assert.match(main, /if \(!wasReady\) \{/);
  assert.match(main, /object\.userData\.pullGoal = 1/);
  assert.match(main, /object\.userData\.pullGoal = 0/);
  assert.match(main, /object\.userData\.ready = false/);
  assert.match(main, /navigateContent\("publications", "#content-publications"\)/);
});

test("typewriter types on the first click and resets while navigating on the second", () => {
  const soundPath = path.join(root, "assets", "audio", "effects", "typewriter.mp3");
  assert.equal(fs.existsSync(soundPath), true, "typewriter.mp3 is missing");
  assert.ok(fs.statSync(soundPath).size > 10000, "typewriter.mp3 is unexpectedly small");
  assert.match(scene, /paperTraceLines/);
  assert.match(scene, /typewriter-ready-traces/);
  assert.match(scene, /g\.userData\.paperGoal = 0/);
  assert.match(scene, /type\.userData\.paperLift/);
  assert.match(main, /if \(!object\.userData\.ready\) \{/);
  assert.match(main, /object\.userData\.paperGoal = 1/);
  assert.match(main, /SND\.play\("typewriter", 0\.44, true\)/);
  assert.match(main, /SND\.stop\("typewriter"\)/);
  assert.match(main, /object\.userData\.paperGoal = 0/);
  assert.match(main, /navigateContent\("blogs", "#content-blogs"\)/);
});

test("browser cache keys are v9 or newer", () => {
  assert.match(index, /assets\/room3d\/core\.js\?v=(?:9|[1-9]\d+)/);
  assert.match(index, /assets\/room3d\/layout\.js\?v=(?:9|[1-9]\d+)/);
  assert.match(index, /assets\/room3d\/scene\.js\?v=(?:9|[1-9]\d+)/);
  assert.match(index, /assets\/room3d\/main\.js\?v=(?:9|[1-9]\d+)/);
});
