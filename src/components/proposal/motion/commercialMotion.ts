import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";
import type { Active } from "./useScene";

/* ---------------------------------------------------------------------------
   COMMERCIAL ACT — the offer is stated, not performed: rules are drawn,
   values rise from their baseline (no counters), the pilot is laid on its
   time axis. The closing brings back the hero's plot to locate the next step.
--------------------------------------------------------------------------- */

export function playInvestment(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  q('[data-iv="block"]').forEach((block) => {
    const b = gsap.utils.selector(block);
    gsap.set(b('[data-iv="rule"]'), { scaleX: 0 });
    gsap.set(b('[data-iv="price"]'), { yPercent: 110 });
    gsap.set(b("p:not(:has([data-iv])), [data-iv=\"item\"]"), { opacity: 0 });
    gsap
      .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: block, start: "top 80%", once: true } })
      .to(b('[data-iv="rule"]'), { scaleX: 1, duration: 1.1, ease: "power3.inOut" }, 0)
      .to(b("p:not(:has([data-iv])), [data-iv=\"item\"]"), { opacity: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" }, 0.2)
      .to(b('[data-iv="price"]'), { yPercent: 0, duration: 1.1 }, 0.25);
  });

  const axis = q('[data-iv="axis"]')[0];
  const a = gsap.utils.selector(axis);
  gsap.set(a('[data-iv="setup"]'), { opacity: 0, y: 10 });
  gsap.set(a('[data-iv="month"]'), { scaleX: 0 });
  gsap.set(a("li > span:not([data-iv])"), { opacity: 0 });
  gsap
    .timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: axis, start: "top 82%", once: true } })
    .to(a('[data-iv="setup"]'), { opacity: 1, y: 0, duration: 0.7 }, 0)
    .to(a('[data-iv="month"]'), { scaleX: 1, duration: 0.7, stagger: 0.35, ease: "power2.inOut" }, 0.3)
    .to(a("li > span:not([data-iv])"), { opacity: 1, duration: 0.5, stagger: 0.12 }, 0.5);
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
