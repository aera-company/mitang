"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACCEPT_TERMS, ACCEPT_WHATSAPP, PROPOSAL_PDF } from "@/lib/v2";

/* Acceptance with a drawn signature (same flow as the GAVEA Trade proposal,
   09/10): name, role, signature, consent → a PNG with the accepted terms,
   date, time and a verification code, sent by WhatsApp or downloaded.
   Nothing is stored: the image only leaves the device when it is sent. */

type Pt = { x: number; y: number };
type Stroke = Pt[];

const INK = "#0E1113";

function path(c: CanvasRenderingContext2D, s: Stroke, w: number, h: number) {
  if (!s.length) return;
  if (s.length < 3) {
    c.beginPath();
    c.arc(s[0].x * w, s[0].y * h, c.lineWidth * 0.6, 0, Math.PI * 2);
    c.fill();
    if (s.length === 1) return;
  }
  c.beginPath();
  c.moveTo(s[0].x * w, s[0].y * h);
  for (let i = 1; i < s.length - 1; i++) {
    c.quadraticCurveTo(s[i].x * w, s[i].y * h, ((s[i].x + s[i + 1].x) / 2) * w, ((s[i].y + s[i + 1].y) / 2) * h);
  }
  const l = s[s.length - 1];
  c.lineTo(l.x * w, l.y * h);
  c.stroke();
}

function ink(c: CanvasRenderingContext2D) {
  c.lineCap = "round";
  c.lineJoin = "round";
  c.strokeStyle = INK;
  c.fillStyle = INK;
}

function when(d: Date) {
  try {
    const p = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(d);
    const g = (t: string) => p.find((o) => o.type === t)?.value ?? "";
    return `${g("day")}/${g("month")}/${g("year")} às ${g("hour")}:${g("minute")} (horário de Brasília)`;
  } catch {
    return d.toLocaleString("pt-BR");
  }
}

async function digest(str: string) {
  if (window.crypto?.subtle && window.TextEncoder) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
  }
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0).toString(16).padStart(8, "0")).repeat(3);
}

function wrapText(c: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number) {
  const lines: string[] = [];
  let line = "";
  for (const w of text.split(" ")) {
    const t = line ? `${line} ${w}` : w;
    if (c.measureText(t).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = t;
  }
  if (line) lines.push(line);
  lines.forEach((l, i) => c.fillText(l, x, y + i * lh));
  return y + (lines.length - 1) * lh;
}

function spaced(c: CanvasRenderingContext2D, v: string) {
  if ("letterSpacing" in c) (c as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = v;
}

const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "mitang";

/** Load a mask PNG and return it tinted (for the marks on the image). */
function tinted(src: string, color: string, h: number): Promise<HTMLCanvasElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const w = Math.round((img.naturalWidth * h) / img.naturalHeight);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const g = c.getContext("2d")!;
      g.drawImage(img, 0, 0, w, h);
      g.globalCompositeOperation = "source-in";
      g.fillStyle = color;
      g.fillRect(0, 0, w, h);
      resolve(c);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

type Result = { url: string; file: File; name: string; role: string; code: string };

export function Acceptance() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [agree, setAgree] = useState(false);
  const [inkLen, setInkLen] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const pad = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const cur = useRef<Stroke | null>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const box = () => pad.current!.getBoundingClientRect();

  const redraw = useCallback(() => {
    const c = pad.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    if (!r.width) return;
    const g = c.getContext("2d")!;
    g.clearRect(0, 0, r.width, r.height);
    ink(g);
    g.lineWidth = 2.4;
    strokes.current.forEach((s) => path(g, s, r.width, r.height));
  }, []);

  const size = useCallback(() => {
    const c = pad.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    if (!r.width) return;
    const d = Math.max(1, window.devicePixelRatio || 1);
    c.width = Math.round(r.width * d);
    c.height = Math.round(r.height * d);
    c.getContext("2d")!.setTransform(d, 0, 0, d, 0, 0);
    redraw();
  }, [redraw]);

  useEffect(() => {
    const c = pad.current;
    if (!c) return;
    const ro = new ResizeObserver(size);
    ro.observe(c);
    return () => ro.disconnect();
  }, [size, result]);

  const measure = () => {
    const r = box();
    let L = 0;
    strokes.current.forEach((s) => {
      for (let i = 1; i < s.length; i++) L += Math.hypot((s[i].x - s[i - 1].x) * r.width, (s[i].y - s[i - 1].y) * r.height);
    });
    setInkLen(L);
  };

  const pt = (e: React.PointerEvent | PointerEvent): Pt => {
    const r = box();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    cur.current = [pt(e)];
    strokes.current.push(cur.current);
    redraw();
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!cur.current) return;
    e.preventDefault();
    const native = e.nativeEvent;
    const evs = native.getCoalescedEvents ? native.getCoalescedEvents() : [];
    (evs.length ? evs : [native]).forEach((ev) => cur.current!.push(pt(ev)));
    redraw();
  };
  const onEnd = () => {
    if (!cur.current) return;
    cur.current = null;
    measure();
  };
  const clear = () => {
    strokes.current = [];
    redraw();
    setInkLen(0);
  };

  const missing = [
    name.trim().length < 3 && "nome",
    role.trim().length < 2 && "cargo",
    inkLen < 40 && "assinatura",
    !agree && "aceite",
  ].filter(Boolean) as string[];
  const help = error
    ? "Não foi possível gerar a imagem. Tente de novo."
    : missing.length
      ? `Falta: ${missing.length > 1 ? `${missing.slice(0, -1).join(", ")} e ${missing[missing.length - 1]}` : missing[0]}.`
      : "Tudo certo. Gere o aceite para conferir antes de enviar.";

  const drawSignature = (g: CanvasRenderingContext2D, bx: number, by: number, bw: number, bh: number) => {
    const r = box();
    let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    strokes.current.forEach((s) =>
      s.forEach((p) => {
        const x = p.x * r.width, y = p.y * r.height;
        minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
      }),
    );
    const sw = Math.max(maxX - minX, 1), sh = Math.max(maxY - minY, 1);
    const sc = Math.min((bw - 20) / sw, (bh - 20) / sh, 3);
    g.save();
    ink(g);
    g.translate(bx + 10 - minX * sc, by + (bh - sh * sc) / 2 - minY * sc);
    g.scale(sc, sc);
    g.lineWidth = 4.2 / sc;
    strokes.current.forEach((s) => path(g, s, r.width, r.height));
    g.restore();
  };

  const build = async (): Promise<Result> => {
    const now = new Date();
    const n = name.trim(), ro = role.trim(), stamp = when(now);
    const canon = JSON.stringify({ doc: PROPOSAL_PDF.sha256, terms: ACCEPT_TERMS, name: n, role: ro, at: now.toISOString(), sig: strokes.current });
    const hash = await digest(canon);
    const code = hash.slice(0, 12).toUpperCase().match(/.{4}/g)!.join("-");
    const [aera, mitang] = await Promise.all([tinted("/brand/aera-mark.png", INK, 34), tinted("/brand/mitang-mark.png", INK, 40)]);

    const W = 1080, c = document.createElement("canvas");
    c.width = W;
    c.height = 2400;
    const g = c.getContext("2d")!;
    const F = getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
    const X = 80, MW = W - 160;
    const rule = (y: number) => { g.fillStyle = "#DEDBD2"; g.fillRect(X, y, MW, 2); };
    const label = (t: string, y: number) => { g.fillStyle = "#016874"; g.font = `600 20px ${F}`; spaced(g, "4px"); g.fillText(t, X, y); spaced(g, "0px"); };

    g.fillStyle = "#FFFFFF"; g.fillRect(0, 0, W, c.height);
    g.fillStyle = "#011C25"; g.fillRect(0, 0, W, 16);
    let y = 96;
    let lx = X;
    if (aera) { g.drawImage(aera, lx, y + 3); lx += aera.width + 22; }
    g.fillStyle = "#8E9498"; g.font = `400 30px ${F}`; g.fillText("×", lx, y + 31); lx += 44;
    if (mitang) g.drawImage(mitang, lx, y);
    y += 40 + 96; label("ACEITE DA PROPOSTA COMERCIAL", y);
    y += 60; g.fillStyle = INK; g.font = `600 50px ${F}`; g.fillText("AERA × MITANG", X, y);
    y += 44; g.fillStyle = "#5E6367"; g.font = `400 26px ${F}`; g.fillText(`Operação de Marketing & Lead Generation · ${PROPOSAL_PDF.version}`, X, y);
    y += 50; rule(y);
    y += 64; label("CONDIÇÕES ACEITAS", y);
    ACCEPT_TERMS.forEach(([k, v]) => {
      y += 58; g.fillStyle = INK; g.font = `600 28px ${F}`; g.fillText(k, X, y);
      g.fillStyle = "#43484C"; g.font = `400 28px ${F}`; y = wrapText(g, v, X, y + 40, MW, 38);
    });
    y += 50; g.fillStyle = "#7A7F83"; g.font = `400 20px ${F}`;
    y = wrapText(g, `Arquivo ${PROPOSAL_PDF.file} · SHA-256 ${PROPOSAL_PDF.sha256}`, X, y, MW, 28);
    y += 50; rule(y);
    y += 64; label("ACEITO POR", y);
    y += 62; g.fillStyle = INK; g.font = `600 42px ${F}`; y = wrapText(g, n, X, y, MW, 50);
    y += 44; g.fillStyle = "#5E6367"; g.font = `400 28px ${F}`; y = wrapText(g, `${ro} · MITANG`, X, y, MW, 38);
    const bY = y + 34, bH = 240;
    drawSignature(g, X, bY, MW, bH);
    y = bY + bH + 8; g.fillStyle = "#C9C6BD"; g.fillRect(X, y, MW, 2);
    y += 40; g.fillStyle = "#8E9498"; g.font = `600 18px ${F}`; spaced(g, "3px"); g.fillText("ASSINATURA", X, y); spaced(g, "0px");
    y += 70; rule(y);
    y += 62; g.fillStyle = INK; g.font = `500 26px ${F}`; y = wrapText(g, `Assinado em ${stamp}`, X, y, MW, 36);
    y += 42; g.fillStyle = "#5E6367"; g.font = `400 23px ${F}`; g.fillText(`Código de verificação: ${code}`, X, y);
    y += 42; g.fillStyle = "#8E9498"; g.font = `400 20px ${F}`;
    y = wrapText(g, "Assinatura eletrônica simples (Lei 14.063/2020) · AERA · sales@aera.company", X, y, MW, 30);

    const H = Math.ceil(y + 80), out = document.createElement("canvas");
    out.width = W;
    out.height = H;
    out.getContext("2d")!.drawImage(c, 0, 0);
    const blob: Blob = await new Promise((res, rej) => out.toBlob((b) => (b ? res(b) : rej(new Error("blob"))), "image/png"));
    const fileName = `aceite-aera-mitang-${slug(n)}.png`;
    return { url: URL.createObjectURL(blob), file: new File([blob], fileName, { type: "image/png" }), name: n, role: ro, code };
  };

  const generate = async () => {
    if (missing.length || busy) return;
    setBusy(true);
    setError(false);
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      const r = await build();
      if (result) URL.revokeObjectURL(result.url);
      setResult(r);
      requestAnimationFrame(() => {
        doneRef.current?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        doneRef.current?.focus({ preventScroll: true });
      });
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const send = () => {
    if (!result) return;
    const msg = `Aceite da proposta comercial AERA × MITANG assinado por ${result.name} (${result.role}). Código de verificação ${result.code}.`;
    if (navigator.canShare?.({ files: [result.file] })) {
      navigator.share({ files: [result.file], title: "Aceite da proposta AERA × MITANG", text: msg }).catch(() => {});
    } else {
      download();
      window.open(`https://wa.me/${ACCEPT_WHATSAPP}?text=${encodeURIComponent(`${msg} A imagem do aceite foi baixada, é só anexar nesta conversa.`)}`, "_blank", "noopener");
    }
  };

  const redo = () => {
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    strokes.current = [];
    setInkLen(0);
    requestAnimationFrame(() => formRef.current?.scrollIntoView({ block: "start" }));
  };

  const field = "mt-2 w-full border-b border-[var(--line-strong)] bg-transparent py-2.5 text-[18px] outline-none transition-colors focus:border-[var(--fg)]";

  if (result) {
    return (
      <div ref={doneRef} tabIndex={-1} className="outline-none">
        <p className="type-micro text-[var(--signal)]">Aceite gerado</p>
        <p className="mt-3 text-[clamp(22px,2vw,30px)] font-medium leading-[1.2] tracking-[-0.015em]">
          Confira a imagem e envie para a AERA.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result.url}
          alt="Imagem do aceite gerado, com as condições, o nome, a data e a assinatura."
          className="mt-6 w-full max-w-[460px] border border-[var(--line-strong)]"
        />
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={send}
            className="type-micro inline-flex items-center gap-2 bg-[var(--fg)] px-4 py-3 text-[var(--bg)] transition-opacity hover:opacity-85"
          >
            Enviar pelo WhatsApp <span aria-hidden>→</span>
          </button>
          <button type="button" onClick={download} className="type-micro underline-offset-4 hover:underline">
            Baixar imagem
          </button>
          <button type="button" onClick={redo} className="type-micro text-[var(--muted)] underline-offset-4 hover:underline">
            Refazer assinatura
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={formRef}>
      <label className="block">
        <span className="type-micro text-[var(--muted)]">Nome completo</span>
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
      </label>
      <label className="mt-6 block">
        <span className="type-micro text-[var(--muted)]">Cargo</span>
        <input value={role} onChange={(e) => setRole(e.target.value)} autoComplete="organization-title" className={field} />
      </label>

      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <span id="assinatura-label" className="type-micro text-[var(--muted)]">Assinatura</span>
          <button type="button" onClick={clear} className="type-index text-[var(--muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline">
            Limpar
          </button>
        </div>
        <div className="relative mt-2 border border-[var(--line-strong)] bg-white">
          <canvas
            ref={pad}
            aria-labelledby="assinatura-label"
            role="img"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onEnd}
            onPointerCancel={onEnd}
            onLostPointerCapture={onEnd}
            className="block h-[180px] w-full cursor-crosshair touch-none md:h-[200px]"
          />
          {inkLen === 0 && (
            <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center type-index text-[#8E9498]">
              Assine aqui com o dedo ou o mouse
            </span>
          )}
          <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-8 h-px bg-[#DEDBD2]" />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 size-4 shrink-0 accent-[var(--signal)]" />
        <span className="text-[15px] leading-snug">
          Li e aceito a proposta comercial AERA × MITANG nas condições do documento em PDF.
        </span>
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={generate}
          disabled={missing.length > 0 || busy}
          className="type-micro inline-flex items-center gap-2 bg-[var(--fg)] px-4 py-3 text-[var(--bg)] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {busy ? "Gerando..." : "Gerar aceite"}
        </button>
        <p aria-live="polite" className="type-index text-[var(--muted)]">{help}</p>
      </div>
    </div>
  );
}
