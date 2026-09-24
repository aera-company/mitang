import { gsap } from "@/components/motion/gsap";
import { revealOnEnter } from "./reveal";

/* ---------------------------------------------------------------------------
   REFRAME — vaga → operação (desktop: scrubbed over a sticky 320vh track).
   on enter   the first sentence settles in, contained (fade + short rise)
   0.08–0.30  the post's words appear on the stage
   0.28–0.42  the first sentence, the post and the quote recede
   0.42–0.62  the words converge on one point (the signal)
   0.60–0.70  the intro leaves
   0.64–0.90  "operação." takes the screen
--------------------------------------------------------------------------- */

export function playReframe(root: HTMLElement, active: Record<string, boolean>) {
  const q = gsap.utils.selector(root);
  const flowReveals = q(".rf-flow [data-reveal]");
  const after = q(":scope > .aera-grid:last-child [data-reveal]");

  if (active.reduce) return;
  if (active.mobile) {
    revealOnEnter([...flowReveals, ...after]);
    return;
  }

  revealOnEnter(after);

  const track = root.querySelector<HTMLElement>(".rf-track");
  const stage = root.querySelector<HTMLElement>(".rf-stage");
  if (!track || !stage) return;

  const words = q('.rf-stage [data-rf="word"]');
  const core = q('[data-rf="core"]');
  const coreEl = core[0] as HTMLElement;

  /* Distance from each word's centre to the core, in stage coordinates. */
  const toCore = (axis: "x" | "y") => (_: number, el: HTMLElement) => {
    const c = axis === "x"
      ? coreEl.offsetLeft - (el.offsetLeft + el.offsetWidth / 2)
      : coreEl.offsetTop - (el.offsetTop + el.offsetHeight / 2);
    return c;
  };

  /* Untransformed position of the period inside the stage (offsets ignore
     the scale tween on the word), relative to the core's own position. */
  const periodEl = root.querySelector<HTMLElement>('[data-rf="period"]')!;
  const inStage = (el: HTMLElement) => {
    let x = 0;
    let y = 0;
    let n: HTMLElement | null = el;
    while (n && n !== stage) {
      x += n.offsetLeft;
      y += n.offsetTop;
      n = n.offsetParent as HTMLElement | null;
    }
    return { x, y };
  };
  const toPeriod = (axis: "x" | "y") => () => {
    const p = inStage(periodEl);
    const c = inStage(coreEl);
    return axis === "x"
      ? p.x + periodEl.offsetWidth * 0.42 - c.x
      : p.y + periodEl.offsetHeight * 0.74 - c.y;
  };

  // Contained entrance for the first sentence: it states, it doesn't land.
  gsap.fromTo(
    q('[data-rf="title"], [data-rf="post"], [data-rf="quote"]'),
    { opacity: 0, y: 14 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: track, start: "top 75%", once: true },
    },
  );

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
  });

  // Words arrive.
  tl.fromTo(
    words,
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.14, stagger: 0.016, ease: "power2.out" },
    0.08,
  );

  // The first sentence, the post and the quote recede — the stage is
  // cleared for the words, then for "operação.".
  tl.to(q('[data-rf="title"]'), { opacity: 0.4, duration: 0.12 }, 0.3)
    .to(q('[data-rf="post"], [data-rf="quote"]'), { opacity: 0.22, duration: 0.12 }, 0.3);

  // Converge on one point.
  tl.fromTo(core, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.06, ease: "power2.out" }, 0.42)
    .to(
      words,
      {
        x: toCore("x"),
        y: toCore("y"),
        scale: 0.2,
        opacity: 0,
        duration: 0.18,
        stagger: 0.008,
        ease: "power3.in",
      },
      0.44,
    )
    .to(core, { scale: 2.4, duration: 0.06, ease: "power2.out" }, 0.6)
    // …then travels to where the full stop of "operação." will stand.
    .to(
      core,
      { x: toPeriod("x"), y: toPeriod("y"), scale: 1.6, duration: 0.14, ease: "power3.inOut" },
      0.66,
    )
    .to(core, { opacity: 0, duration: 0.04 }, 0.8)
    .fromTo(q('[data-rf="period"]'), { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.79);

  // The intro leaves; the operation takes the screen.
  tl.to(q('[data-rf="intro"]'), { opacity: 0, y: -40, duration: 0.1, ease: "power2.in" }, 0.6)
    .fromTo(q('[data-rf="op"]'), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.66)
    .fromTo(
      q('[data-rf="op-word"]'),
      { scale: 0.42, yPercent: 8 },
      { scale: 1, yPercent: 0, duration: 0.24, ease: "power3.out" },
      0.66,
    )
    .to({}, { duration: 0.1 }, 0.9);
}
