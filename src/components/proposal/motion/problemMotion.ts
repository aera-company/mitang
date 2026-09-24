import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";

/* ---------------------------------------------------------------------------
   REAL PROBLEM — the handoff from the dark reframe.
   · desktop: the paper panel opens from the grid margins to full bleed;
   · the headline's emphasis moves from "gerar leads" to "quais importam";
   · the chain is drawn step by step, ending on the opportunity.
   All scrubbed to scroll, no pinning.
--------------------------------------------------------------------------- */

export function playRealProblem(root: HTMLElement, active: Record<string, boolean>) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  const css = getComputedStyle(root);
  const fg = css.getPropertyValue("--fg").trim();
  const muted = css.getPropertyValue("--muted").trim();

  if (active.desktop) {
    const m = () => getComputedStyle(root).getPropertyValue("--margin").trim();
    gsap.fromTo(
      root,
      { clipPath: () => `inset(0px ${m()} 0px ${m()})` },
      {
        clipPath: "inset(0px 0px 0px 0px)",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "top 15%",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      },
    );
  }

  // Emphasis shift, word by word.
  const title = q('[data-rp="title"]')[0];
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: title, start: "top 78%", end: "top 32%", scrub: 0.4 },
    })
    .to(q('[data-rp="w2"]'), { color: fg, stagger: 0.12, duration: 0.3 }, 0)
    .to(q('[data-rp="w1"]'), { color: muted, stagger: 0.08, duration: 0.3 }, 0.35);

  // The chain, drawn to the opportunity.
  const chain = q('[data-rp="chain"]')[0];
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: chain, start: "top 75%", end: "bottom 55%", scrub: 0.4 },
    })
    .fromTo(q('[data-rp="rail"]'), { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
    .fromTo(
      q('[data-rp="step"]'),
      { opacity: 0.15, x: -8 },
      { opacity: 1, x: 0, duration: 0.18, stagger: 0.135 },
      0,
    );

  revealOnEnter(q('[data-rp="context"]'));
}
