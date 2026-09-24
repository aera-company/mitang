type Props = { length?: string; className?: string };

/** In-flow vertical index rule ending in a small arrowhead (rails, scroll cue). */
export function FieldArrow({ length = "56px", className = "" }: Props) {
  return (
    <span
      aria-hidden
      className={`relative block w-[7px] ${className}`}
      style={{ height: length }}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--line-strong)]" />
      <svg
        viewBox="0 0 7 4"
        className="absolute bottom-0 left-0 h-[4px] w-[7px] text-[var(--line-strong)]"
      >
        <path d="M0.5 0.5 L3.5 3.5 L6.5 0.5" fill="none" stroke="currentColor" />
      </svg>
    </span>
  );
}
