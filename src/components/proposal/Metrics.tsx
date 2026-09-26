"use client";

import { useRef } from "react";
import { ACTS, METRICS } from "@/lib/constants";
import { playRows } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

/* Indicators only — no numeric targets before the diagnosis (§23). */
export function Metrics() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playRows);

  return (
    <Section ref={scope} id="metricas" index="16" label="Métricas" act={ACTS.offer}>
      <div className="aera-grid section-pad gap-y-14">
        <div data-reveal className="col-span-full lg:col-span-5">
          <h2 id="metricas-title" className="type-h2">
            Medir o que aproxima negócio.
          </h2>
          <p className="type-body mt-8 text-[var(--muted)]">
            Metas numéricas só depois do diagnóstico inicial. Até lá, o que se
            acompanha é o avanço de cada conta pelo caminho até a oportunidade.
          </p>
        </div>

        <div className="col-span-full lg:col-start-7 lg:col-span-6">
          <ol>
            {METRICS.map((m, i) => (
              <li
                key={m}
                data-row
                className="grid grid-cols-[2.5rem_1fr] items-center gap-4 border-t border-[var(--line)] py-3"
              >
                <span className="type-index text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[17px]">{m}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
