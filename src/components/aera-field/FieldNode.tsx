type Props = {
  x: string;
  y: string;
  className?: string;
  /** Motion hook: rendered as `data-field`. */
  name?: string;
};

/** Anchor point of the AERA Field — a quiet 3px dot centred on (x, y). */
export function FieldNode({ x, y, className = "", name }: Props) {
  return (
    <span
      data-field={name}
      className={`absolute block size-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--fg)] opacity-60 ${className}`}
      style={{ left: x, top: y }}
    />
  );
}
