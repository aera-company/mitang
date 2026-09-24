"use client";

import { useRef } from "react";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { ACTS, FLOW } from "@/lib/constants";
import { playPipeline } from "./motion/pipelineMotion";
import { Section } from "./ui/Section";

/* Coverage brackets over the flow (indexes into FLOW, inclusive).
   Shows that AERA follows far more of the path than "a lead". */
const SPANS = [
  { from: 0, to: 6, label: "O que a AERA acompanha", tone: "strong", align: "left" },
  { from: 6, to: 7, label: "Comercial MITANG", tone: "muted", align: "right" },
] as const;

/* Where a classic lead-generation service usually hands over. */
const LEAD_HANDOFF = 4;

export function OpportunityPipeline() {
  const n = FLOW.length;
  const pct = (i: number) => `${(i / (n - 1)) * 100}%`;
  const scope = useRef<HTMLElement>(null);

  useGsapContext(
    scope,
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (active) => playPipeline(scope.current!, active),
  );

  return (
    <Section ref={scope} id="fluxo" index="05" label="Fluxo comercial" act={ACTS.system} state="petrol">
      <div className="aera-grid section-pad gap-y-16">
        <h2 data-reveal id="fluxo-title" className="type-h2 col-span-full lg:col-span-8">
          Do sinal à oportunidade.
        </h2>

        {/* Desktop: horizontal flow on one axis with coverage brackets. */}
        <div data-pl="flow" className="col-span-full hidden lg:block">
          <div className="relative mx-[4%]">
            <div className="relative h-20">
              {SPANS.map((s, row) => (
                <div
                  key={s.label}
                  data-pl="span"
                  className="absolute"
                  style={{
                    left: pct(s.from),
                    width: `calc(${pct(s.to)} - ${pct(s.from)})`,
                    top: `${row * 36}px`,
                    minWidth: 1,
                  }}
                >
                  <span
                    className={`block h-2 border-x border-t ${
                      s.tone === "strong"
                        ? "border-[var(--signal)]"
                        : "border-[var(--line-strong)]"
                    }`}
                  />
                  <span
                    className={`type-micro mt-2 block whitespace-nowrap ${
                      s.tone === "strong" ? "text-[var(--signal)]" : "text-[var(--muted)]"
                    } ${s.align === "right" ? "text-right" : ""}`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative mt-6 h-px">
              <span data-pl="base" className="absolute inset-0 origin-left bg-[var(--line-strong)]" />
              {/* AERA's stretch of the axis carries the signal. */}
              <span
                aria-hidden
                data-pl="aera-line"
                className="absolute inset-y-0 left-0 origin-left bg-[var(--signal)]"
                style={{ width: pct(6) }}
              />
              {FLOW.map((step, i) => (
                <span
                  key={step}
                  data-pl="node"
                  className={`absolute top-1/2 -ml-[5.5px] -mt-[5.5px] size-[11px] rounded-full border ${
                    i === n - 1
                      ? "border-[var(--signal)] bg-[var(--signal)] shadow-[0_0_0_4px_var(--signal-soft)]"
                      : "border-[var(--fg)] bg-[var(--bg)]"
                  }`}
                  style={{ left: pct(i) }}
                />
              ))}
            </div>
            <ol className="relative mt-6 h-28">
              {FLOW.map((step, i) => (
                <li
                  key={step}
                  data-pl="step"
                  className="absolute -translate-x-1/2 text-center"
                  style={{ left: pct(i) }}
                >
                  <span className="type-index block text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[18px] font-medium tracking-tight">
                    {step}
                  </span>
                  {i === LEAD_HANDOFF && (
                    <span data-pl="handoff" className="type-index mt-2 block whitespace-nowrap text-[var(--muted)]">
                      ↑ onde a geração de lead
                      <br />
                      costuma parar
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Mobile/tablet: vertical flow, coverage as a side rule. */}
        <ol aria-label="Etapas do fluxo" className="col-span-full lg:hidden">
          {FLOW.map((step, i) => (
            <li
              key={step}
              data-pl="row"
              className="grid grid-cols-[2.5rem_1fr_auto] items-baseline border-t border-[var(--line)] py-4"
            >
              <span className="type-index text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[22px] font-medium tracking-tight">{step}</span>
              <span
                className={`type-micro ${i <= 6 ? "text-[var(--signal)]" : "text-[var(--muted)]"}`}
              >
                {i < 6 ? "AERA" : i === 6 ? "AERA + MITANG" : "MITANG"}
              </span>
            </li>
          ))}
        </ol>

        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          O comercial recebe contexto, histórico e uma oportunidade mais
          preparada para avançar.
        </p>
      </div>
    </Section>
  );
}
