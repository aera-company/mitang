"use client";

import { useRef } from "react";
import { ACTS_V2, FRONTS } from "@/lib/v2";
import { playAssumes } from "./motion/v2Motion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

/* V2 · 03 — the service in under thirty seconds: one statement, four
   fronts as editorial columns (no cards), then the expectation note. */
export function Assumes() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playAssumes);

  return (
    <Section ref={scope} id="assume" index="03" label="O que a AERA assume" act={ACTS_V2.service}>
      <div className="aera-grid section-pad gap-y-14">
        <div data-reveal className="col-span-full lg:col-span-7">
          <p className="type-micro text-[var(--muted)]">AERA × MITANG</p>
          <h2 id="assume-title" className="type-h2 mt-5">
            O que a AERA assume<span className="text-[var(--signal)]">.</span>
          </h2>
        </div>
        <p data-reveal className="type-lead col-span-full self-end lg:col-start-8 lg:col-span-5">
          A AERA assume a gestão e execução dessa frente como parceiro externo,
          conectando marketing, geração de oportunidades, comunicação e
          tecnologia ao comercial da MITANG.
        </p>

        <ol className="col-span-full grid grid-cols-1 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {FRONTS.map((f) => (
            <li key={f.n} data-as="front" className="border-t border-[var(--fg)] pt-5">
              <p className="type-index text-[var(--muted)]">{f.n}</p>
              <h3 className="mt-3 text-[clamp(22px,1.9vw,28px)] font-semibold leading-[1.1] tracking-[-0.018em]">
                {f.title}
              </h3>
              <p className="mt-4 text-[15.5px] leading-[1.6] text-[var(--muted)]">{f.text}</p>
            </li>
          ))}
        </ol>

        {/* How the service is organised, without turning it into a contract. */}
        <div data-reveal className="col-span-full border-t border-[var(--line)] pt-6 lg:col-start-5 lg:col-span-8">
          <p className="type-body max-w-none">
            A prestação de serviços é organizada por prioridades mensais, de
            acordo com as necessidades comerciais da MITANG e o estágio das
            oportunidades em andamento.
          </p>
          <p className="type-body mt-3 max-w-none text-[var(--muted)]">
            Os formatos apresentados representam capacidades da operação, não
            uma produção ilimitada de peças ou campanhas.
          </p>
        </div>
      </div>
    </Section>
  );
}
