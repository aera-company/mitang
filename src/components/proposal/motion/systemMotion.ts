import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";

/* ---------------------------------------------------------------------------
   GROWTH SYSTEM — one axis, five modules.
   Desktop (scrubbed): the axis is drawn left → right; each node lands as the
   axis reaches it, its column rises, and its output lights up last.
   Phones: modules enter one by one as they are reached.
--------------------------------------------------------------------------- */

export function playGrowthSystem(root: HTMLElement, active: Record<string, boolean>) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const modules = q('[data-gs="module"]');
  const dots = q('[data-gs="module"] [data-tag="dot"]');

  if (active.mobile) {
    revealOnEnter(modules);
    return;
  }

  const nodes = q('[data-gs="node"]');
  const n = modules.length;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: q('[data-gs="system"]')[0],
      start: "top 82%",
      end: "bottom 70%",
      scrub: 0.5,
    },
  });

  tl.fromTo(q('[data-gs="axis"]'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
  modules.forEach((m, i) => {
    const at = (i / n) * 0.92;
    tl.fromTo(nodes[i], { scale: 0 }, { scale: 1, duration: 0.06, ease: "back.out(3)" }, at)
      .fromTo(m, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }, at)
      .fromTo(dots[i], { scale: 0 }, { scale: 1, duration: 0.05, ease: "power2.out" }, at + 0.12);
  });
}
