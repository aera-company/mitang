/** AERA mark (approved asset, masked so it takes the current colour). */
export function AeraMark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="AERA"
      className={`aera-mark inline-block aspect-[6/1] ${className}`}
    />
  );
}

/**
 * MITANG wordmark — TYPOGRAPHIC PLACEHOLDER until the official logo file is
 * provided by MITANG (decided 23/09: never pulled from the public site).
 */
export function MitangWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block font-semibold leading-none tracking-[0.06em] ${className}`}
      data-placeholder="mitang-logo"
    >
      MITANG
    </span>
  );
}

/** Pairing used in the hero and the closing. */
export function Pairing({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <AeraMark className="h-[14px]" />
      <span aria-hidden className="type-index text-[var(--muted)]">
        ×
      </span>
      <MitangWordmark className="text-[14px]" />
    </span>
  );
}
