/**
 * Field coordinates share the page grid (see `.aera-grid` in globals.css).
 *
 * `gridX(k)` returns the x position of the RIGHT EDGE of column k as a CSS
 * length, measured from the left edge of a full-width container. Rules sit on
 * column edges, so content in the next column starts exactly one gutter away.
 *   k = 0      → left margin edge
 *   k = cols   → right margin edge (12 desktop / 4 mobile)
 */
export function gridX(k: number): string {
  if (k <= 0) return "var(--margin)";
  const col =
    "((100% - 2 * var(--margin) - (var(--cols) - 1) * var(--gutter)) / var(--cols))";
  return `calc(var(--margin) + ${k} * ${col} + ${k - 1} * var(--gutter))`;
}
