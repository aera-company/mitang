import { gsap, ScrollTrigger } from "@/components/motion/gsap";

/* ---------------------------------------------------------------------------
   HERO — entrance (≈2.8s, on load) + one scroll-linked detail.
   Order is the narrative: the grid is laid, the title arrives, the radar
   opens, the sweep reads the market, four signals appear as it passes them,
   they connect to one point, the point is located and its coordinate reads.
--------------------------------------------------------------------------- */

const SWEEP_AT = 0.7;
const SWEEP_FOR = 1.5;

/** Reveal a coordinate string digit by digit out of noise. */
function scramble(el: Element, text: string, duration: number) {
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration,
    ease: "none",
    onUpdate: () => {
      const locked = Math.floor(state.p * text.length);
      el.textContent = text
        .split("")
        .map((ch, i) =>
          i < locked || !/\d/.test(ch) ? ch : String(Math.floor(Math.random() * 10)),
        )
        .join("");
    },
    onComplete: () => {
      el.textContent = text;
    },
  });
}

export function playHeroEntrance(
  root: HTMLElement,
  active: Record<string, boolean>,
) {
  (window as unknown as { __motionReady?: boolean }).__motionReady = true;
  if (active.reduce) return;

  // Sticky tracks and scrubbed scenes measure text: re-measure once fonts land.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  const q = gsap.utils.selector(root);
  const plot = root.querySelector<HTMLElement>(
    `[data-plot="${active.desktop ? "desktop" : "mobile"}"]`,
  );
  if (!plot) return;
  const p = gsap.utils.selector(plot);

  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  // 1 — Grid laid.
  tl.to(q('[data-hero="rule-v"]'), { scaleY: 1, duration: 1.3, ease: "power3.inOut", stagger: 0.12 }, 0)
    .to(q('[data-hero="rule-h"]'), { scaleX: 1, duration: 1.3, ease: "power3.inOut", stagger: 0.1 }, 0.15)
    .to(q('[data-hero="tick"]'), { scaleY: 1, duration: 0.5, ease: "power2.out", stagger: 0.035 }, 0.1)
    .to(q('[data-hero="fade"]').slice(0, 2), { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.1);

  // 2 — Title, line by line.
  tl.to(q('[data-hero="line"]'), { y: 0, duration: 1.15, stagger: 0.09 }, 0.35);

  // 3 — Radar opens.
  tl.fromTo(
    p('[data-radar="ring"]'),
    { opacity: 0, scale: 0.82, transformOrigin: "50% 50%" },
    { opacity: 1, scale: 1, duration: 1, stagger: 0.1 },
    0.45,
  )
    .to(p('[data-radar="cross"], [data-radar="ticks"]'), { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.55)
    .to(p('[data-radar="bearing"]'), { opacity: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" }, 0.8);

  // 4 — The sweep reads the market (dot field revealed behind the arm).
  const dots = plot.querySelector(".hero-dots");
  const arm = p('[data-hero="arm"]');
  tl.set(arm, { opacity: 1 }, SWEEP_AT)
    .fromTo(arm, { rotation: 0 }, { rotation: 360, svgOrigin: "0 0", duration: SWEEP_FOR, ease: "none" }, SWEEP_AT)
    .to(dots, { "--sweep": "360deg", duration: SWEEP_FOR, ease: "none" }, SWEEP_AT)
    .to(arm, { opacity: 0.28, duration: 0.6, ease: "power2.out" }, SWEEP_AT + SWEEP_FOR);

  // 5 — Each signal appears as the arm passes its bearing.
  p('[data-hero="signal"]').forEach((el) => {
    const bearing = Number((el as HTMLElement).dataset.bearing ?? 0);
    tl.fromTo(
      el,
      { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.5 },
      SWEEP_AT + (bearing / 360) * SWEEP_FOR,
    );
  });

  // 6 — Signals connect to one point; the point is located.
  const locate = SWEEP_AT + SWEEP_FOR + 0.05;
  tl.to(p(".hero-link"), { strokeDashoffset: 0, duration: 0.7, stagger: 0.07, ease: "power2.inOut" }, locate)
    .fromTo(
      p('[data-radar="centre"]'),
      { opacity: 0, scale: 0, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.7 },
      locate + 0.5,
    );

  // 7 — Coordinate reads; copy and cue settle.
  tl.to(q('[data-hero="readout"]'), { opacity: 1, duration: 0.4, ease: "power2.out" }, locate + 0.55);
  q('[data-hero="coord"]').forEach((el) => {
    tl.add(scramble(el, el.textContent ?? "", 0.8), locate + 0.55);
  });
  tl.to(q('[data-hero="fade"]').slice(2), { opacity: 1, duration: 0.9, stagger: 0.12, ease: "power2.out" }, 1.1);

  // Scroll: the arm keeps reading as the page leaves the hero.
  ScrollTrigger.create({
    trigger: root,
    start: "top top",
    end: "bottom top",
    scrub: 0.6,
    animation: gsap.fromTo(
      p('[data-hero="arm-scroll"]'),
      { rotation: 0 },
      { rotation: 110, svgOrigin: "0 0", ease: "none" },
    ),
  });

  return () => {
    tl.kill();
  };
}
