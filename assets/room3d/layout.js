(function () {
  "use strict";

  const walls = Object.freeze({
    about: Object.freeze([
      Object.freeze({ id: "writing-table", x: 0.15, z: 0.88, width: 3.15, depth: 0.78 }),
    ]),
    publications: Object.freeze([
      Object.freeze({ id: "sofa", x: -3.20, z: 1.05, width: 3.35, depth: 1.25 }),
      Object.freeze({ id: "bookshelf", x: 0.15, z: 0.70, width: 2.50, depth: 0.72 }),
      Object.freeze({ id: "plant", x: 3.40, z: 0.82, width: 1.25, depth: 1.00 }),
    ]),
    blogs: Object.freeze([
      Object.freeze({ id: "filing-cabinet", x: -3.75, z: 0.78, width: 1.55, depth: 0.86 }),
      Object.freeze({ id: "typewriter-table", x: -0.75, z: 0.90, width: 2.80, depth: 0.74 }),
      Object.freeze({ id: "fireplace", x: 2.75, z: 0.88, width: 2.65, depth: 1.10 }),
    ]),
    beyond: Object.freeze([
      Object.freeze({ id: "gramophone", x: -1.25, z: 1.10, width: 2.45, depth: 1.55 }),
      Object.freeze({ id: "speaker", x: 0.80, z: 0.62, width: 0.95, depth: 0.56 }),
      Object.freeze({ id: "record-crate", x: 3.00, z: 0.90, width: 2.80, depth: 1.12 }),
    ]),
  });

  const chairs = Object.freeze({
    about: Object.freeze({ x: 0.15, tuckedZ: 1.45, pulledZ: 2.30 }),
    blogs: Object.freeze({ x: -0.75, tuckedZ: 1.44, pulledZ: 2.28 }),
  });

  const mounted = Object.freeze({
    about: Object.freeze({ doorX: -3.88, clockX: -2.41, paintingX: 3.55 }),
    beyond: Object.freeze({ windowX: -3.70 }),
  });

  window.RustyRoomLayout = Object.freeze({
    usableMin: -4.90,
    usableMax: 4.90,
    wallClearance: 0.30,
    minimumGap: 0.32,
    walls,
    chairs,
    mounted,
  });
})();
