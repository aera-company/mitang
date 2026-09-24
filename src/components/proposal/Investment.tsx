"use client";

import { useRef } from "react";
import { ACTS, PRICING } from "@/lib/constants";
import { playInvestment } from "./motion/commercialMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

/* Commercial model (revised 24/09): one monthly price is the protagonist.
   Setup is included; third-party costs are approved separately; the cycle
   total is stated plainly. No discount or promotional language. */
const TERMS = [
  "Implantação incluída no piloto.",
  "Ferramentas, mídia, bases de dados e custos de terceiros, quando necessários, são aprovados separadamente.",
];

export function Investment() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playInvestment);

  return (
    <Section ref={scope} id="investimento" index="15" label="Modelo comercial" act={ACTS.offer} state="light">
      <div data-iv="block" className="aera-grid section-pad relative gap-y-12">
        <h2 id="investimento-title" className="type-micro col-span-full text-[var(--muted)]">
          Piloto / 90 dias
        </h2>

        <div className="relative col-span-full pt-8 lg:col-span-7">
          <span data-iv="rule" aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--line-strong)]" />
          <p className="text-[clamp(64px,9vw,148px)] font-semibold leading-[0.9] tracking-[-0.04em] tabular-nums">
            <span className="line-mask">
              <span data-iv="price">
                {PRICING.monthly}
                <span className="text-[0.32em] font-medium tracking-[-0.01em] text-[var(--muted)]">
                  {" "}
                  / mês
                </span>
              </span>
            </span>
          </p>
        </div>

        <div className="relative col-span-full pt-8 lg:col-start-9 lg:col-span-4">
          <span data-iv="rule" aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--line-strong)]" />
          <p data-iv="item" className="type-lead max-w-none">
            Estratégia, inteligência comercial, geração de demanda, comunicação,
            tecnologia e gestão da operação, seguindo as prioridades definidas
            em conjunto com a MITANG.
          </p>
        </div>

        <ul className="col-span-full lg:col-span-7">
          {TERMS.map((t) => (
            <li key={t} data-iv="item" className="border-t border-[var(--line)] py-4 text-[16px]">
              {t}
            </li>
          ))}
          <li data-iv="item" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-y border-[var(--line)] py-4">
            <span className="text-[16px]">Investimento total do ciclo</span>
            <span className="text-[22px] font-semibold tracking-[-0.01em] tabular-nums">
              {PRICING.cycleTotal}
            </span>
          </li>
        </ul>

        <p data-iv="item" className="type-body col-span-full text-[15px] text-[var(--muted)] lg:col-start-9 lg:col-span-4 lg:self-end">
          Ao final dos 90 dias, a continuidade e o desenho da operação serão
          revistos a partir do aprendizado do piloto, das prioridades comerciais
          e da estrutura necessária para o próximo ciclo.
        </p>
      </div>
    </Section>
  );
}
