"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const postsRoot = path.join(root, "content", "posts");
const siteDataPath = path.join(root, "content", "site-data.json");
const defaultOutput = path.join(root, "_site");
const requiredFields = ["title", "tags", "excerpt"];

function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(message);
}

function parsePost(filePath) {
  const fileName = path.basename(filePath);
  const fileMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/);
  if (!fileMatch) throw new Error(`${filePath}: 文件名必须为 YYYY-MM-DD-slug.md`);

  const source = fs.readFileSync(filePath, "utf8").replace(/\r\n?/g, "\n");
  if (!source.startsWith("---\n")) throw new Error(`${filePath}: 缺少 Markdown front matter`);
  const boundary = source.indexOf("\n---\n", 4);
  if (boundary < 0) throw new Error(`${filePath}: front matter 未正确结束`);

  const metadata = {};
  source.slice(4, boundary).split("\n").filter(Boolean).forEach((line) => {
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error(`${filePath}: 无法解析元数据行 ${line}`);
    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    try {
      metadata[key] = JSON.parse(rawValue);
    } catch (error) {
      throw new Error(`${filePath}: ${key} 必须使用 JSON 格式`, { cause: error });
    }
  });

  assertEqual(Object.keys(metadata).sort(), [...requiredFields].sort(), `${filePath}: 元数据字段必须为 ${requiredFields.join(", ")}`);
  if (typeof metadata.title !== "string" || !metadata.title.trim()) throw new Error(`${filePath}: title 不能为空`);
  if (!Array.isArray(metadata.tags) || metadata.tags.some((tag) => typeof tag !== "string" || !tag.trim())) {
    throw new Error(`${filePath}: tags 必须为非空字符串数组`);
  }
  if (typeof metadata.excerpt !== "string") throw new Error(`${filePath}: excerpt 必须为字符串`);

  const body = source.slice(boundary + 5).trimEnd();
  if (!body) throw new Error(`${filePath}: 正文不能为空`);
  const localImages = [...body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)]
    .map((match) => match[1].trim())
    .filter((url) => !/^https?:\/\//.test(url));
  if (localImages.some((url) => !url.startsWith("assets/post-images/") || url.includes("\\"))) {
    throw new Error(`${filePath}: 本地图片必须使用 assets/post-images/ 下的正斜杠路径`);
  }

  return {
    id: fileName.slice(0, -3),
    date: fileMatch[1],
    metadata,
    body,
    source,
  };
}

function resolveOutput(argv) {
  const outputAt = argv.indexOf("--output");
  if (outputAt < 0) return defaultOutput;
  if (!argv[outputAt + 1]) throw new Error("--output 后必须提供目录路径");
  return path.resolve(root, argv[outputAt + 1]);
}

function prepareOutput(output) {
  if (!fs.existsSync(output)) return;
  if (path.resolve(output) !== defaultOutput) throw new Error(`输出目录已存在，拒绝覆盖：${output}`);
  fs.rmSync(defaultOutput, { recursive: true, force: true });
}

function buildSite(output = defaultOutput) {
  const siteData = JSON.parse(fs.readFileSync(siteDataPath, "utf8"));
  if (Object.prototype.hasOwnProperty.call(siteData, "posts")) {
    throw new Error("content/site-data.json 不应包含 posts；文章来自 content/posts/*.md");
  }

  const posts = fs.readdirSync(postsRoot)
    .filter((name) => name.endsWith(".md"))
    .map((name) => parsePost(path.join(postsRoot, name)))
    .sort((left, right) => right.date.localeCompare(left.date) || left.id.localeCompare(right.id));
  if (!posts.length) throw new Error("content/posts 中没有 Markdown 文章");

  prepareOutput(output);
  fs.mkdirSync(path.join(output, "content", "posts"), { recursive: true });
  fs.copyFileSync(path.join(root, "index.html"), path.join(output, "index.html"));
  fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), { recursive: true });
  fs.copyFileSync(siteDataPath, path.join(output, "content", "site-data.json"));

  const postIndex = posts.map((post) => ({
    id: post.id,
    date: post.date,
    ...post.metadata,
    source: `content/posts/${post.id}.md`,
  }));
  fs.writeFileSync(path.join(output, "content", "posts", "index.json"), `${JSON.stringify(postIndex, null, 2)}\n`);
  posts.forEach((post) => {
    fs.writeFileSync(path.join(output, "content", "posts", `${post.id}.md`), post.source);
  });
  return postIndex;
}

function main() {
  const output = resolveOutput(process.argv.slice(2));
  const posts = buildSite(output);
  console.log(`已构建 ${path.relative(root, output)}，包含 ${posts.length} 篇文章`);
}

if (require.main === module) main();

module.exports = { buildSite, parsePost };
