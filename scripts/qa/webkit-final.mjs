// Needs Playwright outside the project (see webkit.mjs). Run from the scratch
// folder: `node webkit-final.mjs <outdir> [url]` against the prod server.
// WebKit pass for /mitang (final, 01/10): Safari 1440 + iPhone 15, one stop
// per section; reports errors, overflow and any price on the page.
import { webkit, devices } from "playwright";
import { mkdirSync } from "node:fs";
const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });
const URL = process.argv[3] || "http://localhost:3041/mitang";
const STOPS = ["ponto-de-partida", "assume", "operacao", "adiciona", "radar", "90-dias", "proximo-passo"];

for (const [name, opts] of [["safari-1440", { viewport: { width: 1440, height: 900 } }], ["iphone-15", devices["iPhone 15"]]]) {
  const browser = await webkit.launch();
  const page = await (await browser.newContext(opts)).newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3800);
  await page.screenshot({ path: `${OUT}/${name}-hero.png` });
  for (const id of STOPS) {
    await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), id);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${OUT}/${name}-${id}.png` });
  }
  const m = await page.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth > innerWidth,
    motion: document.documentElement.classList.contains("motion"),
    sections: document.querySelectorAll("main > section").length,
    prices: (document.body.innerText.match(/R\$\s?[0-9.]+/g) || []).length,
  }));
  console.log(name, JSON.stringify({ ...m, errors }));
  await browser.close();
}
