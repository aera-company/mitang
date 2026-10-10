"use client";

import { useRef } from "react";
import { ACTS_V2, JOB, MITANG_FRONTS } from "@/lib/v2";
import { playStart } from "./motion/v2Motion";
import { useScene } from "./motion/useScene";
import { MITANG_PHOTO, MitangPhoto } from "./ui/MitangPhoto";
import { Section } from "./ui/Section";

/* 02 — the post already states the goal. No deconstruction of the role:
   MITANG's own words, the goal, and what AERA proposes to connect. */
export function StartingPoint() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playStart);

  return (
    <Section ref={scope} id="ponto-de-partida" index="02" label="O ponto de partida" act={ACTS_V2.start} state="light" contours="20% 30%">
      <div className="aera-grid section-pad gap-y-14">
        <aside data-reveal aria-label="A vaga publicada pela MITANG" className="col-span-full border-l border-[var(--line-strong)] pl-5 lg:col-span-4">
          <p className="type-micro text-[var(--muted)]">Vaga aberta · MITANG</p>
          <p className="type-h3 mt-4">{JOB.title}</p>
        </aside>
        {/* MITANG's own words, in MITANG's IV: the dark callout with the
            teal offset shadow and the brand typeface (manual, 09/10). */}
        <blockquote data-reveal className="col-span-full mr-[10px] lg:col-start-6 lg:col-span-7">
          <p className="mitang-callout px-7 py-7 text-[clamp(26px,2.9vw,46px)] font-semibold leading-[1.12] tracking-[-0.02em] md:px-10 md:py-9">
            “{JOB.quote}”
          </p>
          <footer className="type-micro mt-6 text-[var(--muted)]">Da descrição da vaga</footer>
        </blockquote>

        <h2 data-reveal id="ponto-de-partida-title" className="type-h2 col-span-full mt-4 lg:col-span-10">
          <span className="block text-[var(--muted)]">O objetivo já está claro.</span>
          Gerar oportunidades reais de negócio<span className="text-[var(--signal)]">.</span>
        </h2>
        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          A descrição da vaga cruza geração de demanda, prospecção,
          comunicação, CRM, análise e relacionamento comercial. A proposta da
          AERA é conectar essas frentes em uma única operação.
        </p>

        <figure data-rp="photo" className="col-span-full">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[21/9]">
            <MitangPhoto sizes="(min-width: 1024px) calc(100vw - 96px), 100vw" className="rp-photo object-[50%_64%]" />
          </div>
          <figcaption className="type-index mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[var(--muted)]">
            <span>Operação de survey · convés de embarcação</span>
            <span>{MITANG_PHOTO.credit}</span>
          </figcaption>
        </figure>

        <div data-reveal className="col-span-full lg:col-span-7">
          <p className="text-[clamp(22px,2vw,30px)] font-medium leading-[1.25] tracking-[-0.015em]">
            A MITANG já torna o complexo simples no offshore.{" "}
            <span className="text-[var(--muted)]">
              A AERA leva essa clareza ao mercado, em uma cadência constante de
              demanda, abordagem e oportunidade.
            </span>
          </p>
        </div>
        <ul data-reveal aria-label="Frentes da MITANG" className="col-span-full flex flex-wrap gap-2 self-end lg:col-start-9 lg:col-span-4">
          {MITANG_FRONTS.map((f) => (
            <li key={f} className="mitang-chip px-3 py-1.5 text-[13px] font-medium">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
