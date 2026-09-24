"use client";

import { useRef } from "react";
import { ACTS, PHASES } from "@/lib/constants";
import { playNinetyDays } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { Section, Tag } from "./ui/Section";

const TICKS = ["D0", "D30", "D60", "D90"];

export function NinetyDays() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playNinetyDays);

  return (
    <Section ref={scope} id="90-dias" index="10" label="Primeiros 90 dias" act={ACTS.operation} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="90-dias-title" className="type-h2 col-span-full lg:col-span-9">
          90 dias para tirar a operação do papel.
        </h2>

        <div data-nd="timeline" className="col-span-full">
          {/* Day axis — desktop only; the timeline turns vertical below 1024. */}
          <div aria-hidden className="relative hidden h-10 lg:block">
            <span data-nd="axis" className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--line-strong)]" />
            {/* Where the operation is in time — travels D0 → D90 with the scroll. */}
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
            {PHASES.map((p, i) => (
              <li
                key={p.verb}
                data-nd="phase"
                className="relative flex flex-col border-l border-[var(--line-strong)] pb-12 pl-6 lg:border-l-0 lg:pb-0 lg:pl-0 lg:pt-10"
              >
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-1 size-[9px] rounded-full bg-[var(--fg)] lg:hidden"
                />
                <p className="type-index text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")} · {p.range}
                </p>
                <h3 className="mt-3 text-[clamp(34px,3.4vw,52px)] font-semibold leading-none tracking-[-0.03em]">
                  {p.verb}
                </h3>
                <ul className="type-body mt-6 text-[15px] leading-[1.7] text-[var(--muted)]">
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <div className="mt-8 lg:mt-auto lg:pt-10">
                  <p className="type-index mb-3 text-[var(--muted)]">Entregas</p>
                  <div className="flex flex-wrap gap-2">
                    {p.deliverables.map((d) => (
                      <Tag key={d} signal>{d}</Tag>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
