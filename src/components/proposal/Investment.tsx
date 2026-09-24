"use client";

import { useRef } from "react";
import { ACTS, PRICING, SETUP_INCLUDES } from "@/lib/constants";
import { playInvestment } from "./motion/commercialMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

const MONTHS = ["Mês 1", "Mês 2", "Mês 3"];

function Price({ value, unit }: { value: string; unit?: string }) {
  return (
    <p className="mt-6 text-[clamp(48px,5.4vw,84px)] font-semibold leading-none tracking-[-0.035em] tabular-nums">
      <span className="line-mask">
        <span data-iv="price">
          {value}
          {unit && (
            <span className="text-[0.4em] font-medium tracking-[-0.01em] text-[var(--muted)]">
              {" "}
              {unit}
            </span>
          )}
        </span>
      </span>
    </p>
  );
}

/* The pilot as a term sheet: two lines of investment, then the same money
   laid on the 90-day axis (one-off at D0, three monthly periods). */
export function Investment() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playInvestment);

  return (
    <Section ref={scope} id="investimento" index="14" label="Modelo comercial" act={ACTS.offer} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="investimento-title" className="type-h2 col-span-full lg:col-span-8">
          Piloto de 90 dias.
        </h2>

        <div data-iv="block" className="relative col-span-full pt-6 lg:col-span-6">
          <span data-iv="rule" aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--line-strong)]" />
          <p className="type-micro text-[var(--muted)]">01 · Implantação</p>
          <Price value={PRICING.setup} />
          <p className="type-index mt-3 text-[var(--muted)]">Pagamento único</p>
          <p className="type-body mt-8">Estruturação inicial da operação:</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-[var(--gutter)] text-[15px] text-[var(--muted)]">
            {SETUP_INCLUDES.map((it) => (
              <li key={it} data-iv="item" className="border-t border-[var(--line)] py-2">
                {it}
              </li>
            ))}
          </ul>
        </div>

        <div data-iv="block" className="relative col-span-full pt-6 lg:col-span-6">
          <span data-iv="rule" aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--line-strong)]" />
          <p className="type-micro text-[var(--muted)]">02 · Operação AERA</p>
          <Price value={PRICING.monthly} unit="/ mês" />
          <p className="type-index mt-3 text-[var(--muted)]">
            Durante o piloto inicial de 90 dias
          </p>
          <p className="type-body mt-8">
            Estratégia, inteligência, geração de demanda, comunicação,
            tecnologia e gestão da operação, conforme o escopo apresentado.
          </p>
        </div>

        {/* The same terms on the pilot's time axis. */}
        <figure data-iv="axis" className="col-span-full mt-4">
          <figcaption className="type-micro mb-6 text-[var(--muted)]">
            Como o piloto se distribui no tempo
          </figcaption>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-y-4 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-[var(--gutter)]">
            <div data-iv="setup" className="flex items-baseline gap-3 md:block">
              <span className="signal-dot" aria-hidden />
              <p className="type-index mt-0 md:mt-3">D0 · Implantação</p>
              <p className="text-[15px] font-medium md:mt-1">{PRICING.setup}</p>
            </div>
            <ol className="grid grid-cols-3 gap-[3px]">
              {MONTHS.map((m, i) => (
                <li key={m} className="flex flex-col gap-3">
                  <span
                    data-iv="month"
                    aria-hidden
                    className="block h-[6px] origin-left bg-[var(--signal)]"
                  />
                  <span className="type-index text-[var(--muted)]">
                    D{i * 30}–D{(i + 1) * 30} · {m}
                  </span>
                  <span className="text-[15px] font-medium">{PRICING.monthly}</span>
                </li>
              ))}
            </ol>
          </div>
        </figure>

        <div data-reveal className="col-span-full border-t border-[var(--line)] pt-4">
          <p className="type-micro text-[var(--muted)]">Notas</p>
          <ul className="type-index mt-3 space-y-1 text-[var(--muted)]">
            <li>Ferramentas, mídia, bases de dados e custos de terceiros não estão incluídos.</li>
            <li>Itens fora do escopo padrão são orçados separadamente ou aprovados antes da execução.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
