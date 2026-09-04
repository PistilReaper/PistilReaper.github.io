const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("repository contains only the fixed four-view 3D site", () => {
  const forbidden = [
    "_config.yml",
    "_includes",
    "_layouts",
    "_posts",
    "_sass",
    "about.md",
    "life.md",
    "research.md",
    "search.json",
    "study.md",
    "style.scss",
    "tags",
    "js",
    "images",
    "docs/superpower",
    "docs/superpowers",
  ];

  forbidden.forEach((entry) => {
    assert.equal(fs.existsSync(path.join(root, entry)), false, `${entry} must be removed`);
  });
});

test("source data has no legacy 2D layout manifest", () => {
  const data = read("content/site-data.json");
  assert.doesNotMatch(data, /^\s*"layout"\s*:/m);
  assert.doesNotMatch(data, /^\s*"bbox"\s*:/m);
});

test("source data omits fields that only served previous versions", () => {
  const data = JSON.parse(read("content/site-data.json"));

  assert.equal("email" in data.contact, false);
  assert.equal("motto" in data, false);
  data.vinyl.forEach((track) => {
    assert.deepEqual(Object.keys(track).sort(), ["album", "artist", "cover", "note_en", "preview", "title_en"]);
  });
});

test("runtime code and styles have no hidden 2D room implementation", () => {
  const app = read("assets/app.js");
  const style = read("assets/style.css");

  assert.doesNotMatch(app, /function renderScenes\(|const roomShell\s*=/);
  assert.doesNotMatch(app, /scene-object|assets\/room\//);
  assert.doesNotMatch(style, /room\/v2\//);
  assert.doesNotMatch(style, /\.scene-object|\.room-wall|\.room-floor|\.room-baseboard|\.room-ceiling|\.room-vignette/);
  assert.doesNotMatch(style, /\.room3d-free-hint|\.room3d-reset-view/);
});

test("direct blog post routes still select the blogs camera", () => {
  const main = read("assets/room3d/main.js");
  assert.match(main, /replace\(\/\^#\\\/\?\/[\s\S]*?split\("\/"\)\[0\]/);
});

test("room textures are limited to files loaded by the 3D renderer", () => {
  const roomRoot = path.join(root, "assets", "room");
  const actual = [];
  const visit = (directory) => {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(fullPath);
      else actual.push(path.relative(roomRoot, fullPath).replaceAll("\\", "/"));
    });
  };
  visit(roomRoot);

  assert.deepEqual(actual.sort(), [
    "about/painting.png",
    "beyond/day.png",
    "beyond/night.png",
    "global/wallpaper.png",
  ]);
});

test("Pages workflow publishes only the static site artifact", () => {
  const workflow = read(".github/workflows/build.yml");
  assert.doesNotMatch(workflow, /jekyll/i);
  assert.match(workflow, /build-site\.js/);
  assert.match(workflow, /path:\s*\.\/_site/);
});

test("current tests are named by behavior rather than historical version", () => {
  const versionedTests = fs.readdirSync(__dirname).filter((name) => /-v\d+\.test\.js$/.test(name));
  assert.deepEqual(versionedTests, []);
});
