import { PIECE_V2 } from "@/lib/v2";
import { AssetSketch } from "./AssetSketch";

const DISCIPLINES = ["inteligência", "comunicação", "design", "tecnologia", "comercial"];

/* V2 — inside the MITANG Radar: when an opportunity asks for a piece,
   the operation creates it (an example of how it works, not a case).
   Renders grid children; motion in radarMotion (`data-hw`). */
export function PieceBlock() {
  return (
    <>
      <div data-reveal className="col-span-full mt-6 border-t border-[var(--line-strong)] pt-10 lg:col-span-5 lg:mt-10">
        <h3 className="text-[clamp(28px,3vw,46px)] font-semibold leading-[1.04] tracking-[-0.026em]">
          Quando a oportunidade pede uma peça,{" "}
          <span className="block text-[var(--muted)]">a operação consegue criar a peça.</span>
        </h3>
        <p aria-label={DISCIPLINES.join(" + ")} className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[17px] font-medium">
          {DISCIPLINES.map((d, i) => (
            <span key={d} aria-hidden className="flex items-baseline gap-x-2">
              {i > 0 && <span className="text-[var(--signal)]">+</span>}
              <span>{d}</span>
            </span>
          ))}
        </p>
      </div>
      <div className="col-span-full lg:col-start-7 lg:col-span-6 lg:mt-10 lg:border-t lg:border-[var(--line-strong)] lg:pt-10">
        <p className="type-micro text-[var(--muted)]">Exemplo de funcionamento</p>
        <div className="mt-5 grid grid-cols-[1fr_84px] items-start gap-6 md:grid-cols-[1fr_104px]">
          <ol aria-label="Da oportunidade à peça">
            {PIECE_V2.map((s, i) => {
              const end = i === PIECE_V2.length - 1;
              return (
                <li
                  key={s}
                  data-hw="piece"
                  className={`flex items-baseline gap-3 py-1.5 text-[clamp(17px,1.5vw,20px)] font-medium ${end ? "text-[var(--signal)]" : ""}`}
                >
                  <span aria-hidden className="type-index w-4 text-[var(--muted)]">{i === 0 ? "" : "↓"}</span>
                  {s}
                </li>
              );
            })}
          </ol>
          <div data-hw="sketch">
            <AssetSketch kind="One-page técnico" />
            <p className="type-index mt-2 text-[var(--muted)]">one-page</p>
          </div>
        </div>
      </div>
    </>
  );
}
