import type { Metadata } from "next";
import { MarketplaceHome } from "@/components/MarketplaceHome";
import { fetchRegistry } from "@/lib/registry";

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

export default async function MarketplacePage() {
  const registry = await fetchRegistry();
  return <MarketplaceHome packages={registry.packages} />;
}
