# pistilreaper.github.io

Interactive personal homepage built as a four-view 3D room, with About, Publications, Blogs, and Beyond Research sections.

## Local preview

```powershell
node scripts/build-site.js
python -m http.server 4173 --bind 127.0.0.1 --directory _site
```

Open `http://127.0.0.1:4173/index.html#/about`.

## Asset layout

- `assets/room/`: the four textures loaded by the 3D renderer.
- `assets/room3d/`: Three.js room geometry and interaction code.
- `assets/audio/effects/`: runtime sound effects.
- `assets/audio/licenses/`: audio license records.
- `assets/brand/`, `assets/profile/`, `assets/pub/`: identity and publication media.
- `assets/covers/`, `assets/post-images/`: music covers and in-post images.
- `content/site-data.json`: the only source for biography, news, publications, and music data.
- `content/posts/`: the only source for blogs, with one Markdown file per post.
- `scripts/build-site.js`: validates content and creates the ignored `_site/` deployment artifact.
- `qa/`: executable regression tests only.

## Editing content

- Edit biography, news, publications, or music in `content/site-data.json`.
- Add or edit blogs in `content/posts/*.md`. Name each file `YYYY-MM-DD-slug.md`; the filename is the post date and stable route ID.
- Front matter contains exactly the JSON-valued `title`, `tags`, and `excerpt` fields. Copy an existing post as the format reference.
- Put blog images in `assets/post-images/` and reference them as `assets/post-images/<folder>/<file>`.
- Run `node scripts/build-site.js` and preview `_site/` after every content change. Commit only the source Markdown, JSON, and images; never commit `_site/`.

## Release boundary

GitHub Pages uploads only the generated `_site/` directory. It contains `index.html`, runtime assets, the site JSON, a metadata-only post index, and the Markdown posts. The repository intentionally contains no legacy Jekyll pages or 2D room fallback; the fixed four-view 3D room is the only production site.

The repository has no committed content bundle: the browser loads `content/site-data.json`, then fetches a post Markdown file only when that stable slug is opened.

## Verification

```powershell
node scripts/build-site.js
Get-ChildItem qa/*.test.js | ForEach-Object { node $_.FullName }
```
