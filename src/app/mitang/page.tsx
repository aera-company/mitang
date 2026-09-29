import type { Metadata } from "next";
import { ProposalV2 } from "@/components/proposal/ProposalV2";

export const metadata: Metadata = {
  title: "AERA × MITANG · Apresentação",
  description: "Marketing, geração de oportunidades e inteligência comercial conectados ao time da MITANG.",
};

/* V2 (30/09): apresentação curta, sem preço. A V1 longa fica na tag v1.1. */
export default function MitangIntro() {
  return <ProposalV2 />;
}
