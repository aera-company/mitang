// Usage: node scripts/qa/accept.mjs <url> <width> <outdir> [mobile]
// Drives the acceptance: fills name and role, draws a signature on the pad,
// ticks the consent, generates the image and saves it (plus section shots).
import { mkdirSync, writeFileSync } from "node:fs";
import { openPage } from "./cdp.mjs";
const [url, width, outdir, ...flags] = process.argv.slice(2);
mkdirSync(outdir, { recursive: true });
const p = await openPage({ width: +width, mobile: flags.includes("mobile"), height: flags.includes("mobile") ? 844 : 1000 });
await p.go(url); await p.wait(3000);
const h = await p.ev("document.documentElement.scrollHeight");
for (let y = 0; y < h; y += p.VH / 2) { await p.ev(`window.scrollTo(0, ${y})`); await p.wait(60); }
await p.ev(`document.getElementById("proposta").scrollIntoView()`); await p.wait(1500);
await p.shot(`${outdir}/1-secao.png`);
const pdf = await p.ev(`(async () => { const a = document.querySelector('#proposta a[download]'); const r = await fetch(a.href); return { href: a.getAttribute("href"), status: r.status, type: r.headers.get("content-type"), bytes: (await r.arrayBuffer()).byteLength }; })()`);
const setv = (sel, v) => p.ev(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); const s = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; s.call(el, ${JSON.stringify(v)}); el.dispatchEvent(new Event("input", { bubbles: true })); })()`);
await setv('#proposta input[autocomplete="name"]', "Maria Teste Silva");
await setv('#proposta input[autocomplete="organization-title"]', "Diretora Comercial");
await p.ev(`document.querySelector('#proposta canvas').scrollIntoView({block:"center"})`); await p.wait(400);
const b = await p.ev(`(() => { const r = document.querySelector('#proposta canvas').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; })()`);
const mouse = (type, x, y) => p.send("Input.dispatchMouseEvent", { type, x, y, button: "left", buttons: type === "mouseReleased" ? 0 : 1, clickCount: 1, pointerType: "mouse" });
let x0 = b.x + b.w * 0.15, y0 = b.y + b.h * 0.6;
await mouse("mousePressed", x0, y0);
for (let i = 1; i <= 40; i++) { const t = i / 40; await mouse("mouseMoved", x0 + t * b.w * 0.6, y0 - Math.sin(t * Math.PI * 3) * b.h * 0.25); }
await mouse("mouseReleased", x0 + b.w * 0.6, y0);
await p.ev(`document.querySelector('#proposta input[type=checkbox]').click()`); await p.wait(300);
const before = await p.ev(`document.querySelector('#proposta [aria-live]').textContent`);
await p.shot(`${outdir}/2-preenchido.png`);
await p.ev(`[...document.querySelectorAll('#proposta button')].find(x => x.textContent.includes("Gerar aceite")).click()`); await p.wait(2500);
const img = await p.ev(`(async () => { const im = document.querySelector('#proposta img'); if (!im) return null; await im.decode(); const c = document.createElement("canvas"); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext("2d").drawImage(im, 0, 0); return { w: c.width, h: c.height, data: c.toDataURL("image/png").split(",")[1] }; })()`);
if (img) writeFileSync(`${outdir}/3-aceite.png`, Buffer.from(img.data, "base64"));
await p.wait(800); await p.shot(`${outdir}/4-gerado.png`);
const sw = await p.ev("document.documentElement.scrollWidth");
console.log(JSON.stringify({ pdf, before, image: img ? `${img.w}x${img.h}` : null, overflowX: sw > +width, consoleErrors: p.errors().length }));
p.close(); process.exit(0);
