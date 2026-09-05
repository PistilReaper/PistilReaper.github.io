(function () {
  "use strict";

  const C = window.RustyRoomCore;
  const L = window.RustyRoomLayout;
  if (!C || !L) return;
  const { THREE, PALETTE: P } = C;

  function placement(wall, id) {
    return L.walls[wall].find((item) => item.id === id);
  }

  function solidFrame(w, h, border, depth, color) {
    const outer = new THREE.Shape();
    outer.moveTo(-w / 2, -h / 2);
    outer.lineTo(w / 2, -h / 2);
    outer.lineTo(w / 2, h / 2);
    outer.lineTo(-w / 2, h / 2);
    outer.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-w / 2 + border, -h / 2 + border);
    hole.lineTo(-w / 2 + border, h / 2 - border);
    hole.lineTo(w / 2 - border, h / 2 - border);
    hole.lineTo(w / 2 - border, -h / 2 + border);
    hole.closePath();
    outer.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(outer, {
      depth,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: Math.min(0.035, border * 0.18),
      bevelThickness: 0.025,
      curveSegments: 4,
    });
    geometry.translate(0, 0, -depth / 2);
    return C.outlined(geometry, color);
  }

  function table(w, h, d, color) {
    const g = new THREE.Group();
    C.put(g, C.roundedBox(w, 0.18, d, 0.07, color), 0, h, 0);
    C.put(g, C.roundedBox(w - 0.14, 0.28, d - 0.14, 0.05, P.woodDark), 0, h - 0.2, 0);
    [-1, 1].forEach((sx) => [-1, 1].forEach((sz) => {
      const leg = C.outlined(new THREE.CylinderGeometry(0.07, 0.11, h, 8), color);
      C.put(g, leg, sx * (w / 2 - 0.2), h / 2, sz * (d / 2 - 0.16));
      C.put(g, C.cylinder(0.13, 0.15, 0.06, 10, P.woodDark), sx * (w / 2 - 0.2), 0.03, sz * (d / 2 - 0.16));
    }));
    return g;
  }

  function woodenChair() {
    const g = new THREE.Group();
    g.name = "straight-back-wooden-chair";
    C.put(g, C.roundedBox(1.02, 0.16, 0.80, 0.065, P.wood), 0, 0.94, 0);
    C.put(g, C.roundedBox(0.88, 0.10, 0.66, 0.05, 0x9b6b54), 0, 1.06, -0.01);
    [-1, 1].forEach((sx) => [-1, 1].forEach((sz) => {
      const leg = C.outlined(new THREE.CylinderGeometry(0.055, 0.085, 0.90, 8), P.woodDark);
      C.put(g, leg, sx * 0.39, 0.45, sz * 0.29, sz * -0.035, 0, sx * 0.025);
    }));
    [-1, 1].forEach((sx) => {
      C.put(g, C.roundedBox(0.11, 1.44, 0.11, 0.035, P.woodDark), sx * 0.41, 1.48, 0.31, 0, 0, sx * 0.025);
    });
    C.put(g, C.roundedBox(0.94, 0.18, 0.14, 0.055, P.wood), 0, 2.15, 0.31);
    C.put(g, C.roundedBox(0.86, 0.14, 0.12, 0.045, P.wood), 0, 1.77, 0.31);
    [-0.25, 0, 0.25].forEach((x) => C.put(g, C.roundedBox(0.09, 0.58, 0.09, 0.035, P.woodLight), x, 1.93, 0.31));
    return g;
  }

  function door() {
    const g = new THREE.Group();
    g.name = "line-built-static-door";
    C.put(g, C.box(1.95, 0.18, 0.30, P.woodDark), 0, 3.83, 0.02);
    C.put(g, C.box(0.18, 4.02, 0.30, P.woodDark), -0.89, 1.91, 0.02);
    C.put(g, C.box(0.18, 4.02, 0.30, P.woodDark), 0.89, 1.91, 0.02);
    const leaf = new THREE.Group();
    g.add(leaf);
    C.put(leaf, C.roundedBox(1.54, 3.68, 0.20, 0.06, P.wood), 0, 1.86, 0);
    C.put(leaf, C.roundedBox(1.18, 1.42, 0.08, 0.08, P.woodDark), 0, 2.72, 0.14);
    C.put(leaf, C.roundedBox(1.18, 1.50, 0.08, 0.08, P.woodLight), 0, 0.99, 0.14);
    C.put(leaf, C.cylinder(0.09, 0.09, 0.08, 16, P.brass), 0.49, 1.85, 0.28, Math.PI / 2);
    [-0.57, 0.57].forEach((y) => C.put(leaf, C.cylinder(0.035, 0.035, 0.16, 10, P.brass), -0.73, 1.86 + y, 0.12));
    return g;
  }

  function clock() {
    const g = new THREE.Group();
    g.name = "realtime-wall-clock";
    C.put(g, C.roundedBox(0.98, 1.54, 0.25, 0.14, P.woodDark), 0, 0, 0);
    C.put(g, C.roundedBox(0.82, 1.36, 0.07, 0.11, P.wood), 0, -0.01, 0.16);
    C.put(g, C.roundedBox(0.70, 0.52, 0.035, 0.10, 0x2a211b), 0, -0.43, 0.215);
    C.put(g, C.outlined(new THREE.SphereGeometry(0.10, 18, 12), P.brass), 0, 0.86, 0.02);
    C.put(g, C.cylinder(0.385, 0.385, 0.055, 48, P.cream), 0, 0.30, 0.215, Math.PI / 2);
    C.put(g, C.outlined(new THREE.TorusGeometry(0.405, 0.032, 10, 48), P.brass), 0, 0.30, 0.265);
    for (let i = 0; i < 60; i += 1) {
      const a = i / 60 * Math.PI * 2;
      const major = i % 5 === 0;
      const tick = C.box(major ? 0.022 : 0.009, major ? 0.075 : 0.032, 0.010, major ? P.ink : 0x6a5b4f);
      const radius = major ? 0.305 : 0.325;
      C.put(g, tick, Math.sin(a) * radius, 0.30 + Math.cos(a) * radius, 0.291, 0, 0, -a);
    }
    function makeHand(length, width, color, z) {
      const pivot = new THREE.Group();
      C.put(pivot, C.roundedBox(width, length, 0.018, width / 2, color), 0, length / 2 - 0.025, z);
      C.put(g, pivot, 0, 0.30, 0);
      return pivot;
    }
    const hourHand = makeHand(0.19, 0.040, P.ink, 0.305);
    const minuteHand = makeHand(0.28, 0.026, P.ink, 0.316);
    const secondHand = makeHand(0.31, 0.012, 0xa53a2f, 0.327);
    C.put(g, C.cylinder(0.045, 0.045, 0.042, 20, P.brass), 0, 0.30, 0.337, Math.PI / 2);
    const glass = C.cylinder(0.36, 0.36, 0.018, 48, 0xe4eee9, { material: { transparent: true, opacity: 0.10, depthWrite: false } });
    C.put(g, glass, 0, 0.30, 0.35, Math.PI / 2);
    const pendulum = new THREE.Group();
    C.put(pendulum, C.box(0.035, 0.36, 0.026, P.brass), 0, -0.17, 0.26);
    C.put(pendulum, C.cylinder(0.105, 0.105, 0.035, 24, P.gold), 0, -0.39, 0.27, Math.PI / 2);
    C.put(g, pendulum, 0, -0.21, 0);
    g.userData.hourHand = hourHand;
    g.userData.minuteHand = minuteHand;
    g.userData.secondHand = secondHand;
    g.userData.pendulum = pendulum;
    return g;
  }

  function envelope() {
    const g = new THREE.Group();
    C.put(g, C.box(0.72, 0.045, 0.48, P.cream), 0, 0, 0);
    const flapGeo = new THREE.BufferGeometry();
    flapGeo.setAttribute("position", new THREE.Float32BufferAttribute([
      -0.34, 0, 0, 0.34, 0, 0, 0, 0, 0.35,
    ], 3));
    flapGeo.setIndex([0, 1, 2]);
    flapGeo.computeVertexNormals();
    const flap = C.outlined(flapGeo, P.paperDeep, { threshold: 1 });
    flap.position.set(0, 0.03, -0.22);
    flap.rotation.x = -Math.PI / 2;
    g.add(flap);
    g.userData.flap = flap;
    return g;
  }

  function colaGlass() {
    const g = new THREE.Group();
    g.name = "static-cola-glass";
    const glassMaterial = { transparent: true, opacity: 0.25, depthWrite: false };
    const shell = C.outlined(new THREE.CylinderGeometry(0.19, 0.16, 0.50, 28, 1, true), 0xdce9e5, { material: glassMaterial });
    C.put(g, shell, 0, 0.25, 0);
    C.put(g, C.outlined(new THREE.TorusGeometry(0.19, 0.014, 8, 30), 0xdce9e5, { material: glassMaterial }), 0, 0.50, 0, Math.PI / 2);
    C.put(g, C.cylinder(0.155, 0.135, 0.38, 28, 0x2d1710, { material: { transparent: true, opacity: 0.88, depthWrite: false } }), 0, 0.22, 0);
    C.put(g, C.cylinder(0.154, 0.154, 0.012, 28, 0x3b2118), 0, 0.415, 0);

    const bubbleCount = 18;
    const bubbleMeta = [];
    const bubbleGeometry = new THREE.SphereGeometry(0.010, 8, 6);
    const bubbleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffe2a6,
      transparent: true,
      opacity: 0.74,
      depthTest: false,
      depthWrite: false,
    });
    const colaBubbleMeshes = new THREE.Group();
    for (let i = 0; i < bubbleCount; i += 1) {
      const angle = i * 2.39996;
      const radius = 0.025 + ((i * 17) % 9) / 90;
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      bubble.scale.setScalar(0.78 + (i % 4) * 0.13);
      bubble.renderOrder = 10;
      bubble.userData.noPick = true;
      colaBubbleMeshes.add(bubble);
      bubbleMeta.push({ object: bubble, x: Math.cos(angle) * radius, z: Math.sin(angle) * radius, phase: i / bubbleCount, speed: 0.11 + (i % 4) * 0.025 });
    }
    colaBubbleMeshes.userData.noPick = true;
    g.add(colaBubbleMeshes);
    g.userData.colaBubbleMeshes = colaBubbleMeshes;
    g.userData.bubbleMeta = bubbleMeta;
    return g;
  }

  function buildAbout(wall, registry, state) {
    C.put(wall, door(), L.mounted.about.doorX, 0, 0.22);
    state.clock = clock();
    C.put(wall, state.clock, L.mounted.about.clockX, 4.75, 0.20);
    const desk = placement("about", "writing-table");
    C.put(wall, table(desk.width, 1.55, desk.depth, P.wood), desk.x, 0, desk.z);
    const chairPlace = L.chairs.about;
    const chairModel = woodenChair();
    chairModel.scale.setScalar(0.82);
    const chair = C.interactive(chairModel, "writing-chair", "chair-about");
    C.put(wall, chair, chairPlace.x, 0, chairPlace.tuckedZ);
    chair.userData.tuckedZ = chairPlace.tuckedZ;
    chair.userData.pulledZ = chairPlace.pulledZ;
    chair.userData.pulledOut = false;
    registry.push(chair);
    state.cola = colaGlass();
    C.put(wall, state.cola, -0.62, 1.74, 0.86);

    const env = C.interactive(envelope(), "envelope", "biography");
    C.put(wall, env, 0.72, 1.75, 0.83);
    registry.push(env);

    const painting = new THREE.Group();
    C.put(painting, C.texturePlane("assets/room/about/painting.webp", 2.72, 1.36, {
      outline: false,
      crop: { x: 0.071, y: 0.118, width: 0.866, height: 0.772 },
    }), 0, 0, 0.07);
    C.put(painting, solidFrame(3.12, 1.76, 0.20, 0.18, P.woodDark), 0, 0, 0);
    C.put(painting, solidFrame(2.82, 1.48, 0.045, 0.055, P.gold), 0, 0, 0.13);
    const plaque = C.interactive(C.box(1.15, 0.24, 0.10, P.gold), "plaque", "motto");
    C.put(painting, plaque, 0, -1.06, 0.12);
    for (let i = -1; i <= 1; i += 1) C.put(plaque, C.box(0.27, 0.025, 0.015, P.ink), i * 0.34, 0, 0.06);
    registry.push(plaque);
    C.put(wall, painting, L.mounted.about.paintingX, 4.45, 0.19);
  }

  function sofa(registry) {
    const g = new THREE.Group();
    C.put(g, C.roundedBox(3.0, 0.72, 1.12, 0.22, P.red), 0, 0.72, 0.15);
    const back = C.roundedBox(2.92, 1.38, 0.42, 0.25, P.red); C.put(g, back, 0, 1.52, -0.35, -0.12);
    [-1, 1].forEach((s) => {
      const arm = C.roundedBox(0.48, 0.72, 1.08, 0.22, P.red);
      C.put(g, arm, s * 1.49, 1.02, 0.15, 0, 0, s * -0.03);
      C.put(g, C.box(0.15, 0.42, 0.15, P.woodDark), s * 1.22, 0.21, 0.28);
    });
    C.put(g, C.roundedBox(1.05, 0.17, 0.76, 0.08, 0xb16855), -0.67, 1.19, 0.31, 0, 0, -0.05);
    C.put(g, C.roundedBox(1.05, 0.17, 0.76, 0.08, 0xa34f49), 0.48, 1.19, 0.31, 0, 0, 0.04);
    const pillow = C.interactive(C.roundedBox(0.68, 0.62, 0.16, 0.16, 0xb98a72), "pillow", "pillow");
    C.put(g, pillow, -0.78, 1.64, 0.32, 0.04, -0.11, -0.15);
    pillow.userData.onRight = false;
    pillow.userData.travel = 0;
    registry.push(pillow);
    return g;
  }

  function detailedBook(width, height, color) {
    const book = new THREE.Group();
    book.name = "layered-publication-book";
    C.put(book, C.roundedBox(width - 0.045, height - 0.07, 0.36, 0.028, 0xd8c7a4), 0.018, 0, -0.025);
    C.put(book, C.roundedBox(width, height, 0.055, 0.025, color), 0, 0, 0.205);
    C.put(book, C.box(0.045, height - 0.035, 0.43, color), -width / 2 + 0.022, 0, 0);
    C.put(book, C.box(width - 0.045, 0.045, 0.43, color), 0.018, height / 2 - 0.022, 0);
    C.put(book, C.box(width - 0.045, 0.045, 0.43, color), 0.018, -height / 2 + 0.022, 0);
    [-0.24, 0.24].forEach((ratio) => C.put(book, C.box(width * 0.72, 0.025, 0.018, P.gold), 0, height * ratio, 0.238));
    return book;
  }

  function bookshelf(registry) {
    const g = new THREE.Group();
    C.put(g, C.box(2.5, 0.2, 0.66, P.woodDark), 0, 0.12, 0);
    C.put(g, C.box(0.18, 4.55, 0.66, P.woodDark), -1.16, 2.35, 0);
    C.put(g, C.box(0.18, 4.55, 0.66, P.woodDark), 1.16, 2.35, 0);
    C.put(g, C.box(2.5, 0.22, 0.72, P.woodDark), 0, 4.62, 0);
    [1.25, 2.45, 3.62].forEach((y) => C.put(g, C.box(2.28, 0.13, 0.62, P.wood), 0, y, 0));
    const colors = [0x7e3835, 0x596748, 0xc09951, 0x3f6170, 0x8d6949, 0x57432e];
    for (let shelf = 0; shelf < 3; shelf += 1) {
      for (let i = 0; i < 6; i += 1) {
        const book = detailedBook(0.24 + (i % 2) * 0.035, 0.78 + ((i + shelf) % 3) * 0.1, colors[(i + shelf) % colors.length]);
        C.interactive(book, `book-${shelf}-${i}`, `publication-${(shelf * 6 + i) % 6}`);
        C.put(g, book, -0.88 + i * 0.35, 1.7 + shelf * 1.18, 0.02, 0, 0, (i % 3 - 1) * 0.025);
        book.userData.homeZ = 0.02;
        book.userData.homeY = book.position.y;
        book.userData.pull = 0;
        book.userData.pullGoal = 0;
        book.userData.ready = false;
        registry.push(book);
      }
    }
    const lower = new THREE.Group();
    lower.name = "bookshelf-lower-closed-carcass";
    C.put(lower, C.box(1.92, 0.12, 0.62, P.woodDark), 0, 0.25, 0);
    C.put(lower, C.box(1.92, 0.12, 0.62, P.woodDark), 0, 1.12, 0);
    C.put(lower, C.box(0.12, 0.82, 0.62, P.woodDark), -0.90, 0.69, 0);
    C.put(lower, C.box(0.12, 0.82, 0.62, P.woodDark), 0.90, 0.69, 0);
    C.put(lower, C.box(1.72, 0.78, 0.10, P.woodDark), 0, 0.69, -0.27);
    [-0.43, 0.43].forEach((x) => {
      C.put(lower, C.roundedBox(0.80, 0.72, 0.10, 0.035, P.wood), x, 0.69, 0.34);
      C.put(lower, C.cylinder(0.05, 0.05, 0.05, 12, P.brass), x + (x < 0 ? 0.26 : -0.26), 0.69, 0.41, Math.PI / 2);
    });
    g.add(lower);
    return g;
  }

  function plant(registry) {
    const g = new THREE.Group();
    C.put(g, C.cylinder(0.58, 0.42, 0.9, 12, P.woodLight), 0, 0.45, 0);
    const rim = C.cylinder(0.59, 0.53, 0.16, 16, P.woodLight);
    rim.name = "pot-rim-above-soil";
    C.put(g, rim, 0, 0.96, 0);
    C.put(g, C.cylinder(0.47, 0.47, 0.055, 16, 0x37291c), 0, 0.945, 0);
    const canopy = new THREE.Group();
    const stemsGroup = new THREE.Group();
    const leavesGroup = new THREE.Group();
    const stems = [[0, 0.95, 0, -0.45, 2.5, 0.08], [0, 0.95, 0, 0.4, 2.7, 0.02], [0, 0.95, 0, 0.72, 2.1, 0.02], [0, 0.95, 0, -0.72, 1.95, 0.08]];
    stems.forEach((s, i) => {
      stemsGroup.add(C.cylinderBetween(s.slice(0, 3), s.slice(3), 0.035, P.green, 7));
      const leaf = C.outlined(new THREE.SphereGeometry(0.28, 12, 8), i % 2 ? 0x70804e : 0x53663d);
      leaf.scale.set(0.52, 1.35, 0.24);
      C.put(leavesGroup, leaf, s[3], s[4], s[5], 0, 0, i % 2 ? -0.65 : 0.65);
    });
    canopy.add(stemsGroup, leavesGroup);
    C.interactive(leavesGroup, "plant-leaves", "plant");
    leavesGroup.userData.swayRoot = canopy;
    leavesGroup.userData.swayEnergy = 0;
    leavesGroup.userData.swayClock = 0;
    g.add(canopy);
    registry.push(leavesGroup);
    return g;
  }

  function buildPublications(wall, registry) {
    const sofaPlace = placement("publications", "sofa");
    const shelfPlace = placement("publications", "bookshelf");
    const plantPlace = placement("publications", "plant");
    C.put(wall, sofa(registry), sofaPlace.x, 0, sofaPlace.z);
    C.put(wall, bookshelf(registry), shelfPlace.x, 0, shelfPlace.z);
    C.put(wall, plant(registry), plantPlace.x, 0, plantPlace.z);
  }

  function cabinet(registry) {
    const g = new THREE.Group();
    g.name = "filing-cabinet-closed-carcass";
    C.put(g, C.box(1.55, 0.14, 0.86, P.grey), 0, 0.08, 0);
    C.put(g, C.roundedBox(1.55, 0.18, 0.86, 0.06, P.grey), 0, 2.27, 0);
    C.put(g, C.box(0.14, 2.10, 0.86, P.grey), -0.705, 1.18, 0);
    C.put(g, C.box(0.14, 2.10, 0.86, P.grey), 0.705, 1.18, 0);
    C.put(g, C.box(1.29, 2.10, 0.10, 0x66635e), 0, 1.18, -0.38);
    for (let i = 0; i < 4; i += 1) {
      const drawer = new THREE.Group();
      C.put(drawer, C.roundedBox(1.27, 0.43, 0.68, 0.045, 0x8b8780), 0, 0, 0.02);
      C.put(drawer, C.roundedBox(1.32, 0.47, 0.09, 0.045, 0x9c968c), 0, 0, 0.405);
      C.put(drawer, C.roundedBox(0.38, 0.09, 0.065, 0.025, P.ink), 0, 0, 0.485);
      C.put(drawer, C.box(0.18, 0.025, 0.012, P.cream), 0, 0.12, 0.495);
      C.interactive(drawer, `drawer-${i}`, `drawer-${i}`);
      C.put(g, drawer, 0, 0.38 + i * 0.53, 0);
      drawer.userData.openAmount = 0;
      registry.push(drawer);
    }
    return g;
  }

  function lamp() {
    const g = new THREE.Group();
    C.put(g, C.cylinder(0.36, 0.46, 0.12, 16, P.brass), 0, 0.06, 0);
    C.put(g, C.cylinder(0.055, 0.055, 0.92, 10, P.brass), 0, 0.54, 0);
    const shade = C.outlined(new THREE.CylinderGeometry(0.46, 0.28, 0.34, 16, 1, true), 0x2f6b48, { material: { side: THREE.DoubleSide } });
    C.put(g, shade, 0, 1.11, 0);
    const bulb = C.outlined(new THREE.SphereGeometry(0.11, 12, 8), 0xffd38a, { material: { transparent: true, opacity: 0.15 } });
    C.put(g, bulb, 0, 0.96, 0);
    const glowMaterial = C.fillMaterial(0xffc86b, { transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.50, 0.76, 28, 1, true), glowMaterial);
    cone.position.set(0, 0.48, 0.04);
    cone.userData.noPick = true;
    g.add(cone);
    const poolTexture = C.radialTexture("rgba(255,220,139,.82)");
    const poolMaterial = C.fillMaterial(0xffffff, { map: poolTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(1.30, 0.68), poolMaterial);
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(0, -0.02, 0.02);
    pool.userData.noPick = true;
    g.add(pool);
    g.userData.shade = shade;
    g.userData.bulb = bulb;
    g.userData.glowMaterial = glowMaterial;
    g.userData.poolMaterial = poolMaterial;
    g.userData.lightLevel = 0;
    return g;
  }

  function typewriter() {
    const g = new THREE.Group();
    C.put(g, C.roundedBox(1.65, 0.48, 0.92, 0.12, 0x3d4542), 0, 0.26, 0);
    C.put(g, C.roundedBox(1.3, 0.46, 0.18, 0.06, 0x59605b), 0, 0.69, -0.24, -0.35);
    const paper = C.plane(1.02, 0.84, P.paper);
    C.put(g, paper, 0, 1.08, -0.11, -0.17);
    const traces = new THREE.Group();
    traces.name = "typewriter-ready-traces";
    const traceSpecs = [
      [-0.39, 0.25, 0.72],
      [-0.39, 0.13, 0.58],
      [-0.39, 0.01, 0.67],
      [-0.39, -0.11, 0.49],
      [-0.39, -0.23, 0.62],
    ];
    const paperTraceLines = traceSpecs.map(([x, y, width]) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, y, 0.025);
      const mark = C.roundedBox(width, 0.024, 0.012, 0.008, P.ink);
      C.put(pivot, mark, width / 2, 0, 0);
      pivot.scale.x = 0.001;
      pivot.visible = false;
      traces.add(pivot);
      return pivot;
    });
    paper.add(traces);
    for (let row = 0; row < 3; row += 1) for (let i = 0; i < 9; i += 1) {
      C.put(g, C.cylinder(0.055, 0.055, 0.035, 8, P.cream), -0.56 + i * 0.14, 0.49 - row * 0.11, 0.32 + row * 0.11, Math.PI / 2);
    }
    C.put(g, C.cylinder(0.08, 0.08, 1.78, 10, P.ink), 0, 0.76, -0.28, 0, 0, Math.PI / 2);
    g.userData.paper = paper;
    g.userData.paperTraceLines = paperTraceLines;
    g.userData.paperLift = 0;
    g.userData.paperGoal = 0;
    g.userData.ready = false;
    return g;
  }

  function fireplace() {
    const g = new THREE.Group();
    g.name = "brick-fireplace-with-depth";
    const brick = 0x8c5c43;
    const brickLight = 0xa46e50;
    const mortar = 0x55483d;

    const firebox = new THREE.Group();
    firebox.name = "deep-firebox";
    C.put(firebox, C.roundedBox(1.62, 2.08, 0.16, 0.03, 0x211d19), 0, 1.22, -0.34);
    C.put(firebox, C.box(0.18, 1.98, 0.84, mortar), -0.78, 1.18, 0.02, 0, -0.10);
    C.put(firebox, C.box(0.18, 1.98, 0.84, mortar), 0.78, 1.18, 0.02, 0, 0.10);
    C.put(firebox, C.box(1.70, 0.18, 0.92, 0x3b3028), 0, 0.16, 0.08);
    C.put(firebox, C.box(1.66, 0.16, 0.72, mortar), 0, 2.22, -0.02);
    g.add(firebox);

    C.put(g, C.box(2.70, 0.26, 1.10, brickLight), 0, 0.15, 0.13);
    const addJamb = (side) => {
      for (let row = 0; row < 7; row += 1) {
        const y = 0.42 + row * 0.31;
        const offset = row % 2 ? 0.07 : 0;
        C.put(g, C.roundedBox(0.43, 0.27, 0.58, 0.035, row % 2 ? brick : brickLight), side * (0.99 + offset * side), y, 0.30);
      }
    };
    addJamb(-1); addJamb(1);
    for (let i = 0; i < 5; i += 1) {
      C.put(g, C.roundedBox(0.48, 0.28, 0.60, 0.035, i % 2 ? brick : brickLight), -0.96 + i * 0.48, 2.54, 0.30, 0, 0, (i - 2) * 0.025);
    }
    C.put(g, C.roundedBox(2.78, 0.32, 0.84, 0.055, 0x6e4938), 0, 2.84, 0.18);

    const chimney = new THREE.Group();
    chimney.name = "brick-chimney";
    C.put(chimney, C.box(1.82, 3.48, 0.54, mortar), 0, 4.45, -0.02);
    for (let row = 0; row < 10; row += 1) {
      const count = row % 2 ? 4 : 3;
      const width = row % 2 ? 0.43 : 0.55;
      for (let i = 0; i < count; i += 1) {
        const x = (i - (count - 1) / 2) * (width + 0.025);
        C.put(chimney, C.roundedBox(width, 0.29, 0.10, 0.022, (i + row) % 3 ? brick : brickLight), x, 3.05 + row * 0.33, 0.31);
      }
    }
    C.put(chimney, C.roundedBox(2.02, 0.28, 0.70, 0.045, 0x6e4938), 0, 6.22, 0.02);
    g.add(chimney);

    const logs = new THREE.Group();
    logs.name = "permanent-varied-logs";
    const logSpecs = [
      [-0.15, 0.43, 0.62, 0.095, 1.18, 1.40, 0.14],
      [0.08, 0.46, 0.70, 0.070, 0.92, 1.73, -0.10],
      [-0.34, 0.54, 0.73, 0.060, 0.76, 1.19, 0.26],
      [0.31, 0.55, 0.67, 0.105, 1.02, 1.88, -0.16],
      [0.02, 0.62, 0.76, 0.055, 0.68, 1.52, 0.30],
    ];
    logSpecs.forEach((spec, i) => {
      const log = C.cylinder(spec[3], spec[3] * 0.88, spec[4], 10, i % 2 ? 0x59331f : 0x6f4024);
      C.put(logs, log, spec[0], spec[1], spec[2], spec[6], 0, spec[5]);
    });
    g.add(logs);

    const flames = new THREE.Group();
    const fireLines = [];
    const colors = [0xb8421f, 0xe0862e, 0xf5c542, 0xd45c25, 0xf0a83e];
    [-0.38, -0.13, 0.09, 0.31, 0.47].forEach((x, i) => {
      const segments = 24;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array((segments + 1) * 2 * 3), 3));
      const loop = new THREE.LineLoop(geometry, C.strokeMaterial(colors[i]));
      loop.frustumCulled = false;
      flames.add(loop);
      fireLines.push({ object: loop, geometry, x, baseY: 0.68, z: 0.82, height: 0.48 + (i % 3) * 0.17, width: 0.10 + (i % 2) * 0.06, phase: i * 1.37, speed: 2.7 + i * 0.17, segments });
    });
    const sparkCount = 42;
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);
    const sparkMeta = [];
    for (let i = 0; i < sparkCount; i += 1) {
      const color = new THREE.Color(i % 3 ? 0xf2a43d : 0xffd66f);
      sparkColors.set([color.r, color.g, color.b], i * 3);
      sparkMeta.push({ phase: i / sparkCount, x: ((i * 37) % 17) / 17 - 0.5, drift: ((i * 19) % 11) / 55 - 0.1 });
    }
    const sparkGeometry = new THREE.BufferGeometry();
    sparkGeometry.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeometry.setAttribute("color", new THREE.BufferAttribute(sparkColors, 3));
    const sparkMaterial = new THREE.PointsMaterial({ map: C.radialTexture("rgba(255,238,168,1)"), size: 0.11, vertexColors: true, transparent: true, opacity: 0.9, alphaTest: 0.02, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
    sparks.userData.noPick = true;
    flames.add(sparks);
    const glowMaterial = C.fillMaterial(0xff8f32, { map: C.radialTexture("rgba(255,176,65,.9)"), transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 1.55), glowMaterial);
    glow.position.set(0, 1.03, 0.54); glow.userData.noPick = true; flames.add(glow);
    C.put(g, flames, 0, 0, 0);
    g.userData.flames = flames;
    g.userData.fireLines = fireLines;
    g.userData.sparkGeometry = sparkGeometry;
    g.userData.sparkMeta = sparkMeta;
    g.userData.fireLevel = 0;
    g.userData.fireGoal = 0;
    flames.visible = false;
    return g;
  }

  function buildBlogs(wall, registry) {
    const cabinetPlace = placement("blogs", "filing-cabinet");
    const deskPlace = placement("blogs", "typewriter-table");
    const firePlace = placement("blogs", "fireplace");
    C.put(wall, cabinet(registry), cabinetPlace.x, 0, cabinetPlace.z);
    const lampObj = C.interactive(lamp(), "lamp", "lamp");
    C.put(wall, lampObj, cabinetPlace.x, 2.45, cabinetPlace.z); registry.push(lampObj);
    C.put(wall, table(deskPlace.width, 1.46, deskPlace.depth, 0x343331), deskPlace.x, 0, deskPlace.z);
    const tw = C.interactive(typewriter(), "typewriter", "blogs");
    tw.scale.setScalar(0.86);
    C.put(wall, tw, deskPlace.x, 1.61, deskPlace.z); registry.push(tw);
    const chairPlace = L.chairs.blogs;
    const chairModel = woodenChair();
    chairModel.scale.setScalar(0.82);
    const chair = C.interactive(chairModel, "typewriter-chair", "chair-blogs");
    C.put(wall, chair, chairPlace.x, 0, chairPlace.tuckedZ);
    chair.userData.tuckedZ = chairPlace.tuckedZ;
    chair.userData.pulledZ = chairPlace.pulledZ;
    chair.userData.pulledOut = false;
    registry.push(chair);
    const fire = C.interactive(fireplace(), "fireplace", "fire");
    C.put(wall, fire, firePlace.x, 0, firePlace.z); registry.push(fire);
  }

  function gramophone() {
    const g = new THREE.Group();
    g.name = "detailed-supported-gramophone";
    const feet = new THREE.Group();
    feet.name = "gramophone-cabinet-feet";
    [-1, 1].forEach((sx) => [-1, 1].forEach((sz) => {
      C.put(feet, C.cylinder(0.12, 0.15, 0.24, 10, P.woodDark), sx * 0.96, 0.12, sz * 0.57);
    }));
    g.add(feet);
    C.put(g, C.roundedBox(2.34, 0.74, 1.42, 0.10, P.wood), 0, 0.51, 0);
    C.put(g, C.roundedBox(2.46, 0.16, 1.56, 0.055, P.woodDark), 0, 0.91, 0);
    C.put(g, C.box(1.78, 0.06, 0.035, P.gold), -0.16, 0.54, 0.73);
    for (let i = 0; i < 5; i += 1) C.put(g, C.cylinder(0.025, 0.025, 0.035, 10, P.brass), -0.68 + i * 0.22, 0.36, 0.75, Math.PI / 2);

    const platter = C.cylinder(0.72, 0.72, 0.08, 40, P.ink);
    C.put(g, platter, -0.27, 1.03, 0.08);
    const record = C.cylinder(0.62, 0.62, 0.035, 32, 0x141414);
    C.put(g, record, -0.27, 1.09, 0.08);
    const recordLabel = C.cylinder(0.15, 0.15, 0.045, 20, P.red);
    C.put(record, recordLabel, 0, 0.03, 0);
    C.put(record, C.cylinder(0.018, 0.018, 0.12, 12, P.brass), 0, 0.09, 0);
    record.visible = false;

    const hornGroup = new THREE.Group();
    const hornProfile = [
      new THREE.Vector2(0.10, 0), new THREE.Vector2(0.12, 0.22),
      new THREE.Vector2(0.20, 0.54), new THREE.Vector2(0.38, 0.88),
      new THREE.Vector2(0.64, 1.18), new THREE.Vector2(0.84, 1.36),
    ];
    hornGroup.add(C.outlined(new THREE.LatheGeometry(hornProfile, 28), P.brass, { material: { side: THREE.DoubleSide } }));
    const rim = C.outlined(new THREE.TorusGeometry(0.84, 0.055, 8, 28), 0xd2aa4f);
    C.put(hornGroup, rim, 0, 1.36, 0, Math.PI / 2);
    C.put(g, hornGroup, 0.60, 1.35, -0.18, 0, 0, 0.55);
    const neck = new THREE.Group();
    neck.name = "continuous-horn-neck";
    neck.add(C.cylinderBetween([0.54, 0.98, -0.18], [0.58, 1.26, -0.18], 0.12, P.brass, 12));
    neck.add(C.cylinderBetween([0.58, 1.25, -0.18], [0.60, 1.42, -0.18], 0.105, P.brass, 12));
    C.put(neck, C.cylinder(0.18, 0.18, 0.12, 16, P.woodDark), 0.54, 1.01, -0.18);
    g.add(neck);

    const armPivot = new THREE.Group(); armPivot.position.set(0.62, 1.07, 0.28); g.add(armPivot);
    C.put(armPivot, C.cylinder(0.13, 0.13, 0.10, 16, P.brass), 0, 0, 0);
    armPivot.add(C.cylinderBetween([0, 0.06, 0], [-0.52, 0.14, 0.01], 0.035, P.brass, 10));
    C.put(armPivot, C.roundedBox(0.14, 0.10, 0.10, 0.03, P.ink), -0.52, 0.14, 0.01);
    g.add(C.cylinderBetween([1.18, 0.53, 0.24], [1.44, 0.60, 0.24], 0.035, P.brass, 8));
    C.put(g, C.cylinder(0.08, 0.08, 0.05, 12, P.woodDark), 1.48, 0.61, 0.24, 0, 0, Math.PI / 2);
    g.userData.record = record;
    g.userData.recordLabel = recordLabel;
    g.userData.armPivot = armPivot;
    g.userData.recordLoaded = false;
    g.userData.playing = false;
    return g;
  }

  function speaker(width, height, depth) {
    const g = new THREE.Group();
    const largeRadius = width * 0.32;
    const smallRadius = width * 0.15;
    C.put(g, C.roundedBox(width, height, depth, 0.09, P.woodDark), 0, height / 2, 0);
    C.put(g, C.cylinder(largeRadius, largeRadius, 0.075, 24, 0x272522), 0, height * 0.64, depth / 2 + 0.055, Math.PI / 2);
    C.put(g, C.outlined(new THREE.TorusGeometry(largeRadius + 0.012, 0.028, 8, 28), P.brass), 0, height * 0.64, depth / 2 + 0.10);
    C.put(g, C.cylinder(smallRadius, smallRadius, 0.08, 20, P.grey), 0, height * 0.27, depth / 2 + 0.06, Math.PI / 2);
    C.put(g, C.outlined(new THREE.TorusGeometry(smallRadius + 0.012, 0.020, 8, 24), P.brass), 0, height * 0.27, depth / 2 + 0.105);
    return g;
  }

  function windowAssembly(state) {
    const g = new THREE.Group();
    const day = C.texturePlane("assets/room/beyond/day.webp", 2.18, 2.42, { outline: false });
    const night = C.texturePlane("assets/room/beyond/night.webp", 2.18, 2.42, { outline: false });
    C.put(g, day, 0, 0, 0.035);
    C.put(g, night, 0, 0, 0.045);
    night.visible = false;
    C.put(g, solidFrame(2.58, 2.82, 0.18, 0.20, P.woodDark), 0, 0, 0.14);
    C.put(g, C.roundedBox(2.78, 0.16, 0.42, 0.045, P.wood), 0, -1.48, 0.22);

    function casement(side) {
      const pivot = new THREE.Group();
      pivot.position.set(side * 1.04, 0, 0.25);
      const leaf = new THREE.Group();
      leaf.position.x = -side * 0.52;
      C.put(leaf, solidFrame(1.04, 2.42, 0.075, 0.065, P.woodDark), 0, 0, 0);
      C.put(leaf, C.plane(0.86, 2.24, 0xc7d9d9, { material: { transparent: true, opacity: 0.08, depthWrite: false } }), 0, 0, 0.045);
      C.put(leaf, C.roundedBox(0.075, 0.18, 0.065, 0.025, P.brass), -side * 0.34, 0, 0.10);
      pivot.add(leaf);
      g.add(pivot);
      return pivot;
    }

    const left = casement(-1);
    const right = casement(1);
    C.interactive(g, "window", "window");
    g.userData.leftCasement = left;
    g.userData.rightCasement = right;
    g.userData.openAmount = 0;
    state.day = day;
    state.night = night;
    state.window = g;
    return g;
  }

  function recordCrate(width, depth, registry, state) {
    const g = new THREE.Group();
    g.name = "enlarged-record-cabinet";
    C.put(g, C.box(width, 0.18, depth, P.woodDark), 0, 0.1, 0);
    C.put(g, C.box(0.16, 1.38, depth, P.woodDark), -width / 2 + 0.08, 0.73, 0);
    C.put(g, C.box(0.16, 1.38, depth, P.woodDark), width / 2 - 0.08, 0.73, 0);
    C.put(g, C.box(width - 0.28, 0.10, depth - 0.08, P.wood), 0, 0.24, 0);
    C.put(g, C.box(width - 0.22, 1.02, 0.10, P.woodDark), 0, 0.79, -depth / 2 + 0.05);
    const data = typeof SITE_DATA !== "undefined" ? SITE_DATA : null;
    const vinyl = data?.vinyl || [];
    const sleeves = [];
    const sleeveSpan = width - 1.18;
    vinyl.slice(0, 4).forEach((track, i) => {
      const sleeve = new THREE.Group();
      C.put(sleeve, C.roundedBox(0.74, 0.78, 0.075, 0.035, P.paperDeep), 0, 0, 0);
      C.put(sleeve, C.texturePlane(track.cover, 0.68, 0.70, { outline: false }), 0, 0, 0.070);
      C.interactive(sleeve, `sleeve-${i}`, `track-${i}`);
      C.put(g, sleeve, -sleeveSpan / 2 + i * sleeveSpan / 3, 0.82 + i * 0.025, -0.10 + i * 0.11, -0.10, 0, (i - 1.5) * 0.035);
      sleeve.userData.homeY = sleeve.position.y;
      sleeve.userData.homeZ = sleeve.position.z;
      sleeve.userData.eject = 0;
      sleeve.userData.ejectGoal = 0;
      registry.push(sleeve);
      sleeves.push(sleeve);
    });
    state.recordSleeves = sleeves;
    return g;
  }

  function transferRecord() {
    const disk = new THREE.Group();
    C.put(disk, C.cylinder(0.42, 0.42, 0.035, 36, 0x141414), 0, 0, 0);
    const label = C.cylinder(0.11, 0.11, 0.042, 20, P.red);
    C.put(disk, label, 0, 0.025, 0);
    disk.userData.label = label;
    disk.visible = false;
    return disk;
  }

  function beginRecordTransfer(state, index) {
    const transfer = state.recordTransfer;
    const sleeve = state.recordSleeves?.[index];
    if (!transfer || !sleeve || !state.gramophone) return;
    state.recordSleeves.forEach((item) => { item.userData.ejectGoal = 0; });
    sleeve.userData.ejectGoal = 1;
    state.gramophone.userData.playing = false;
    state.gramophone.userData.recordLoaded = false;
    state.gramophone.userData.record.visible = false;
    transfer.index = index;
    transfer.progress = 0;
    transfer.active = true;
    transfer.start.set(placement("beyond", "record-crate").x + sleeve.position.x, sleeve.position.y + 0.12, placement("beyond", "record-crate").z + sleeve.position.z + 0.18);
    transfer.end.set(placement("beyond", "gramophone").x - 0.27, 1.10, placement("beyond", "gramophone").z + 0.08);
    transfer.disk.position.copy(transfer.start);
    transfer.disk.rotation.set(Math.PI / 2, 0, 0);
    transfer.disk.visible = true;
    const colors = [0x9b3e37, 0x647b50, 0xc09543, 0x446c78];
    transfer.disk.userData.label.userData.fill.material.color.setHex(colors[index % colors.length]);
  }

  function buildBeyond(wall, registry, state) {
    const windowObj = windowAssembly(state);
    C.put(wall, windowObj, L.mounted.beyond.windowX, 4.05, 0.12);
    registry.push(windowObj);

    const gramPlace = placement("beyond", "gramophone");
    const speakerPlace = placement("beyond", "speaker");
    const cratePlace = placement("beyond", "record-crate");
    const deck = C.interactive(gramophone(), "gramophone", "gramophone");
    C.put(wall, deck, gramPlace.x, 0, gramPlace.z); registry.push(deck); state.gramophone = deck;
    C.put(wall, speaker(speakerPlace.width, 1.82, speakerPlace.depth), speakerPlace.x, 0, speakerPlace.z);
    C.put(wall, recordCrate(cratePlace.width, cratePlace.depth, registry, state), cratePlace.x, 0, cratePlace.z);
    const disk = transferRecord();
    wall.add(disk);
    state.recordTransfer = {
      disk,
      start: new THREE.Vector3(),
      end: new THREE.Vector3(),
      progress: 0,
      active: false,
      index: 0,
    };
  }

  function wallPanel(name, transform) {
    const g = new THREE.Group();
    g.name = name;
    g.position.fromArray(transform.position);
    g.rotation.y = transform.rotation;
    const texture = C.wallpaperTexture();
    const panel = C.texturedPlane(texture, 11.7, 7.20, { outline: true });
    C.put(g, panel, 0, 3.60, 0);
    C.put(g, C.box(11.8, 0.30, 0.20, P.woodDark), 0, 0.18, 0.12);
    return g;
  }

  function floorGrid(root) {
    C.put(root, C.box(11.8, 0.16, 11.8, 0xb7a17f), 0, -0.08, 0);
    const points = [];
    for (let x = -5.9; x <= 5.9; x += 1.18) points.push([x, 0.012, -5.9], [x, 0.012, 5.9]);
    for (let z = -5.9; z <= 5.9; z += 1.18) points.push([-5.9, 0.012, z], [5.9, 0.012, z]);
    root.add(C.lineSegments(points, 0x725b43));
  }

  function buildRoom(scene) {
    const root = new THREE.Group();
    scene.add(root);
    const interactive = [];
    const state = { nightMode: false };
    floorGrid(root);

    const transforms = {
      about: { position: [0, 0, -5.85], rotation: 0 },
      publications: { position: [5.85, 0, 0], rotation: -Math.PI / 2 },
      blogs: { position: [0, 0, 5.85], rotation: Math.PI },
      beyond: { position: [-5.85, 0, 0], rotation: Math.PI / 2 },
    };
    const walls = {};
    Object.keys(transforms).forEach((name) => {
      walls[name] = wallPanel(name, transforms[name]);
      root.add(walls[name]);
    });
    buildAbout(walls.about, interactive, state);
    buildPublications(walls.publications, interactive);
    buildBlogs(walls.blogs, interactive);
    buildBeyond(walls.beyond, interactive, state);

    function update(dt, elapsed) {
      interactive.forEach((obj) => C.updateHover(obj, dt));
      interactive.forEach((obj) => {
        if (obj.userData.interactionId.indexOf("book-") === 0) {
          obj.userData.pull += (obj.userData.pullGoal - obj.userData.pull) * Math.min(1, dt * 7);
          obj.position.z = obj.userData.homeZ + obj.userData.pull * 0.82;
          obj.position.y = obj.userData.homeY + Math.sin(obj.userData.pull * Math.PI) * 0.08;
          obj.rotation.y = -obj.userData.pull * 0.24;
        }
      });
      const gram = state.gramophone;
      if (gram && gram.userData.playing) {
        gram.userData.record.rotation.y += dt * 3.8;
        gram.userData.armPivot.rotation.y += (-0.42 - gram.userData.armPivot.rotation.y) * Math.min(1, dt * 4);
      } else if (gram) {
        gram.userData.armPivot.rotation.y += (0 - gram.userData.armPivot.rotation.y) * Math.min(1, dt * 4);
      }

      const recordTransfer = state.recordTransfer;
      if (recordTransfer?.active) {
        recordTransfer.progress = Math.min(1, recordTransfer.progress + dt / 1.05);
        const t = recordTransfer.progress;
        const ease = t * t * (3 - 2 * t);
        recordTransfer.disk.position.lerpVectors(recordTransfer.start, recordTransfer.end, ease);
        recordTransfer.disk.position.y += Math.sin(Math.PI * t) * 1.18;
        recordTransfer.disk.rotation.x = (1 - ease) * Math.PI / 2;
        recordTransfer.disk.rotation.y = t * Math.PI * 2.2;
        if (t >= 1) {
          recordTransfer.active = false;
          recordTransfer.disk.visible = false;
          state.recordSleeves.forEach((item) => { item.userData.ejectGoal = 0; });
          gram.userData.record.visible = true;
          gram.userData.recordLoaded = true;
          gram.userData.trackIndex = recordTransfer.index;
          gram.userData.recordLabel.userData.fill.material.color.copy(recordTransfer.disk.userData.label.userData.fill.material.color);
        }
      }
      (state.recordSleeves || []).forEach((sleeve) => {
        sleeve.userData.eject += (sleeve.userData.ejectGoal - sleeve.userData.eject) * Math.min(1, dt * 8);
        sleeve.position.y = sleeve.userData.homeY + sleeve.userData.eject * 0.16;
        sleeve.position.z = sleeve.userData.homeZ + sleeve.userData.eject * 0.30;
      });
      if (state.clock) {
        const now = new Date();
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;
        state.clock.userData.secondHand.rotation.z = -(seconds / 60) * Math.PI * 2;
        state.clock.userData.minuteHand.rotation.z = -(minutes / 60) * Math.PI * 2;
        state.clock.userData.hourHand.rotation.z = -(hours / 12) * Math.PI * 2;
        state.clock.userData.pendulum.rotation.z = Math.sin(elapsed * Math.PI * 1.8) * 0.13;
      }
      const windowObj = state.window;
      if (windowObj) {
        windowObj.userData.openAmount += ((windowObj.userData.open ? 1 : 0) - windowObj.userData.openAmount) * Math.min(1, dt * 4.2);
        windowObj.userData.leftCasement.rotation.y = -0.78 * windowObj.userData.openAmount;
        windowObj.userData.rightCasement.rotation.y = 0.78 * windowObj.userData.openAmount;
      }
      const pillow = interactive.find((o) => o.userData.interactionId === "pillow");
      if (pillow) {
        const goal = pillow.userData.onRight ? 1 : 0;
        pillow.userData.travel += (goal - pillow.userData.travel) * Math.min(1, dt * 3.8);
        const ease = pillow.userData.travel * pillow.userData.travel * (3 - 2 * pillow.userData.travel);
        const arc = Math.sin(pillow.userData.travel * Math.PI);
        pillow.position.x = THREE.MathUtils.lerp(-0.78, 0.68, ease);
        pillow.position.y = 1.64 + arc * 0.52;
        pillow.position.z = 0.32 + arc * 0.16;
        pillow.rotation.y = THREE.MathUtils.lerp(-0.11, 0.12, ease) + arc * 0.22;
        pillow.rotation.z = THREE.MathUtils.lerp(-0.15, 0.14, ease) + arc * 0.28;
      }
      interactive.filter((o) => o.userData.action?.indexOf("drawer-") === 0).forEach((drawer) => {
        const goal = drawer.userData.open ? 0.62 : 0;
        drawer.position.z += (goal - drawer.position.z) * Math.min(1, dt * 5.6);
      });
      interactive.filter((o) => o.userData.action?.indexOf("chair-") === 0).forEach((chair) => {
        const goalZ = chair.userData.pulledOut ? chair.userData.pulledZ : chair.userData.tuckedZ;
        chair.position.z += (goalZ - chair.position.z) * Math.min(1, dt * 4.2);
      });
      if (state.cola?.userData.colaBubbleMeshes) {
        state.cola.userData.bubbleMeta.forEach((bubble, i) => {
          const progress = (bubble.phase + elapsed * bubble.speed) % 1;
          bubble.object.position.set(
            bubble.x + Math.sin(elapsed * 1.8 + i) * 0.004,
            0.06 + progress * 0.33,
            bubble.z
          );
        });
      }
      const plant = interactive.find((o) => o.userData.interactionId === "plant-leaves");
      if (plant) {
        plant.userData.swayClock += dt;
        plant.userData.swayEnergy *= Math.pow(0.08, dt);
        plant.userData.swayRoot.rotation.z = Math.sin(plant.userData.swayClock * 8.5) * 0.085 * plant.userData.swayEnergy;
      }
      const lampObj = interactive.find((o) => o.userData.interactionId === "lamp");
      if (lampObj) {
        lampObj.userData.lightLevel += ((lampObj.userData.on ? 1 : 0) - lampObj.userData.lightLevel) * Math.min(1, dt * 5);
        const flicker = 0.96 + Math.sin(elapsed * 18) * 0.025;
        lampObj.userData.glowMaterial.opacity = lampObj.userData.lightLevel * 0.20 * flicker;
        lampObj.userData.poolMaterial.opacity = lampObj.userData.lightLevel * 0.62 * flicker;
        lampObj.userData.bulb.traverse((part) => { if (part.material) part.material.opacity = 0.15 + lampObj.userData.lightLevel * 0.78; });
      }
      const fire = interactive.find((o) => o.userData.interactionId === "fireplace");
      if (fire?.userData.flames) {
        fire.userData.fireLevel += (fire.userData.fireGoal - fire.userData.fireLevel) * Math.min(1, dt * 4);
        const level = fire.userData.fireLevel;
        fire.userData.flames.visible = level > 0.015;
        fire.userData.fireLines.forEach((flame) => {
          const positions = flame.geometry.attributes.position.array;
          let cursor = 0;
          for (let side = 1; side >= -1; side -= 2) {
            for (let k = 0; k <= flame.segments; k += 1) {
              const t = k / flame.segments;
              const taper = Math.sin(Math.PI * (0.14 + t * 0.86));
              const width = flame.width * taper * (0.25 + level * 0.75);
              const sway = Math.sin(t * 5.1 - elapsed * flame.speed + flame.phase) * 0.045 * t * level;
              positions[cursor++] = flame.x + sway + width * side;
              positions[cursor++] = flame.baseY + t * flame.height * level;
              positions[cursor++] = flame.z + Math.sin(t * 4.2 - elapsed * 2.1 + flame.phase) * 0.025 * t;
            }
          }
          flame.geometry.attributes.position.needsUpdate = true;
        });
        const sparkPositions = fire.userData.sparkGeometry.attributes.position.array;
        fire.userData.sparkMeta.forEach((spark, i) => {
          const progress = (elapsed * 0.34 + spark.phase) % 1;
          sparkPositions[i * 3] = spark.x * 0.68 + spark.drift * progress + Math.sin(elapsed * 3 + i) * 0.025;
          sparkPositions[i * 3 + 1] = 0.70 + progress * 1.18 * level;
          sparkPositions[i * 3 + 2] = 0.82 + Math.cos(elapsed * 2.5 + i * 1.4) * 0.07;
        });
        fire.userData.sparkGeometry.attributes.position.needsUpdate = true;
      }
      const type = interactive.find((o) => o.userData.interactionId === "typewriter");
      if (type) {
        type.userData.paperLift += (type.userData.paperGoal - type.userData.paperLift) * Math.min(1, dt * 2.6);
        type.userData.paper.position.y = 1.08 + type.userData.paperLift * 0.34;
        type.userData.paperTraceLines.forEach((line, index) => {
          const reveal = THREE.MathUtils.clamp(type.userData.paperLift * 5 - index, 0, 1);
          line.visible = reveal > 0.01;
          line.scale.x = Math.max(0.001, reveal);
        });
      }
    }

    function setNight(night) {
      state.nightMode = night;
      if (state.day) state.day.visible = !night;
      if (state.night) state.night.visible = night;
    }

    function selectRecord(index) {
      beginRecordTransfer(state, index);
    }

    return { root, walls, interactive, state, update, setNight, selectRecord };
  }

  window.RustyRoomScene = { buildRoom };
})();
