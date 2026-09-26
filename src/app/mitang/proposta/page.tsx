import type { Metadata } from "next";
import { Proposal } from "@/components/proposal/Proposal";

export const metadata: Metadata = {
  title: "AERA × MITANG · Proposta comercial",
  description: "Piloto de 90 dias de growth, inteligência comercial e tecnologia para a MITANG.",
};

type Props = { searchParams: Promise<{ h?: string }> };

/* Versão 02 · proposta comercial, with the pilot's investment. */
export default async function MitangCommercial({ searchParams }: Props) {
  const { h } = await searchParams;
  return <Proposal variant="commercial" headline={h === "en" ? "en" : "pt"} />;
}
