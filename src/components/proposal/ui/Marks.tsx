/** AERA mark (approved asset, masked so it takes the current colour).
    Links to the AERA site in a new tab, so the proposal stays open. */
export function AeraMark({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://aera.company"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="AERA · abre aera.company em nova aba"
      className="inline-flex transition-opacity duration-300 hover:opacity-70"
    >
      <span aria-hidden className={`aera-mark inline-block aspect-[6/1] ${className}`} />
    </a>
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
