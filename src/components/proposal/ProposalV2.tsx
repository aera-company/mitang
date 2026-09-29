import { Assumes } from "./Assumes";
import { BeyondShort } from "./BeyondShort";
import { Closing } from "./Closing";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { JobReframe } from "./JobReframe";
import { MitangRadar } from "./MitangRadar";
import { NinetyDaysV2 } from "./NinetyDaysV2";
import { RealProblem } from "./RealProblem";
import { VariantProvider } from "./variant";

/* V2 (30/09): shorter and clearer about the service. Hero plus eight
   numbered sections. Imports nothing from the commercial chapter: no pricing reaches
   this route's HTML or bundles. */
export function ProposalV2() {
  return (
    <VariantProvider variant="v2">
      <main id="main">
        <Hero variant="pt" />
        {/* I · Desafio */}
        <JobReframe />
        <RealProblem />
        {/* II · Serviço */}
        <Assumes />
        <HowItWorks />
        {/* III · Radar */}
        <MitangRadar />
        <BeyondShort />
        {/* IV · Operação */}
        <NinetyDaysV2 />
        {/* V · Próximo passo */}
        <Closing />
      </main>
    </VariantProvider>
  );
}
