import { gsap } from "@/components/motion/gsap";
import { playNinetyDays } from "./operationMotion";
import { revealOnEnter } from "./reveal";
import type { Active } from "./useScene";

/* ---------------------------------------------------------------------------
   /mitang (final) scenes. Same language as V1: quiet entrances, scrubbed
   paths where the path is the point (the flow, the responses), the photo
   gaining colour, the Radar switching on.
--------------------------------------------------------------------------- */

/** 02 — reveals, and the MITANG photograph: opens, settles, gains colour. */
export function playStart(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));
  const photo = q('[data-rp="photo"]')[0];
  const frame = photo.firstElementChild as HTMLElement;
  const img = photo.querySelector("img");
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: photo, start: "top 88%", end: "bottom 60%", scrub: 0.6 },
    })
    .fromTo(frame, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "power2.inOut" }, 0)
    .fromTo(img, { scale: 1.14, yPercent: -4 }, { scale: 1, yPercent: 4, duration: 1 }, 0)
    .fromTo(img, { "--rp-gray": 1 }, { "--rp-gray": 0, duration: 0.4, ease: "power1.inOut" }, 0.45);
}

/** 03 — the four fronts are laid in, rule first. */
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

/** 04 — AERA's line runs to the meeting, then MITANG's; steps reached in turn. */
export function playHowItWorks(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));
  const steps = q('[data-hw="step"]');
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: q('[data-hw="flow"]')[0], start: "top 80%", end: active.desktop ? "bottom 60%" : "bottom 70%", scrub: 0.5 },
  });
  if (active.desktop) {
    tl.fromTo(q('[data-hw="axis"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.75 }, 0)
      .fromTo(q('[data-hw="axis-m"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.25 }, 0.75);
  } else {
    tl.fromTo(q('[data-hw="rail"]'), { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);
  }
  tl.fromTo(steps, { opacity: 0.12, y: 8 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.125 }, 0);
}

/** 05 — the responses are listed down their rail, ending on the combination. */
export function playAdds(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q('[data-ad="responses"]')[0], start: "top 78%", end: "bottom 60%", scrub: 0.4 },
    })
    .fromTo(q('[data-ad="rail"]'), { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
    .fromTo(q('[data-ad="response"]'), { opacity: 0.15, x: -8 }, { opacity: 1, x: 0, duration: 0.15, stagger: 0.12 }, 0);
}

/** 06 — the name rises, the Radar switches on, then the 90 days are walked
    (playNinetyDays also runs the section's quiet reveals). */
export function playRadarV2(root: HTMLElement, active: Active) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);

  const title = q('[data-rd="title"]')[0];
  gsap.set(title, { yPercent: 112 });
  gsap.to(title, { yPercent: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: title, start: "top 88%", once: true } });

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

  playNinetyDays(root, active);
}
