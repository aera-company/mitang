"use client";

import { useRef } from "react";
import { ACTS_V2, STAYS } from "@/lib/v2";
import { playBeyondShort } from "./motion/v2Motion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

/* V2 · 06 — what stays: five concepts, no paragraphs. Each one adds a
   layer to the count beneath it (accumulation, left to right). */
export function BeyondShort() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playBeyondShort);

  return (
    <Section ref={scope} id="alem" index="06" label="Além da rotina" act={ACTS_V2.radar} state="light">
      <div className="aera-grid section-pad gap-y-16">
        <h2 data-reveal id="alem-title" className="type-h2 col-span-full lg:col-span-10">
          A operação gera oportunidades.{" "}
          <span className="block text-[var(--muted)]">A estrutura fica.</span>
        </h2>

        <ol className="col-span-full grid grid-cols-1 gap-x-[var(--gutter)] md:grid-cols-5">
          {STAYS.map((s, i) => (
            <li key={s} data-bs="item" className="flex items-baseline gap-5 border-t border-[var(--line-strong)] py-5 md:flex-col md:gap-0 md:pt-6">
              <span aria-hidden className="type-index text-[var(--muted)] md:hidden">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="mb-5 hidden gap-[3px] md:flex">
                {STAYS.map((_, k) => (
                  <span
                    key={k}
                    data-bs={k <= i ? "on" : undefined}
                    className={`h-[3px] w-4 origin-left ${
                      k < i ? "bg-[var(--fg)]" : k === i ? "bg-[var(--signal)]" : "bg-[var(--line-strong)]"
                    }`}
                  />
                ))}
              </span>
              <span className="text-[clamp(21px,1.8vw,27px)] font-semibold leading-[1.1] tracking-[-0.018em]">{s}</span>
            </li>
          ))}
        </ol>

        <p data-reveal className="col-span-full text-[clamp(24px,2.4vw,38px)] font-medium leading-[1.15] tracking-[-0.02em] lg:col-start-6 lg:col-span-7">
          A operação trabalha o presente e constrói capacidade comercial para o
          próximo ciclo<span className="text-[var(--signal)]">.</span>
        </p>
      </div>
    </Section>
  );
}
