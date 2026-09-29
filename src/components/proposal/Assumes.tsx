"use client";

import { useRef } from "react";
import { ACTS_V2, FRONTS } from "@/lib/v2";
import { playAssumes } from "./motion/v2Motion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

/* 03 — the service in under thirty seconds: one statement, four fronts
   (purpose in one line, then what goes in), and the expectation note. */
export function Assumes() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playAssumes);

  return (
    <Section ref={scope} id="assume" index="03" label="O que a AERA assume" act={ACTS_V2.operation}>
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="assume-title" className="type-h2 col-span-full lg:col-span-7">
          A AERA assume essa frente<span className="text-[var(--signal)]">.</span>
        </h2>
        <p data-reveal className="type-lead col-span-full self-end lg:col-start-8 lg:col-span-5">
          Em uma prestação de serviços recorrente, a AERA passa a operar
          Marketing & Lead Generation junto ao Comercial da MITANG, da
          identificação da oportunidade à geração da reunião.
        </p>

        <ol className="col-span-full grid grid-cols-1 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {FRONTS.map((f) => (
            <li key={f.n} data-as="front" className="border-t border-[var(--fg)] pt-5">
              <p className="type-index text-[var(--muted)]">{f.n}</p>
              <h3 className="mt-3 text-[clamp(24px,2.1vw,32px)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {f.title}
              </h3>
              <p className="mt-3 text-[16px] font-medium leading-snug">{f.purpose}</p>
              <ul className="mt-5 text-[14.5px] leading-[1.75] text-[var(--muted)]">
                {f.items.map((it) => (
                  <li key={it} className={it === "MITANG Radar" ? "flex items-center gap-2 text-[var(--fg)]" : ""}>
                    {it === "MITANG Radar" && <span aria-hidden className="size-[5px] bg-[var(--signal)]" />}
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* How the service is organised, without turning it into a contract. */}
        <p data-reveal className="type-body col-span-full max-w-none border-t border-[var(--line)] pt-6 text-[var(--muted)] lg:col-start-5 lg:col-span-8">
          A prestação de serviços é organizada por prioridades mensais, conforme
          as necessidades comerciais da MITANG. Os formatos listados são
          capacidades da operação, não uma produção ilimitada de peças ou
          campanhas.
        </p>
      </div>
    </Section>
  );
}
