import type { CSSProperties } from "react";

type Common = {
  strong?: boolean;
  className?: string;
  /** Motion hook: rendered as `data-field`. */
  name?: string;
  style?: CSSProperties;
};

type Vertical = Common & {
  orientation: "vertical";
  /** x position (CSS length, usually `gridX(k)`). */
  x: string;
  /** Top and bottom of the rule as distances from the container top. */
  y1?: string;
  y2?: string;
};

type Horizontal = Common & {
  orientation: "horizontal";
  /** y position (CSS length from the container top). */
  y: string;
  /** Start and end of the rule as distances from the container left. */
  x1?: string;
  x2?: string;
};

/** A single hairline rule of the AERA Field. Absolutely positioned. */
export function FieldLine(props: Vertical | Horizontal) {
  const color = props.strong ? "var(--line-strong)" : "var(--line)";
  let style: CSSProperties;

  if (props.orientation === "vertical") {
    const y1 = props.y1 ?? "0px";
    const y2 = props.y2 ?? "100%";
    style = { left: props.x, top: y1, height: `calc(${y2} - ${y1})`, width: 1 };
  } else {
    const x1 = props.x1 ?? "0px";
    const x2 = props.x2 ?? "100%";
    style = { top: props.y, left: x1, width: `calc(${x2} - ${x1})`, height: 1 };
  }

  return (
    <span
      data-field={props.name}
      className={`absolute block ${props.className ?? ""}`}
      style={{ ...style, background: color, ...props.style }}
    />
  );
}
