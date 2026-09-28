"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "assets/app.js"), "utf8");
const context = vm.createContext({ window: { katex: require("../assets/vendor/katex/katex.min.js") } });
vm.runInContext(source.slice(source.indexOf("  function escapeHtml("), source.indexOf('  const blogsSection =')), context);
const render = context.renderMarkdown;

test("fenced Python preserves indentation and blank lines without interpreting Markdown or HTML", () => {
  const markdown = [
    "```python",
    "import numpy as np",
    "",
    "def equation(x, params):",
    "    # $x$ **literal**",
    "    return x**3 < params[0] & 1",
    '    label = "<script>"',
    "```",
  ].join("\n");
  assert.equal(render(markdown), [
    "<pre><code>import numpy as np",
    "",
    "def equation(x, params):",
    "    # $x$ **literal**",
    "    return x**3 &lt; params[0] &amp; 1",
    "    label = &quot;&lt;script&gt;&quot;",
    "</code></pre>",
  ].join("\n"));
});

test("code fences separate neighboring prose and resume ordinary Markdown after closing", () => {
  assert.equal(render("Before\n```\n# code\n```\n## After\n\n**bold**"),
    "<p>Before</p>\n<pre><code># code\n</code></pre>\n<h2>After</h2>\n<p><strong>bold</strong></p>");
});

test("a fenced block closes only on a matching fence at least as long as its opener", () => {
  assert.equal(render("~~~~text\n~~~\n```\n~~~~\nAfter"),
    "<pre><code>~~~\n```\n</code></pre>\n<p>After</p>");
});

test("an unclosed fence preserves code through the end of the document", () => {
  assert.equal(render("```python\n    x = 1\n\n    y = 2"),
    "<pre><code>    x = 1\n\n    y = 2\n</code></pre>");
});
