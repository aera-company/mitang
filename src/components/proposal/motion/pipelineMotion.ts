import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";

/* ---------------------------------------------------------------------------
   SIGNAL → OPPORTUNITY — the path is walked as the page is read.
   Desktop (scrubbed): base axis, then each step lands in turn; the signal
   line follows AERA from Mercado to Reunião, its bracket opening with it;
   the lead-gen handoff note appears as the line passes Contato; MITANG's
   bracket closes the path and the opportunity lights last.
   Phones: rows are reached one by one; the side labels arrive with them.
--------------------------------------------------------------------------- */

export function playPipeline(root: HTMLElement, active: Record<string, boolean>) {
  if (active.reduce) return;
  const q = gsap.utils.selector(root);
  revealOnEnter(q("[data-reveal]"));

  if (active.mobile) {
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q('[data-pl="row"]')[0], start: "top 85%", endTrigger: q('[data-pl="row"]').at(-1), end: "bottom 60%", scrub: 0.4 },
    }).fromTo(q('[data-pl="row"]'), { opacity: 0.15, x: -10 }, { opacity: 1, x: 0, stagger: 0.12, duration: 0.2 });
    return;
  }

  const nodes = q('[data-pl="node"]');
  const steps = q('[data-pl="step"]');
  const [aeraSpan, mitangSpan] = q('[data-pl="span"]');
  const last = nodes.length - 1;
  const at = (i: number) => 0.08 + (i / last) * 0.72; // step i lands here

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: q('[data-pl="flow"]')[0], start: "top 80%", end: "bottom 42%", scrub: 0.5 },
  });

  tl.fromTo(q('[data-pl="base"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.12, ease: "power2.out" }, 0)
    .fromTo(q('[data-pl="aera-line"]'), { scaleX: 0 }, { scaleX: 1, duration: at(6) - at(0) }, at(0))
    .fromTo(aeraSpan, { clipPath: "inset(-20% 100% -20% 0%)" }, { clipPath: "inset(-20% 0% -20% 0%)", duration: at(6) - at(0) }, at(0));

  nodes.forEach((node, i) => {
    tl.fromTo(node, { scale: 0 }, { scale: 1, duration: 0.04, ease: "back.out(3)" }, at(i))
      .fromTo(steps[i], { opacity: 0.12 }, { opacity: 1, duration: 0.06, ease: "power2.out" }, at(i));
  });

  tl.fromTo(q('[data-pl="handoff"]'), { opacity: 0 }, { opacity: 1, duration: 0.06 }, at(4) + 0.02)
    .fromTo(mitangSpan, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.08 }, at(6))
    .to(nodes[last], { scale: 1.5, duration: 0.05, ease: "power2.out", yoyo: true, repeat: 1 }, at(last) + 0.04)
    .to({}, { duration: 0.08 });
}
