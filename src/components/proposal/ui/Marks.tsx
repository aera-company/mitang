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
 * MITANG logo (official, from the brand manual MITANG shared on 09/10),
 * masked so it takes the current colour, like the AERA mark.
 */
export function MitangWordmark({ className = "" }: { className?: string }) {
  return (
    <span role="img" aria-label="MITANG" className={`mitang-mark inline-block aspect-[1647/356] ${className}`} />
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
      <MitangWordmark className="h-[15px]" />
    </span>
  );
}
