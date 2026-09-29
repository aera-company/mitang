// Usage: node scripts/qa/wordcount.mjs <url> [width]
// Visible words per section (desktop, reduced motion: every text visible).
// "app" = words inside the MITANG Radar mockup, reported apart.
import { openPage } from "./cdp.mjs";
const [url, width = "1440"] = process.argv.slice(2);
const p = await openPage({ width: +width, reduce: true });
await p.go(url); await p.wait(3000);
const r = await p.ev(`(() => {
  const words = (t) => (t.match(/[\\p{L}\\p{N}][\\p{L}\\p{N}'’.-]*/gu) || []).length;
  const out = {};
  for (const s of document.querySelectorAll("main > header, main > section")) {
    const app = s.querySelector('[data-rd="app"]');
    const all = words(s.innerText);
    const a = app ? words(app.innerText) : 0;
    out[s.id] = { words: all - a, app: a };
  }
  const total = Object.values(out).reduce((n, v) => n + v.words, 0);
  const app = Object.values(out).reduce((n, v) => n + v.app, 0);
  return { total, app, height: document.documentElement.scrollHeight, sections: Object.keys(out).length, bySection: out };
})()`);
console.log(JSON.stringify(r));
p.close(); process.exit(0);
