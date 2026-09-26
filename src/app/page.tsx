import { Proposal } from "@/components/proposal/Proposal";

type Props = { searchParams: Promise<{ h?: string }> };

/* Root keeps serving the commercial proposal exactly as published before
   the two routes existed (links already shared keep working). */
export default async function Home({ searchParams }: Props) {
  const { h } = await searchParams;
  return <Proposal variant="commercial" headline={h === "en" ? "en" : "pt"} />;
}
