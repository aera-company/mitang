import type { ReactNode, Ref } from "react";

type Props = {
  id: string;
  /** Two-digit section index, printed in the header rule. */
  index: string;
  label: string;
  act: string;
  state?: "dark" | "light" | "petrol";
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLElement>;
};

/**
 * One chapter of the proposal. Opens with a report-style header rule:
 * index + label on the left, act on the right. The heading inside
 * `children` must carry `id={`${id}-title`}`.
 */
export function Section({
  id,
  index,
  label,
  act,
  state = "dark",
  className = "",
  children,
  ref,
}: Props) {
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className={`state-${state} relative ${className}`}
    >
      <div className="aera-grid pt-6">
        <div className="col-span-full flex items-baseline justify-between gap-6 border-t border-[var(--line)] pt-3 text-[var(--muted)]">
          <p className="flex items-baseline gap-4">
            <span className="type-index">{index}</span>
            <span className="type-micro">{label}</span>
          </p>
          <p className="type-index hidden md:block">{act}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

/**
 * Small caps label used inside sections (outputs, deliverables, flags).
 * `signal` marks an active output — the square carries the accent.
 */
export function Tag({
  children,
  signal = false,
  className = "",
}: {
  children: ReactNode;
  signal?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`type-micro inline-flex items-center gap-2 border border-[var(--line-strong)] px-2 py-1 transition-colors duration-300 ${className}`}
    >
      {signal && <span aria-hidden data-tag="dot" className="size-[5px] bg-[var(--signal)]" />}
      {children}
    </span>
  );
}
