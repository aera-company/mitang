"use client";

import { useRef } from "react";
import { ACTS, TEAM } from "@/lib/constants";
import { playTeam } from "./motion/operationMotion";
import { useScene } from "./motion/useScene";
import { Section } from "./ui/Section";

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="type-h3">{title}</h3>
      <ul className="rule-list mt-6">
        {items.map((it) => (
          <li key={it} className="py-3 text-[17px]">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TeamModel() {
  const scope = useRef<HTMLElement>(null);
  useScene(scope, playTeam);

  return (
    <Section ref={scope} id="time" index="11" label="Como a AERA entra" act={ACTS.operation} state="light">
      <div data-tm="board" className="aera-grid section-pad gap-y-14">
        <h2 data-reveal id="time-title" className="type-h2 col-span-full lg:col-span-10">
          Uma extensão do time.{" "}
          <span className="block text-[var(--muted)]">
            Não um fornecedor distante.
          </span>
        </h2>

        <div data-tm="mitang" className="col-span-full lg:col-span-4">
          <Column title="MITANG" items={TEAM.mitang} />
        </div>

        {/* The shared axis between the two teams. */}
        <div className="col-span-full flex items-center justify-center lg:col-span-4 lg:flex-col">
          <span aria-hidden data-tm="axis" className="h-px flex-1 bg-[var(--line-strong)] lg:h-auto lg:w-px" />
          <p className="type-micro flex flex-col items-center gap-3 px-4 py-4 text-center lg:py-6">
            <span aria-hidden data-tm="junction" className="signal-dot" />
            <span>
              Trabalhando como
              <br />
              um só sistema
            </span>
          </p>
          <span aria-hidden data-tm="axis" className="h-px flex-1 bg-[var(--line-strong)] lg:h-auto lg:w-px" />
        </div>

        <div data-tm="aera" className="col-span-full lg:col-span-4">
          <Column title="AERA" items={TEAM.aera} />
        </div>
      </div>
    </Section>
  );
}
