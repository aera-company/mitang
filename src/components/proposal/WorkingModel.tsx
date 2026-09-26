"use client";

import { useRef } from "react";
import { ACTS, CADENCE, JOINT, type CadenceLane } from "@/lib/constants";
import { playWorkingModel } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

const WEEKS = ["S1", "S2", "S3", "S4"];

/* One lane of the month: the glyph says the rhythm without fixing a
   quantity — periodic presence is drawn as an intermittent line, not as
   a count of visits. */
function Glyph({ kind }: { kind: CadenceLane["kind"] }) {
  return (
    <div aria-hidden className="relative h-5">
      <span className="absolute inset-x-0 top-1/2 h-px bg-[var(--line)]" />
      {kind === "weekly" &&
        WEEKS.map((w, i) => (
          <span
            key={w}
            data-wm="mark"
            className="absolute top-1/2 -ml-[4.5px] -mt-[4.5px] size-[9px] rounded-full border border-[var(--fg)] bg-[var(--bg)]"
            style={{ left: `${12.5 + i * 25}%` }}
          />
        ))}
      {kind === "continuous" && (
        <span data-wm="line" className="absolute inset-x-0 top-1/2 -mt-px h-[2px] origin-left bg-[var(--fg)]" />
      )}
      {kind === "periodic" && (
        <span
          data-wm="line"
          className="absolute inset-x-0 top-1/2 -mt-px h-[2px] origin-left"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--fg) 0 14px, transparent 14px 30px)",
          }}
        />
      )}
      {kind === "monthly" && (
        <span data-wm="mark" className="signal-dot absolute right-0 top-1/2 -mt-[3.5px]" />
      )}
    </div>
  );
}

export function WorkingModel() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playWorkingModel);

  return (
    <Section ref={scope} id="atuacao" index="14" label="Modelo de atuação" act={ACTS.operation} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="atuacao-title" className="type-h2 col-span-full lg:col-span-9">
          Próximo ao time.{" "}
          <span className="block text-[var(--muted)]">Flexível na execução.</span>
        </h2>
        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          A operação acontece em formato híbrido, combinando trabalho remoto com
          presença na MITANG nos momentos em que a proximidade acelera decisões,
          entendimento técnico e evolução comercial.
        </p>

        {/* Rhythm and governance — one month, four lanes. */}
        <div className="col-span-full">
          <div className="grid grid-cols-1 gap-x-[var(--gutter)] border-b border-[var(--line-strong)] pb-3 lg:grid-cols-12">
            <p className="type-micro text-[var(--muted)] lg:col-span-6">Ritmo e governança</p>
            <p aria-hidden className="type-index hidden grid-cols-4 text-[var(--muted)] lg:col-span-6 lg:grid">
              {WEEKS.map((w) => (
                <span key={w} className="text-center">
                  {w}
                </span>
              ))}
            </p>
          </div>
          <ul>
            {CADENCE.map((lane) => (
              <li
                key={lane.when}
                data-wm="lane"
                className="grid grid-cols-1 items-center gap-x-[var(--gutter)] gap-y-3 border-b border-[var(--line)] py-5 lg:grid-cols-12"
              >
                <p className="type-index text-[var(--muted)] lg:col-span-2">{lane.when}</p>
                <div className="lg:col-span-4">
                  <p className="text-[17px] font-medium leading-snug">{lane.title}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--muted)]">{lane.detail}</p>
                </div>
                <div className="lg:col-span-6">
                  <Glyph kind={lane.kind} />
                </div>
              </li>
            ))}
          </ul>
          <p data-reveal className="type-index mt-4 text-[var(--muted)]">
            Nos primeiros 90 dias, os encontros presenciais se concentram
            especialmente nos momentos de imersão, estruturação e revisão da
            operação.
          </p>
        </div>

        {/* Intelligence built together. */}
        <div data-reveal className="col-span-full lg:col-span-5">
          <h3 className="text-[clamp(26px,2.6vw,40px)] font-semibold leading-[1.05] tracking-[-0.02em]">
            A inteligência é construída em conjunto.
          </h3>
          <p className="type-body mt-6 text-[var(--muted)]">
            A AERA organiza mercado, contas, sinais, abordagens e processo. A
            MITANG adiciona conhecimento técnico, histórico, relacionamento e
            contexto comercial. Esse ciclo alimenta uma operação cada vez mais
            precisa.
          </p>
        </div>

        <figure data-wm="joint" className="col-span-full lg:col-start-7 lg:col-span-6">
          <div className="grid grid-cols-2 gap-x-[var(--gutter)]">
            {(
              [
                ["AERA", JOINT.aera],
                ["MITANG", JOINT.mitang],
              ] as const
            ).map(([who, items]) => (
              <div key={who} data-wm="side" className="border-t border-[var(--line-strong)] pt-4">
                <p className="type-micro font-semibold">{who}</p>
                <ul className="mt-3 text-[15px] leading-[1.7] text-[var(--muted)]">
                  {items.map((it, i) => (
                    <li key={it}>
                      {i > 0 && <span aria-hidden className="text-[var(--line-strong)]">+ </span>}
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* The two sides converge on one result. */}
          <div aria-hidden className="relative mx-[25%] mt-6 h-8">
            <span data-wm="bracket" className="absolute inset-0 origin-top border-x border-b border-[var(--line-strong)]" />
          </div>
          <div aria-hidden className="mx-auto h-8 w-px origin-top bg-[var(--line-strong)]" data-wm="stem" />
          <figcaption data-wm="result" className="flex flex-col items-center gap-3 pt-2 text-center">
            <span aria-hidden className="signal-dot" />
            <span className="type-h3">Operação mais precisa</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
