"use client";

import { useRef } from "react";
import { ACTS, BEYOND } from "@/lib/constants";
import { playBeyond } from "./motion/beyondMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

/* What stays with MITANG while the routine runs. Desktop: a sticky strata
   diagram, one layer laid per block as it is read (the structure builds on
   the running routine). Below 1024: each block carries its own count. */

function Strata() {
  const layers = [...BEYOND].reverse();
  return (
    <figure aria-hidden className="sticky top-[18svh]">
      <p className="type-micro flex items-baseline justify-between text-[var(--muted)]">
        <span>Capacidade construída</span>
        <span className="type-index">
          <span data-bx="count">05</span>/05
        </span>
      </p>
      <div className="mt-6 flex flex-col gap-[6px]">
        {layers.map((b) => (
          <div
            key={b.n}
            data-bx="layer"
            data-n={b.n}
            className="bx-layer flex h-12 items-center justify-between border px-4"
          >
            <span className="text-[14px] font-medium">{b.layer}</span>
            <span className="type-index text-[var(--muted)]">{b.n}</span>
          </div>
        ))}
      </div>
      {/* The routine keeps running underneath. */}
      <div className="mt-4 border-t border-[var(--fg)] pt-3">
        <div className="bx-routine h-[3px]" />
        <p className="type-index mt-3 text-[var(--muted)]">Rotina comercial em andamento</p>
      </div>
    </figure>
  );
}

function Count({ n }: { n: number }) {
  return (
    <span aria-hidden className="flex gap-[3px] lg:hidden">
      {BEYOND.map((b, i) => (
        <span
          key={b.n}
          className={`h-[3px] w-4 ${i < n ? (i === n - 1 ? "bg-[var(--signal)]" : "bg-[var(--fg)]") : "bg-[var(--line-strong)]"}`}
        />
      ))}
    </span>
  );
}

export function Beyond() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playBeyond);

  return (
    <Section ref={scope} id="alem" index="10" label="Além da execução" act={ACTS.operation} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="alem-title" className="type-h2 col-span-full lg:col-span-10">
          A operação gera oportunidades.{" "}
          <span className="block text-[var(--muted)]">A estrutura fica.</span>
        </h2>
        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          Enquanto a rotina comercial acontece, a AERA também constrói uma camada
          própria de inteligência, processo, comunicação e tecnologia para a
          MITANG.
        </p>

        <div className="col-span-full hidden lg:col-span-4 lg:block">
          <Strata />
        </div>

        <ol className="col-span-full lg:col-start-6 lg:col-span-7">
          {BEYOND.map((b, i) => (
            <li
              key={b.n}
              data-bx="block"
              className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-[var(--line-strong)] py-10 md:gap-x-10 lg:py-16"
            >
              <span
                aria-hidden
                data-bx="num"
                className="w-[1.18em] text-[clamp(56px,6.4vw,104px)] font-semibold leading-[0.8] tracking-[-0.05em] text-[var(--line-strong)] [font-stretch:88%]"
              >
                {b.n}
              </span>
              <div>
                <Count n={i + 1} />
                <h3 className="mt-4 text-[clamp(26px,2.5vw,38px)] font-semibold leading-[1.05] tracking-[-0.02em] lg:mt-0">
                  {b.title}
                </h3>
                <p className="type-body mt-4 text-[var(--muted)]">{b.text}</p>
                {b.list && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {b.list.map((it) => (
                      <li
                        key={it}
                        data-bx="piece"
                        className="border border-[var(--line-strong)] px-2.5 py-1 text-[14px]"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p data-reveal className="col-span-full border-t border-[var(--fg)] pt-10 lg:col-start-6 lg:col-span-7">
          <span className="block text-[clamp(22px,2vw,30px)] font-medium leading-[1.2] tracking-[-0.015em] text-[var(--muted)]">
            A operação não termina na execução.
          </span>
          <span className="mt-2 block text-[clamp(28px,3vw,46px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Ela constrói capacidade comercial dentro da MITANG
            <span className="text-[var(--signal)]">.</span>
          </span>
        </p>
      </div>
    </Section>
  );
}
