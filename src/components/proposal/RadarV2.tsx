"use client";

import { useRef } from "react";
import { ACTS_V2, PHASES_V2, RHYTHM } from "@/lib/v2";
import { playRadarV2 } from "./motion/v2Motion";
import { useScene } from "./motion/useScene";
import { RadarApp } from "./ui/RadarApp";
import { Section } from "./ui/Section";

const TICKS = ["D0", "D30", "D60", "D90"];

/* 06 — behind the operation: the MITANG Radar as the service's
   infrastructure (never the service), then the first 90 days and how we
   work. One section: the tool, and the plan that builds it. */
export function RadarV2() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playRadarV2);

  return (
    <Section ref={scope} id="radar" index="06" label="Por trás da operação" act={ACTS_V2.infra}>
      <div className="aera-grid section-pad gap-y-14">
        <div className="col-span-full lg:col-span-8">
          <h2 id="radar-title">
            <span className="line-mask">
              <span data-rd="title" className="type-display">
                MITANG Radar<span className="text-[var(--signal)]">.</span>
              </span>
            </span>
            <span data-reveal className="type-h2 mt-4 block text-[var(--muted)]">
              A camada que dá memória à operação.
            </span>
          </h2>
        </div>
        <p data-reveal className="type-lead col-span-full self-end lg:col-start-8 lg:col-span-5">
          Enquanto a AERA trabalha mercado, campanhas, contatos e oportunidades,
          o Radar organiza o que está acontecendo e o que precisa acontecer
          depois.
        </p>

        <p data-reveal className="col-span-full border-t border-[var(--line-strong)] pt-8 text-[clamp(26px,2.8vw,44px)] font-semibold leading-[1.08] tracking-[-0.025em] lg:col-span-9">
          <span className="text-[var(--muted)]">O Radar não é o serviço.</span>{" "}
          <span className="block">
            É a infraestrutura do serviço<span className="text-[var(--signal)]">.</span>
          </span>
        </p>

        <figure className="col-span-full">
          <RadarApp />
          <figcaption className="type-index mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[var(--muted)]">
            <span>Interface conceitual da V01 · contas, sinais e datas fictícios</span>
            <span>Selecione uma conta ou troque de aba</span>
          </figcaption>
        </figure>

        <p data-reveal className="type-h2 col-span-full lg:col-span-8">O conhecimento não recomeça toda semana.</p>
        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          Cada interação aumenta a inteligência disponível para a próxima
          decisão.
        </p>

        {/* ---------- The first 90 days ---------- */}
        <div id="90-dias" className="col-span-full mt-10 scroll-mt-8 border-t border-[var(--fg)] pt-10 lg:mt-16">
          <h3 data-reveal className="type-h2">Os primeiros 90 dias.</h3>
        </div>

        <div data-nd="timeline" className="col-span-full">
          <div aria-hidden className="relative hidden h-10 lg:block">
            <span data-nd="axis" className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--line-strong)]" />
            <span data-nd="marker" className="signal-dot absolute -bottom-[3px] -left-[3.5px] opacity-0" />
            {TICKS.map((t, i) => (
              <span
                key={t}
                data-nd="tick"
                className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center gap-2 first:translate-x-0 first:items-start last:-translate-x-full last:items-end"
                style={{ left: `${(i / 3) * 100}%` }}
              >
                <span className="type-index text-[var(--muted)]">{t}</span>
                <span className="h-2 w-px bg-[var(--fg)]" />
              </span>
            ))}
          </div>

          <ol className="grid grid-cols-1 gap-x-[var(--gutter)] lg:grid-cols-3">
            {PHASES_V2.map((p, i) => (
              <li
                key={p.verb}
                data-nd="phase"
                className="relative border-l border-[var(--line-strong)] pb-12 pl-6 lg:border-l-0 lg:pb-0 lg:pl-0 lg:pt-10"
              >
                <span aria-hidden className="absolute -left-[5px] top-1 size-[9px] rounded-full bg-[var(--fg)] lg:hidden" />
                <p className="type-index text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")} · {p.range}
                </p>
                <h4 className="mt-3 text-[clamp(30px,2.8vw,44px)] font-semibold leading-none tracking-[-0.03em]">{p.verb}</h4>
                <ul className="mt-6 text-[15.5px] leading-[1.75]">
                  {p.items.map((it) => (
                    <li key={it} className={it.includes("Radar") ? "flex items-center gap-2" : "text-[var(--muted)]"}>
                      {it.includes("Radar") && <span aria-hidden data-tag="dot" className="size-[5px] bg-[var(--signal)]" />}
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* How we work — compact. */}
        <div data-reveal className="col-span-full border-t border-[var(--line-strong)] pt-6">
          <p className="type-micro text-[var(--muted)]">Como trabalhamos</p>
          <dl className="mt-6 grid grid-cols-1 gap-x-[var(--gutter)] gap-y-6 md:grid-cols-2 lg:grid-cols-4">
            {RHYTHM.map((r) => (
              <div key={r.when}>
                <dt className="type-index text-[var(--muted)]">{r.when}</dt>
                <dd className="mt-2 text-[16px] leading-snug">{r.what}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="col-span-full lg:col-start-6 lg:col-span-7">
          <p className="text-[clamp(26px,2.6vw,40px)] font-semibold leading-[1.05] tracking-[-0.02em]">
            A inteligência é construída em conjunto.
          </p>
          <p className="type-body mt-5 text-[var(--muted)]">
            A MITANG traz conhecimento técnico e contexto de mercado. A AERA
            transforma isso em estratégia, comunicação, ativação e processo
            comercial.
          </p>
        </div>
      </div>
    </Section>
  );
}
