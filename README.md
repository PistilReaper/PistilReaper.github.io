# pistilreaper.github.io

Interactive personal homepage built as a four-view 3D room, with About, Publications, Blogs, and Beyond Research sections.

## Local preview

```powershell
node scripts/build-content.js
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/index.html#/about`.

## Asset layout

- `assets/room/`: the four textures loaded by the 3D renderer.
- `assets/room3d/`: Three.js room geometry and interaction code.
- `assets/audio/effects/`: runtime sound effects.
- `assets/audio/licenses/`: audio license records.
- `assets/brand/`, `assets/profile/`, `assets/pub/`: identity and publication media.
- `assets/covers/`, `assets/post-images/`: music covers and in-post images.
- `content/site-data.json`: biography, news, publications, and music data.
- `content/posts/`: one Markdown source file per blog post.
- `scripts/build-content.js`: validates Markdown metadata and generates `assets/data.js`.
- `qa/`: executable regression tests only.

## Editing content

- Edit biography, news, publications, or music in `content/site-data.json`.
- Add or edit blogs in `content/posts/*.md`. Each file must begin with JSON-valued `title`, `date`, `tags`, and `excerpt` front matter; copy an existing post as the format reference.
- Put blog images in `assets/post-images/` and reference them from Markdown as `../images/<folder>/<file>`.
- Run `node scripts/build-content.js` after every content change. Commit both the Markdown source and the generated `assets/data.js`.
- Increment the `assets/data.js?v=` value in `index.html` when publishing changed content.

## Release boundary

GitHub Pages uploads only `index.html` and `assets/`. The repository intentionally contains no legacy Jekyll pages or 2D room fallback; the fixed four-view 3D room is the only production site.

Markdown is the source of truth for blogs. `assets/data.js` is retained as a generated browser asset so the site stays dependency-free at runtime; the deployment workflow rejects stale generated data.

## Verification

```powershell
node scripts/build-content.js --check
Get-ChildItem qa/*.test.js | ForEach-Object { node $_.FullName }
```
