"use client";

import { useRef } from "react";
import { ACCEPT_TERMS, ACTS_V2, PROPOSAL_PDF } from "@/lib/v2";
import { revealOnEnter } from "./motion/reveal";
import { useScene } from "./motion/useScene";
import { Acceptance } from "./ui/Acceptance";
import { Section } from "./ui/Section";

/* 07 — the proposal as a document: download the PDF, then accept it with a
   drawn signature (09/10, same flow as the GAVEA Trade proposal). The page
   itself shows no values; they live in the PDF. */
export function ProposalAccept() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, (root, active) => {
    if (active.reduce) return;
    revealOnEnter(Array.from(root.querySelectorAll("[data-reveal]")));
  });

  return (
    <Section ref={scope} id="proposta" index="07" label="Proposta comercial" act={ACTS_V2.closing} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="proposta-title" className="type-h2 col-span-full lg:col-span-8">
          A proposta, para ler e aprovar<span className="text-[var(--signal)]">.</span>
        </h2>
        <p data-reveal className="type-lead col-span-full self-end lg:col-start-8 lg:col-span-5">
          Escopo, condições e próximos passos estão no documento. Com o
          aceite, partimos para a imersão inicial com liderança e Comercial.
        </p>

        {/* Download */}
        <div data-reveal className="col-span-full border-y border-[var(--fg)] py-8 lg:col-span-12">
          <a
            href={PROPOSAL_PDF.href}
            download={PROPOSAL_PDF.file}
            className="group flex flex-wrap items-center justify-between gap-x-10 gap-y-4"
          >
            <span>
              <span className="type-micro block text-[var(--muted)]">{PROPOSAL_PDF.title}</span>
              <span className="mt-2 flex items-baseline gap-4 text-[clamp(26px,2.6vw,40px)] font-semibold tracking-[-0.02em] transition-colors group-hover:text-[var(--signal)]">
                Baixar proposta em PDF
                <span aria-hidden className="text-[0.7em] text-[var(--signal)] transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </span>
            </span>
            <span className="type-index text-[var(--muted)]">
              {PROPOSAL_PDF.meta} · {PROPOSAL_PDF.version}
            </span>
          </a>
        </div>

        {/* What is being accepted */}
        <div data-reveal className="col-span-full lg:col-span-5">
          <p className="type-micro text-[var(--signal)]">Aceite</p>
          <h3 className="mt-4 text-[clamp(28px,2.8vw,44px)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Assinar a proposta.
          </h3>
          <p className="type-body mt-5 text-[var(--muted)]">
            O aceite sai como uma imagem com as condições, a data, a hora e um
            código de verificação, pronta para enviar à AERA pelo WhatsApp.
          </p>
          <p className="type-micro mt-10 text-[var(--muted)]">O que está sendo aceito</p>
          <dl className="mt-3">
            {ACCEPT_TERMS.map(([k, v]) => (
              <div key={k} className="border-t border-[var(--line)] py-3">
                <dt className="text-[15px] font-medium">{k}</dt>
                <dd className="mt-0.5 text-[15px] text-[var(--muted)]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="type-index mt-6 text-[var(--muted)]">
            Nada fica salvo nesta página. O aceite só sai do seu aparelho quando você enviar.
          </p>
        </div>

        <div data-reveal className="col-span-full lg:col-start-7 lg:col-span-6">
          <Acceptance />
        </div>
      </div>
    </Section>
  );
}
