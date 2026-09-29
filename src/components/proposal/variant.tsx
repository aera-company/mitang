"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Two readings of the same proposal (26/09):
 *  - "intro": presentation / conversation opener. No investment, no
 *    commercial conditions; closes on a conversation.
 *  - "commercial": the full proposal with the pilot's investment.
 * Every section is shared; only the commercial blocks read the variant.
 */
export type Variant = "intro" | "commercial" | "v2";

const VariantContext = createContext<Variant>("commercial");

export function VariantProvider({ variant, children }: { variant: Variant; children: ReactNode }) {
  return <VariantContext.Provider value={variant}>{children}</VariantContext.Provider>;
}

export const useVariant = () => useContext(VariantContext);
