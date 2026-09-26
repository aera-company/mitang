import type { Metadata } from "next";
import { Proposal } from "@/components/proposal/Proposal";

export const metadata: Metadata = {
  title: "AERA × MITANG · Apresentação",
  description: "Growth, inteligência comercial e tecnologia para o comercial da MITANG.",
};

type Props = { searchParams: Promise<{ h?: string }> };

/* Versão 01 · apresentação / conversa. No investment anywhere. */
export default async function MitangIntro({ searchParams }: Props) {
  const { h } = await searchParams;
  return <Proposal variant="intro" headline={h === "en" ? "en" : "pt"} />;
}
