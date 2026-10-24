import { LandingHome } from "@/components/LandingHome";
import { fetchRegistry } from "@/lib/registry";

export default async function HomePage() {
  try {
    const registry = await fetchRegistry();
    return <LandingHome packages={registry.packages} />;
  } catch (error) {
    return (
      <div style={{ padding: 24, color: "red" }}>
        Home error: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }
}
