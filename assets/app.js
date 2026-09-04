(async function () {
  "use strict";

  const [siteResponse, postsResponse] = await Promise.all([
    fetch("content/site-data.json", { cache: "no-cache" }),
    fetch("content/posts/index.json", { cache: "no-cache" }),
  ]);
  if (!siteResponse.ok) throw new Error(`网站数据加载失败：${siteResponse.status}`);
  if (!postsResponse.ok) throw new Error(`文章索引加载失败：${postsResponse.status}`);
  const D = { ...(await siteResponse.json()), posts: await postsResponse.json() };
  window.SITE_DATA = D;
  window.dispatchEvent(new CustomEvent("sitedataready"));
  const $ = (selector, root = document) => root.querySelector(selector);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (localStorage.getItem("tc-muted") === "1") document.body.classList.add("muted");
  if (localStorage.getItem("tc-theme") === "night") document.body.classList.add("night");

  $("#sound-btn").addEventListener("click", () => {
    document.body.classList.toggle("muted");
    localStorage.setItem("tc-muted", document.body.classList.contains("muted") ? "1" : "0");
  });
  $("#theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("night");
    localStorage.setItem("tc-theme", document.body.classList.contains("night") ? "night" : "day");
  });
  $("#room-home-btn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });

  $("#bio-text").innerHTML = D.bio.map((paragraph) => `<p>${paragraph}</p>`).join("");
  $("#edu-list").innerHTML = D.education.map((entry) => `
    <div class="edu-item">
      <div class="edu-badge"><img src="${entry.logo}" alt="Beihang University emblem"></div>
      <div><p class="edu-school">${entry.school}</p><p class="edu-degree">${entry.degree}</p></div>
      <span class="edu-time">${entry.time}</span>
    </div>`).join("");
  $("#news-list").innerHTML = D.news.map((entry) => `
    <li><span class="news-date">${entry.date}</span><span>${entry.html}</span></li>`).join("");
  $("#contact-text").innerHTML = D.contact.html;

  const publicationId = (entry, index) => `publication-${entry.year}-${index + 1}`;
  const publicationYears = [...new Set(D.publications.map((entry) => entry.year))].sort((a, b) => b - a);
  $("#pubs-root").innerHTML = publicationYears.map((year) => `
    <div class="pub-year">${year}</div>
    ${D.publications.map((entry, index) => ({ entry, index })).filter(({ entry }) => entry.year === year).map(({ entry, index }) => `
      <div class="pub-item" id="${publicationId(entry, index)}">
        ${entry.image ? `<figure class="pub-thumb"><img src="${entry.image}" alt="${entry.title}" loading="lazy"></figure>` : `<div class="pub-noimg">—</div>`}
        <div class="pub-body">
          <p class="pub-title"><a href="${entry.links[0][1]}" target="_blank" rel="noopener noreferrer">${entry.title}</a></p>
          <p class="pub-authors">${entry.authors}</p>
          ${entry.note ? `<p class="pub-note">${entry.note}</p>` : ""}
          <p class="pub-venue">${entry.venue}</p>
          <p class="pub-links">${entry.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).join("")}</p>
        </div>
      </div>`).join("")}`).join("");
  $("#blogs-root").innerHTML = D.posts.map((post) => `
    <div class="blog-item">
      <span class="blog-date">${post.date}</span>
      <div>
        <p class="blog-title"><a href="#/blogs/post/${post.id}" data-post-id="${post.id}">${post.title}</a></p>
        ${post.excerpt ? `<p class="blog-excerpt">${post.excerpt}…</p>` : ""}
        <p class="blog-tags">${post.tags.map((tag) => `<span>${tag}</span>`).join("")}</p>
      </div>
    </div>`).join("");

  function scrollToElement(element) {
    element.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]);
  }

  function inlineMarkdown(value) {
    let text = escapeHtml(value);
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, source) => {
      return `<img src="${source.trim()}" alt="${alt}">`;
    });
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, rawHref) => {
      const hrefMatch = rawHref.match(/https?:\/\/\S+$/);
      const href = (hrefMatch ? hrefMatch[0] : rawHref).trim();
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    text = text.replace(/\$([^$]+)\$/g, '<span class="post-inline-math">$1</span>');
    return text;
  }

  function renderMarkdown(markdown) {
    const output = [];
    const paragraph = [];
    let listType = null;
    let mathLines = null;
    const flushParagraph = () => {
      if (!paragraph.length) return;
      const content = inlineMarkdown(paragraph.join(" "));
      output.push(content.startsWith("<img ") && content.endsWith(">")
        ? `<figure>${content}</figure>`
        : `<p>${content}</p>`);
      paragraph.length = 0;
    };
    const closeList = () => {
      if (!listType) return;
      output.push(`</${listType}>`);
      listType = null;
    };
    markdown.replace(/\r\n?/g, "\n").split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (mathLines) {
        if (trimmed.endsWith("$$")) {
          mathLines.push(trimmed.slice(0, -2));
          output.push(`<div class="post-math">${escapeHtml(mathLines.join("\n").trim())}</div>`);
          mathLines = null;
        } else mathLines.push(line);
        return;
      }
      if (trimmed.startsWith("$$")) {
        flushParagraph(); closeList();
        const equation = trimmed.slice(2);
        if (equation.endsWith("$$")) output.push(`<div class="post-math">${escapeHtml(equation.slice(0, -2).trim())}</div>`);
        else mathLines = [equation];
        return;
      }
      if (!trimmed) { flushParagraph(); closeList(); return; }
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        flushParagraph(); closeList();
        const level = heading[1].length;
        output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        return;
      }
      const listItem = line.match(/^\s*(?:(\d+)\.|[-*+])\s+(.+)$/);
      if (listItem) {
        flushParagraph();
        const nextType = listItem[1] ? "ol" : "ul";
        if (listType !== nextType) { closeList(); output.push(`<${nextType}>`); listType = nextType; }
        output.push(`<li>${inlineMarkdown(listItem[2])}</li>`);
        return;
      }
      closeList();
      paragraph.push(trimmed);
    });
    flushParagraph(); closeList();
    if (mathLines) output.push(`<div class="post-math">${escapeHtml(mathLines.join("\n").trim())}</div>`);
    return output.join("\n");
  }

  const blogsSection = $("#content-blogs");
  const blogsListView = $("#blogs-list-view");
  const postReader = $("#post-reader");
  const postContent = $("#post-content");
  const postCache = new Map();
  let activePostId = null;
  let blogsListScrollY = 0;

  function stripFrontMatter(markdown) {
    const normalized = markdown.replace(/\r\n?/g, "\n");
    if (!normalized.startsWith("---\n")) throw new Error("文章缺少 front matter");
    const boundary = normalized.indexOf("\n---\n", 4);
    if (boundary < 0) throw new Error("文章 front matter 未正确结束");
    return normalized.slice(boundary + 5).trim();
  }

  async function loadPost(post) {
    if (postCache.has(post.id)) return postCache.get(post.id);
    const response = await fetch(post.source, { cache: "no-cache" });
    if (!response.ok) throw new Error(`文章加载失败：${response.status}`);
    const markdown = stripFrontMatter(await response.text());
    postCache.set(post.id, markdown);
    return markdown;
  }

  async function openPost(id, options = {}) {
    const post = D.posts.find((entry) => entry.id === id);
    if (!post) return;
    if (activePostId === null) {
      blogsListScrollY = options.rememberScroll === false ? blogsSection.offsetTop : window.scrollY;
    }
    activePostId = id;
    $("#post-reader-title").textContent = post.title;
    $("#post-reader-date").textContent = post.date;
    postContent.textContent = "文章加载中…";
    blogsListView.hidden = true;
    postReader.hidden = false;
    if (options.updateHistory !== false) history.pushState(null, "", `#/blogs/post/${post.id}`);
    scrollToElement(blogsSection);
    $("#post-back").focus({ preventScroll: true });
    try {
      const markdown = await loadPost(post);
      if (activePostId === id) postContent.innerHTML = renderMarkdown(markdown);
    } catch (error) {
      console.error(error);
      if (activePostId === id) postContent.textContent = "文章加载失败，请刷新页面重试。";
    }
  }

  function closePost(options = {}) {
    if (activePostId === null && postReader.hidden) return;
    activePostId = null;
    postReader.hidden = true;
    blogsListView.hidden = false;
    postContent.replaceChildren();
    if (options.updateHistory !== false) history.replaceState(null, "", "#/blogs");
    if (options.restoreScroll !== false) {
      requestAnimationFrame(() => window.scrollTo({ top: blogsListScrollY, behavior: reduced ? "auto" : "smooth" }));
    }
  }

  $("#blogs-root").addEventListener("click", (event) => {
    const link = event.target.closest("[data-post-id]");
    if (!link) return;
    event.preventDefault();
    openPost(link.dataset.postId);
  });
  $("#post-back").addEventListener("click", () => closePost());

  const WALLS = ["about", "publications", "blogs", "beyond"];
  let wallIndex = -1;
  let switching = false;

  function showWall(name, direction = 0, skipHash = false) {
    const nextIndex = WALLS.indexOf(name);
    if (nextIndex < 0 || switching || nextIndex === wallIndex) return;
    if (activePostId !== null && name !== "blogs") closePost({ updateHistory: false, restoreScroll: false });
    wallIndex = nextIndex;
    document.querySelectorAll(".content-page").forEach((section) => {
      section.classList.toggle("current", section.id === `content-${name}`);
    });
    window.dispatchEvent(new CustomEvent("roomwallchange", { detail: { name, direction } }));
    if (!skipHash) history.replaceState(null, "", `#/${name}`);
    window.scrollTo({ top: 0, behavior: "auto" });
    if (direction) {
      switching = true;
      window.setTimeout(() => { switching = false; }, reduced ? 0 : 640);
    }
  }

  function stepWall(direction) {
    if (switching) return;
    showWall(WALLS[(wallIndex + direction + WALLS.length) % WALLS.length], direction);
  }
  $("#edge-left").addEventListener("click", () => stepWall(-1));
  $("#edge-right").addEventListener("click", () => stepWall(1));
  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement?.tagName;
    if (tag !== "INPUT" && tag !== "TEXTAREA") {
      if (event.key === "ArrowLeft") stepWall(-1);
      if (event.key === "ArrowRight") stepWall(1);
    }
    if (event.key === "Escape") $("#modal").hidden = true;
  });

  function syncRoute() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const wall = WALLS.includes(parts[0]) ? parts[0] : "about";
    showWall(wall, 0, true);
    const postId = wall === "blogs" && parts[1] === "post" ? parts[2] : "";
    if (D.posts.some((post) => post.id === postId)) openPost(postId, { updateHistory: false, rememberScroll: false });
    else if (activePostId !== null) closePost({ updateHistory: false });
  }
  window.addEventListener("hashchange", syncRoute);
  window.addEventListener("popstate", syncRoute);

  const modal = $("#modal");
  $("#modal-close").addEventListener("click", () => { modal.hidden = true; });
  $(".modal-back").addEventListener("click", () => { modal.hidden = true; });

  syncRoute();
})().catch((error) => {
  console.error(error);
  const target = document.querySelector("#blogs-root");
  if (target) target.textContent = "网站内容加载失败，请刷新页面重试。";
});
