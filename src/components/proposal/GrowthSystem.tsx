"use client";

import { useRef } from "react";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { ACTS, MODULES } from "@/lib/constants";
import { playGrowthSystem } from "./motion/systemMotion";
import { Section, Tag } from "./ui/Section";

export function GrowthSystem() {
  const scope = useRef<HTMLElement>(null);

  useGsapContext(
    scope,
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (active) => playGrowthSystem(scope.current!, active),
  );

  return (
    <Section ref={scope} id="sistema" index="04" label="A máquina AERA" act={ACTS.system}>
      <div className="aera-grid section-pad gap-y-16">
        {/* Positioning (§3) opens the system act. */}
        <div data-reveal className="col-span-full lg:col-span-5">
          <p className="type-micro text-[var(--muted)]">AERA × MITANG</p>
          <p className="type-h3 mt-4">
            Growth, inteligência comercial & tecnologia
          </p>
        </div>
        <div data-reveal className="col-span-full lg:col-start-7 lg:col-span-6">
          <p className="type-lead max-w-none">
            A AERA atua como um núcleo externo conectado ao comercial da MITANG.
            Identificamos onde estão as oportunidades, quem são as contas e
            decisores relevantes, construímos as abordagens e organizamos o
            processo até a geração de reuniões qualificadas.
          </p>
          <p className="type-body mt-6 text-[var(--muted)]">
            Comunicação deixa de ser uma frente isolada e passa a trabalhar
            diretamente para o crescimento.
          </p>
        </div>

        <h2 data-reveal id="sistema-title" className="type-h2 col-span-full mt-8 lg:col-span-9">
          Um sistema, não uma soma de tarefas.
        </h2>

        {/* Five modules as columns on one connecting axis (not cards). */}
        <div data-gs="system" className="col-span-full">
          <div aria-hidden className="relative hidden h-6 lg:block">
            <span data-gs="axis" className="absolute left-0 right-0 top-1/2 h-px origin-left bg-[var(--line-strong)]" />
            <div className="grid h-full grid-cols-5 gap-x-[var(--gutter)]">
              {MODULES.map((m) => (
                <span key={m.n} className="relative">
                  <span data-gs="node" className="absolute left-0 top-1/2 -mt-[5.5px] size-[11px] rounded-full border border-[var(--fg)] bg-[var(--bg)]" />
                </span>
              ))}
            </div>
          </div>

          <ol className="grid grid-cols-1 gap-x-[var(--gutter)] md:grid-cols-2 lg:mt-8 lg:grid-cols-5">
            {MODULES.map((m) => (
              <li
                key={m.n}
                data-gs="module"
                className="group flex flex-col border-t border-[var(--line)] py-8 lg:border-t-0 lg:py-0"
              >
                <p className="type-index text-[var(--muted)]">
                  {m.n} / {m.name}
                </p>
                <h3 className="type-h3 mt-3 max-w-[14ch]">{m.title}</h3>
                <ul className="type-body mt-5 text-[15px] leading-[1.7] text-[var(--muted)]">
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <div className="mt-6 lg:mt-auto lg:pt-8">
                  <p className="type-index mb-2 text-[var(--muted)]">Output</p>
                  <Tag signal className="group-hover:border-[var(--signal)]">{m.output}</Tag>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
