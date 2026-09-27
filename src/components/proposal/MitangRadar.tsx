"use client";

import { useRef } from "react";
import { ACTS } from "@/lib/constants";
import { BEFORE_CHAIN, PIECE_STEPS, WITH_CHAIN } from "@/lib/radar";
import { playMitangRadar } from "./motion/radarMotion";
import { useScene } from "./motion/useScene";
import { AssetSketch } from "./ui/AssetSketch";
import { RadarApp } from "./ui/RadarApp";
import { Section } from "./ui/Section";

const DISCIPLINES = ["inteligência", "comunicação", "design", "tecnologia", "comercial"];

/* Section 11 (26/09): the proposal's central asset. Presented as an
   operational layer built during the pilot, never as finished software. */
export function MitangRadar() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playMitangRadar);

  return (
    <Section ref={scope} id="radar" index="11" label="MITANG Radar" act={ACTS.operation}>
      <div className="aera-grid section-pad gap-y-14">
        {/* Name and promise */}
        <div className="col-span-full lg:col-span-8">
          <h2 id="radar-title">
            <span className="line-mask">
              <span data-rd="title" className="type-display">
                MITANG Radar<span className="text-[var(--signal)]">.</span>
              </span>
            </span>
            <span data-reveal className="type-h2 mt-4 block text-[var(--muted)]">
              Uma operação com memória.
            </span>
          </h2>
        </div>
        <div data-reveal className="col-span-full self-end lg:col-start-8 lg:col-span-5">
          <p className="type-lead">
            Um ambiente simples para reunir mercado, contas, decisores, sinais,
            oportunidades, histórico e próximos passos em um único lugar.
          </p>
          <p className="type-body mt-6 text-[var(--muted)]">
            Uma camada operacional que começa simples na V01 e evolui ao longo
            do piloto, reunindo inteligência de mercado, pipeline e próximos
            passos em um único ambiente.
          </p>
        </div>

        {/* Editorial lead-in to the mockup (27/09), not a new section. */}
        <p data-reveal className="col-span-full mt-6 border-t border-[var(--line-strong)] pt-8 text-[clamp(22px,2.2vw,34px)] font-medium leading-[1.2] tracking-[-0.018em] lg:col-span-9 lg:mt-10">
          O que normalmente fica espalhado entre planilhas, LinkedIn, e-mails e
          memória passa a trabalhar como uma única inteligência comercial
          <span className="text-[var(--signal)]">.</span>
        </p>

        {/* The V01 interface */}
        <figure className="col-span-full">
          <RadarApp />
          <figcaption className="type-index mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[var(--muted)]">
            <span>Interface conceitual da V01 · contas, sinais e datas fictícios</span>
            <span>Selecione uma conta ou troque de aba</span>
          </figcaption>
        </figure>

        {/* Before × with the operation */}
        <div data-rd="compare" className="col-span-full mt-10 grid grid-cols-1 gap-y-8 lg:mt-16">
          <div className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-4 border-t border-[var(--line)] pt-6 lg:grid-cols-12">
            <p className="type-micro text-[var(--muted)] lg:col-span-2">Antes</p>
            <ol aria-label="Antes" className="flex flex-wrap items-center gap-y-3 lg:col-span-10">
              {BEFORE_CHAIN.map((s, i) => (
                <li key={s} data-rd="before" className="flex items-center text-[clamp(17px,1.5vw,21px)] text-[var(--muted)]">
                  <span>{s}</span>
                  {i < BEFORE_CHAIN.length - 1 && (
                    <span aria-hidden className="mx-2.5 w-5 border-t border-dashed border-[var(--line-strong)] md:w-8" />
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-4 border-t border-[var(--line-strong)] pt-6 lg:grid-cols-12">
            <p className="type-micro lg:col-span-2">Com a operação</p>
            <ol aria-label="Com a operação" className="flex flex-wrap items-center gap-y-3 lg:col-span-10">
              {WITH_CHAIN.map((s, i) => {
                const end = i === WITH_CHAIN.length - 1;
                return (
                  <li
                    key={s}
                    data-rd="with"
                    className={`flex items-center text-[clamp(17px,1.5vw,21px)] font-medium ${end ? "text-[var(--signal)]" : ""}`}
                  >
                    {end && <span aria-hidden className="signal-dot mr-3" />}
                    <span>{s}</span>
                    {!end && <span aria-hidden className="mx-2.5 h-px w-5 bg-[var(--fg)] md:w-8" />}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div data-reveal className="col-span-full lg:col-span-8">
          <p className="type-h2">O conhecimento não recomeça toda semana.</p>
        </div>
        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          Cada pesquisa, resposta, reunião e oportunidade aumenta a inteligência
          comercial da operação.
        </p>

        {/* Intelligence + creation */}
        <div data-reveal className="col-span-full mt-10 border-t border-[var(--line-strong)] pt-10 lg:col-span-5 lg:mt-16">
          <p className="type-micro text-[var(--muted)]">Inteligência + criação</p>
          <h3 className="mt-5 text-[clamp(30px,3.2vw,50px)] font-semibold leading-[1.02] tracking-[-0.028em]">
            Quando a oportunidade pede uma peça,{" "}
            <span className="block text-[var(--muted)]">a operação consegue criar a peça.</span>
          </h3>
          <p className="type-body mt-6 text-[var(--muted)]">
            A mesma operação que encontra a oportunidade também produz o material
            que a conversa pede. Inteligência, comunicação, design, tecnologia e
            comercial trabalham no mesmo fluxo.
          </p>
        </div>

        <div className="col-span-full lg:col-start-7 lg:col-span-6 lg:mt-16 lg:border-t lg:border-[var(--line-strong)] lg:pt-10">
          <p className="type-micro text-[var(--muted)]">Exemplo de funcionamento · fictício</p>
          <ol data-rd="steps" aria-label="Da oportunidade à peça" className="relative mt-6">
            <span
              aria-hidden
              data-rd="rail"
              className="absolute bottom-4 left-[5px] top-4 w-px origin-top bg-[var(--line-strong)]"
            />
            {PIECE_STEPS.map((s, i) => {
              const last = i === PIECE_STEPS.length - 1;
              return (
                <li key={s.text} data-rd="step" className="relative grid grid-cols-1 items-baseline gap-x-6 gap-y-1 py-3.5 pl-8 md:grid-cols-[1fr_auto]">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-[1.35rem] size-[11px] rounded-full border ${
                      last
                        ? "border-[var(--signal)] bg-[var(--signal)] shadow-[0_0_0_4px_var(--signal-soft)]"
                        : "border-[var(--fg)] bg-[var(--bg)]"
                    }`}
                  />
                  <span className={`text-[clamp(18px,1.6vw,22px)] font-medium leading-snug tracking-tight ${last ? "text-[var(--signal)]" : ""}`}>
                    {s.text}
                  </span>
                  <span className="type-index text-[var(--muted)] md:text-right">{s.who}</span>
                </li>
              );
            })}
          </ol>

          {/* The fictitious case: decommissioning → one-page → meeting. */}
          <div data-reveal className="mt-8 grid grid-cols-[88px_1fr] items-center gap-6 border-t border-[var(--line)] pt-6 md:grid-cols-[110px_1fr]">
            <AssetSketch kind="One-page técnico" />
            <p className="text-[15px] leading-relaxed text-[var(--muted)]">
              <span className="font-medium text-[var(--fg)]">Exemplo:</span> uma
              oportunidade ligada a descomissionamento leva à criação de um
              one-page técnico específico, usado na abordagem ou na reunião.
            </p>
          </div>
        </div>

        {/* The integration, and what it adds up to. */}
        <div data-reveal className="col-span-full mt-6 border-t border-[var(--fg)] pt-8">
          <p aria-label={DISCIPLINES.join(" + ")} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[clamp(24px,3vw,46px)] font-semibold leading-[1.1] tracking-[-0.025em]">
            {DISCIPLINES.map((d, i) => (
              <span key={d} aria-hidden className="flex items-baseline gap-x-3">
                {i > 0 && <span className="font-normal text-[var(--signal)]">+</span>}
                <span data-rd="disc">{d}</span>
              </span>
            ))}
          </p>
          <p className="type-lead mt-8 max-w-[52ch] text-[var(--muted)]">
            Prospecção, marketing, conteúdo e CRM deixam de ser frentes separadas
            e passam a funcionar como uma capacidade integrada de geração de
            oportunidades.
          </p>
        </div>
      </div>
    </Section>
  );
}
