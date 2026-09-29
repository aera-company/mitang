// Needs Playwright outside the project (see webkit.mjs). Run from the scratch
// folder: `node webkit-radar.mjs <outdir> [url]` against the prod server.
// Safari 1440 + iPhone 15: drives the MITANG Radar (tab, account, stage)
// and reports errors and horizontal overflow.
import { webkit, devices } from "playwright";
const [out, url = "http://localhost:3041/mitang"] = process.argv.slice(2);
const b = await webkit.launch();
for (const [name, opts] of [["safari-1440", { viewport: { width: 1440, height: 900 } }], ["iphone15", devices["iPhone 15"]]]) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.goto(url);
  await p.waitForTimeout(3000);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 400) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60); }
  await p.locator('[data-rd="app"]').scrollIntoViewIfNeeded();
  await p.waitForTimeout(2500);
  await p.getByRole("tab", { name: "Pipeline" }).click();
  await p.locator("[role=tabpanel] button", { hasText: "EPC B" }).click();
  await p.getByRole("button", { name: /Avançar etapa/ }).click();
  await p.waitForTimeout(500);
  await p.locator('[data-rd="app"]').screenshot({ path: `${out}/wk-${name}-radar.png` });
  const status = await p.locator('[aria-label="Conta selecionada"]').innerText();
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  const prices = await p.evaluate(() => (document.body.innerText.match(/R\$\s?[0-9.]+/g) || []).length);
  console.log(name, JSON.stringify({ errors: errs, overflow, prices, stageOk: status.includes("Conta em desenvolvimento") }));
  await ctx.close();
}
await b.close();
