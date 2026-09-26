"use client";

import { useRef } from "react";
import { ACTS, CONTACT } from "@/lib/constants";
import { playClosing } from "./motion/commercialMotion";
import { useScene } from "./motion/useScene";
import { Pairing } from "./ui/Marks";
import { Radar } from "./ui/Radar";
import { Section } from "./ui/Section";
import { useVariant, type Variant } from "./variant";

const mail = (subject: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

/* Commercial closes on the market; the intro closes on a conversation,
   with no commercial or hiring language (26/09). */
const COPY: Record<
  Variant,
  {
    index: string;
    title: string[];
    lead: string;
    readout: string;
    ctas: { label: string; href: string }[];
    note?: string;
  }
> = {
  commercial: {
    index: "18",
    title: ["Começar pelo", "mercado."],
    lead: "O primeiro passo é uma imersão com o time da MITANG para identificar onde estão hoje as melhores oportunidades, como o comercial opera e quais frentes devem entrar primeiro no radar.",
    readout: "Imersão com o time da MITANG",
    ctas: [{ label: "Vamos conversar", href: mail("AERA × MITANG") }],
  },
  intro: {
    index: "17",
    title: ["Começar pela", "conversa."],
    lead: "Uma reunião para entender as prioridades comerciais da MITANG, aprofundar o contexto atual e definir quais frentes devem entrar primeiro na operação.",
    readout: "Conversa com o time da MITANG",
    ctas: [{ label: "Agendar uma conversa", href: mail("AERA × MITANG · Agendar uma conversa") }],
    note: "A partir desse alinhamento, definimos juntos o desenho inicial da operação.",
  },
};

export function Closing() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playClosing);
  const c = COPY[useVariant()];

  return (
    <Section ref={scope} id="proximo-passo" index={c.index} label="Próximo passo" act={ACTS.closing} state="petrol">
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
            {c.readout}
          </p>
        </div>

        <h2 id="proximo-passo-title" className="type-display col-span-full lg:col-span-9">
          {c.title.map((line) => (
            <span key={line} className="line-mask">
              <span data-cl="line">{line} </span>
            </span>
          ))}
        </h2>

        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          {c.lead}
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
            {c.ctas.map((cta, i) =>
              i === 0 ? (
                <a
                  key={cta.label}
                  href={cta.href}
                  className="group relative inline-flex items-baseline gap-4 pb-2 text-[clamp(26px,2.6vw,40px)] font-semibold tracking-[-0.02em] transition-colors hover:text-[var(--signal)]"
                >
                  {cta.label}
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
              ) : (
                <a
                  key={cta.label}
                  href={cta.href}
                  className="type-micro mt-6 flex w-fit items-center gap-3 text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  <span aria-hidden className="h-px w-8 bg-current" />
                  {cta.label}
                </a>
              ),
            )}
            <p className="type-index mt-4 text-[var(--muted)]">{CONTACT.email}</p>
            {c.note && (
              <p className="type-index mt-8 max-w-[44ch] text-[var(--muted)]">{c.note}</p>
            )}
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
