"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  RADAR_ACCOUNTS,
  RADAR_INSIGHTS,
  RADAR_STAGES,
  type Fit,
  type RadarAccount,
} from "@/lib/radar";
import { Radar, type RadarPoint } from "./Radar";

/* MITANG Radar · V01 — a conceptual interface, not a product. Local state
   only (tab, selected account, stage); no backend, no persistence. Every
   value is fictitious and the frame says so in its top bar. */

const TABS = [
  { id: "radar", label: "Radar" },
  { id: "contas", label: "Contas" },
  { id: "decisores", label: "Decisores" },
  { id: "pipeline", label: "Pipeline" },
  { id: "insights", label: "Insights" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function FitBars({ level }: { level: Fit }) {
  const n = level === "Alta" ? 3 : level === "Média" ? 2 : 1;
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="inline-flex gap-[3px]">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-[9px] w-[3px] ${
              i <= n ? (n === 3 ? "bg-[var(--signal)]" : "bg-[var(--fg)]") : "bg-[var(--line-strong)]"
            }`}
          />
        ))}
      </span>
      <span className="type-index">{level}</span>
    </span>
  );
}

function StageTrack({ stage }: { stage: number }) {
  return (
    <span aria-hidden className="flex gap-[3px]">
      {RADAR_STAGES.map((s, i) => (
        <span
          key={s.short}
          className={`h-[3px] flex-1 transition-colors duration-500 ${
            i < stage ? "bg-[var(--fg)]" : i === stage ? "bg-[var(--signal)]" : "bg-[var(--line-strong)]"
          }`}
        />
      ))}
    </span>
  );
}

/** Person state: conversation is the live one. */
function PersonState({ state }: { state: string }) {
  const live = state === "Em conversa";
  const touched = live || state === "Contato iniciado";
  return (
    <span className={`type-index inline-flex items-center gap-2 ${touched ? "" : "text-[var(--muted)]"}`}>
      <span
        aria-hidden
        className={`size-[6px] rounded-full ${
          live ? "bg-[var(--signal)]" : touched ? "bg-[var(--fg)]" : "border border-[var(--line-strong)]"
        }`}
      />
      {state}
    </span>
  );
}

type Row = RadarAccount & { stageNow: number };

/** "29 jul" → sortable number (the simulation spans jul–ago). */
const MONTHS: Record<string, number> = { jul: 7, ago: 8, set: 9 };
const dayOf = (d: string) => {
  const [day, mon] = d.split(" ");
  return (MONTHS[mon] ?? 0) * 100 + Number(day);
};

const rowBtn =
  "w-full text-left transition-colors duration-200 hover:bg-[var(--signal-soft)] aria-pressed:bg-[var(--signal-soft)]";

export function RadarApp() {
  const uid = useId();
  const [tab, setTab] = useState<TabId>("radar");
  const [selected, setSelected] = useState("A");
  const [stages, setStages] = useState<Record<string, number>>(() =>
    Object.fromEntries(RADAR_ACCOUNTS.map((a) => [a.key, a.stage])),
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const rows: Row[] = RADAR_ACCOUNTS.map((a) => ({ ...a, stageNow: stages[a.key] }));
  const acc = rows.find((r) => r.key === selected)!;
  const last = RADAR_STAGES.length - 1;

  const advance = () =>
    setStages((s) => ({ ...s, [acc.key]: Math.min(last, s[acc.key] + 1) }));
  const reset = () =>
    setStages(Object.fromEntries(RADAR_ACCOUNTS.map((a) => [a.key, a.stage])));

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const n = TABS.length;
    const to =
      e.key === "ArrowRight" ? (i + 1) % n
      : e.key === "ArrowLeft" ? (i - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : -1;
    if (to < 0) return;
    e.preventDefault();
    setTab(TABS[to].id);
    tabRefs.current[to]?.focus();
  };

  const pick = (key: string) => setSelected(key);
  const points: RadarPoint[] = rows.map((r) => ({
    bearing: r.bearing,
    range: r.range,
    label: r.key,
    active: r.fit === "Alta",
  }));
  const people = rows.reduce((n, r) => n + r.people.length, 0);

  return (
    <div data-rd="app" className="rd-app border border-[var(--line-strong)]">
      {/* Top bar: name, version, and the simulation flag — always visible. */}
      <div data-rd="bar" className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-[var(--line-strong)] px-4 py-3 md:px-6">
        <p className="flex items-center gap-3">
          <span aria-hidden className="signal-dot" />
          <span className="text-[14px] font-semibold tracking-[0.01em]">MITANG Radar</span>
          <span className="type-index border border-[var(--line-strong)] px-1.5 text-[var(--muted)]">V01</span>
        </p>
        <p className="flex items-center gap-4">
          <span className="type-index hidden text-[var(--muted)] md:inline">Semana 06</span>
          <span className="type-micro border border-[var(--fg)] px-2 py-0.5 font-semibold">
            Simulação / dados fictícios
          </span>
        </p>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Áreas do MITANG Radar"
        className="rd-tabs flex overflow-x-auto border-b border-[var(--line-strong)] px-2 md:px-4"
      >
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            type="button"
            data-rd="tab"
            id={`${uid}-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`${uid}-panel`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={`type-micro relative shrink-0 px-3 py-3.5 transition-colors duration-200 md:px-4 ${
              tab === t.id ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            {t.label}
            <span
              aria-hidden
              className={`absolute inset-x-3 -bottom-px h-[2px] transition-colors duration-200 md:inset-x-4 ${
                tab === t.id ? "bg-[var(--signal)]" : "bg-transparent"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Main panel */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${tab}`}
          tabIndex={0}
          className="min-w-0 p-4 md:p-6 lg:col-span-8 lg:min-h-[500px] lg:p-8"
        >
          <div key={tab} className="rd-in">
            {tab === "radar" && (
              <div>
                <dl className="grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
                  {[
                    ["Contas no radar", rows.length],
                    ["Aderência alta", rows.filter((r) => r.fit === "Alta").length],
                    ["Decisores mapeados", people],
                    ["Próximas ações", rows.length],
                  ].map(([k, v]) => (
                    <div key={k} data-rd="item" className="bg-[var(--bg)] px-3 py-3">
                      <dt className="type-index text-[var(--muted)]">{k}</dt>
                      <dd className="mt-1 text-[22px] font-semibold tabular-nums tracking-tight">
                        {String(v).padStart(2, "0")}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 grid grid-cols-1 items-start gap-8 md:grid-cols-[auto_1fr]">
                  <div data-rd="item" className="flex justify-center p-4">
                    <Radar size={236} points={points} rings={[0.33, 0.66, 1]} tickStep={10} highlight={selected} />
                  </div>
                  <div className="min-w-0">
                    <p className="type-micro mb-3 text-[var(--muted)]">Sinais recentes</p>
                    <ul>
                      {[...rows]
                        .sort((a, b) => dayOf(b.signalWhen) - dayOf(a.signalWhen))
                        .map((r) => (
                          <li key={r.key} data-rd="item" className="border-t border-[var(--line)]">
                            <button
                              type="button"
                              aria-pressed={selected === r.key}
                              onClick={() => pick(r.key)}
                              className={`${rowBtn} grid grid-cols-[1.5rem_1fr_auto] items-baseline gap-x-3 px-2 py-3`}
                            >
                              <span className={`type-index ${r.fit === "Alta" ? "text-[var(--signal)]" : "text-[var(--muted)]"}`}>
                                {r.key}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[14.5px] font-medium">{r.name}</span>
                                <span className="block text-[13.5px] leading-snug text-[var(--muted)]">{r.signal}</span>
                              </span>
                              <span className="type-index text-[var(--muted)]">{r.signalWhen}</span>
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {tab === "contas" && (
              <div>
                <div
                  aria-hidden
                  className="type-micro hidden grid-cols-[1.3fr_1fr_0.8fr_1.5fr_1fr] gap-x-4 border-b border-[var(--line-strong)] px-2 pb-3 text-[var(--muted)] md:grid"
                >
                  <span>Conta</span>
                  <span>Segmento</span>
                  <span>Aderência</span>
                  <span>Serviço MITANG</span>
                  <span>Etapa</span>
                </div>
                <ul>
                  {rows.map((r) => (
                    <li key={r.key} data-rd="item" className="border-b border-[var(--line)]">
                      <button
                        type="button"
                        aria-pressed={selected === r.key}
                        onClick={() => pick(r.key)}
                        className={`${rowBtn} grid grid-cols-2 gap-x-4 gap-y-2 px-2 py-4 md:grid-cols-[1.3fr_1fr_0.8fr_1.5fr_1fr] md:items-center`}
                      >
                        <span className="col-span-2 text-[15px] font-medium md:col-span-1">{r.name}</span>
                        <span className="text-[14px] text-[var(--muted)]">{r.segment}</span>
                        <span>
                          <FitBars level={r.fit} />
                        </span>
                        <span className="text-[14px]">{r.service}</span>
                        <span className="flex flex-col gap-1.5">
                          <StageTrack stage={r.stageNow} />
                          <span className="type-index text-[var(--muted)]">{RADAR_STAGES[r.stageNow].short}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "decisores" && (
              <div>
                <div
                  aria-hidden
                  className="type-micro hidden grid-cols-[1fr_1.4fr_1fr] gap-x-4 border-b border-[var(--line-strong)] px-2 pb-3 text-[var(--muted)] md:grid"
                >
                  <span>Conta</span>
                  <span>Perfil</span>
                  <span>Situação</span>
                </div>
                <ul>
                  {rows.map((r) => (
                    <li key={r.key} data-rd="item" className="border-b border-[var(--line)]">
                      <button
                        type="button"
                        aria-pressed={selected === r.key}
                        onClick={() => pick(r.key)}
                        className={`${rowBtn} grid grid-cols-1 gap-x-4 gap-y-2 px-2 py-4 md:grid-cols-[1fr_2.4fr]`}
                      >
                        <span className="text-[15px] font-medium">{r.name}</span>
                        <span className="flex flex-col gap-2">
                          {r.people.map((p) => (
                            <span key={p.role} className="grid grid-cols-[1.4fr_1fr] gap-x-4">
                              <span className="text-[14px]">{p.role}</span>
                              <PersonState state={p.state} />
                            </span>
                          ))}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="type-index mt-4 text-[var(--muted)]">
                  Perfis por função. Nomes entram só na operação real, com a MITANG.
                </p>
              </div>
            )}

            {tab === "pipeline" && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-3">
                {RADAR_STAGES.map((s, i) => {
                  const inStage = rows.filter((r) => r.stageNow === i);
                  return (
                    <div key={s.short} data-rd="item" className="min-w-0">
                      <p className="flex flex-wrap items-baseline justify-between gap-x-2 border-b border-[var(--line-strong)] pb-2">
                        <span className={`type-micro ${i === last ? "text-[var(--signal)]" : "text-[var(--muted)]"}`}>
                          {s.short}
                        </span>
                        <span className="type-index text-[var(--muted)]">{String(inStage.length).padStart(2, "0")}</span>
                      </p>
                      <ul className="mt-2 flex flex-col gap-2">
                        {inStage.map((r) => (
                          <li key={r.key}>
                            <button
                              type="button"
                              aria-pressed={selected === r.key}
                              onClick={() => pick(r.key)}
                              className={`${rowBtn} border border-[var(--line)] px-2.5 py-2.5`}
                            >
                              <span className="block text-[14px] font-medium leading-tight">{r.name}</span>
                              <span className="mt-1.5 block">
                                <FitBars level={r.fit} />
                              </span>
                            </button>
                          </li>
                        ))}
                        {!inStage.length && (
                          <li className="type-index border border-dashed border-[var(--line)] px-2.5 py-2.5 text-[var(--muted)]">
                            vazio
                          </li>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === "insights" && (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {(
                  [
                    ["Aprendizados do ciclo", RADAR_INSIGHTS.learnings],
                    ["Prioridades do próximo ciclo", RADAR_INSIGHTS.priorities],
                  ] as const
                ).map(([title, items]) => (
                  <div key={title} data-rd="item">
                    <p className="type-micro border-b border-[var(--line-strong)] pb-3 text-[var(--muted)]">{title}</p>
                    <ol>
                      {items.map((it, i) => (
                        <li key={it} className="flex gap-4 border-b border-[var(--line)] py-4">
                          <span className="type-index w-5 shrink-0 text-[var(--muted)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[15px] leading-snug">{it}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
                <p className="type-index text-[var(--muted)] md:col-span-2">
                  Leituras de exemplo. Na operação, nascem das respostas, reuniões e objeções registradas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Inspector: the selected account. */}
        <aside
          aria-label="Conta selecionada"
          className="min-w-0 border-t border-[var(--line-strong)] p-4 md:p-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-8"
        >
          <p className="sr-only" aria-live="polite">
            {acc.name} selecionada, {RADAR_STAGES[acc.stageNow].status}
          </p>
          <p data-rd="field" className="type-micro text-[var(--muted)]">Conta selecionada</p>
          <div key={acc.key} className="rd-in">
            <p data-rd="field" className="mt-3 text-[26px] font-semibold leading-none tracking-[-0.02em]">
              {acc.name}
            </p>
            <dl className="mt-6">
              {(
                [
                  ["Conta", acc.segment],
                  ["Aderência", <FitBars key="f" level={acc.fit} />],
                  ["Sinal identificado", acc.signal],
                  ["Serviço MITANG relacionado", acc.service],
                  ["Decisores", `${acc.people.length} identificado${acc.people.length > 1 ? "s" : ""}`],
                  ["Último contato", acc.lastContact],
                  ["Próxima ação", acc.nextAction],
                ] as const
              ).map(([k, v]) => (
                <div key={k} data-rd="field" className="grid grid-cols-[8.5rem_1fr] gap-x-3 border-t border-[var(--line)] py-2.5">
                  <dt className="type-index pt-0.5 text-[var(--muted)]">{k}</dt>
                  <dd className={`text-[14px] leading-snug ${k === "Próxima ação" ? "font-medium" : ""}`}>{v}</dd>
                </div>
              ))}
              <div data-rd="field" className="border-t border-[var(--line)] pt-3">
                <dt className="type-index text-[var(--muted)]">Status</dt>
                <dd className="mt-2">
                  <span className="block text-[14px] font-medium text-[var(--signal)]">
                    {RADAR_STAGES[acc.stageNow].status}
                  </span>
                  <span className="mt-2.5 block">
                    <StageTrack stage={acc.stageNow} />
                  </span>
                </dd>
              </div>
            </dl>
          </div>
          <div data-rd="field" className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={advance}
              disabled={acc.stageNow === last}
              className="type-micro inline-flex items-center gap-2 border border-[var(--fg)] px-3 py-2 transition-colors duration-200 hover:bg-[var(--fg)] hover:text-[var(--bg)] disabled:cursor-default disabled:border-[var(--line-strong)] disabled:text-[var(--muted)] disabled:hover:bg-transparent"
            >
              {acc.stageNow === last ? "Com o comercial" : "Avançar etapa →"}
            </button>
            <button type="button" onClick={reset} className="type-index text-[var(--muted)] underline-offset-4 hover:underline">
              Reiniciar simulação
            </button>
          </div>
        </aside>
      </div>

      {/* AERA AI Brief — secondary: preparation, not decision. */}
      <section
        aria-label="AERA AI Brief"
        className="border-t border-[var(--line-strong)] p-4 md:p-6 lg:p-8"
      >
        <div data-rd="brief" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="flex items-baseline gap-3">
            <span className="type-micro font-semibold">AERA AI Brief</span>
            <span className="type-index text-[var(--muted)]">{acc.name}</span>
          </p>
          <p className="type-index text-[var(--muted)]">Rascunho de preparação · revisar antes de usar</p>
        </div>
        <dl key={acc.key} className="rd-in mt-5 grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["O que sabemos", acc.brief.know],
              ["Por que pode ser relevante", acc.brief.why],
              ["Serviço MITANG relacionado", acc.service],
              ["Quem abordar", acc.brief.who],
              ["Histórico da relação", acc.brief.history],
              ["Última interação", acc.lastContact],
              ["Próxima ação sugerida", acc.nextAction],
              ["Materiais para a conversa", acc.brief.materials],
            ] as const
          ).map(([k, v]) => (
            <div key={k} data-rd="brief" className="border-t border-[var(--line)] py-3">
              <dt className="type-index text-[var(--muted)]">{k}</dt>
              <dd className="mt-1 text-[13.5px] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
        <p data-rd="brief" className="mt-5 flex flex-wrap gap-x-2 text-[14px]">
          <span className="text-[var(--muted)]">A IA organiza contexto e acelera preparação.</span>
          <span className="font-medium">A decisão comercial continua humana.</span>
        </p>
      </section>
    </div>
  );
}
