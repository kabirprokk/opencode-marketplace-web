import type { Metadata } from "next";
import { MarketplaceHome } from "@/components/MarketplaceHome";
import { fetchRegistry } from "@/lib/registry";
import { PackageType } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Browse Packages | OCM Skill",
  description: "Search and install community skills, agents, commands, and packs for OpenCode.",
  alternates: {
    canonical: "/marketplace",
  },
  openGraph: {
    title: "Browse Packages | OCM Skill",
    description: "Search community-built OpenCode skills, agents, commands, and tools.",
    url: "/marketplace",
    siteName: "OCM Skill",
    type: "website",
  },
};

const VALID_TYPES = new Set(["skill", "agent", "command", "skill-pack", "plugin", "mcp", "all"]);

export const instant = false;

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const params = await searchParams;
  const initialQuery = typeof params?.q === "string" ? params.q : "";
  const rawType = typeof params?.type === "string" ? params.type : "all";
  const initialType = (VALID_TYPES.has(rawType) ? rawType : "all") as PackageType | "all";
  const registry = await fetchRegistry();
  return (
    <MarketplaceHome
      packages={registry.packages}
      initialQuery={initialQuery}
      initialType={initialType}
    />
  );
}
