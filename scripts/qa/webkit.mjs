// Needs Playwright outside the project (not a dependency): run from a scratch
// folder with `npm i playwright && npx playwright install webkit`, then
// `node webkit.mjs <outdir> [url]` against the prod server on :3041.
// WebKit (Safari engine) pass: desktop Safari 1440 + iPhone 15 emulation.
import { webkit, devices } from "playwright";
import { mkdirSync } from "node:fs";
const OUT = process.argv[2]; mkdirSync(OUT, { recursive: true });
const URL = process.argv[3] || "http://localhost:3041/";

async function run(name, ctxOpts, stops) {
  const browser = await webkit.launch();
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3800);
  await page.screenshot({ path: `${OUT}/${name}-hero.png` });
  for (const [label, js] of stops) {
    await page.evaluate(js);
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${OUT}/${name}-${label}.png` });
  }
  const m = await page.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth > innerWidth,
    motion: document.documentElement.classList.contains("motion"),
    sticky: getComputedStyle(document.querySelector(".rf-stage")).position,
  }));
  console.log(name, JSON.stringify({ ...m, errors }));
  await browser.close();
}

const top = (sel, f = 0) => `(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return; window.scrollTo(0, el.getBoundingClientRect().top + scrollY - innerHeight * ${f}); })()`;
const track = (p) => `(() => { const t = document.querySelector('#vaga .rf-track'); const y = t.getBoundingClientRect().top + scrollY; window.scrollTo(0, y + (t.offsetHeight - innerHeight) * ${p}); })()`;

await run("safari-1440", { viewport: { width: 1440, height: 900 } }, [
  ["reframe-25", track(0.25)], ["reframe-55", track(0.55)], ["reframe-90", track(0.9)],
  ["problem", top("#problema", 0.1)], ["system", top("#sistema [data-gs=system]", 0.3)],
  ["pipeline", top("#fluxo [data-pl=flow]", 0.35)], ["intel", top("#inteligencia [data-mi=radar]", 0.4)],
  ["abm", top("#abm", 0)], ["days", top("[id=\"90-dias\"] [data-nd=timeline]", 0.2)],
  ["invest", top("#investimento", 0)], ["closing", top("#proximo-passo", 0)],
]);
await run("iphone-15", { ...devices["iPhone 15"] }, [
  ["reframe", top("#vaga", 0)], ["problem", top("#problema", 0)], ["pipeline", top("#fluxo [data-pl=row]", 0.3)],
  ["intel", top("#inteligencia [data-mi=radar]", 0.3)], ["days", top("[id=\"90-dias\"]", 0)],
  ["invest", top("#investimento", 0)], ["closing", top("#proximo-passo [data-cl=rule]", 0.5)],
]);
