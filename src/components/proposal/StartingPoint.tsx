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
    <Section ref={scope} id="ponto-de-partida" index="02" label="O ponto de partida" act={ACTS_V2.start} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <aside data-reveal aria-label="A vaga publicada pela MITANG" className="col-span-full border-l border-[var(--line-strong)] pl-5 lg:col-span-4">
          <p className="type-micro text-[var(--muted)]">Vaga aberta · MITANG</p>
          <p className="type-h3 mt-4">{JOB.title}</p>
        </aside>
        <blockquote data-reveal className="col-span-full lg:col-start-6 lg:col-span-7">
          <p className="text-[clamp(30px,3.4vw,54px)] font-semibold leading-[1.04] tracking-[-0.028em]">
            “{JOB.quote}”
          </p>
          <footer className="type-micro mt-4 text-[var(--muted)]">Da descrição da vaga</footer>
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
            A MITANG já tem conhecimento técnico, serviços e frentes de mercado.{" "}
            <span className="text-[var(--muted)]">
              A AERA entra para transformar essa capacidade em uma cadência
              constante de demanda, abordagem e oportunidade.
            </span>
          </p>
        </div>
        <ul data-reveal aria-label="Frentes da MITANG" className="type-index col-span-full flex flex-wrap gap-x-4 gap-y-2 self-end text-[var(--muted)] lg:col-start-9 lg:col-span-4">
          {MITANG_FRONTS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
