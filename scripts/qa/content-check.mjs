// Usage: node scripts/qa/content-check.mjs <url> <width> [mobile]
// Settles the page, then reports copy/price/structure facts + CLS.
import { openPage } from "./cdp.mjs";
const [url, width, ...flags] = process.argv.slice(2);
const p = await openPage({ width: +width, mobile: flags.includes("mobile") });
await p.ev(`new PerformanceObserver(()=>{}).observe({type:"layout-shift",buffered:true})`);
await p.go(url); await p.wait(3500);
let h = await p.ev("document.documentElement.scrollHeight");
for (let y = 0; y < h; y += p.VH / 2) { await p.ev(`window.scrollTo(0, ${y})`); await p.wait(90); }
await p.wait(1500);
const r = await p.ev(`(async () => {
  const t = document.body.innerText;
  const cls = await new Promise((res) => { let v = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) v += e.value; }).observe({ type: "layout-shift", buffered: true }); setTimeout(() => res(v), 400); });
  const ids = [...document.querySelectorAll("section[id]")].map((s) => s.id);
  const img = document.querySelector('[data-rp="photo"] img');
  return {
    title: document.title,
    sections: ids.join(","),
    dupSections: ids.length !== new Set(ids).size,
    prices: (t.match(/R\\$\\s?[0-9.]+/g) || []).join(" "),
    banned: (t.match(/investimento total|implantação incluída|piloto \\/|\\/ mês|orçad|contrat[ae] agora|solicite orçamento|compre|condição especial|desconto/gi) || []).join(" | "),
    ctas: [...document.querySelectorAll('#proximo-passo a')].map((a) => a.textContent.trim().replace(/\\s+/g, " ")).join(" | "),
    emDash: (t.match(/—/g) || []).length,
    oldCopy: /Vocês procuravam uma pessoa|Nós enxergamos uma operação|lead certo vale mais|Offshore não é um jogo/.test(t),
    problemCopy: /Quando a precisão importa mais que o volume\\./.test(t) && /Em vendas B2B técnicas, volume sozinho não resolve\\. Contexto, timing, relacionamento e precisão fazem a diferença\\./.test(t),
    photos: document.querySelectorAll('main img').length,
    photoSrc: img ? img.currentSrc.replace(location.origin, "") : null,
    photoPx: img ? img.naturalWidth + "x" + img.naturalHeight : null,
    cls: +cls.toFixed(4),
    overflowX: document.documentElement.scrollWidth > innerWidth,
  };
})()`);
console.log(JSON.stringify({ url, width, ...r, consoleErrors: p.errors().length }));
p.close(); process.exit(0);
