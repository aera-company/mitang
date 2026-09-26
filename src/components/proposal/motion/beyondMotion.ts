import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";
import type { Active } from "./useScene";

/* ---------------------------------------------------------------------------
   BEYOND EXECUTION — accumulation. Desktop: each block, once read, lays its
   layer on the sticky strata (reversible with the scroll) and its number
   darkens and stays. Phones: blocks enter quietly with their own count.
--------------------------------------------------------------------------- */

export function playBeyond(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const blocks = q('[data-bx="block"]');
  if (active.mobile) {
    revealOnEnter(blocks);
    return;
  }

  const layers = q('[data-bx="layer"]') as HTMLElement[];
  const count = q('[data-bx="count"]')[0];
  let built = 0;
  const paint = () => {
    layers.forEach((l) => {
      const n = Number(l.dataset.n);
      l.classList.toggle("is-built", n <= built);
      l.classList.toggle("is-top", n === built);
    });
    if (count) count.textContent = String(built).padStart(2, "0");
    blocks.forEach((b, i) => b.classList.toggle("is-on", i < built));
  };
  paint();

  blocks.forEach((block, i) => {
    ScrollTrigger.create({
      trigger: block,
      start: "top 62%",
      onEnter: () => {
        built = Math.max(built, i + 1);
        paint();
      },
      onLeaveBack: () => {
        built = Math.min(built, i);
        paint();
      },
    });
  });

  return () => {
    layers.forEach((l) => l.classList.remove("is-built", "is-top"));
    blocks.forEach((b) => b.classList.remove("is-on"));
    if (count) count.textContent = "05";
  };
}
