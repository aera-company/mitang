// Usage: node scripts/qa/section.mjs <url> <width> <selector> <out.png> [mobile] [reduce] [nosticky]
// Walks the page down to the section (scenes settle), then captures the
// section's full height in viewport tiles and stitches them (PIL).
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { openPage } from "./cdp.mjs";

const [url, width, selector, out, ...flags] = process.argv.slice(2);
const W = +width;
const p = await openPage({ width: W, mobile: flags.includes("mobile"), reduce: flags.includes("reduce") });
await p.go(url); await p.wait(3500);
// "nosticky": sticky parts laid in flow, so the stitched image shows them once.
if (flags.includes("nosticky")) await p.ev(`document.head.insertAdjacentHTML("beforeend", "<style>.sticky{position:static!important}</style>")`);
const box = () => p.ev(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { top: Math.round(r.top + scrollY), h: Math.round(r.height) }; })()`);
let b = await box();
for (let y = 0; y < b.top + b.h; y += p.VH / 2) { await p.ev(`window.scrollTo(0, ${y})`); await p.wait(140); }
await p.wait(2500);
b = await box();
const tiles = [];
for (let y = b.top; y < b.top + b.h; y += p.VH) {
  await p.ev(`window.scrollTo(0, ${y})`); await p.wait(1000);
  const sy = await p.ev("window.scrollY");
  const file = `${out}.tile${tiles.length}.png`; await p.shot(file); tiles.push({ y: sy - b.top, file });
}
writeFileSync(`${out}.json`, JSON.stringify({ W, h: b.h, tiles }));
execFileSync("python3", ["-c", `
import json,os
from PIL import Image
m=json.load(open(${JSON.stringify(out + ".json")}))
img=Image.new('RGB',(m['W'],m['h']))
for t in m['tiles']:
    img.paste(Image.open(t['file']),(0,t['y'])); os.remove(t['file'])
img.save(${JSON.stringify(out)})`]);
unlinkSync(`${out}.json`);
const sw = await p.ev("document.documentElement.scrollWidth");
console.log(JSON.stringify({ out, height: b.h, overflowX: sw > W, consoleErrors: p.errors().length }));
p.close(); process.exit(0);
