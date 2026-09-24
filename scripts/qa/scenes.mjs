// Usage: node scripts/qa/scenes.mjs <url> <width> <outdir> <plan.json> [mobile] [reduce] [h=<viewport height>]
// plan: [{ name, selector, kind: "scrub", offsets: [section top at fraction of vh] }
//        | { name, selector, kind: "timed", anchor: fraction, times: [ms] }]
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { openPage } from "./cdp.mjs";

const [url, width, outdir, planPath, ...flags] = process.argv.slice(2);
const plan = JSON.parse(readFileSync(planPath, "utf8"));
mkdirSync(outdir, { recursive: true });
const p = await openPage({ width: +width, mobile: flags.includes("mobile"), reduce: flags.includes("reduce"), height: Number(flags.find((f) => f.startsWith("h="))?.slice(2)) || undefined });
await p.go(url); await p.wait(3500);
const topOf = (sel) => p.ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); return el ? el.getBoundingClientRect().top + scrollY : -1; })()`);
for (const step of plan) {
  const top = await topOf(step.selector);
  if (top < 0) { console.log("missing", step.selector); continue; }
  const name = (i) => join(outdir, `${step.name}-${String(i).padStart(2, "0")}.png`);
  if (step.kind === "scrub") {
    for (const [i, f] of step.offsets.entries()) { await p.ev(`window.scrollTo(0, ${Math.round(top - p.VH * f)})`); await p.wait(1000); await p.shot(name(i)); }
  } else {
    await p.ev(`window.scrollTo(0, ${Math.round(top - p.VH * step.anchor)})`);
    const t0 = Date.now();
    for (const [i, t] of step.times.entries()) { await p.wait(Math.max(0, t - (Date.now() - t0))); await p.shot(name(i)); }
  }
}
const errs = p.errors();
console.log(JSON.stringify({ consoleErrors: errs.length, sample: errs.slice(0, 3).map((e) => JSON.stringify(e.params).slice(0, 300)) }));
p.close(); process.exit(0);
