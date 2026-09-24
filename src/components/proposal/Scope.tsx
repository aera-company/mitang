"use client";

import { useRef } from "react";
import { ACTS, OUT_OF_SCOPE, SCOPE } from "@/lib/constants";
import { playRows } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

export function Scope() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playRows);

  return (
    <Section ref={scope} id="escopo" index="13" label="Escopo" act={ACTS.offer}>
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="escopo-title" className="type-h2 col-span-full lg:col-span-8">
          O que está incluído.
        </h2>
        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          Formatos, entregas e frentes são priorizados mês a mês, conforme a
          necessidade comercial. O escopo define o que pode entrar na operação,
          não um volume fixo de produção.
        </p>

        <dl className="col-span-full">
          {SCOPE.map((s, i) => (
            <div
              key={s.area}
              data-row
              className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-3 border-t border-[var(--line)] py-6 lg:grid-cols-12"
            >
              <dt className="flex items-baseline gap-4 lg:col-span-4">
                <span className="type-index text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="type-h3">{s.area}</span>
              </dt>
              <dd className="text-[16px] leading-[1.7] text-[var(--muted)] lg:col-span-8">
                {s.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>

        {/* Scope limits (§22) — transparent, not hidden in a footnote. */}
        <div data-reveal className="col-span-full lg:col-span-4">
          <p className="type-micro text-[var(--muted)]">Limites de escopo</p>
          <p className="type-h3 mt-4 max-w-[18ch]">Fora do escopo padrão.</p>
        </div>
        <div className="col-span-full lg:col-start-5 lg:col-span-8">
          <ul className="grid grid-cols-1 gap-x-[var(--gutter)] md:grid-cols-2">
            {OUT_OF_SCOPE.map((o) => (
              <li
                key={o}
                data-row
                className="border-t border-[var(--line)] py-3 text-[15px] text-[var(--muted)]"
              >
                {o}
              </li>
            ))}
          </ul>
          <p data-reveal className="type-body mt-8">
            Quando necessários, esses itens são orçados separadamente ou
            aprovados antes da execução.
          </p>
        </div>
      </div>
    </Section>
  );
}
