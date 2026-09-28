"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const buildScript = path.join(root, "scripts", "build-site.js");

test("repository content has one source of truth and keeps the latest vinyl edit", () => {
  assert.equal(fs.existsSync(path.join(root, "assets", "data.js")), false, "generated data.js must not be committed");
  const siteData = JSON.parse(fs.readFileSync(path.join(root, "content", "site-data.json"), "utf8"));
  assert.equal(siteData.vinyl.find((track) => track.title_en === "cardigan").note_en, "Best folklore");
  assert.equal("posts" in siteData, false);
});

test("post filename owns date and slug while front matter owns display metadata", () => {
  assert.equal(fs.existsSync(buildScript), true, "scripts/build-site.js must exist");
  const { parsePost } = require(buildScript);
  const postsRoot = path.join(root, "content", "posts");
  const files = fs.readdirSync(postsRoot).filter((name) => name.endsWith(".md"));
  assert.ok(files.length > 0, "content/posts must contain Markdown posts");
  for (const file of files) {
    const source = fs.readFileSync(path.join(postsRoot, file), "utf8");
    assert.doesNotMatch(source, /^date:/m);
    const post = parsePost(path.join(postsRoot, file));
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(post.id, file.slice(0, -3));
    assert.deepEqual(Object.keys(post.metadata).sort(), ["excerpt", "tags", "title"]);
    assert.ok(post.body.length > 0);
  }
});

test("build creates a deployable site whose post index contains no article bodies", () => {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "homepage-build-"));
  const output = path.join(temporaryRoot, "site");
  try {
    const result = spawnSync(process.execPath, [buildScript, "--output", output], {
      cwd: root,
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.deepEqual(fs.readdirSync(output).sort(), ["assets", "content", "index.html"]);
    assert.equal(fs.existsSync(path.join(output, "assets", "data.js")), false);
    assert.equal(fs.existsSync(path.join(output, "content", "site-data.json")), true);

    const index = JSON.parse(fs.readFileSync(path.join(output, "content", "posts", "index.json"), "utf8"));
    const sourceIds = fs.readdirSync(path.join(root, "content", "posts"))
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.slice(0, -3));
    assert.deepEqual(index.map((post) => post.id).sort(), sourceIds.sort());
    for (const post of index) {
      assert.deepEqual(Object.keys(post).sort(), ["date", "excerpt", "id", "source", "tags", "title"]);
      assert.equal("content" in post, false);
      assert.equal(post.source, `content/posts/${post.id}.md`);
      assert.equal(fs.readFileSync(path.join(output, post.source), "utf8"),
        fs.readFileSync(path.join(root, post.source), "utf8").replace(/\r\n?/g, "\n"));
    }
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});

test("deployment builds the site before uploading the generated artifact", () => {
  const workflow = fs.readFileSync(path.join(root, ".github", "workflows", "build.yml"), "utf8");
  assert.match(workflow, /node scripts\/build-site\.js/);
  assert.match(workflow, /path:\s*\.\/_site/);
  assert.doesNotMatch(workflow, /build-content\.js|assets\/data\.js/);
});
