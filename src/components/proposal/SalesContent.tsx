"use client";

import { useRef } from "react";
import { ACTS, SALES_ASSETS } from "@/lib/constants";
import { playSalesContent } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { AssetSketch, type AssetKind } from "./ui/AssetSketch";
import { Section } from "./ui/Section";

/* Where each asset works in the conversation: open, advance, close. */
const STAGES = ["Abre", "Avança", "Fecha"];
const stageOf = (q: string) => (q.startsWith("Abre") ? 0 : q.startsWith("Avança") ? 1 : 2);

export function SalesContent() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playSalesContent);

  return (
    <Section ref={scope} id="conteudo" index="08" label="Comunicação que vende" act={ACTS.operation}>
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="conteudo-title" className="type-h2 col-span-full lg:col-span-10">
          Conteúdo não como fim.{" "}
          <span className="block text-[var(--muted)]">
            Conteúdo como ferramenta comercial.
          </span>
        </h2>

        <blockquote data-reveal className="col-span-full lg:col-start-7 lg:col-span-6">
          <p className="type-body text-[var(--muted)]">
            Cada ativo precisa responder a uma pergunta comercial:
          </p>
          <p className="type-lead mt-3 max-w-none">
            “Isso ajuda a abrir, avançar ou fechar uma conversa?”
          </p>
        </blockquote>

        <ul data-sc="grid" className="col-span-full grid grid-cols-2 items-end gap-x-[var(--gutter)] gap-y-12 md:grid-cols-4 lg:grid-cols-8">
          {SALES_ASSETS.map((a) => {
            const at = stageOf(a.question);
            return (
              <li key={a.name} data-sc="asset" className="group">
                <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1 [&_svg]:transition-colors [&_svg]:duration-300 group-hover:[&_svg]:border-[var(--fg)]">
                  <AssetSketch kind={a.name as AssetKind} />
                </div>
                <p className="mt-4 text-[15px] font-medium leading-tight">{a.name}</p>
                <p aria-hidden className="mt-2 flex gap-[3px]">
                  {STAGES.map((s, i) => (
                    <span
                      key={s}
                      aria-hidden
                      data-sc={i === at ? "stage" : undefined}
                      className={`h-[3px] flex-1 origin-left ${
                        i === at ? "bg-[var(--signal)]" : "bg-[var(--line-strong)]"
                      }`}
                    />
                  ))}
                </p>
                <p className="type-index mt-1.5 text-[var(--muted)]">{a.question}</p>
              </li>
            );
          })}
        </ul>

        <p data-reveal className="type-index col-span-full text-[var(--muted)] lg:col-start-7 lg:col-span-6">
          Formatos e volume definidos no planejamento mensal, pela prioridade
          comercial de cada momento.
        </p>
      </div>
    </Section>
  );
}
