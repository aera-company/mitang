"use client";

import { useRef } from "react";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { ACTS, JOB_WORDS } from "@/lib/constants";
import { playReframe } from "./motion/reframeMotion";
import { Section } from "./ui/Section";

/* Where the post's words land on the desktop stage (% of the stage). */
const WORD_POS = [
  { x: 6, y: 60 },
  { x: 29, y: 73 },
  { x: 57, y: 58 },
  { x: 79, y: 69 },
  { x: 14, y: 85 },
  { x: 63, y: 85 },
];
const CORE = { x: 50, y: 72 };

function JobPost() {
  return (
    <aside
      aria-label="A vaga publicada pela MITANG"
      className="border-l border-[var(--line-strong)] pl-5"
    >
      <p className="type-micro text-[var(--muted)]">Vaga aberta · MITANG</p>
      <p className="type-h3 mt-4">
        Analista / Especialista de Marketing & Lead Generation
      </p>
      <p className="type-body mt-4 text-[var(--muted)]">
        Marketing com forte perfil comercial. Capaz de transformar interesse em
        reuniões qualificadas.
      </p>
    </aside>
  );
}

function Quote() {
  return (
    <blockquote className="type-lead mt-10 max-w-none">
      <p>“Transformar leads em oportunidades comerciais.”</p>
      <footer className="type-micro mt-3 text-[var(--muted)]">
        Da descrição da vaga
      </footer>
    </blockquote>
  );
}

/* The post as origin: the challenge goes beyond one role → the post's words
   come apart and converge on one point → an operation takes the screen. */
export function JobReframe() {
  const scope = useRef<HTMLElement>(null);

  useGsapContext(
    scope,
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (active) => playReframe(scope.current!, active),
  );

  return (
    <Section ref={scope} id="vaga" index="02" label="O ponto de partida" act={ACTS.thesis}>
      {/* ---------- Desktop stage (motion allowed) ---------- */}
      <div className="rf-track rf-desk">
        <div className="rf-stage">
          <div data-rf="intro" className="aera-grid pt-[13vh]">
            <div data-rf="post" className="col-span-4">
              <JobPost />
            </div>
            <div className="col-start-6 col-span-7">
              <h2 data-rf="title" className="type-h2">
                O desafio vai além de uma função.
              </h2>
              <div data-rf="quote">
                <Quote />
              </div>
              {/* The stage below is visual; this is what it says. */}
              <p className="sr-only">
                O que a vaga pede: {JOB_WORDS.join(", ")}. Ele pede uma
                operação.
              </p>
            </div>
          </div>

          <div aria-hidden className="absolute inset-0">
            <p
              data-rf="word"
              className="type-micro absolute text-[var(--muted)]"
              style={{ left: "var(--margin)", top: "50%" }}
            >
              O que a vaga pede
            </p>
            {JOB_WORDS.map((w, i) => (
              <span
                key={w}
                data-rf="word"
                className="absolute flex items-baseline gap-3 whitespace-nowrap"
                style={{
                  left: `calc(var(--margin) + ${WORD_POS[i].x}% * 0.9)`,
                  top: `${WORD_POS[i].y}%`,
                }}
              >
                <span className="type-index text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[clamp(24px,2.1vw,32px)] font-medium tracking-tight">
                  {w}
                </span>
              </span>
            ))}
            <span
              data-rf="core"
              className="signal-dot absolute -ml-[3.5px] -mt-[3.5px]"
              style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }}
            />
          </div>

          <div
            data-rf="op"
            aria-hidden
            className="absolute inset-x-0 bottom-0 px-[var(--margin)] pb-[9vh]"
          >
            <p className="text-[clamp(28px,2.6vw,42px)] font-medium tracking-[-0.02em] text-[var(--muted)]">
              Ele pede uma
            </p>
            <p data-rf="op-word" className="type-operation mt-2 origin-bottom-left">
              operação
              {/* The converged signal lands here and stays as the full stop. */}
              <span data-rf="period" className="text-[var(--signal)]">
                .
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Flow (phones, tablets, reduced motion) ---------- */}
      <div className="rf-flow aera-grid section-pad gap-y-14">
        <div data-reveal className="col-span-full lg:col-span-4">
          <JobPost />
        </div>
        <div data-reveal className="col-span-full lg:col-start-6 lg:col-span-7">
          <h2 id="vaga-title" className="type-h2">
            O desafio vai além de uma função.
          </h2>
          <Quote />
        </div>
        <ul
          aria-label="O que a vaga pede"
          className="col-span-full grid grid-cols-2 gap-x-[var(--gutter)] gap-y-6 border-y border-[var(--line)] py-10 md:grid-cols-3 lg:grid-cols-6"
        >
          {JOB_WORDS.map((w, i) => (
            <li key={w} data-reveal className="flex flex-col gap-2">
              <span className="type-index text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[22px] font-medium tracking-tight">{w}</span>
            </li>
          ))}
        </ul>
        <div data-reveal className="col-span-full">
          <p className="text-[clamp(24px,5vw,40px)] font-medium tracking-[-0.02em] text-[var(--muted)]">
            Ele pede uma
          </p>
          <p className="type-display mt-2">operação.</p>
        </div>
      </div>

      {/* ---------- What MITANG needs (always in flow) ---------- */}
      <div className="aera-grid pb-[var(--section-y)] lg:pt-24">
        <div data-reveal className="col-span-full lg:col-start-6 lg:col-span-7">
          <p className="type-micro text-[var(--muted)]">O que a MITANG precisa</p>
          <p className="type-h3 mt-4 max-w-[26ch] text-[clamp(26px,2.6vw,40px)]">
            Uma operação contínua de geração de oportunidades.
          </p>
          <p className="type-body mt-6 text-[var(--muted)]">
            Não apenas uma pessoa executando tarefas. Uma estrutura conectando
            mercado, comunicação, dados e comercial — porque identificar
            oportunidades, gerar conexão, produzir comunicação, organizar dados
            e acompanhar leads exige mais do que uma única disciplina.
          </p>
        </div>
      </div>
    </Section>
  );
}
