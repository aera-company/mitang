"use client";

import { useRef } from "react";
import { ACTS, AUTOMATION_USES } from "@/lib/constants";
import { playAutomation } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

export function Automation() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playAutomation);

  return (
    <Section ref={scope} id="automacao" index="09" label="IA + automação" act={ACTS.operation}>
      <div className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="automacao-title" className="type-h2 col-span-full lg:col-span-10">
          Menos operação manual.{" "}
          <span className="block">Mais tempo para relacionamento.</span>
        </h2>

        <div data-reveal className="col-span-full lg:col-span-5">
          <p className="type-lead">
            Tecnologia entra onde reduz trabalho repetitivo e aumenta velocidade.
          </p>
          <p className="type-h3 mt-8">A decisão comercial continua humana.</p>
        </div>

        <ol className="col-span-full grid grid-cols-1 gap-x-[var(--gutter)] md:grid-flow-col md:grid-cols-2 md:grid-rows-3 lg:col-start-7 lg:col-span-6">
          {AUTOMATION_USES.map((u, i) => (
            <li
              key={u}
              data-au="use"
              className="flex items-baseline gap-4 border-t border-[var(--line)] py-3"
            >
              <span className="type-index w-6 text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[16px]">{u}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
