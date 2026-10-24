import { MarketplaceHome } from "@/components/MarketplaceHome";
import { fetchRegistry } from "@/lib/registry";

export default async function Home() {
  const registry = await fetchRegistry();
  return <MarketplaceHome packages={registry.packages} />;
}
