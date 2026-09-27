"use client";

import { useRef } from "react";
import { ACTS } from "@/lib/constants";
import { playAutomation } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

/* Kept short on purpose (27/09): the MITANG Radar (section 11) is where the
   technology becomes concrete; here it is only named. */
export function Automation() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playAutomation);

  return (
    <Section ref={scope} id="automacao" index="09" label="IA + automação" act={ACTS.operation}>
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="automacao-title" className="type-h2 col-span-full lg:col-span-9">
          Tecnologia onde ela faz diferença.
        </h2>
        <p data-reveal className="type-lead col-span-full lg:col-start-7 lg:col-span-6">
          Pesquisa, organização, preparação e follow-up ganham velocidade. O
          relacionamento e a decisão comercial continuam humanos.
        </p>
      </div>
    </Section>
  );
}
