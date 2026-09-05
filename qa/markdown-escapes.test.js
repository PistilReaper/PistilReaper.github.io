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
test("SNIP reference markers render without escape slashes and retain the reference link", () => {
  const markdown = fs.readFileSync(path.join(root, "content/posts/2026-03-11-snip.md"), "utf8");
  const html = render(markdown.slice(markdown.indexOf("## Reference")));
  for (let i = 1; i <= 6; i++) assert.ok(html.includes(`<p>[${i}] `));
  assert.ok(html.includes('href="https://mp.weixin.qq.com/s/sUAoNXGvwWa6lecq73pyAg"'));
});
test("escaped punctuation stays literal instead of becoming formatting or HTML", () => {
  assert.equal(render(String.raw`\[text](https://example.com) \*literal\* \<b\>`), '<p>[text](https://example.com) *literal* &lt;b&gt;</p>');
  assert.equal(render(String.raw`\A \\`), '<p>\\A \\</p>');
});
test("code and TeX retain their backslashes while surrounding citations are unescaped", () => {
  assert.equal(render('`\\[1]` \\[2]'), '<p><code>\\[1]</code> [2]</p>');
  const html = render(String.raw`$\frac{1}{2}$ \[3]`);
  assert.ok(html.includes('class="katex"'));
  assert.ok(html.includes(String.raw`\frac{1}{2}`));
  assert.ok(html.endsWith(' [3]</p>'));
});
