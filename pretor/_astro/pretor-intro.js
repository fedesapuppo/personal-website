/* Pretor — prólogo cinematográfico.
   Injects itself only when: JS on, no reduced-motion, no Save-Data,
   not already seen this session (override with ?intro), page at top. */
(() => {
  const force = new URLSearchParams(location.search).has("intro");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduced || saveData) return;
  if (!force && scrollY > 4) return;

  const BASE = "/pretor/_astro/intro/";
  const desktop = matchMedia("(min-width: 768px)").matches;
  const pointerFine = matchMedia("(pointer: fine)").matches;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const preload = (srcs, budget) =>
    Promise.race([
      Promise.all(
        srcs.map(
          (s) =>
            new Promise((res, rej) => {
              const img = new Image();
              img.onload = () => res(img.decode ? img.decode().catch(() => {}).then(res) : res());
              img.onerror = rej;
              img.src = BASE + s;
            })
        )
      ),
      new Promise((_, rej) => setTimeout(rej, budget)),
    ]);

  /* ---------- mobile: curtains reveal the statue world, time-based ---------- */
  if (!desktop) {
    preload(["world.webp", "curtain-l.webp", "curtain-r.webp"], 2200).then(() => {
      const el = document.createElement("div");
      el.className = "prologo prologo--movil";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML =
        '<div class="prologo__world"></div>' +
        '<div class="prologo__curtain prologo__curtain--l"></div>' +
        '<div class="prologo__curtain prologo__curtain--r"></div>' +
        '<div class="prologo__lema"><h2>LEX ANTIQVA<br>MENS NOVA</h2><p>La inteligencia que dirige tu estudio jur&iacute;dico.</p></div>';
      document.body.prepend(el);
      let done = false;
      const out = () => {
        if (done) return;
        done = true;
        el.classList.add("is-out");
        setTimeout(() => el.remove(), 600);
      };
      el.addEventListener("click", out);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setTimeout(() => el.classList.add("is-open"), 250);
          setTimeout(() => el.classList.add("is-lema"), 1200);
          setTimeout(out, 3700);
        })
      );
    }).catch(() => {});
    return;
  }

  /* ---------- desktop: scroll-linked flight through the arch ---------- */
  const el = document.createElement("div");
  el.className = "prologo";
  el.id = "prologo";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML =
    '<div class="prologo__stage">' +
    '<div class="prologo__layer prologo__world"></div>' +
    '<div class="prologo__layer prologo__dust"></div>' +
    '<div class="prologo__curtain prologo__curtain--l"></div>' +
    '<div class="prologo__curtain prologo__curtain--r"></div>' +
    '<div class="prologo__layer prologo__lema"><h2>LEX ANTIQVA<br>MENS NOVA</h2><p>La inteligencia que dirige tu estudio jurídico.</p></div>' +
    '<div class="prologo__cue"><svg viewBox="0 0 24 24" fill="none" stroke="#cda455" stroke-width="1.6"><path d="M6 9l6 6 6-6"/></svg><span>Descend&eacute;</span></div>' +
    '<div class="prologo__carga"><img src="/pretor/_astro/justitia.png" alt=""><span>PRETOR</span></div>' +
    '<button class="prologo__saltar" type="button">Saltar introducci&oacute;n</button>' +
    "</div>";
  document.body.prepend(el);
  scrollTo({ top: 0, behavior: "instant" });

  const stage = el.querySelector(".prologo__stage");
  const world = el.querySelector(".prologo__world");
  const curtainL = el.querySelector(".prologo__curtain--l");
  const curtainR = el.querySelector(".prologo__curtain--r");
  const lema = el.querySelector(".prologo__lema");
  const cue = el.querySelector(".prologo__cue");
  const skipBtn = el.querySelector(".prologo__saltar");

  const MAG = { world: 6, curtain: 14 };
  let tx = 0, ty = 0, rx = 0, ry = 0;
  let raf = 0, openStart = 0, finished = false;

  const onMove = (e) => {
    tx = (e.clientX / innerWidth) * 2 - 1;
    ty = (e.clientY / innerHeight) * 2 - 1;
  };
  if (pointerFine) addEventListener("pointermove", onMove, { passive: true });

  const finish = (jump) => {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(raf);
    if (pointerFine) removeEventListener("pointermove", onMove);
    removeEventListener("keydown", onKey);
    const jumpTop = () => scrollTo({ top: 0, behavior: "instant" });
    if (jump) {
      stage.style.transition = "opacity .3s ease";
      stage.style.opacity = "0";
      setTimeout(() => {
        el.remove();
        jumpTop();
      }, 300);
    } else {
      el.remove();
      jumpTop();
    }
  };

  const onKey = (e) => {
    if (e.key === "Escape") finish(true);
  };
  addEventListener("keydown", onKey);
  skipBtn.addEventListener("click", () => finish(true));
  stage.addEventListener("click", (e) => {
    if (e.target !== skipBtn) finish(true);
  });

  const tick = () => {
    if (finished) return;
    rx = lerp(rx, tx, 0.07);
    ry = lerp(ry, ty, 0.07);

    const vh = innerHeight;
    const max = el.offsetHeight - vh;
    const p = clamp(scrollY / max, 0, 1);
    const flight = easeInOut(clamp(p / 0.45, 0, 1));
    const open = openStart ? easeInOut(clamp((performance.now() - openStart) / 1600, 0, 1)) : 0;

    world.style.transform = `scale(${lerp(1, 1.22, easeInOut(p))}) translate3d(${rx * MAG.world}px, ${ry * MAG.world}px, 0)`;

    const shift = open * lerp(62, 150, flight);
    const cs = lerp(1, 1.3, flight);
    curtainL.style.transform = `translateX(calc(-${shift}% + ${rx * MAG.curtain}px)) translateY(${ry * MAG.curtain * 0.3}px) scale(${cs}) translateZ(0)`;
    curtainR.style.transform = `translateX(calc(${shift}% + ${rx * MAG.curtain}px)) translateY(${ry * MAG.curtain * 0.3}px) scale(${cs}) translateZ(0)`;

    const lemaIn = clamp((p - 0.4) / 0.12, 0, 1);
    const lemaOut = clamp(1 - (p - 0.86) / 0.07, 0, 1);
    lema.style.opacity = lemaIn * lemaOut;
    lema.style.transform = `translateY(${lerp(24, 0, easeInOut(lemaIn))}px)`;

    cue.style.opacity = open >= 1 ? clamp(1 - p / 0.06, 0, 1) : 0;
    skipBtn.style.opacity = clamp(1 - (p - 0.8) / 0.1, 0, 1) * clamp(open * 2, 0, 1);

    const fade = clamp(1 - (p - 0.86) / 0.13, 0, 1);
    stage.style.opacity = fade;
    if (p > 0.9) el.classList.add("is-done");

    if (p >= 1) {
      finish(false);
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  preload(["world.webp", "curtain-l.webp", "curtain-r.webp", "dust.webp"], 2500)
    .then(() => {
      el.classList.add("is-ready");
      openStart = performance.now() + 150;
      raf = requestAnimationFrame(tick);
    })
    .catch(() => {
      finished = true;
      el.remove();
      removeEventListener("keydown", onKey);
      if (pointerFine) removeEventListener("pointermove", onMove);
    });
})();
