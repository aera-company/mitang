import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";
import type { Active } from "./useScene";

/* ---------------------------------------------------------------------------
   MITANG RADAR — the tool is switched on as it is reached: frame, bar, tabs,
   then the data is written in (panel rows, the selected account's fields,
   the AI brief last and quieter). Plays once. After that the scroll drives
   the argument: the "before" chain appears and fades, as knowledge does;
   the "with" chain is drawn and stays; the piece sequence runs down its rail.
--------------------------------------------------------------------------- */

export function playMitangRadar(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  // Name rises out of its mask.
  const title = q('[data-rd="title"]')[0];
  gsap.set(title, { yPercent: 112 });
  gsap.to(title, {
    yPercent: 0,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: { trigger: title, start: "top 88%", once: true },
  });

  // The app boots.
  const app = q('[data-rd="app"]')[0];
  const items = q('[data-rd="item"]');
  const fields = q('[data-rd="field"]');
  const brief = q('[data-rd="brief"]');
  gsap.set(app, { clipPath: "inset(0% 0% 100% 0%)" });
  gsap.set([...q('[data-rd="bar"]'), ...q('[data-rd="tab"]'), ...items, ...fields, ...brief], { opacity: 0 });
  gsap
    .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: app, start: "top 78%", once: true } })
    .to(app, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, 0)
    .to(q('[data-rd="bar"]'), { opacity: 1, duration: 0.5 }, 0.5)
    .fromTo(q('[data-rd="tab"]'), { y: 6 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.6)
    .fromTo(items, { y: 10 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.85)
    .fromTo(fields, { x: 8 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.07 }, 1.05)
    .to(brief, { opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" }, 1.6);

  // Before: each step appears, then the earlier ones fade.
  const before = q('[data-rd="before"]');
  const withs = q('[data-rd="with"]');
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q('[data-rd="compare"]')[0], start: "top 80%", end: "bottom 45%", scrub: 0.5 },
    })
    .fromTo(before, { opacity: 0 }, { opacity: 1, duration: 0.08, stagger: 0.06 }, 0)
    .to(before.slice(0, -1), { opacity: 0.4, duration: 0.2, stagger: 0.05 }, 0.3)
    .fromTo(withs, { opacity: 0.08 }, { opacity: 1, duration: 0.08, stagger: 0.06 }, 0.35);

  // Piece sequence, drawn down its rail.
  const steps = q('[data-rd="steps"]')[0];
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: steps, start: "top 78%", end: "bottom 58%", scrub: 0.4 },
    })
    .fromTo(q('[data-rd="rail"]'), { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
    .fromTo(q('[data-rd="step"]'), { opacity: 0.15, x: -8 }, { opacity: 1, x: 0, duration: 0.18, stagger: 0.2 }, 0);

  // The five disciplines join, one by one.
  gsap.fromTo(
    q('[data-rd="disc"]'),
    { opacity: 0.2 },
    {
      opacity: 1,
      duration: 0.5,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: q('[data-rd="disc"]')[0], start: "top 82%", once: true },
    },
  );
}
