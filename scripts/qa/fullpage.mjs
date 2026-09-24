// Usage: node scripts/qa/fullpage.mjs <url> <width> <out.png> [mobile] [reduce]
// Scrolls viewport by viewport (every scene settled), stitches with Python/PIL.
import { execFileSync } from "node:child_process";
import { writeFileSync, unlinkSync } from "node:fs";
import { openPage } from "./cdp.mjs";

const [url, width, out, ...flags] = process.argv.slice(2);
const W = +width;
const p = await openPage({ width: W, mobile: flags.includes("mobile"), reduce: flags.includes("reduce"), height: Number(flags.find((f) => f.startsWith("h="))?.slice(2)) || undefined });
await p.go(url); await p.wait(4500);
// Walk the page once so once-only scenes play, then capture settled tiles.
let h = await p.ev("document.documentElement.scrollHeight");
for (let y = 0; y < h; y += p.VH / 2) { await p.ev(`window.scrollTo(0, ${y})`); await p.wait(120); }
await p.wait(2500);
h = await p.ev("document.documentElement.scrollHeight");
const sw = await p.ev("document.documentElement.scrollWidth");
const tiles = [];
for (let y = 0; y < h; y += p.VH) {
  await p.ev(`window.scrollTo(0, ${y})`); await p.wait(900);
  const sy = await p.ev("window.scrollY");
  const file = `${out}.tile${tiles.length}.png`; await p.shot(file); tiles.push({ y: sy, file });
}
writeFileSync(`${out}.json`, JSON.stringify({ W, h, tiles }));
execFileSync("python3", ["-c", `
import json,os
from PIL import Image
m=json.load(open(${JSON.stringify(out + ".json")}))
img=Image.new('RGB',(m['W'],m['h']))
for t in m['tiles']:
    img.paste(Image.open(t['file']),(0,t['y'])); os.remove(t['file'])
img.save(${JSON.stringify(out)})`]);
unlinkSync(`${out}.json`);
const errs = p.errors();
console.log(JSON.stringify({ out, height: h, overflowX: sw > W, consoleErrors: errs.length }));
p.close(); process.exit(0);
