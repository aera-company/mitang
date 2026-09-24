import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";

/* ---------------------------------------------------------------------------
   ABM — one account, many ways in. Plays once when the orbit is reached:
   the account is placed, its roles are drawn around it, then a different
   entry arrives at each role, one after another.
--------------------------------------------------------------------------- */

export function playABM(root: HTMLElement, active: Record<string, boolean>) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  if (active.mobile) {
    const rows = q('[data-abm="row"]');
    gsap.set(rows, { opacity: 0 });
    gsap.set(q('[data-abm="row-arrow"]'), { x: -14, opacity: 0 });
    gsap.timeline({ scrollTrigger: { trigger: rows[0], start: "top 85%", once: true } })
      .to(rows, { opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 0)
      .to(q('[data-abm="row-arrow"]'), { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }, 0.2);
    return;
  }

  const o = gsap.utils.selector(q('[data-abm="orbit"]')[0]);
  const arrows = o('[data-abm="arrow"]');
  const labels = o('[data-abm="label"]');

  const tl = gsap.timeline({
    defaults: { ease: "expo.out" },
    scrollTrigger: { trigger: q('[data-abm="orbit"]')[0], start: "top 70%", once: true },
  });

  tl.fromTo(o('[data-abm="core"]'), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.9 }, 0)
    .fromTo(o('[data-abm="ring"]'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.1)
    .fromTo(o('[data-abm="inner"]'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3)
    .fromTo(o('[data-abm="spoke"]'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, stagger: 0.07, ease: "power2.out" }, 0.45)
    .fromTo(o('[data-abm="node"]'), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, stagger: 0.07 }, 0.7)
    .fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out" }, 0.8);

  // A different entry arrives at each role, in turn.
  arrows.forEach((a, i) => {
    tl.fromTo(
      a,
      { opacity: 0, strokeDasharray: 1, strokeDashoffset: 1 },
      { opacity: 1, strokeDashoffset: 0, duration: 0.45, ease: "power3.out" },
      1.4 + i * 0.16,
    );
  });
}
