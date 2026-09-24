import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";
import type { Active } from "./useScene";

/* ---------------------------------------------------------------------------
   COMMERCIAL ACT — the offer is stated, not performed: rules are drawn,
   the value rises from its baseline (no counter). The closing brings back
   the hero's plot to locate the next step.
--------------------------------------------------------------------------- */

export function playInvestment(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  const block = q('[data-iv="block"]')[0];

  // One price, stated: rules drawn, the value rises from its baseline
  // (no counter), the terms settle after it.
  gsap.set(q('[data-iv="rule"]'), { scaleX: 0 });
  gsap.set(q('[data-iv="price"]'), { yPercent: 110 });
  gsap.set(q('[data-iv="item"]'), { opacity: 0, y: 12 });
  gsap
    .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: block, start: "top 75%", once: true } })
    .to(q('[data-iv="rule"]'), { scaleX: 1, duration: 1.1, ease: "power3.inOut", stagger: 0.12 }, 0)
    .to(q('[data-iv="price"]'), { yPercent: 0, duration: 1.2 }, 0.2)
    .to(q('[data-iv="item"]'), { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.5);
}

export function playClosing(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const plot = q('[data-cl="plot"]')[0];
  const p = gsap.utils.selector(plot);

  gsap.set(q('[data-cl="line"]'), { yPercent: 112 });
  gsap.set(q('[data-cl="rule"], [data-cl="underline"]'), { scaleX: 0 });
  gsap.set(p('[data-radar="ring"]'), { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" });
  gsap.set(p('[data-radar="cross"], [data-radar="ticks"], [data-radar="bearing"]'), { opacity: 0 });
  gsap.set(p('[data-radar="centre"]'), { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
  gsap.set(q('[data-cl="readout"]'), { opacity: 0 });

  gsap
    .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: q("h2")[0], start: "top 80%", once: true } })
    .to(q('[data-cl="line"]'), { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0)
    .to(p('[data-radar="ring"]'), { opacity: 1, scale: 1, duration: 0.9, stagger: 0.1 }, 0.2)
    .to(p('[data-radar="cross"], [data-radar="ticks"], [data-radar="bearing"]'), { opacity: 1, duration: 0.6 }, 0.35)
    .to(p('[data-radar="centre"]'), { opacity: 1, scale: 1, duration: 0.7 }, 0.8)
    .to(q('[data-cl="readout"]'), { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.95)
    // The located point keeps a slow pulse — the one live element at the end.
    .to(p('[data-radar="centre"] circle:first-child'), {
      scale: 1.9,
      opacity: 0,
      transformOrigin: "50% 50%",
      duration: 1.8,
      ease: "power1.out",
      repeat: -1,
      repeatDelay: 0.6,
    }, 1.6);

  gsap
    .timeline({ scrollTrigger: { trigger: q('[data-cl="rule"]')[0], start: "top 88%", once: true } })
    .to(q('[data-cl="rule"]'), { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, 0)
    .to(q('[data-cl="underline"]'), { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 0.6);
}
