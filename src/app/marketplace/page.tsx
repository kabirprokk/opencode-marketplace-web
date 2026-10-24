import type { Metadata } from "next";
import { MarketplaceHome } from "@/components/MarketplaceHome";
import { fetchRegistry } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Browse Packages | OpenCode Community Marketplace",
  description: "Search and install community skills, agents, commands, and packs for OpenCode.",
};

export default async function MarketplacePage() {
  const registry = await fetchRegistry();
  return <MarketplaceHome packages={registry.packages} />;
}
