"use client";

import { useRef } from "react";
import { ACTS_V2, PHASES_V2, RHYTHM } from "@/lib/v2";
import { playNinetyDays } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

const TICKS = ["D0", "D30", "D60", "D90"];

/* V2 · 07 — the first 90 days with trimmed lists, then how we work
   (the working model, compact) and the joint intelligence line. */
export function NinetyDaysV2() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playNinetyDays);

  return (
    <Section ref={scope} id="90-dias" index="07" label="Primeiros 90 dias" act={ACTS_V2.operation} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="90-dias-title" className="type-h2 col-span-full lg:col-span-9">
          90 dias para tirar a operação do papel.
        </h2>

        <div data-nd="timeline" className="col-span-full">
          <div aria-hidden className="relative hidden h-10 lg:block">
            <span data-nd="axis" className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--line-strong)]" />
            <span data-nd="marker" className="signal-dot absolute -bottom-[3px] -left-[3.5px] opacity-0" />
            {TICKS.map((t, i) => (
              <span
                key={t}
                data-nd="tick"
                className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center gap-2 first:translate-x-0 first:items-start last:-translate-x-full last:items-end"
                style={{ left: `${(i / 3) * 100}%` }}
              >
                <span className="type-index text-[var(--muted)]">{t}</span>
                <span className="h-2 w-px bg-[var(--fg)]" />
              </span>
            ))}
          </div>

          <ol className="grid grid-cols-1 gap-x-[var(--gutter)] lg:grid-cols-3">
            {PHASES_V2.map((p, i) => (
              <li
                key={p.verb}
                data-nd="phase"
                className="relative border-l border-[var(--line-strong)] pb-12 pl-6 lg:border-l-0 lg:pb-0 lg:pl-0 lg:pt-10"
              >
                <span aria-hidden className="absolute -left-[5px] top-1 size-[9px] rounded-full bg-[var(--fg)] lg:hidden" />
                <p className="type-index text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")} · {p.range}
                </p>
                <h3 className="mt-3 text-[clamp(34px,3.4vw,52px)] font-semibold leading-none tracking-[-0.03em]">
                  {p.verb}
                </h3>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[17px] leading-[1.6]">
                  {p.items.map((it, k) => (
                    <span key={it} className="flex items-baseline gap-x-2 whitespace-nowrap">
                      {it.includes("Radar") ? (
                        <span className="flex items-center gap-2">
                          <span aria-hidden data-tag="dot" className="size-[5px] bg-[var(--signal)]" />
                          {it}
                        </span>
                      ) : (
                        <span className="text-[var(--muted)]">{it}</span>
                      )}
                      {k < p.items.length - 1 && <span aria-hidden className="text-[var(--line-strong)]">·</span>}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* How we work — the working model, compact. */}
        <div data-reveal className="col-span-full border-t border-[var(--fg)] pt-6">
          <p className="type-micro text-[var(--muted)]">Como trabalhamos</p>
          <dl className="mt-6 grid grid-cols-1 gap-x-[var(--gutter)] gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            {RHYTHM.map((r) => (
              <div key={r.when}>
                <dt className="type-index text-[var(--muted)]">{r.when}</dt>
                <dd className="mt-2 text-[17px] font-medium leading-snug">{r.what}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="col-span-full lg:col-start-6 lg:col-span-7">
          <h3 className="text-[clamp(26px,2.6vw,40px)] font-semibold leading-[1.05] tracking-[-0.02em]">
            A inteligência é construída em conjunto.
          </h3>
          <p className="type-body mt-5 text-[var(--muted)]">
            A AERA organiza mercado, processo, comunicação e tecnologia. A
            MITANG adiciona conhecimento técnico, histórico e contexto comercial.
          </p>
        </div>
      </div>
    </Section>
  );
}
