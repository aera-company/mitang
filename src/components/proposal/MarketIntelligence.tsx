"use client";

import { useRef, useState } from "react";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { ACTS, DEMO_ROWS } from "@/lib/constants";
import { playIntelligence } from "./motion/intelligenceMotion";
import { Radar, type RadarPoint } from "./ui/Radar";
import { Section } from "./ui/Section";

const COLS = ["Conta", "Sinal", "Aderência", "Contato", "Etapa"] as const;
const STAGES = ["Pesquisa", "Contato", "Conversa", "Reunião"];

/* Simulated accounts on the plot — high fit reads as an active signal. */
const POINTS: RadarPoint[] = [
  { bearing: 38, range: 0.62, label: "A", active: true },
  { bearing: 292, range: 0.44, label: "B", active: true },
  { bearing: 118, range: 0.78, label: "C" },
  { bearing: 205, range: 0.7, label: "D" },
];

function Fit({ level }: { level: string }) {
  const n = level === "Alta" ? 3 : level === "Média" ? 2 : 1;
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="inline-flex gap-[3px]">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            data-mi="bar"
            className={`h-[9px] w-[3px] origin-bottom ${
              i <= n
                ? n === 3
                  ? "bg-[var(--signal)]"
                  : "bg-[var(--fg)]"
                : "bg-[var(--line-strong)]"
            }`}
          />
        ))}
      </span>
      <span className="type-index">{level}</span>
    </span>
  );
}

function Stage({ status }: { status: string }) {
  const at = STAGES.indexOf(status);
  return (
    <span className="inline-flex flex-col gap-1.5">
      <span aria-hidden className="flex gap-[3px]">
        {STAGES.map((s, i) => (
          <span
            key={s}
            data-mi="seg"
            className={`h-[3px] w-4 origin-left ${
              i < at ? "bg-[var(--fg)]" : i === at ? "bg-[var(--signal)]" : "bg-[var(--line-strong)]"
            }`}
          />
        ))}
      </span>
      <span className="type-index">{status}</span>
    </span>
  );
}

/** "Exemplo A · operadora" → "A" (the point's label on the radar). */
const keyOf = (account: string) => account.replace(/^Exemplo\s+/, "").charAt(0);

export function MarketIntelligence() {
  const scope = useRef<HTMLElement>(null);
  const [hot, setHot] = useState<string | null>(null);

  useGsapContext(
    scope,
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (active) => playIntelligence(scope.current!, active),
  );

  return (
    <Section
      ref={scope}
      id="inteligencia"
      index="06"
      label="Inteligência de mercado"
      act={ACTS.system}
      state="light"
    >
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="inteligencia-title" className="type-h2 col-span-full lg:col-span-8">
          Antes da abordagem, inteligência.
        </h2>
        <p data-reveal className="type-body col-span-full text-[var(--muted)] lg:col-start-7 lg:col-span-5">
          A operação começa construindo uma leitura viva do mercado: quem pode
          comprar, por quê, em qual contexto e com quais sinais de oportunidade.
        </p>

        {/* Stated before any example — radar and canvas alike: nothing below
            is research (rev. 24/09). */}
        <div data-reveal className="col-span-full border-t border-[var(--line-strong)] pt-6">
          <p className="type-micro inline-flex items-center border border-[var(--fg)] px-2.5 py-1.5 font-semibold">
            Simulação / formato ilustrativo
          </p>
          <p className="type-body mt-4 max-w-[62ch] text-[var(--muted)]">
            As contas, os sinais e os contatos a seguir são fictícios. Mostram o
            formato do radar e do canvas comercial, não uma pesquisa realizada.
          </p>
        </div>

        <div className="col-span-full flex flex-col items-center gap-6 lg:col-span-4 lg:items-start">
          <div data-mi="radar" className="p-5">
            <Radar size={300} points={POINTS} rings={[0.33, 0.66, 1]} sweep highlight={hot} />
          </div>
          <p data-mi="legend" className="type-index flex items-center gap-3 text-[var(--muted)]">
            <span className="signal-dot" /> Aderência alta · sinal ativo
          </p>
        </div>

        <figure data-mi="canvas" className="col-span-full lg:col-start-5 lg:col-span-8">
          <figcaption className="type-micro mb-5 text-[var(--muted)]">
            Canvas comercial · simulação
          </figcaption>

          {/* Desktop table */}
          <table className="hidden w-full border-collapse text-left md:table">
            <thead>
              <tr className="border-b border-[var(--line-strong)]">
                {COLS.map((c) => (
                  <th key={c} scope="col" className="type-micro pb-3 pr-4 font-medium text-[var(--muted)]">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_ROWS.map((r) => (
                <tr
                  key={r.account}
                  data-mi="row"
                  onMouseEnter={() => setHot(keyOf(r.account))}
                  onMouseLeave={() => setHot(null)}
                  className="border-b border-[var(--line)] align-top transition-colors duration-200 hover:bg-[var(--signal-soft)]"
                >
                  <td className="py-4 pr-4 text-[15px] font-medium">{r.account}</td>
                  <td className="py-4 pr-4 text-[15px] text-[var(--muted)]">{r.signal}</td>
                  <td className="py-4 pr-4 pt-[18px]">
                    <Fit level={r.fit} />
                  </td>
                  <td className="py-4 pr-4 text-[15px] text-[var(--muted)]">{r.contact}</td>
                  <td className="py-4 pt-[18px]">
                    <Stage status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: one record per row */}
          <ul className="md:hidden">
            {DEMO_ROWS.map((r) => (
              <li key={r.account} data-mi="row" className="border-t border-[var(--line)] py-5">
                <p className="text-[17px] font-medium">{r.account}</p>
                <p className="mt-1 text-[15px] text-[var(--muted)]">{r.signal}</p>
                <p className="mt-2 text-[14px] text-[var(--muted)]">{r.contact}</p>
                <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-3">
                  <Fit level={r.fit} />
                  <Stage status={r.status} />
                </div>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </Section>
  );
}
