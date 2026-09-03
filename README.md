# pistilreaper.github.io

Interactive personal homepage built as a four-view 3D room, with About, Publications, Blogs, and Beyond Research sections.

## Local preview

```powershell
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
- `qa/`: executable regression tests only.

## Release boundary

GitHub Pages uploads only `index.html` and `assets/`. The repository intentionally contains no legacy Jekyll pages or 2D room fallback; the fixed four-view 3D room is the only production site.

## Verification

```powershell
Get-ChildItem qa/*.test.js | ForEach-Object { node $_.FullName }
```
