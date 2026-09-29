import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";
import type { Active } from "./useScene";

/* ---------------------------------------------------------------------------
   V2 scenes (29/09). Same language as V1: quiet entrances, and scrubbed
   paths where a path is the point (the AERA × MITANG axis, the flow).
--------------------------------------------------------------------------- */

/** What AERA takes on: the four fronts are laid in, rule first. */
export function playAssumes(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));
  const fronts = q('[data-as="front"]');
  gsap.set(fronts, { opacity: 0, y: 24 });
  gsap.to(fronts, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.1,
    scrollTrigger: { trigger: fronts[0], start: "top 82%", once: true },
  });
}

/** AERA × MITANG: AERA's line runs to the meeting, then MITANG takes it.
    Desktop only (phones read the two lists). */
function playHandoff(root: HTMLElement) {
  const q = gsap.utils.selector(root);

  const nodes = q('[data-bd="node"]');
  const steps = q('[data-bd="step"]');
  const cut = 7; // AERA steps (HANDOFF.aera.length)
  const at = (i: number) => (i / (nodes.length - 1)) * 0.86;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: q('[data-bd="axis"]')[0], start: "top 82%", end: "bottom 62%", scrub: 0.5 },
  });
  tl.fromTo(q('[data-bd="line-a"]'), { scaleX: 0 }, { scaleX: 1, duration: at(cut - 1) }, 0)
    .fromTo(q('[data-bd="bracket-a"]'), { scaleX: 0 }, { scaleX: 1, duration: at(cut - 1) }, 0)
    .fromTo(q('[data-bd="line-m"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.86 - at(cut - 1) }, at(cut - 1))
    .fromTo(q('[data-bd="bracket-m"]'), { opacity: 0 }, { opacity: 1, duration: 0.08 }, at(cut));
  nodes.forEach((n, i) => {
    tl.fromTo(n, { scale: 0 }, { scale: 1, duration: 0.03, ease: "back.out(3)" }, at(i))
      .fromTo(steps[i], { opacity: 0.12 }, { opacity: 1, duration: 0.05 }, at(i));
  });
  tl.to({}, { duration: 0.1 });
}

/** The flow: axis (rail on phones) drawn, steps reached in turn; then the
    AERA × MITANG handoff. */
export function playHowItWorks(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  const steps = q('[data-hw="step"]');
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q('[data-hw="flow"]')[0], start: "top 80%", end: active.desktop ? "bottom 55%" : "bottom 70%", scrub: 0.5 },
    })
    .fromTo(q(active.desktop ? '[data-hw="axis"]' : '[data-hw="rail"]'), active.desktop ? { scaleX: 0 } : { scaleY: 0 }, active.desktop ? { scaleX: 1, duration: 1 } : { scaleY: 1, duration: 1 }, 0)
    .fromTo(steps, { opacity: 0.12, y: 8 }, { opacity: 1, y: 0, duration: 0.14, stagger: 0.14 }, 0);

  if (active.desktop) playHandoff(root);
}

/** What stays: each concept's count fills as the row is reached. */
export function playBeyondShort(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));
  const items = q('[data-bs="item"]');
  gsap.set(items, { opacity: 0, y: 18 });
  gsap.set(q('[data-bs="on"]'), { scaleX: 0 });
  gsap
    .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: items[0], start: "top 82%", once: true } })
    .to(items, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0)
    .to(q('[data-bs="on"]'), { scaleX: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" }, 0.3);
}
