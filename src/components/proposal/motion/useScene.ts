"use client";

import type { RefObject } from "react";
import { useGsapContext } from "@/components/motion/useGsapContext";

export type Active = Record<string, boolean>;

/** Standard scene split: desktop / phones with motion, and reduced motion. */
const CONDITIONS = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
};

export function useScene(
  scope: RefObject<HTMLElement | null>,
  play: (root: HTMLElement, active: Active) => void | (() => void),
) {
  useGsapContext(scope, CONDITIONS, (active) => play(scope.current!, active));
}
