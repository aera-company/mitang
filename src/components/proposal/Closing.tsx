"use client";

import { useRef } from "react";
import { ACTS, CONTACT } from "@/lib/constants";
import { playClosing } from "./motion/commercialMotion";
import { useScene } from "./motion/useScene";
import { Pairing } from "./ui/Marks";
import { Radar } from "./ui/Radar";
import { Section } from "./ui/Section";

const TITLE = ["Começar pelo", "mercado."];

export function Closing() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playClosing);

  return (
    <Section ref={scope} id="proximo-passo" index="16" label="Próximo passo" act={ACTS.closing} state="petrol">
      <div className="aera-grid section-pad relative min-h-[90svh] content-between gap-y-16">
        {/* The hero's plot returns, small: the next point to locate. */}
        <div
          aria-hidden
          className="pointer-events-none col-span-full flex items-center gap-5 lg:absolute lg:right-[var(--margin)] lg:top-[var(--section-y)]"
        >
          <div data-cl="plot" className="p-5">
            <Radar size={148} centreSignal rings={[0.33, 0.66, 1]} tickStep={10} />
          </div>
          <p data-cl="readout" className="type-index text-[var(--muted)]">
            <span className="text-[var(--signal)]">Próximo ponto</span>
            <br />
            Imersão com o time da MITANG
          </p>
        </div>

        <h2 id="proximo-passo-title" className="type-display col-span-full lg:col-span-9">
          {TITLE.map((line) => (
            <span key={line} className="line-mask">
              <span data-cl="line">{line} </span>
            </span>
          ))}
        </h2>

        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          O primeiro passo é uma imersão com o time da MITANG para identificar
          onde estão hoje as melhores oportunidades, como o comercial opera e
          quais frentes devem entrar primeiro no radar.
        </p>

        <div className="relative col-span-full grid grid-cols-1 items-end gap-y-10 pt-8 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <span data-cl="rule" aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--line)]" />
          <div data-reveal className="lg:col-span-6">
            <Pairing />
            <p className="type-index mt-4 text-[var(--muted)]">
              Growth / Inteligência / Comunicação / Tecnologia
            </p>
          </div>
          <div data-reveal className="lg:col-start-7 lg:col-span-6">
            <a
              href={`mailto:${CONTACT.email}?subject=AERA%20%C3%97%20MITANG`}
              className="group relative inline-flex items-baseline gap-4 pb-2 text-[clamp(26px,2.6vw,40px)] font-semibold tracking-[-0.02em] transition-colors hover:text-[var(--signal)]"
            >
              Vamos conversar
              <span
                aria-hidden
                className="text-[0.7em] text-[var(--signal)] transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
              <span
                data-cl="underline"
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--signal)]"
              />
            </a>
            <p className="type-index mt-4 text-[var(--muted)]">{CONTACT.email}</p>
          </div>
        </div>
      </div>
      <footer className="aera-grid pb-8">
        <p className="type-index col-span-full text-[var(--muted)]">
          Documento confidencial · AERA 2026
        </p>
      </footer>
    </Section>
  );
}
