"use client";

import { useRef } from "react";
import { AeraField, gridX } from "@/components/aera-field";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { playHeroEntrance } from "./motion/heroMotion";
import { Pairing } from "./ui/Marks";
import { useVariant } from "./variant";
import { Radar, polar } from "./ui/Radar";

type Props = {
  /** Brief §10: test the English alternative visually, never publish by default. */
  variant?: "pt" | "en";
};

const TITLE = {
  pt: ["Marketing", "que encontra", "negócios."],
  en: ["From signal", "to opportunity."],
};

export const COORD = "22°54′S 43°10′W";

/* Hero geometry: the located point sits on column edge 8, on the horizon. */
const HORIZON = "40%";
const COLS = Array.from({ length: 13 }, (_, k) => k);

/* The four signals of §4 ("projeto certo, empresa certa…") converge on the
   located point — the opportunity. Bearings in degrees, range 0–1. */
export const SIGNALS = [
  { label: "Projeto", bearing: 38, range: 0.74 },
  { label: "Empresa", bearing: 128, range: 0.58 },
  { label: "Decisor", bearing: 214, range: 0.8 },
  { label: "Momento", bearing: 304, range: 0.64 },
];

/** Radar + dot field + signals, drawn around one centre. */
function HeroPlot({ size, labels, name }: { size: number; labels: boolean; name: string }) {
  const R = size / 2 - 1;
  const pid = `hero-dots-${name}`;

  return (
    <div data-plot={name} className="relative" style={{ width: size, height: size }}>
      {/* Market dot field — the sweep reveals it. */}
      <div className="hero-dots absolute inset-0">
        <svg
          width={size}
          height={size}
          viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
          aria-hidden
        >
          <defs>
            <pattern id={pid} width="12" height="12" patternUnits="userSpaceOnUse" x="-6" y="-6">
              <circle cx="6" cy="6" r="0.9" fill="var(--fg)" opacity="0.26" />
            </pattern>
          </defs>
          <circle r={R - 14} fill={`url(#${pid})`} />
        </svg>
      </div>

      <Radar size={size} centreSignal tickStep={labels ? 5 : 10} className="absolute inset-0" />

      <svg
        width={size}
        height={size}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
        className="absolute inset-0 overflow-visible"
        aria-hidden
      >
        {SIGNALS.map((s) => {
          const p = polar(s.bearing, R * s.range);
          return (
            <line
              key={`l-${s.label}`}
              className="hero-link"
              pathLength={1}
              x1={p.x}
              y1={p.y}
              x2="0"
              y2="0"
              stroke="var(--signal)"
              strokeOpacity="0.55"
            />
          );
        })}

        <g data-hero="arm-scroll">
          <g data-hero="arm">
            <line x1="0" y1="0" x2="0" y2={-R} stroke="var(--signal)" strokeOpacity="0.7" />
          </g>
        </g>

        {SIGNALS.map((s, i) => {
          const p = polar(s.bearing, R * s.range);
          const right = p.x >= 0;
          return (
            <g key={s.label} data-hero="signal" data-bearing={s.bearing}>
              <circle cx={p.x} cy={p.y} r="3" fill="var(--fg)" />
              {labels && (
                <text
                  x={p.x + (right ? 10 : -10)}
                  y={p.y - 8}
                  textAnchor={right ? "start" : "end"}
                  fontSize="10"
                  fill="var(--muted)"
                  fontFamily="var(--font-mono-src)"
                >
                  {`S${i + 1} · ${s.label}`}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Hero({ variant = "pt" }: Props) {
  const lines = TITLE[variant];
  const kind = useVariant();
  const scope = useRef<HTMLElement>(null);

  useGsapContext(
    scope,
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (active) => playHeroEntrance(scope.current!, active),
  );

  return (
    <header
      ref={scope}
      id="inicio"
      className="state-dark relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Desktop field: survey rules crossing on the located point. */}
      <AeraField className="hidden lg:block">
        <span
          data-hero="rule-v"
          className="absolute top-0 block h-full w-px bg-[var(--line)]"
          style={{ left: gridX(8) }}
        />
        <span
          data-hero="rule-v"
          className="absolute top-0 block w-px bg-[var(--line)]"
          style={{ left: gridX(4), height: HORIZON }}
        />
        <span
          data-hero="rule-h"
          className="absolute right-0 block h-px bg-[var(--line)]"
          style={{ top: HORIZON, left: gridX(4) }}
        />
        <div className="absolute" style={{ left: gridX(8), top: HORIZON }}>
          {/* Narrower desktops (1024–1279): the plot scales so it clears the title. */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 max-xl:scale-[0.8]">
            <HeroPlot size={440} labels name="desktop" />
          </div>
        </div>
        {/* Leader from the point to its readout. */}
        <span
          data-hero="rule-h"
          className="absolute h-px w-10 bg-[var(--signal)]"
          style={{ left: `calc(${gridX(8)} + 14px)`, top: HORIZON }}
        />

        {/* Column ruler along the foot of the hero. */}
        <div className="absolute inset-x-0 bottom-0 h-3">
          {COLS.map((k) => (
            <span
              key={k}
              data-hero="tick"
              className="absolute bottom-0 h-3 w-px bg-[var(--line-strong)]"
              style={{ left: gridX(k) }}
            />
          ))}
          <span
            data-hero="rule-h"
            className="absolute inset-x-0 bottom-0 h-px bg-[var(--line)]"
          />
        </div>
      </AeraField>

      {/* Mobile/tablet: the same plot, reduced, in the open top area. */}
      <div aria-hidden className="pointer-events-none absolute right-[-18%] top-[13%] origin-top-right md:right-[6%] md:top-[12%] md:scale-[1.4] lg:hidden">
        <HeroPlot size={300} labels={false} name="mobile" />
      </div>

      <div className="aera-grid relative pt-7">
        <div data-hero="fade" className="col-span-2 lg:col-span-6">
          <Pairing />
        </div>
        <p
          data-hero="fade"
          className="type-index col-span-2 text-right text-[var(--muted)] lg:col-span-6"
        >
          {kind === "commercial" ? "Proposta" : "Apresentação"} · 09.2026
        </p>
      </div>

      {/* Readout, pinned beside the located point on desktop. */}
      <p
        data-hero="readout"
        className="type-index absolute hidden bg-[var(--bg)] px-1.5 py-0.5 text-[var(--muted)] lg:block"
        style={{ left: `calc(${gridX(8)} + 64px)`, top: `calc(${HORIZON} - 9px)` }}
      >
        <span data-hero="coord" className="text-[var(--signal)]">
          {COORD}
        </span>
        <br />
        Sinal 01 · localizado
      </p>

      <div className="aera-grid relative mt-auto pb-12 lg:pb-16">
        <p data-hero="readout" className="type-index col-span-full mb-8 text-[var(--muted)] lg:hidden">
          <span data-hero="coord" className="text-[var(--signal)]">
            {COORD}
          </span>
          <br />
          Sinal 01 · localizado
        </p>

        <h1 id="inicio-title" className="type-display col-span-full lg:col-span-9">
          {lines.map((line) => (
            <span key={line} className="line-mask">
              <span data-hero="line">{line} </span>
            </span>
          ))}
        </h1>

        <p
          data-hero="fade"
          className="type-lead col-span-full mt-10 text-[var(--muted)] lg:col-span-5"
        >
          {kind === "v2"
            ? "Uma operação externa de marketing, growth e inteligência comercial conectada ao time da MITANG."
            : "Uma proposta para transformar inteligência de mercado, comunicação e tecnologia em novas oportunidades para o comercial da MITANG."}
        </p>

        <a
          data-hero="fade"
          href="#vaga"
          className="type-micro col-span-full mt-10 inline-flex items-center gap-3 self-end text-[var(--muted)] transition-colors hover:text-[var(--fg)] lg:col-start-9 lg:col-span-4"
        >
          <span aria-hidden className="h-px w-8 bg-current" />
          Explorar proposta ↓
        </a>
      </div>
    </header>
  );
}
