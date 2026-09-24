// Usage: node scripts/qa/hover.mjs <url> <width> <selector> <out.png> [scrollAnchor]
// Scrolls the target into view, waits for its scene, moves the mouse onto it.
import { openPage } from "./cdp.mjs";
const [url, width, selector, out, anchor = "0.5"] = process.argv.slice(2);
const p = await openPage({ width: +width });
await p.go(url); await p.wait(3500);
const box = async () => p.ev(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, top: r.top + scrollY }; })()`);
const b0 = await box();
await p.ev(`window.scrollTo(0, ${Math.round(b0.top - p.VH * +anchor)})`); await p.wait(3500);
const b = await box();
await p.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: b.x, y: b.y });
await p.wait(600); await p.shot(out);
console.log(JSON.stringify({ out, errors: p.errors().length }));
p.close(); process.exit(0);
