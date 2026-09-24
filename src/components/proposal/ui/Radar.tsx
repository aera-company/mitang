/**
 * Survey-style position plot: concentric range rings, bearing ticks on the
 * outer ring, a quiet crosshair. Drawn around (0,0); the caller sizes it with
 * `size` (px) and positions the wrapper. Purely presentational.
 */

export type RadarPoint = {
  /** Bearing in degrees, 0 = north, clockwise. */
  bearing: number;
  /** Distance as a fraction of the outer ring (0–1). */
  range: number;
  label?: string;
  active?: boolean;
};

type Props = {
  size: number;
  rings?: number[]; // fractions of the outer radius
  points?: RadarPoint[];
  /** Mark the centre as the located signal. */
  centreSignal?: boolean;
  /** Degrees between minor bearing ticks. */
  tickStep?: number;
  /** Draw a sweep arm (north-pointing; motion rotates it). */
  sweep?: boolean;
  /** Label of the point to mark (hover link from a list). */
  highlight?: string | null;
  className?: string;
};

const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const f = (n: number) => Math.round(n * 100) / 100;

/** Bearing (0 = north, clockwise) + distance → SVG coordinates around (0,0). */
export function polar(bearing: number, dist: number) {
  const a = rad(bearing);
  return { x: f(Math.cos(a) * dist), y: f(Math.sin(a) * dist) };
}

export function Radar({
  size,
  rings = [0.28, 0.6, 1],
  points = [],
  centreSignal = false,
  tickStep = 5,
  sweep = false,
  highlight = null,
  className = "",
}: Props) {
  const R = size / 2 - 1;
  const ticks = Array.from({ length: 360 / tickStep }, (_, i) => i * tickStep);

  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      className={`overflow-visible ${className}`}
    >
      {rings.map((r) => (
        <circle key={r} data-radar="ring" r={f(R * r)} fill="none" stroke="var(--line-strong)" />
      ))}
      <g data-radar="cross">
        <line x1={-R} x2={R} y1="0" y2="0" stroke="var(--line)" />
        <line y1={-R} y2={R} x1="0" x2="0" stroke="var(--line)" />
      </g>

      <g data-radar="ticks">
        {ticks.map((t) => {
          const major = t % 30 === 0;
          const len = major ? 10 : 4;
          const a = rad(t);
          return (
            <line
              key={t}
              x1={f(Math.cos(a) * R)}
              y1={f(Math.sin(a) * R)}
              x2={f(Math.cos(a) * (R - len))}
              y2={f(Math.sin(a) * (R - len))}
              stroke={major ? "var(--line-strong)" : "var(--line)"}
            />
          );
        })}
      </g>

      {[0, 90, 180, 270].map((t) => {
        const a = rad(t);
        return (
          <text
            key={t}
            data-radar="bearing"
            x={f(Math.cos(a) * (R + 14))}
            y={f(Math.sin(a) * (R + 14) + 3.5)}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--muted)"
            fontFamily="var(--font-mono-src)"
          >
            {String(t).padStart(3, "0")}
          </text>
        );
      })}

      {sweep && (
        <g data-radar="arm">
          <line x1="0" y1="0" x2="0" y2={-R} stroke="var(--signal)" strokeOpacity="0.45" />
        </g>
      )}

      {points.map((p, i) => {
        const a = rad(p.bearing);
        const x = f(Math.cos(a) * R * p.range);
        const y = f(Math.sin(a) * R * p.range);
        return (
          <g key={i} data-radar="point" data-bearing={p.bearing}>
            {p.active && <circle cx={x} cy={y} r="9" fill="var(--signal-soft)" />}
            {highlight === p.label && (
              <g>
                <circle cx={x} cy={y} r="15" fill="none" stroke="var(--signal)" />
                <line x1={x} y1={y} x2="0" y2="0" stroke="var(--signal)" strokeOpacity="0.5" strokeDasharray="2 3" />
              </g>
            )}
            <circle
              cx={x}
              cy={y}
              r={p.active ? 3.5 : 3}
              fill={p.active ? "var(--signal)" : "var(--fg)"}
              opacity={p.active ? 1 : 0.55}
            />
            {p.label && (
              <text
                x={x + 9}
                y={y - 7}
                fontSize="10"
                fill={p.active ? "var(--signal)" : "var(--muted)"}
                fontFamily="var(--font-mono-src)"
              >
                {p.label}
              </text>
            )}
          </g>
        );
      })}

      {centreSignal && (
        <g data-radar="centre">
          <circle r="10" fill="var(--signal-soft)" />
          <circle r="3.5" fill="var(--signal)" />
        </g>
      )}
    </svg>
  );
}
