"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const index = read("index.html");
const style = read("assets/style.css");
const app = read("assets/app.js");
const dataSource = read("assets/data.js");
const context = {};
vm.runInNewContext(`${dataSource}\nthis.__SITE_DATA__ = SITE_DATA;`, context);
const data = context.__SITE_DATA__;

function test(name, run) {
  try {
    run();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}: ${String(error.message).split("\n")[0]}`);
    process.exitCode = 1;
  }
}

function jpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += length + 2;
  }
  throw new Error("JPEG dimensions not found");
}

test("fluid mechanics conference includes its edition", () => {
  assert.match(data.news[0].html, /14th National Conference on Fluid Mechanics/);
});

test("JFM news title owns the DOI link and has no arXiv link", () => {
  assert.match(data.news[2].html, /<a href=['"]https:\/\/doi\.org\/10\.1017\/jfm\.2025\.10710['"][^>]*><i>Symbolic identification of tensor equations in multidimensional physical fields<\/i><\/a>/);
  assert.doesNotMatch(data.news[2].html, /arxiv/i);
});

test("education uses the official high-resolution Beihang emblem", () => {
  const logoPath = path.join(root, "assets", "brand", "beihang-emblem.jpg");
  assert.equal(fs.existsSync(logoPath), true);
  const logo = fs.readFileSync(logoPath);
  assert.deepEqual(jpegDimensions(logo), { width: 473, height: 473 });
  assert.ok(data.education.every((entry) => entry.logo === "assets/brand/beihang-emblem.jpg"));
  assert.match(app, /<img src="\$\{entry\.logo\}" alt="Beihang University emblem">/);
});

test("Biography and Contact body copy is larger without changing other content", () => {
  assert.match(style, /\.bio-text,.contact-block\{font-size:18px;/);
});

test("release cache keys advance for every edited frontend asset", () => {
  assert.match(index, /assets\/style\.css\?v=12/);
  assert.match(index, /assets\/data\.js\?v=5/);
  assert.match(index, /assets\/app\.js\?v=6/);
});

test("the hidden now-playing cover never requests the current HTML document", () => {
  assert.doesNotMatch(index, /id="np-cover"\s+src=""/);
});
