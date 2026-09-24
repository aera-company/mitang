/**
 * Line-drawn schematics of sales assets — sophisticated placeholders that
 * read as "a case", "a deck", "a short video" without faking real work.
 * Drawn in a 100-wide box; height follows the asset's ratio.
 */

type Kind =
  | "Case"
  | "Landing page"
  | "Apresentação"
  | "Vídeo curto"
  | "LinkedIn"
  | "E-mail"
  | "One-page técnico"
  | "Material para reunião";

export const ASSET_RATIO: Record<Kind, [number, number]> = {
  Case: [4, 5],
  "Landing page": [16, 10],
  Apresentação: [16, 9],
  "Vídeo curto": [9, 16],
  LinkedIn: [1, 1],
  "E-mail": [4, 5],
  "One-page técnico": [3, 4],
  "Material para reunião": [16, 10],
};

const S = "var(--line-strong)";
const B = "var(--line)";

/** Text line placeholder. */
const T = ({ x, y, w, h = 1.6 }: { x: number; y: number; w: number; h?: number }) => (
  <rect x={x} y={y} width={w} height={h} fill={S} />
);
/** Image / media block. */
const M = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={B} />
    <line x1={x} y1={y + h} x2={x + w} y2={y} stroke={B} />
  </g>
);

function body(kind: Kind, H: number) {
  switch (kind) {
    case "Case":
      return (
        <>
          <M x={8} y={8} w={84} h={52} />
          <T x={8} y={70} w={60} h={3.5} />
          <T x={8} y={78} w={44} h={3.5} />
          {[90, 95, 100, 105].map((y) => <T key={y} x={8} y={y} w={y === 105 ? 50 : 84} />)}
        </>
      );
    case "Landing page":
      return (
        <>
          <line x1="0" y1="8" x2="100" y2="8" stroke={B} />
          <T x={6} y={3.4} w={10} h={1.4} />
          <T x={6} y={18} w={40} h={4} />
          <T x={6} y={25} w={32} h={4} />
          <T x={6} y={34} w={36} />
          <T x={6} y={38} w={30} />
          <rect x={6} y={45} width={16} height={5} fill="none" stroke={S} />
          <M x={54} y={16} w={40} h={36} />
        </>
      );
    case "Apresentação":
      return (
        <>
          <T x={8} y={10} w={10} h={1.2} />
          <T x={8} y={18} w={52} h={4.5} />
          <T x={8} y={25.5} w={38} h={4.5} />
          <line x1="8" y1="36" x2="92" y2="36" stroke={B} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <T x={8 + i * 29} y={40} w={6} h={1.2} />
              <T x={8 + i * 29} y={44} w={24} />
              <T x={8 + i * 29} y={48} w={20} />
            </g>
          ))}
        </>
      );
    case "Vídeo curto":
      return (
        <>
          <line x1="0" y1={H} x2="100" y2="0" stroke={B} />
          <path d={`M42 ${H / 2 - 9} L60 ${H / 2} L42 ${H / 2 + 9} Z`} fill="none" stroke={S} />
          <line x1="8" y1={H - 10} x2="92" y2={H - 10} stroke={S} />
          <line x1="8" y1={H - 10} x2="34" y2={H - 10} stroke="var(--fg)" />
          <T x={8} y={H - 24} w={50} h={2.5} />
        </>
      );
    case "LinkedIn":
      return (
        <>
          <circle cx="13" cy="12" r="5" fill="none" stroke={S} />
          <T x={22} y={9} w={28} h={1.8} />
          <T x={22} y={13} w={18} h={1.2} />
          <T x={8} y={23} w={84} />
          <T x={8} y={27} w={70} />
          <M x={8} y={34} w={84} h={50} />
          <line x1="8" y1="91" x2="92" y2="91" stroke={B} />
        </>
      );
    case "E-mail":
      return (
        <>
          <T x={8} y={8} w={30} h={1.4} />
          <T x={8} y={13} w={56} h={2.6} />
          <line x1="8" y1="21" x2="92" y2="21" stroke={B} />
          {[30, 35, 40, 45, 55, 60, 65].map((y) => (
            <T key={y} x={8} y={y} w={y === 45 || y === 65 ? 52 : 84} />
          ))}
          <rect x={8} y={76} width={22} height={6} fill="none" stroke={S} />
          <T x={8} y={100} w={24} h={1.4} />
          <T x={8} y={104} w={18} h={1.2} />
        </>
      );
    case "One-page técnico":
      return (
        <>
          <T x={8} y={8} w={12} h={1.2} />
          <T x={8} y={14} w={64} h={4} />
          <line x1="8" y1="24" x2="92" y2="24" stroke={B} />
          {[30, 34, 38, 42, 46, 50].map((y) => (
            <g key={y}>
              <T x={8} y={y} w={38} />
              <T x={54} y={y} w={38} />
            </g>
          ))}
          <circle cx="30" cy="84" r="16" fill="none" stroke={S} />
          <circle cx="30" cy="84" r="8" fill="none" stroke={B} />
          <line x1="54" y1="72" x2="92" y2="72" stroke={B} />
          <line x1="54" y1="84" x2="92" y2="84" stroke={B} />
          <line x1="54" y1="96" x2="92" y2="96" stroke={B} />
          <T x={8} y={H - 8} w={30} h={1.2} />
        </>
      );
    case "Material para reunião":
      return (
        <>
          <line x1="50" y1="4" x2="50" y2={H - 4} stroke={S} />
          <T x={6} y={10} w={8} h={1.2} />
          <T x={6} y={16} w={36} h={4} />
          <T x={6} y={23} w={26} h={4} />
          <M x={6} y={34} w={38} h={22} />
          {[12, 16, 20, 24, 28].map((y) => <T key={y} x={56} y={y} w={y === 28 ? 22 : 38} />)}
          <rect x={56} y={36} width={38} height={20} fill="none" stroke={B} />
          <line x1="56" y1="46" x2="94" y2="46" stroke={B} />
          <line x1="75" y1="36" x2="75" y2="56" stroke={B} />
        </>
      );
  }
}

export function AssetSketch({ kind }: { kind: Kind }) {
  const [w, h] = ASSET_RATIO[kind];
  const H = (100 * h) / w;
  return (
    <svg
      viewBox={`0 0 100 ${H}`}
      className="block w-full border border-[var(--line-strong)]"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {body(kind, H)}
    </svg>
  );
}

export type { Kind as AssetKind };
