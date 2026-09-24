import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";

/* ---------------------------------------------------------------------------
   MARKET INTELLIGENCE — the read happens once, when the canvas is reached.
   The radar opens and sweeps; each account is found as the arm passes it;
   the canvas rows are written in, fit bars rise and the status trail fills
   to each account's current stage. Plays once (not scrubbed): it is a read,
   not a scene.
--------------------------------------------------------------------------- */

const SWEEP_AT = 0.35;
const SWEEP_FOR = 1.6;

export function playIntelligence(root: HTMLElement, active: Record<string, boolean>) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const radar = q('[data-mi="radar"]')[0];
  const r = gsap.utils.selector(radar);
  const visible = (els: Element[]) => els.filter((el) => (el as HTMLElement).offsetParent !== null);
  const rows = visible(q('[data-mi="row"]'));

  const tl = gsap.timeline({
    defaults: { ease: "expo.out" },
    scrollTrigger: { trigger: radar, start: "top 75%", once: true },
  });

  tl.fromTo(r('[data-radar="ring"]'), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.1 }, 0)
    .fromTo(r('[data-radar="cross"], [data-radar="ticks"], [data-radar="bearing"]'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.15)
    .set(r('[data-radar="arm"]'), { opacity: 1 }, SWEEP_AT)
    .fromTo(r('[data-radar="arm"]'), { rotation: 0 }, { rotation: 360, svgOrigin: "0 0", duration: SWEEP_FOR, ease: "none" }, SWEEP_AT)
    .to(r('[data-radar="arm"]'), { opacity: 0.5, duration: 0.5, ease: "power2.out" }, SWEEP_AT + SWEEP_FOR);

  r('[data-radar="point"]').forEach((pt) => {
    const bearing = Number((pt as HTMLElement).dataset.bearing ?? 0);
    tl.fromTo(pt, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.5 }, SWEEP_AT + (bearing / 360) * SWEEP_FOR);
  });

  tl.fromTo(q('[data-mi="legend"]'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, SWEEP_AT + SWEEP_FOR);

  // Canvas rows are written in while the radar reads.
  rows.forEach((row, i) => {
    const at = 0.4 + i * 0.22;
    const g = gsap.utils.selector(row);
    tl.fromTo(row, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, at)
      .fromTo(g('[data-mi="bar"]'), { scaleY: 0 }, { scaleY: 1, duration: 0.35, stagger: 0.06, ease: "power2.out" }, at + 0.2)
      .fromTo(g('[data-mi="seg"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.25, stagger: 0.08, ease: "power2.out" }, at + 0.3);
  });

  // Hidden until the read starts (they are well below the fold on load).
  gsap.set([...r('[data-radar="point"]'), ...r('[data-radar="arm"]'), ...rows], { opacity: 0 });
}
