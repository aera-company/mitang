"use client";

import { useRef } from "react";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { ACTS } from "@/lib/constants";
import { RADAR_ACCOUNTS } from "@/lib/radar";
import { playIntelligence } from "./motion/intelligenceMotion";
import { Radar, type RadarPoint } from "./ui/Radar";
import { Section } from "./ui/Section";

/* The same fictitious accounts that the MITANG Radar (section 11) opens.
   High fit reads as an active signal. */
const POINTS: RadarPoint[] = RADAR_ACCOUNTS.map((a) => ({
  bearing: a.bearing,
  range: a.range,
  label: a.key,
  active: a.fit === "Alta",
}));

/* What the read records per account (26/09: the full canvas moved into the
   MITANG Radar mockup; here only its fields, to avoid showing it twice). */
const FIELDS = [
  ["Conta", "Empresas e projetos com aderência aos serviços da MITANG."],
  ["Sinal", "O fato que torna a conta relevante agora."],
  ["Aderência", "Quanto a conta se aproxima do perfil prioritário."],
  ["Decisor", "Quem decide, quem influencia e por onde entrar."],
  ["Etapa", "Onde a relação está e qual é o próximo passo."],
] as const;

export function MarketIntelligence() {
  const scope = useRef<HTMLElement>(null);

  useGsapContext(
    scope,
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (active) => playIntelligence(scope.current!, active),
  );

  return (
    <Section
      ref={scope}
      id="inteligencia"
      index="06"
      label="Inteligência de mercado"
      act={ACTS.system}
      state="light"
    >
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="inteligencia-title" className="type-h2 col-span-full lg:col-span-8">
          Antes da abordagem, inteligência.
        </h2>
        <p data-reveal className="type-body col-span-full text-[var(--muted)] lg:col-start-7 lg:col-span-5">
          A operação começa construindo uma leitura viva do mercado: quem pode
          comprar, por quê, em qual contexto e com quais sinais de oportunidade.
        </p>

        {/* Stated before any example — radar and canvas alike: nothing below
            is research (rev. 24/09). */}
        <div data-reveal className="col-span-full border-t border-[var(--line-strong)] pt-6">
          <p className="type-micro inline-flex items-center border border-[var(--fg)] px-2.5 py-1.5 font-semibold">
            Simulação / formato ilustrativo
          </p>
          <p className="type-body mt-4 max-w-[62ch] text-[var(--muted)]">
            As contas marcadas no radar são fictícias. Mostram o formato da
            leitura, não uma pesquisa realizada.
          </p>
        </div>

        <div className="col-span-full flex flex-col items-center gap-6 lg:col-span-4 lg:items-start">
          <div data-mi="radar" className="p-5">
            <Radar size={300} points={POINTS} rings={[0.33, 0.66, 1]} sweep />
          </div>
          <p data-mi="legend" className="type-index flex items-center gap-3 text-[var(--muted)]">
            <span className="signal-dot" /> Aderência alta · sinal ativo
          </p>
        </div>

        <div className="col-span-full lg:col-start-6 lg:col-span-7">
          <p className="type-micro mb-2 text-[var(--muted)]">O que a leitura registra em cada conta</p>
          <dl>
            {FIELDS.map(([k, v]) => (
              <div
                key={k}
                data-mi="row"
                className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-1 border-b border-[var(--line)] py-4 md:grid-cols-[10rem_1fr]"
              >
                <dt className="text-[17px] font-medium">{k}</dt>
                <dd className="text-[15.5px] text-[var(--muted)]">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            data-mi="row"
            href="#radar"
            className="type-index mt-6 inline-flex items-center gap-2 text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--fg)] hover:underline"
          >
            Na operação, essa leitura vive no MITANG Radar · seção 11 <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
