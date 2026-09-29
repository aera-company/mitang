import { HANDOFF } from "@/lib/v2";

/* Where AERA ends and MITANG begins (V2, inside "Como a operação funciona").
   One path, two owners: AERA's stretch carries the signal line up to the
   meeting; MITANG takes it from technical validation to closing. Renders
   grid children; motion in v2Motion `playHandoff`. */
const ALL = [...HANDOFF.aera, ...HANDOFF.mitang];
const CUT = HANDOFF.aera.length; // first MITANG step
const pct = (i: number) => `${(i / (ALL.length - 1)) * 100}%`;

export function Handoff() {
  return (
    <>
        {/* Desktop: one axis, two owners. */}
        <div data-bd="axis" className="col-span-full hidden lg:block">
          <div className="relative mx-[3%]">
            <div className="relative h-10">
              <div className="absolute top-0" style={{ left: 0, width: `calc(${pct(CUT - 1)} + 2%)` }}>
                <span data-bd="bracket-a" className="block h-2 origin-left border-x border-t border-[var(--signal)]" />
                <span className="type-micro mt-2 block font-semibold text-[var(--signal)]">AERA</span>
              </div>
              <div className="absolute top-0" style={{ left: `calc(${pct(CUT)} - 2%)`, right: 0 }}>
                <span data-bd="bracket-m" className="block h-2 origin-right border-x border-t border-[var(--fg)]" />
                <span className="type-micro mt-2 block text-right font-semibold">MITANG</span>
              </div>
            </div>
            <div className="relative mt-6 h-px">
              <span data-bd="line-a" className="absolute inset-y-0 left-0 origin-left bg-[var(--signal)]" style={{ width: pct(CUT - 1) }} />
              <span data-bd="line-m" className="absolute inset-y-0 right-0 origin-left bg-[var(--fg)]" style={{ left: pct(CUT - 1) }} />
              {ALL.map((s, i) => (
                <span
                  key={s}
                  data-bd="node"
                  className={`absolute top-1/2 -ml-[5px] -mt-[5px] size-[10px] rounded-full border ${
                    i === CUT - 1
                      ? "border-[var(--signal)] bg-[var(--signal)] shadow-[0_0_0_4px_var(--signal-soft)]"
                      : i < CUT
                        ? "border-[var(--signal)] bg-[var(--bg)]"
                        : "border-[var(--fg)] bg-[var(--bg)]"
                  }`}
                  style={{ left: pct(i) }}
                />
              ))}
            </div>
            <ol aria-hidden className="relative mt-5 h-16">
              {ALL.map((s, i) => (
                <li
                  key={s}
                  data-bd="step"
                  className={`absolute w-[8.5%] -translate-x-1/2 text-center text-[15px] leading-tight ${
                    i === CUT - 1 ? "font-semibold text-[var(--signal)]" : i < CUT ? "" : "font-medium"
                  }`}
                  style={{ left: pct(i) }}
                >
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Readable lists (all sizes; desktop reads the axis above). */}
        <div className="col-span-full grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-[var(--gutter)] lg:sr-only">
          {(
            [
              ["AERA", HANDOFF.aera, true],
              ["MITANG", HANDOFF.mitang, false],
            ] as const
          ).map(([who, steps, aera]) => (
            <div key={who} data-reveal className={`border-t pt-4 ${aera ? "border-[var(--signal)]" : "border-[var(--fg)]"}`}>
              <p className={`type-micro font-semibold ${aera ? "text-[var(--signal)]" : ""}`}>{who}</p>
              <ol className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[19px] font-medium tracking-tight">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-2">
                    {i > 0 && <span aria-hidden className="text-[var(--muted)]">→</span>}
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

    </>
  );
}
