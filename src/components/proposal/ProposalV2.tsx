import { Adds } from "./Adds";
import { Assumes } from "./Assumes";
import { Closing } from "./Closing";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { RadarV2 } from "./RadarV2";
import { StartingPoint } from "./StartingPoint";
import { VariantProvider } from "./variant";

/* /mitang · final (01/10). Seven moments: AERA is the operation the job post
   describes, the MITANG Radar is its infrastructure. Imports nothing from
   the commercial chapter: no pricing reaches this route's HTML or bundles. */
export function ProposalV2() {
  return (
    <VariantProvider variant="v2">
      <main id="main">
        {/* 01 */}
        <Hero variant="pt" />
        {/* I · Ponto de partida */}
        <StartingPoint />
        {/* II · Operação */}
        <Assumes />
        <HowItWorks />
        <Adds />
        {/* III · Infraestrutura */}
        <RadarV2 />
        {/* IV · Próximo passo */}
        <Closing />
      </main>
    </VariantProvider>
  );
}
