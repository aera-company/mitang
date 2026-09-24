"use client";

import { useRef } from "react";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { ABM_ROLES, ACTS } from "@/lib/constants";
import { playABM } from "./motion/abmMotion";
import { Section } from "./ui/Section";

/* One account at the centre, six roles around it, a different entry
   arriving at each one (the arrow). Desktop = orbit diagram; mobile = list. */
const f = (n: number) => Math.round(n * 100) / 100;

function AccountOrbit() {
  const R = 140;
  return (
    <svg viewBox="-400 -262 800 524" className="w-full overflow-visible" aria-hidden>
      <defs>
        <marker id="abm-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1 L7 4 L1 7" fill="none" stroke="var(--signal)" strokeWidth="1.2" />
        </marker>
      </defs>
      <circle data-abm="ring" pathLength={1} r={R} fill="none" stroke="var(--line-strong)" transform="rotate(-90)" />
      <circle data-abm="inner" r={R * 0.55} fill="none" stroke="var(--line)" strokeDasharray="2 4" />
      <g data-abm="core">
        <circle r="46" fill="var(--signal-soft)" stroke="var(--signal)" />
        <text
          textAnchor="middle"
          y="-2"
          fontSize="11"
          fill="var(--signal)"
          style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          Conta
        </text>
        <text textAnchor="middle" y="13" fontSize="9.5" fill="var(--muted)" fontFamily="var(--font-mono-src)">
          estratégica
        </text>
      </g>
      {ABM_ROLES.map((r, i) => {
        const a = (i / ABM_ROLES.length) * Math.PI * 2 - Math.PI / 2;
        const c = Math.cos(a);
        const sn = Math.sin(a);
        const x = f(c * R);
        const y = f(sn * R);
        const centre = Math.abs(c) < 0.01;
        const right = c > 0.01;
        const L = R * 1.42;
        const tx = f(centre ? 0 : c * L);
        const ty = f(centre ? sn * L + (sn < 0 ? -12 : 14) : sn * L - 4);
        const anchor = centre ? "middle" : right ? "start" : "end";
        return (
          <g key={r.role}>
            <line data-abm="spoke" pathLength={1} x1={f(c * 50)} y1={f(sn * 50)} x2={x} y2={y} stroke="var(--line-strong)" />
            <line
              data-abm="arrow"
              pathLength={1}
              x1={f(c * R * 1.3)}
              y1={f(sn * R * 1.3)}
              x2={f(c * (R + 9))}
              y2={f(sn * (R + 9))}
              stroke="var(--signal)"
              markerEnd="url(#abm-arrow)"
            />
            <circle data-abm="node" cx={x} cy={y} r="5" fill="var(--bg)" stroke="var(--fg)" />
            <g data-abm="label">
              <text x={tx} y={ty} textAnchor={anchor} fontSize="15" fontWeight="600" fill="var(--fg)">
                {r.role}
              </text>
              <text x={tx} y={ty + 17} textAnchor={anchor} fontSize="12" fill="var(--muted)">
                {r.entry}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export function ABM() {
  const scope = useRef<HTMLElement>(null);

  useGsapContext(
    scope,
    {
      desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (active) => playABM(scope.current!, active),
  );

  return (
    <Section ref={scope} id="abm" index="07" label="Account based marketing" act={ACTS.system} state="light">
      <div className="aera-grid section-pad gap-y-14">
        <div data-reveal className="col-span-full lg:col-span-5">
          <h2 id="abm-title" className="type-h2">
            Menos disparo.{" "}
            <span className="block">Mais precisão.</span>
          </h2>
          <p className="type-body mt-8 text-[var(--muted)]">
            Para contas estratégicas, a lógica muda de campanha de massa para
            Account Based Marketing.
          </p>
          <p className="type-h3 mt-10 max-w-[20ch]">
            Uma conta pode ter vários caminhos de entrada.
          </p>
        </div>

        <div data-abm="orbit" className="col-span-full hidden lg:col-start-6 lg:col-span-7 lg:block">
          <AccountOrbit />
        </div>

        <ul aria-label="Perfis dentro de uma conta" className="col-span-full lg:hidden">
          {ABM_ROLES.map((r) => (
            <li
              key={r.role}
              data-abm="row"
              className="flex items-baseline justify-between gap-4 border-t border-[var(--line)] py-4"
            >
              <span className="text-[19px] font-medium">{r.role}</span>
              <span className="flex items-center gap-2 text-[14px] text-[var(--muted)]">
                <span aria-hidden data-abm="row-arrow" className="text-[var(--signal)]">→</span>
                {r.entry}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
