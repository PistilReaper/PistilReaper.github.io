(function () {
  "use strict";

  function boot() {
    const C = window.RustyRoomCore;
    const S = window.RustyRoomScene;
    const stage = document.getElementById("stage");
    if (!C || !S || !stage || !window.THREE) return;

    const layer = document.createElement("div");
    layer.className = "room3d-layer";
    layer.dataset.mode = "fixed-views";
    layer.setAttribute("aria-label", "Interactive room with four fixed wall views. Use the left and right arrows to turn.");
    stage.insertBefore(layer, stage.firstChild);

    const { THREE } = C;
    const VIEW_ORDER = Object.freeze(["about", "publications", "blogs", "beyond"]);
    const WALL_VIEWS = Object.freeze({
      about: Object.freeze({ yaw: 0 }),
      publications: Object.freeze({ yaw: Math.PI / 2 }),
      blogs: Object.freeze({ yaw: Math.PI }),
      beyond: Object.freeze({ yaw: Math.PI * 1.5 }),
    });
    const VIEW_SETTINGS = Object.freeze({
      height: 3.65,
      radius: 2.95,
      fov: 49,
      projectionShiftY: -0.278,
    });
    const TURN_DURATION = 640;

    function routeViewName() {
      const name = window.location.hash.replace(/^#\/?/, "").split("/")[0];
      return VIEW_ORDER.includes(name) ? name : "about";
    }

    function smoothstep(value) {
      return value * value * (3 - 2 * value);
    }

    function shortestYawDelta(from, to) {
      return Math.atan2(Math.sin(to - from), Math.cos(to - from));
    }

    let renderer;
    try {
      renderer = C.createRenderer(layer);
    } catch (error) {
      layer.remove();
      console.error("The 3D room could not be initialized.", error);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(VIEW_SETTINGS.fov, 1, 0.1, 80);
    function updateCameraProjection() {
      camera.updateProjectionMatrix();
      camera.projectionMatrix.elements[9] = VIEW_SETTINGS.projectionShiftY;
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    }
    const room = S.buildRoom(scene);
    const raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.08;
    const pointer = new THREE.Vector2(2, 2);
    const lookTarget = new THREE.Vector3();
    const clock = new THREE.Clock();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let currentViewName = routeViewName();
    let yaw = WALL_VIEWS[currentViewName].yaw;
    let transition = null;
    let hovered = null;
    const tooltip = document.createElement("div");
    tooltip.className = "room-tooltip";
    tooltip.hidden = true;
    tooltip.setAttribute("role", "tooltip");
    layer.appendChild(tooltip);

    function interactionLabel(object) {
      const action = object?.userData.action || "";
      if (action.startsWith("publication-")) return "Publications";
      if (action.startsWith("track-")) return "Select record";
      if (action.startsWith("chair-")) return "Move chair";
      if (action.startsWith("drawer-")) return object.userData.open ? "Close drawer" : "Open drawer";
      const labels = {
        biography: "About me", blogs: "Blogs", motto: "A thought to share",
        window: object?.userData.open ? "Close window" : "Open window",
        lamp: object?.userData.on ? "Turn off lamp" : "Turn on lamp",
        fire: object?.userData.fireGoal > 0.5 ? "Put out fire" : "Light fire",
        pillow: "Move cushion", plant: "Rustle leaves", gramophone: "Beyond research",
      };
      return labels[action] || "";
    }

    function showTooltip(event) {
      tooltip.textContent = interactionLabel(hovered);
      tooltip.hidden = !tooltip.textContent || event.pointerType === "touch";
      if (tooltip.hidden) return;
      const rect = layer.getBoundingClientRect();
      tooltip.style.left = `${Math.max(8, Math.min(event.clientX - rect.left + 16, rect.width - tooltip.offsetWidth - 8))}px`;
      tooltip.style.top = `${Math.max(8, Math.min(event.clientY - rect.top + 18, rect.height - tooltip.offsetHeight - 8))}px`;
    }
    let selectedTrack = 0;
    let publicationNavTimer = 0;
    let lastTime = performance.now();

    const SND = (() => {
      const names = ["door", "window", "lamp", "magic", "toggle", "ui", "chim", "doorbell", "typewriter"];
      const pool = {};
      const active = {};
      names.forEach((name) => {
        const path = `assets/audio/effects/${name}.mp3`;
        const audio = new Audio(path);
        audio.preload = "auto";
        pool[name] = audio;
      });
      let clothContext = null;

      function playClothThrow(toRight) {
        if (document.body.classList.contains("muted")) return;
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!AudioContext) return;
          clothContext = clothContext || new AudioContext();
          if (clothContext.state === "suspended") clothContext.resume().catch(() => {});
          const now = clothContext.currentTime;
          const duration = 0.28;
          const buffer = clothContext.createBuffer(1, Math.ceil(clothContext.sampleRate * duration), clothContext.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < data.length; i += 1) {
            const envelope = Math.pow(1 - i / data.length, 2.2);
            data[i] = (Math.random() * 2 - 1) * envelope;
          }
          const rustle = clothContext.createBufferSource();
          const filter = clothContext.createBiquadFilter();
          const rustleGain = clothContext.createGain();
          rustle.buffer = buffer;
          filter.type = "bandpass";
          filter.frequency.value = toRight ? 720 : 610;
          filter.Q.value = 0.55;
          rustleGain.gain.setValueAtTime(0.0001, now);
          rustleGain.gain.exponentialRampToValueAtTime(0.10, now + 0.025);
          rustleGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
          rustle.connect(filter).connect(rustleGain).connect(clothContext.destination);
          rustle.start(now);

          const thump = clothContext.createOscillator();
          const thumpGain = clothContext.createGain();
          const impactAt = now + 0.17;
          thump.type = "sine";
          thump.frequency.setValueAtTime(92, impactAt);
          thump.frequency.exponentialRampToValueAtTime(48, impactAt + 0.10);
          thumpGain.gain.setValueAtTime(0.0001, impactAt);
          thumpGain.gain.exponentialRampToValueAtTime(0.085, impactAt + 0.012);
          thumpGain.gain.exponentialRampToValueAtTime(0.0001, impactAt + 0.12);
          thump.connect(thumpGain).connect(clothContext.destination);
          thump.start(impactAt);
          thump.stop(impactAt + 0.13);
        } catch (_) {}
      }

      function stop(name) {
        const audio = active[name];
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
        delete active[name];
      }

      return {
        play(name, volume, exclusive) {
          if (document.body.classList.contains("muted")) return;
          const source = pool[name];
          if (!source) return;
          try {
            if (exclusive) stop(name);
            const audio = source.cloneNode();
            audio.volume = volume === undefined ? 0.62 : volume;
            if (exclusive) {
              active[name] = audio;
              audio.addEventListener("ended", () => {
                if (active[name] === audio) delete active[name];
              }, { once: true });
            }
            audio.play().catch(() => {});
          } catch (_) {}
        },
        stop,
        cloth: playClothThrow,
      };
    })();

    const fireAudio = document.getElementById("fire-audio");
    const vinylAudio = document.getElementById("vinyl-audio");
    if (fireAudio) {
      fireAudio.loop = true;
      fireAudio.volume = 0.34;
    }
    if (vinylAudio) vinylAudio.loop = true;

    function syncFireAudio(lit) {
      if (!fireAudio) return;
      if (lit && !document.body.classList.contains("muted")) {
        fireAudio.play().catch(() => {});
      } else {
        fireAudio.pause();
        if (!lit) fireAudio.currentTime = 0;
      }
    }

    function syncPersistentAudio() {
      const fireplace = room.interactive.find((item) => item.userData.action === "fire");
      const gramophone = room.interactive.find((item) => item.userData.action === "gramophone");
      const muted = document.body.classList.contains("muted");
      syncFireAudio(Boolean(fireplace?.userData.fireGoal > 0.5));
      if (!vinylAudio) return;
      if (!muted && gramophone?.userData.playing) vinylAudio.play().catch(() => {});
      else vinylAudio.pause();
    }

    stage.classList.add("is-3d", "is-fixed-view");

    function showMotto() {
      const modal = document.getElementById("modal");
      const body = document.getElementById("modal-body");
      if (!modal || !body) return;
      body.innerHTML = '<blockquote class="room3d-motto">“When one’s heart is set on a higher mountain to climb,<br>one will not mind the mire underfoot.”</blockquote>';
      modal.hidden = false;
    }

    function navigateContent(name, target) {
      if (location.hash !== `#/${name}`) location.hash = `#/${name}`;
      window.setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      }, 80);
    }

    function showTrack(index) {
      const data = typeof SITE_DATA !== "undefined" ? SITE_DATA : null;
      const track = data?.vinyl?.[index];
      if (!track) return;
      selectedTrack = index;
      document.getElementById("np-cover").src = track.cover;
      document.getElementById("np-title").textContent = track.title_en;
      document.getElementById("np-artist").textContent = `${track.artist} · ${track.album}`;
      document.getElementById("np-note").textContent = track.note_en;
      document.getElementById("np-card").hidden = false;
      SND.play("ui", 0.42);
    }

    function toggleRecord(player) {
      const data = typeof SITE_DATA !== "undefined" ? SITE_DATA : null;
      const track = data?.vinyl?.[selectedTrack];
      const audio = vinylAudio;
      if (!track || !audio || !player.userData.recordLoaded) return;
      audio.loop = true;
      player.userData.playing = !player.userData.playing;
      SND.play(player.userData.playing ? "chim" : "toggle", 0.5);
      if (player.userData.playing) {
        if (audio.src !== track.preview) audio.src = track.preview;
        audio.currentTime = 0;
        audio.play().catch(() => { player.userData.playing = false; });
      } else {
        audio.pause();
      }
    }

    function activate(object) {
      const action = object.userData.action;
      layer.dataset.lastInteraction = action || object.userData.interactionId || "unknown";
      if (action === "window") {
        object.userData.open = !object.userData.open;
        SND.play("window", 0.54);
      } else if (action === "pillow") {
        object.userData.onRight = !object.userData.onRight;
        SND.cloth(object.userData.onRight);
      } else if (action && action.indexOf("chair-") === 0) {
        object.userData.pulledOut = !object.userData.pulledOut;
        SND.play("toggle", 0.34);
      } else if (action && action.indexOf("drawer-") === 0) {
        const nextOpen = !object.userData.open;
        room.interactive
          .filter((item) => item.userData.action?.indexOf("drawer-") === 0)
          .forEach((item) => { item.userData.open = false; });
        object.userData.open = nextOpen;
        SND.play(nextOpen ? "door" : "toggle", 0.36);
      } else if (action === "biography") {
        object.userData.open = !object.userData.open;
        if (object.userData.flap) object.userData.flap.rotation.x = object.userData.open ? 0.1 : -Math.PI / 2;
        SND.play("toggle", 0.48);
        window.setTimeout(() => navigateContent("about", "#content-about"), prefersReduced ? 0 : 520);
      } else if (action === "motto") {
        SND.play("chim", 0.5);
        showMotto();
      } else if (action && action.indexOf("publication-") === 0) {
        const wasReady = Boolean(object.userData.ready);
        const books = room.interactive
          .filter((item) => item.userData.action?.indexOf("publication-") === 0)
        books.forEach((item) => {
          if (item !== object) {
            item.userData.ready = false;
            item.userData.pullGoal = 0;
          }
        });
        window.clearTimeout(publicationNavTimer);
        if (!wasReady) {
          object.userData.ready = true;
          object.userData.pullGoal = 1;
          SND.play("toggle", 0.46);
        } else {
          object.userData.ready = false;
          object.userData.pullGoal = 0;
          SND.play("toggle", 0.38);
          publicationNavTimer = window.setTimeout(
            () => navigateContent("publications", "#content-publications"),
            prefersReduced ? 0 : 360
          );
        }
      } else if (action === "blogs") {
        if (!object.userData.ready) {
          object.userData.ready = true;
          object.userData.paperGoal = 1;
          SND.play("typewriter", 0.44, true);
        } else {
          object.userData.ready = false;
          object.userData.paperGoal = 0;
          SND.stop("typewriter");
          window.setTimeout(() => navigateContent("blogs", "#content-blogs"), prefersReduced ? 0 : 120);
        }
      } else if (action === "lamp") {
        object.userData.on = !object.userData.on;
        SND.play("lamp");
        object.userData.shade?.traverse((part) => {
          if (part.material?.color) {
            part.material.color.setHex(object.userData.on ? 0x78934f : 0x2f6b48);
            part.material.userData.baseColor.copy(part.material.color);
          }
        });
        paintTheme();
      } else if (action === "fire") {
        const lit = object.userData.fireGoal <= 0.5;
        object.userData.fireGoal = lit ? 1 : 0;
        syncFireAudio(lit);
      } else if (action === "plant") {
        object.userData.swayClock = 0;
        object.userData.swayEnergy = 1;
      } else if (action && action.indexOf("track-") === 0) {
        const index = Number(action.split("-")[1]) || 0;
        if (vinylAudio) vinylAudio.pause();
        selectedTrack = index;
        showTrack(index);
        room.selectRecord(index);
      } else if (action === "gramophone") {
        showTrack(selectedTrack);
        toggleRecord(object);
      }
    }

    function updatePointer(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function isVisible(object) {
      let current = object;
      while (current) {
        if (current.visible === false) return false;
        current = current.parent;
      }
      return true;
    }

    function pickInteraction() {
      const hits = raycaster.intersectObjects(room.root.children, true);
      for (const hit of hits) {
        if (!isVisible(hit.object) || hit.object.userData.noPick) continue;
        const material = hit.object.material;
        if (material?.transparent && material.opacity < 0.06) continue;
        const interaction = C.findInteraction(hit.object);
        if (interaction) return interaction;
        if (hit.object.isMesh) return null;
      }
      return null;
    }

    function refreshHover(event) {
      if (transition) return;
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const next = pickInteraction();
      if (next === hovered) { showTooltip(event); return; }
      C.setHover(hovered, false);
      hovered = next;
      C.setHover(hovered, true);
      showTooltip(event);
      renderer.domElement.style.cursor = hovered ? "pointer" : "default";
    }

    function activatePointerHit(event) {
      if (transition) return;
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hit = pickInteraction();
      if (hit) activate(hit);
      showTooltip(event);
    }

    function turnToView(name, direction = 0) {
      if (!WALL_VIEWS[name] || name === currentViewName) return;
      if (direction) SND.play("ui", 0.32);
      const desiredYaw = WALL_VIEWS[name].yaw;
      const delta = direction ? direction * Math.PI / 2 : shortestYawDelta(yaw, desiredYaw);
      transition = {
        fromYaw: yaw,
        toYaw: yaw + delta,
        startedAt: performance.now(),
        duration: prefersReduced ? 0 : TURN_DURATION,
      };
      currentViewName = name;
      C.setHover(hovered, false);
      hovered = null;
      tooltip.hidden = true;
      renderer.domElement.style.cursor = "default";
    }

    renderer.domElement.addEventListener("pointermove", refreshHover);
    renderer.domElement.addEventListener("click", activatePointerHit);
    renderer.domElement.addEventListener("pointerleave", () => {
      tooltip.hidden = true;
      C.setHover(hovered, false); hovered = null; pointer.set(2, 2);
      renderer.domElement.style.cursor = "default";
    });
    renderer.domElement.addEventListener("contextmenu", (event) => event.preventDefault());
    window.addEventListener("roomwallchange", (event) => {
      turnToView(event.detail?.name, event.detail?.direction || 0);
    });

    let themeLevel = Number(document.body.classList.contains("night"));
    let themeTarget = themeLevel;
    let themeTransition = null;
    function paintTheme() {
      room.setNight(themeLevel);
      C.applyNight(renderer, room.root, themeLevel);
    }
    paintTheme();
    function applyTheme() {
      const night = document.body.classList.contains("night");
      const target = Number(night);
      if (target !== themeTarget) {
        themeTarget = target;
        themeTransition = { from: themeLevel, start: performance.now() };
        if (prefersReduced) { themeLevel = target; themeTransition = null; paintTheme(); }
      }
      const themeButton = document.getElementById("theme-btn");
      themeButton.setAttribute("aria-label", night ? "Switch to day" : "Switch to night");
      themeButton.setAttribute("aria-pressed", String(night));
      syncPersistentAudio();
    }
    const bodyObserver = new MutationObserver(applyTheme);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    applyTheme();

    function resize() { C.resize(renderer, camera, layer); updateCameraProjection(); }
    window.addEventListener("resize", resize);
    resize();

    function render(now) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = clock.getElapsedTime();
      if (themeTransition) {
        const progress = Math.min(1, (now - themeTransition.start) / 850);
        themeLevel = themeTransition.from + (themeTarget - themeTransition.from) * smoothstep(progress);
        paintTheme();
        if (progress === 1) themeTransition = null;
      }
      if (transition) {
        const progress = transition.duration === 0 ? 1 : Math.min(1, (now - transition.startedAt) / transition.duration);
        const eased = smoothstep(progress);
        yaw = transition.fromYaw + (transition.toYaw - transition.fromYaw) * eased;
        if (progress === 1) {
          yaw = WALL_VIEWS[currentViewName].yaw;
          transition = null;
        }
      }
      camera.position.set(
        -VIEW_SETTINGS.radius * Math.sin(yaw),
        VIEW_SETTINGS.height,
        VIEW_SETTINGS.radius * Math.cos(yaw)
      );
      updateCameraProjection();
      lookTarget.set(
        camera.position.x + Math.sin(yaw),
        camera.position.y,
        camera.position.z - Math.cos(yaw)
      );
      camera.lookAt(lookTarget);
      room.update(dt, elapsed);
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  let domReady = document.readyState !== "loading";
  let started = false;
  function tryBoot() {
    if (!started && domReady && window.SITE_DATA) {
      started = true;
      boot();
    }
  }
  if (!domReady) {
    document.addEventListener("DOMContentLoaded", () => {
      domReady = true;
      tryBoot();
    }, { once: true });
  }
  if (!window.SITE_DATA) window.addEventListener("sitedataready", tryBoot, { once: true });
  tryBoot();
})();
