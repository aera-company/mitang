"use client";

import { useRef } from "react";
import { ACTS_V2, FLOW_V2 } from "@/lib/v2";
import { playHowItWorks } from "./motion/v2Motion";
import { useScene } from "./motion/useScene";
import { Handoff } from "./Handoff";
import { Section } from "./ui/Section";

/* 04 — one flow from market to opportunity. Each step says what happens
   and who carries it; AERA's stretch carries the signal line up to the
   meeting, where MITANG's sales team takes over. */
export function HowItWorks() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playHowItWorks);
  const n = FLOW_V2.length;
  const aeraEnd = FLOW_V2.findIndex((f) => f.owner !== "AERA"); // the meeting

  return (
    <Section ref={scope} id="operacao" index="04" label="Como transformamos mercado em oportunidade" act={ACTS_V2.operation} state="petrol">
      <div className="aera-grid section-pad gap-y-16">
        <h2 data-reveal id="operacao-title" className="type-h2 col-span-full lg:col-span-9">
          Do sinal à oportunidade.
        </h2>

        <ol data-hw="flow" aria-label="Do sinal à oportunidade" className="relative col-span-full grid grid-cols-1 lg:grid-cols-8 lg:gap-x-6">
          {/* Desktop axis: AERA's stretch in signal, MITANG's in paper. */}
          <span
            aria-hidden
            data-hw="axis"
            className="absolute left-0 top-[5px] hidden h-px origin-left bg-[var(--signal)] lg:block"
            style={{ width: `${(aeraEnd / n) * 100}%` }}
          />
          <span
            aria-hidden
            data-hw="axis-m"
            className="absolute top-[5px] hidden h-px origin-left bg-[var(--fg)] lg:block"
            style={{ left: `${(aeraEnd / n) * 100}%`, right: `${(0.5 / n) * 100}%` }}
          />
          {/* Phones: rail */}
          <span aria-hidden data-hw="rail" className="absolute bottom-6 left-[5px] top-3 w-px origin-top bg-[var(--line-strong)] lg:hidden" />
          {FLOW_V2.map((f, i) => {
            const last = i === n - 1;
            const aera = f.owner === "AERA";
            return (
              <li key={f.step} data-hw="step" className="relative pb-7 pl-8 lg:pb-0 lg:pl-0 lg:pt-8">
                <span
                  aria-hidden
                  className={`absolute left-0 top-[12px] -mt-[5px] size-[11px] rounded-full border lg:top-[5px] ${
                    last
                      ? "border-[var(--signal)] bg-[var(--signal)] shadow-[0_0_0_4px_var(--signal-soft)]"
                      : aera
                        ? "border-[var(--signal)] bg-[var(--bg)]"
                        : "border-[var(--fg)] bg-[var(--bg)]"
                  }`}
                />
                <p className="flex items-baseline gap-2.5">
                  <span className="type-index text-[var(--muted)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`text-[19px] font-medium tracking-tight ${last ? "text-[var(--signal)]" : ""}`}>{f.step}</span>
                </p>
                <p className="mt-2 max-w-[34ch] text-[14px] leading-snug text-[var(--muted)]">{f.note}</p>
                <p className={`type-micro mt-3 ${aera ? "text-[var(--signal)]" : ""}`}>{f.owner}</p>
              </li>
            );
          })}
        </ol>

        <Handoff />

        <p data-reveal className="col-span-full text-[clamp(22px,2vw,30px)] font-medium leading-[1.25] tracking-[-0.015em] lg:col-start-6 lg:col-span-7">
          A AERA não substitui o Comercial.{" "}
          <span className="text-[var(--muted)]">
            Ela aumenta a capacidade do Comercial de encontrar, desenvolver e
            avançar oportunidades.
          </span>
        </p>
      </div>
    </Section>
  );
}
