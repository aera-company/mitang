"use client";

import { useRef } from "react";
import { ACTS_V2, COMPETENCIES, RESPONSES } from "@/lib/v2";
import { playAdds } from "./motion/v2Motion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

/* 05 — why AERA, shown rather than compared: an opportunity asks for a
   response (not a piece), five connected competencies, and technical
   expertise turned into communication that opens conversations. */
export function Adds() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playAdds);

  return (
    <Section ref={scope} id="adiciona" index="05" label="O que a AERA adiciona" act={ACTS_V2.operation} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="adiciona-title" className="type-h2 col-span-full lg:col-span-10">
          Mais capacidade para cada oportunidade.
        </h2>

        {/* A response, not a piece. */}
        <div data-reveal className="col-span-full lg:col-span-5">
          <p className="text-[clamp(28px,3vw,46px)] font-semibold leading-[1.04] tracking-[-0.026em]">
            Uma oportunidade não pede necessariamente uma peça.{" "}
            <span className="block text-[var(--signal)]">Ela pede uma resposta.</span>
          </p>
        </div>
        <div className="col-span-full lg:col-start-7 lg:col-span-6">
          <p className="type-micro text-[var(--muted)]">Um sinal de mercado pode exigir</p>
          <ol data-ad="responses" className="relative mt-5">
            <span aria-hidden data-ad="rail" className="absolute bottom-4 left-[5px] top-4 w-px origin-top bg-[var(--line-strong)]" />
            {RESPONSES.map((r, i) => (
              <li key={r} data-ad="response" className="relative flex items-baseline gap-4 py-1.5 pl-8">
                <span aria-hidden className="absolute left-0 top-[0.95rem] size-[11px] rounded-full border border-[var(--fg)] bg-[var(--bg)]" />
                <span className="type-index w-5 text-[var(--muted)]">{i === 0 ? "" : "ou"}</span>
                <span className="text-[clamp(19px,1.6vw,23px)] font-medium tracking-tight">{r}</span>
              </li>
            ))}
            <li data-ad="response" className="relative flex items-baseline gap-4 py-1.5 pl-8">
              <span aria-hidden className="absolute left-0 top-[0.95rem] size-[11px] rounded-full border border-[var(--signal)] bg-[var(--signal)] shadow-[0_0_0_4px_var(--signal-soft)]" />
              <span className="type-index w-5 text-[var(--muted)]">ou</span>
              <span className="text-[clamp(19px,1.6vw,23px)] font-medium tracking-tight text-[var(--signal)]">
                uma combinação dessas frentes
              </span>
            </li>
          </ol>
        </div>
        <p data-reveal className="type-lead col-span-full border-t border-[var(--line-strong)] pt-8 lg:col-start-7 lg:col-span-6">
          A diferença da AERA está em conectar inteligência, estratégia,
          prospecção, criação e tecnologia dentro da mesma resposta comercial.
        </p>

        {/* Five connected competencies. */}
        <div data-reveal className="col-span-full mt-8 border-t border-[var(--fg)] pt-8">
          <p aria-label={COMPETENCIES.join(" + ")} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[clamp(30px,4vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {COMPETENCIES.map((c, i) => (
              <span key={c} aria-hidden className="flex items-baseline gap-x-3">
                {i > 0 && <span className="font-normal text-[var(--signal)]">+</span>}
                <span>{c}</span>
              </span>
            ))}
          </p>
        </div>
        <p data-reveal className="type-body col-span-full max-w-none text-[17px] text-[var(--muted)] lg:col-start-7 lg:col-span-6">
          Uma oportunidade pode começar em pesquisa, exigir uma campanha, gerar
          uma landing page, virar abordagem comercial, entrar no CRM e produzir
          aprendizado para a próxima ação, sem precisar trocar de parceiro ou
          reconstruir o processo a cada etapa.
        </p>

        {/* Expertise → communication that sells. */}
        <p data-reveal className="col-span-full mt-8 border-t border-[var(--line-strong)] pt-8 text-[clamp(22px,2vw,30px)] font-medium leading-[1.25] tracking-[-0.015em] lg:col-span-8">
          Transformamos expertise técnica em estratégia, comunicação e ativos
          que ajudam a abrir e avançar conversas comerciais.
        </p>
      </div>
    </Section>
  );
}
