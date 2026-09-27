import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";
import type { Active } from "./useScene";

/* ---------------------------------------------------------------------------
   OPERATION ACT — mostly quiet (brief §27): entrances only, except the
   90-day timeline, where time is walked, and the team axis.
--------------------------------------------------------------------------- */

/** Sales content: each asset is laid, then its stage in the conversation lights. */
export function playSalesContent(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const assets = q('[data-sc="asset"]');
  gsap.set(assets, { opacity: 0, y: 20 });
  gsap.set(q('[data-sc="stage"]'), { scaleX: 0 });
  gsap
    .timeline({ scrollTrigger: { trigger: q('[data-sc="grid"]')[0], start: "top 80%", once: true } })
    .to(assets, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0)
    .to(q('[data-sc="stage"]'), { scaleX: 1, duration: 0.5, ease: "power2.out", stagger: 0.07 }, 0.45);
}

/** IA + automation: headline and one line, quietly. */
export function playAutomation(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));
}

/**
 * 90 days — time is walked. Desktop (scrubbed): the D0→D90 axis is drawn with
 * a signal marker at its tip; each phase rises as the marker reaches its
 * start, and its deliverables light as the marker reaches its end.
 * Phones: the phases enter in turn along the vertical rail.
 */
export function playNinetyDays(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const phases = q('[data-nd="phase"]');

  if (active.mobile) {
    phases.forEach((ph) => {
      const g = gsap.utils.selector(ph);
      gsap.set(ph, { opacity: 0, y: 24 });
      gsap.set(g("[data-tag=\"dot\"]"), { scale: 0 });
      gsap
        .timeline({ scrollTrigger: { trigger: ph, start: "top 82%", once: true } })
        .to(ph, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0)
        .to(g("[data-tag=\"dot\"]"), { scale: 1, duration: 0.3, stagger: 0.06, ease: "power2.out" }, 0.5);
    });
    return;
  }

  const axis = q('[data-nd="axis"]')[0] as HTMLElement;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: q('[data-nd="timeline"]')[0], start: "top 78%", end: "bottom 62%", scrub: 0.5, invalidateOnRefresh: true },
  });

  tl.fromTo(axis, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
    .fromTo(q('[data-nd="marker"]'), { x: 0, opacity: 1 }, { x: () => axis.offsetWidth, duration: 1 }, 0)
    .to(q('[data-nd="marker"]'), { opacity: 0, duration: 0.04 }, 1);

  q('[data-nd="tick"]').forEach((t, i) => {
    tl.fromTo(t, { opacity: 0.15 }, { opacity: 1, duration: 0.04 }, Math.max(0, i / 3 - 0.02));
  });
  phases.forEach((ph, i) => {
    const g = gsap.utils.selector(ph);
    tl.fromTo(ph, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }, i / 3)
      .fromTo(g("[data-tag=\"dot\"]"), { scale: 0 }, { scale: 1, duration: 0.04, stagger: 0.02, ease: "power2.out" }, (i + 1) / 3 - 0.1);
  });
}

/** Team: the shared axis is drawn out from the junction; each side comes in from its own edge. */
export function playTeam(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const vertical = active.desktop;
  const [a, b] = q('[data-tm="axis"]');
  gsap.set(a, vertical ? { scaleY: 0, transformOrigin: "50% 100%" } : { scaleX: 0, transformOrigin: "100% 50%" });
  gsap.set(b, vertical ? { scaleY: 0, transformOrigin: "50% 0%" } : { scaleX: 0, transformOrigin: "0% 50%" });
  gsap.set(q('[data-tm="junction"]'), { opacity: 0, scale: 0.6 });
  gsap.set(q('[data-tm="mitang"] li, [data-tm="mitang"] h3'), { opacity: 0, x: vertical ? -16 : 0, y: vertical ? 0 : 12 });
  gsap.set(q('[data-tm="aera"] li, [data-tm="aera"] h3'), { opacity: 0, x: vertical ? 16 : 0, y: vertical ? 0 : 12 });

  gsap
    .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: q('[data-tm="board"]')[0], start: "top 75%", once: true } })
    .to(q('[data-tm="junction"]'), { opacity: 1, scale: 1, duration: 0.7 }, 0)
    .to([a, b], { scaleX: 1, scaleY: 1, duration: 1.1, ease: "power3.inOut" }, 0.1)
    .to(q('[data-tm="mitang"] h3, [data-tm="mitang"] li'), { opacity: 1, x: 0, y: 0, duration: 0.8, stagger: 0.05 }, 0.35)
    .to(q('[data-tm="aera"] h3, [data-tm="aera"] li'), { opacity: 1, x: 0, y: 0, duration: 0.8, stagger: 0.05 }, 0.45);
}

/** Scope and metrics: rows enter as they are read. */
export function playRows(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter([...q("[data-reveal]"), ...q("[data-row]")]);
}

/**
 * Working model: the month is laid lane by lane (lines drawn, marks placed),
 * then the two sides of the joint diagram converge on one result.
 */
export function playWorkingModel(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const lanes = q('[data-wm="lane"]');
  gsap.set(lanes, { opacity: 0, y: 14 });
  gsap.set(q('[data-wm="line"]'), { scaleX: 0 });
  gsap.set(q('[data-wm="mark"]'), { scale: 0 });
  gsap
    .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: lanes[0], start: "top 82%", once: true } })
    .to(lanes, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0)
    .to(q('[data-wm="line"]'), { scaleX: 1, duration: 1, ease: "power3.inOut", stagger: 0.15 }, 0.3)
    .to(q('[data-wm="mark"]'), { scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(2)" }, 0.35);

  const joint = q('[data-wm="joint"]')[0];
  gsap.set(q('[data-wm="side"]'), { opacity: 0, y: 12 });
  gsap.set(q('[data-wm="bracket"]'), { scaleY: 0 });
  gsap.set(q('[data-wm="stem"]'), { scaleY: 0 });
  gsap.set(q('[data-wm="result"]'), { opacity: 0, y: 8 });
  gsap
    .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: joint, start: "top 78%", once: true } })
    .to(q('[data-wm="side"]'), { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0)
    .to(q('[data-wm="bracket"]'), { scaleY: 1, duration: 0.6, ease: "power2.inOut" }, 0.45)
    .to(q('[data-wm="stem"]'), { scaleY: 1, duration: 0.4, ease: "power2.inOut" }, 0.95)
    .to(q('[data-wm="result"]'), { opacity: 1, y: 0, duration: 0.8 }, 1.2);
}
