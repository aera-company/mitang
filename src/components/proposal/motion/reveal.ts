import { gsap, ScrollTrigger } from "@/components/motion/gsap";

/** Quiet entrance for in-flow blocks: rise 24px and settle, once. */
export function revealOnEnter(targets: Element[]) {
  if (!targets.length) return;
  gsap.set(targets, { opacity: 0, y: 24 });
  ScrollTrigger.batch(targets, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }),
  });
}
