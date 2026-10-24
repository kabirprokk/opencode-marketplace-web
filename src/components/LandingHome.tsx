import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntroVideo } from "@/components/IntroVideo";
import { PackageFinder } from "@/components/PackageFinder";
import { Package } from "@/lib/registry";

export function LandingHome({ packages }: { packages: Package[] }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <IntroVideo />
        <PackageFinder packages={packages} />
      </main>
      <Footer />
    </div>
  );
}
