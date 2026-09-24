import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

/**
 * AERA FIELD — the structural layer of a scene.
 * Holds only selected rules, nodes and markers aligned to the page grid;
 * never the whole grid. Purely presentational (aria-hidden).
 */
export function AeraField({ children, className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      data-aera-field
    >
      {children}
    </div>
  );
}
