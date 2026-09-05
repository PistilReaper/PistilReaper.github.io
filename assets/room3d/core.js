(function () {
  "use strict";

  const THREE = window.THREE;
  if (!THREE) return;

  const PALETTE = {
    ink: 0x17130f,
    paper: 0xeee6d7,
    paperDeep: 0xd8cbb7,
    wood: 0x6e4630,
    woodDark: 0x3e281d,
    woodLight: 0x9a6b4c,
    floor: 0x5c402a,
    red: 0x8e3933,
    green: 0x68784a,
    gold: 0xb38737,
    brass: 0xb78831,
    black: 0x1d1b19,
    cream: 0xf2dfb9,
    grey: 0x77716a,
  };

  const trackedMaterials = new Set();

  function remember(material) {
    if (material && material.color) {
      material.userData.baseColor = material.color.clone();
      trackedMaterials.add(material);
    }
    return material;
  }

  function fillMaterial(color, options) {
    return remember(new THREE.MeshBasicMaterial(Object.assign({
      color,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    }, options || {})));
  }

  function strokeMaterial(color, options) {
    return remember(new THREE.LineBasicMaterial(Object.assign({ color: color || PALETTE.ink }, options || {})));
  }

  function outlined(geometry, color, options) {
    const opts = options || {};
    const group = new THREE.Group();
    const fill = new THREE.Mesh(geometry, fillMaterial(color, opts.material));
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, opts.threshold === undefined ? 18 : opts.threshold),
      strokeMaterial(opts.ink || PALETTE.ink, opts.lineMaterial)
    );
    fill.renderOrder = opts.renderOrder || 0;
    edges.renderOrder = (opts.renderOrder || 0) + 1;
    group.add(fill, edges);
    group.userData.fill = fill;
    group.userData.edges = edges;
    return group;
  }

  const box = (w, h, d, color, options) => outlined(new THREE.BoxGeometry(w, h, d), color, options);
  const cylinder = (rt, rb, h, sides, color, options) => outlined(new THREE.CylinderGeometry(rt, rb, h, sides || 12), color, options);
  const cone = (radius, h, sides, color, options) => outlined(new THREE.ConeGeometry(radius, h, sides || 16, 1, !!(options && options.openEnded)), color, options);

  function roundedBox(w, h, d, radius, color, options) {
    const r = Math.min(radius || 0.12, w / 2, h / 2);
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: Math.min(r * 0.28, d * 0.18),
      bevelThickness: Math.min(r * 0.24, d * 0.16),
      curveSegments: 8,
    });
    geometry.translate(0, 0, -d / 2);
    return outlined(geometry, color, options);
  }

  function plane(w, h, color, options) {
    return outlined(new THREE.PlaneGeometry(w, h), color, Object.assign({ threshold: 1 }, options || {}));
  }

  function line(points, color) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
    return new THREE.Line(geometry, strokeMaterial(color || PALETTE.ink));
  }

  function lineSegments(points, color) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
    return new THREE.LineSegments(geometry, strokeMaterial(color || PALETTE.ink));
  }

  function put(parent, object, x, y, z, rx, ry, rz) {
    object.position.set(x || 0, y || 0, z || 0);
    object.rotation.set(rx || 0, ry || 0, rz || 0);
    parent.add(object);
    return object;
  }

  function cylinderBetween(a, b, radius, color, sides) {
    const p1 = new THREE.Vector3(a[0], a[1], a[2]);
    const p2 = new THREE.Vector3(b[0], b[1], b[2]);
    const direction = p2.clone().sub(p1);
    const object = cylinder(radius, radius, direction.length(), sides || 8, color);
    object.position.copy(p1).add(p2).multiplyScalar(0.5);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    return object;
  }

  function canvasTexture(size, draw) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    draw(ctx, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    texture.needsUpdate = true;
    return texture;
  }

  function wallpaperTexture() {
    const texture = new THREE.TextureLoader().load("assets/room/global/wallpaper.webp");
    texture.encoding = THREE.sRGBEncoding;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4.2, 2.35);
    return texture;
  }

  function radialTexture(inner, outer) {
    const texture = canvasTexture(256, (ctx, size) => {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, inner || "rgba(255,210,116,.72)");
      gradient.addColorStop(0.42, "rgba(255,186,84,.30)");
      gradient.addColorStop(1, outer || "rgba(255,170,60,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    });
    return texture;
  }

  function labelTexture(lines, options) {
    const opts = options || {};
    const canvas = document.createElement("canvas");
    canvas.width = opts.width || 1024;
    canvas.height = opts.height || 256;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
      ctx.fillStyle = opts.background || "#eadfc9";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = opts.border || "#2b2119";
      ctx.lineWidth = 12;
      ctx.strokeRect(ctx.lineWidth, ctx.lineWidth, width - ctx.lineWidth * 2, height - ctx.lineWidth * 2);
      ctx.fillStyle = opts.color || "#30251d";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${opts.italic ? "italic " : ""}${opts.weight || 700} ${opts.fontSize || 58}px Georgia, serif`;
      lines.forEach((text, index) => {
        const offset = (index - (lines.length - 1) / 2) * (opts.lineHeight || 72);
        ctx.fillText(text, width / 2, height / 2 + offset, width * 0.88);
      });
    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    texture.needsUpdate = true;
    return texture;
  }

  function texturePlane(url, w, h, options) {
    const opts = options || {};
    const texture = new THREE.TextureLoader().load(url);
    texture.encoding = THREE.sRGBEncoding;
    if (opts.crop) {
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.repeat.set(opts.crop.width, opts.crop.height);
      texture.offset.set(opts.crop.x, opts.crop.y);
    }
    const geometry = new THREE.PlaneGeometry(w, h);
    const group = new THREE.Group();
    const mesh = new THREE.Mesh(geometry, fillMaterial(0xffffff, {
      map: texture,
      transparent: !!opts.transparent,
      side: THREE.DoubleSide,
    }));
    group.add(mesh);
    if (opts.outline !== false) {
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), strokeMaterial(opts.ink || PALETTE.ink)));
    }
    return group;
  }

  function texturedPlane(texture, w, h, options) {
    const opts = options || {};
    const geometry = new THREE.PlaneGeometry(w, h);
    const group = new THREE.Group();
    group.add(new THREE.Mesh(geometry, fillMaterial(0xffffff, { map: texture, side: THREE.DoubleSide, transparent: !!opts.transparent })));
    if (opts.outline !== false) group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), strokeMaterial(opts.ink || PALETTE.ink)));
    return group;
  }

  function interactive(group, id, action) {
    group.userData.interactive = true;
    group.userData.interactionId = id;
    group.userData.action = action;
    group.userData.hover = 0;
    group.userData.hoverGoal = 0;
    group.userData.baseScale = group.scale.clone();
    group.traverse((object) => {
      if (object.isMesh || object.isLine || object.isLineSegments) object.userData.interactionRoot = group;
    });
    return group;
  }

  function setHover(group, on) {
    if (group) group.userData.hoverGoal = on ? 1 : 0;
  }

  function updateHover(group, dt) {
    if (!group || !group.userData.interactive) return;
    const changed = group.userData.hover !== group.userData.hoverGoal;
    group.userData.hover = group.userData.hoverGoal;
    group.scale.copy(group.userData.baseScale);
    if (!changed && !group.userData.hover) return;
    group.traverse((part) => {
      const mat = part.material;
      if (!part.isLineSegments || !mat?.color || !mat.userData.baseColor) return;
      const base = mat.userData.themeColor || mat.userData.baseColor;
      mat.color.copy(base);
      if (group.userData.hover) mat.color.lerp(new THREE.Color(PALETTE.gold), 0.75);
    });
  }

  function findInteraction(object) {
    let current = object;
    while (current) {
      if (current.userData && current.userData.interactive) return current;
      if (current.userData && current.userData.interactionRoot) return current.userData.interactionRoot;
      current = current.parent;
    }
    return null;
  }

  function createRenderer(container) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(PALETTE.paper, 1);
    container.appendChild(renderer.domElement);
    return renderer;
  }

  function resize(renderer, camera, container) {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function applyNight(renderer, root, night) {
    const amount = Number(night);
    renderer.setClearColor(new THREE.Color(PALETTE.paper).lerp(new THREE.Color(0x171a1d), amount), 1);
    trackedMaterials.forEach((mat) => {
      if (mat.userData.keepLight) return;
      const tint = mat.isLineBasicMaterial ? new THREE.Color(0.72, 0.72, 0.72) : new THREE.Color(0.48, 0.52, 0.64);
      const target = mat.userData.baseColor.clone().multiply(tint);
      mat.color.copy(mat.userData.baseColor).lerp(target, amount);
      if (!mat.userData.themeColor) mat.userData.themeColor = mat.color.clone();
      else mat.userData.themeColor.copy(mat.color);
    });
  }

  window.RustyRoomCore = {
    THREE,
    PALETTE,
    fillMaterial,
    strokeMaterial,
    outlined,
    box,
    roundedBox,
    cylinder,
    cone,
    plane,
    line,
    lineSegments,
    put,
    cylinderBetween,
    wallpaperTexture,
    radialTexture,
    labelTexture,
    texturePlane,
    texturedPlane,
    interactive,
    setHover,
    updateHover,
    findInteraction,
    createRenderer,
    resize,
    applyNight,
  };
})();
