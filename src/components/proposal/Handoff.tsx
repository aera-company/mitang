import { HANDOFF } from "@/lib/v2";

/* Who does what (inside section 04). AERA's verbs carry the signal rule;
   MITANG's start at the meeting. Renders grid children. */
function Verbs({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[clamp(20px,1.9vw,28px)] font-medium leading-[1.3] tracking-[-0.015em]">
      {items.map((v, i) => (
        <li key={v} data-hd="verb" className="flex items-baseline gap-x-3 whitespace-nowrap">
          {v}
          {i < items.length - 1 && <span aria-hidden className="text-[var(--line-strong)]">·</span>}
        </li>
      ))}
    </ul>
  );
}

export function Handoff() {
  return (
    <>
      <div data-reveal className="col-span-full border-t-2 border-[var(--signal)] pt-5 lg:col-span-7">
        <p className="type-micro font-semibold text-[var(--signal)]">AERA</p>
        <Verbs items={HANDOFF.aera} />
      </div>
      <div data-reveal className="col-span-full border-t-2 border-[var(--fg)] pt-5 lg:col-start-9 lg:col-span-4">
        <p className="type-micro flex items-baseline justify-between gap-4 font-semibold">
          MITANG <span className="type-index font-normal text-[var(--muted)]">a partir da reunião</span>
        </p>
        <Verbs items={HANDOFF.mitang} />
      </div>
    </>
  );
}
