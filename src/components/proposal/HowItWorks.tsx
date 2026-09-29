"use client";

import { useRef } from "react";
import { ACTS_V2, FLOW_V2 } from "@/lib/v2";
import { playHowItWorks } from "./motion/v2Motion";
import { useScene } from "./motion/useScene";
import { Handoff } from "./Handoff";
import { Section } from "./ui/Section";

/* V2 · 04 — the path from signal to opportunity, each step saying what
   happens there (market intelligence, ABM and lead generation live inside
   the path), then who owns which stretch: AERA up to the meeting, MITANG
   from technical validation to closing. */
export function HowItWorks() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playHowItWorks);
  const last = FLOW_V2.length - 1;

  return (
    <Section ref={scope} id="operacao" index="04" label="Como a operação funciona" act={ACTS_V2.service} state="petrol">
      <div className="aera-grid section-pad gap-y-16">
        <h2 data-reveal id="operacao-title" className="type-h2 col-span-full lg:col-span-8">
          Do sinal à oportunidade.
        </h2>

        <ol data-hw="flow" aria-label="Do mercado à oportunidade" className="relative col-span-full grid grid-cols-1 lg:grid-cols-7 lg:gap-x-[var(--gutter)]">
          {/* Desktop axis */}
          <span aria-hidden data-hw="axis" className="absolute left-0 right-[calc(100%/14)] top-[5px] hidden h-px origin-left bg-[var(--line-strong)] lg:block" />
          {/* Phones: rail */}
          <span aria-hidden data-hw="rail" className="absolute bottom-6 left-[5px] top-2 w-px origin-top bg-[var(--line-strong)] lg:hidden" />
          {FLOW_V2.map((f, i) => (
            <li key={f.step} data-hw="step" className="relative pb-7 pl-8 lg:pb-0 lg:pl-0 lg:pt-8">
              <span
                aria-hidden
                className={`absolute left-0 top-[12px] -mt-[5px] size-[11px] rounded-full border lg:top-[5px] ${
                  i === last
                    ? "border-[var(--signal)] bg-[var(--signal)] shadow-[0_0_0_4px_var(--signal-soft)]"
                    : "border-[var(--fg)] bg-[var(--bg)]"
                }`}
              />
              <p className="flex items-baseline gap-3">
                <span className="type-index text-[var(--muted)]">{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-[20px] font-medium tracking-tight ${i === last ? "text-[var(--signal)]" : ""}`}>
                  {f.step}
                </span>
              </p>
              <p className="mt-2 max-w-[34ch] text-[14.5px] leading-snug text-[var(--muted)]">{f.note}</p>
            </li>
          ))}
        </ol>

        {/* Who owns which stretch. */}
        <p data-reveal className="type-micro col-span-full border-t border-[var(--line-strong)] pt-6 text-[var(--muted)]">
          Quem faz o quê
        </p>
        <Handoff />

        <p data-reveal className="col-span-full text-[clamp(22px,2vw,30px)] font-medium leading-[1.25] tracking-[-0.015em] lg:col-start-6 lg:col-span-7">
          A AERA não substitui o comercial.{" "}
          <span className="text-[var(--muted)]">
            Ela aumenta a capacidade do comercial de encontrar, desenvolver e
            acompanhar oportunidades.
          </span>
        </p>
      </div>
    </Section>
  );
}
