"use client";

import { useRef } from "react";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { ACTS, PROBLEM_CHAIN } from "@/lib/constants";
import { playRealProblem } from "./motion/problemMotion";
import { MITANG_PHOTO, MitangPhoto } from "./ui/MitangPhoto";
import { Section } from "./ui/Section";

/** Word spans for the scrubbed colour shift (text stays one sentence). */
function Words({ text, name }: { text: string; name: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} data-rp={name}>
          {w}{" "}
        </span>
      ))}
    </>
  );
}

export function RealProblem() {
  const scope = useRef<HTMLElement>(null);

  useGsapContext(
    scope,
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (active) => playRealProblem(scope.current!, active),
  );

  return (
    <Section
      ref={scope}
      id="problema"
      index="03"
      label="O problema real"
      act={ACTS.thesis}
      state="light"
    >
      <div className="aera-grid section-pad gap-y-16">
        {/* Emphasis moves from line 1 to line 2 as it is read (scrubbed). */}
        <h2 data-rp="title" id="problema-title" className="type-h2 col-span-full lg:col-span-10">
          <span className="block">
            <Words text="O desafio não é gerar leads." name="w1" />
          </span>
          <span className="block text-[var(--muted)]">
            <Words text="É saber quais leads importam." name="w2" />
          </span>
        </h2>

        {/* The single MITANG photograph (placement B, chosen 26/09): an
            editorial pause between the thesis and the reading of the market. */}
        <figure data-rp="photo" className="col-span-full">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[21/9]">
            <MitangPhoto
              sizes="(min-width: 1024px) calc(100vw - 96px), 100vw"
              className="rp-photo object-[50%_64%]"
            />
          </div>
          <figcaption className="type-index mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[var(--muted)]">
            <span>Operação de survey · convés de embarcação</span>
            <span>{MITANG_PHOTO.credit}</span>
          </figcaption>
        </figure>

        {/* MITANG context — only to show we understand the market (§4). */}
        <div data-rp="context" className="col-span-full lg:col-span-5">
          <p className="type-micro text-[var(--muted)]">Survey offshore</p>
          <p className="type-h3 mt-4 max-w-[22ch]">
            Quando a precisão importa mais que o volume.
          </p>
          <p className="type-body mt-6 text-[var(--muted)]">
            Em vendas B2B técnicas, volume sozinho não resolve. Contexto,
            timing, relacionamento e precisão fazem a diferença.
          </p>
          <ul className="mt-10 text-[clamp(24px,2.2vw,32px)] font-semibold leading-[1.15] tracking-tight">
            <li>Projeto certo.</li>
            <li>Empresa certa.</li>
            <li>Decisor certo.</li>
            <li>Momento certo.</li>
          </ul>
        </div>

        {/* The chain: each step enters as it is reached. */}
        <div className="col-span-full lg:col-start-7 lg:col-span-6">
          <ol data-rp="chain" aria-label="Do mercado à oportunidade" className="relative">
            <span
              aria-hidden
              data-rp="rail"
              className="absolute bottom-3 left-[5px] top-3 w-px origin-top bg-[var(--line-strong)]"
            />
            {PROBLEM_CHAIN.map((step, i) => {
              const last = i === PROBLEM_CHAIN.length - 1;
              return (
                <li key={step} data-rp="step" className="relative flex items-baseline gap-6 py-3 pl-8">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 size-[11px] -translate-y-1/2 rounded-full border ${
                      last
                        ? "border-[var(--signal)] bg-[var(--signal)] shadow-[0_0_0_4px_var(--signal-soft)]"
                        : "border-[var(--fg)] bg-[var(--bg)]"
                    }`}
                  />
                  <span className="type-index w-6 text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[clamp(22px,2vw,30px)] font-medium tracking-tight ${
                      last ? "text-[var(--signal)]" : ""
                    }`}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="type-body mt-10 text-[var(--muted)]">
            Em mercados B2B técnicos, o volume sozinho não cria negócio. A
            oportunidade nasce da combinação entre relevância, timing e contexto
            comercial.
          </p>
        </div>
      </div>
    </Section>
  );
}
