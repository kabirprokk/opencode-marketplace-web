import { Suspense } from "react";
import { MarketplaceHome } from "@/components/MarketplaceHome";
import { fetchRegistry } from "@/lib/registry";

export default async function MarketplacePage() {
  const registry = await fetchRegistry();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketplaceHome packages={registry.packages} />
    </Suspense>
  );
}
