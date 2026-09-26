import { ABM } from "./ABM";
import { Automation } from "./Automation";
import { Beyond } from "./Beyond";
import { Closing } from "./Closing";
import { GrowthSystem } from "./GrowthSystem";
import { Hero } from "./Hero";
import { Investment } from "./Investment";
import { JobReframe } from "./JobReframe";
import { MarketIntelligence } from "./MarketIntelligence";
import { MitangRadar } from "./MitangRadar";
import { Metrics } from "./Metrics";
import { NinetyDays } from "./NinetyDays";
import { OpportunityPipeline } from "./OpportunityPipeline";
import { RealProblem } from "./RealProblem";
import { SalesContent } from "./SalesContent";
import { Scope } from "./Scope";
import { TeamModel } from "./TeamModel";
import { WorkingModel } from "./WorkingModel";
import { VariantProvider, type Variant } from "./variant";

type Props = {
  variant: Variant;
  /** `?h=en` previews the English hero headline (brief §10). */
  headline?: "pt" | "en";
};

/* Five acts. The commercial variant carries the investment chapter; the
   intro variant goes from metrics straight to the conversation. */
export function Proposal({ variant, headline = "pt" }: Props) {
  return (
    <VariantProvider variant={variant}>
      <main id="main">
        <Hero variant={headline} />
        {/* I · Tese */}
        <JobReframe />
        <RealProblem />
        {/* II · Sistema */}
        <GrowthSystem />
        <OpportunityPipeline />
        <MarketIntelligence />
        <ABM />
        {/* III · Operação */}
        <SalesContent />
        <Automation />
        <Beyond />
        <MitangRadar />
        <NinetyDays />
        <TeamModel />
        <WorkingModel />
        {/* IV · Proposta (intro: escopo) */}
        <Scope />
        <Metrics />
        {variant === "commercial" && <Investment />}
        {/* V · Próximo passo */}
        <Closing />
      </main>
    </VariantProvider>
  );
}
