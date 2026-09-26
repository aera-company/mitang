// Usage: node scripts/qa/radar-states.mjs <url> <width> <outdir> [mobile]
// Drives the MITANG Radar mockup: tabs, account selection, stage change,
// keyboard tab navigation. Captures the app frame for each state.
import { mkdirSync } from "node:fs";
import { openPage } from "./cdp.mjs";

const [url, width, outdir, ...flags] = process.argv.slice(2);
mkdirSync(outdir, { recursive: true });
const p = await openPage({ width: +width, mobile: flags.includes("mobile"), height: flags.includes("mobile") ? 844 : 1000 });
await p.go(url); await p.wait(3500);
const top = await p.ev(`document.querySelector('[data-rd="app"]').getBoundingClientRect().top + scrollY`);
for (let y = 0; y < top; y += p.VH / 2) { await p.ev(`window.scrollTo(0, ${y})`); await p.wait(90); }
const at = (sel, off = 24) => p.ev(`window.scrollTo(0, document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect().top + scrollY - ${off})`);
const click = (js) => p.ev(`(${js}).click()`);
const tab = (name) => click(`[...document.querySelectorAll('[role=tab]')].find(t => t.textContent.trim() === ${JSON.stringify(name)})`);
const shot = async (name, sel = '[data-rd="app"]') => { await at(sel); await p.wait(700); await p.shot(`${outdir}/${name}.png`); };

await at('[data-rd="app"]'); await p.wait(3200);
await shot("1-radar-A");
const log = [];
// Select account D from the signals list.
await click(`[...document.querySelectorAll('[data-rd="app"] [aria-pressed]')].find(b => b.textContent.includes("Operadora D"))`);
await p.wait(500); await shot("2-radar-D");
log.push(await p.ev(`document.querySelector('[aria-label="Conta selecionada"]').innerText.slice(0,120)`));
await tab("Contas"); await p.wait(500); await shot("3-contas-D");
await tab("Pipeline"); await p.wait(500);
// Advance B's stage.
await click(`[...document.querySelectorAll('[role=tabpanel] [aria-pressed]')].find(b => b.textContent.includes("EPC B"))`);
await p.wait(300);
await click(`[...document.querySelectorAll('[aria-label="Conta selecionada"] button')].find(b => b.textContent.includes("Avançar"))`);
await p.wait(600); await shot("4-pipeline-B-avancada");
log.push(await p.ev(`document.querySelector('[aria-label="Conta selecionada"]').innerText.match(/Status\\n(.*)/)?.[1]`));
await tab("Decisores"); await p.wait(500); await shot("5-decisores");
// Keyboard: focus the selected tab and press ArrowRight.
await p.ev(`document.querySelector('[role=tab][aria-selected=true]').focus()`);
await p.send("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
await p.send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
await p.wait(500);
log.push("after ArrowRight: " + await p.ev(`document.activeElement.textContent.trim() + " selected=" + document.activeElement.getAttribute("aria-selected")`));
await shot("6-insights-teclado");
await click(`[...document.querySelectorAll('[role=tab]')].find(t => t.textContent.trim() === "Radar")`);
await click(`[...document.querySelectorAll('[data-rd="app"] [aria-pressed]')].find(b => b.textContent.includes("Operadora A"))`);
await p.wait(500);
await shot("7-ai-brief-A", '[aria-label="AERA AI Brief"]');
const sw = await p.ev("document.documentElement.scrollWidth");
console.log(JSON.stringify({ log, overflowX: sw > +width, consoleErrors: p.errors().length }));
p.close(); process.exit(0);
