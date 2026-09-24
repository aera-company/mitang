import { ABM } from "@/components/proposal/ABM";
import { Automation } from "@/components/proposal/Automation";
import { Closing } from "@/components/proposal/Closing";
import { GrowthSystem } from "@/components/proposal/GrowthSystem";
import { Hero } from "@/components/proposal/Hero";
import { Investment } from "@/components/proposal/Investment";
import { JobReframe } from "@/components/proposal/JobReframe";
import { MarketIntelligence } from "@/components/proposal/MarketIntelligence";
import { Metrics } from "@/components/proposal/Metrics";
import { NinetyDays } from "@/components/proposal/NinetyDays";
import { OpportunityPipeline } from "@/components/proposal/OpportunityPipeline";
import { RealProblem } from "@/components/proposal/RealProblem";
import { SalesContent } from "@/components/proposal/SalesContent";
import { Scope } from "@/components/proposal/Scope";
import { TeamModel } from "@/components/proposal/TeamModel";

type Props = { searchParams: Promise<{ h?: string }> };

/* Five acts, fifteen chapters (brief §9). `?h=en` previews the English hero
   headline for the visual test in §10 — Portuguese is the default. */
export default async function Proposal({ searchParams }: Props) {
  const { h } = await searchParams;

  return (
    <main id="main">
      <Hero variant={h === "en" ? "en" : "pt"} />
      {/* I — Tese */}
      <JobReframe />
      <RealProblem />
      {/* II — Sistema */}
      <GrowthSystem />
      <OpportunityPipeline />
      <MarketIntelligence />
      <ABM />
      {/* III — Operação */}
      <SalesContent />
      <Automation />
      <NinetyDays />
      <TeamModel />
      {/* IV — Proposta */}
      <Scope />
      <Metrics />
      <Investment />
      {/* V — Próximo passo */}
      <Closing />
    </main>
  );
}
