"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PackageCard } from "@/components/PackageCard";
import { Package, PackageType } from "@/lib/registry";

const TYPES: { value: PackageType | "all"; label: string }[] = [
  { value: "all", label: "All package types" },
  { value: "skill", label: "Skills" },
  { value: "agent", label: "Agents" },
  { value: "command", label: "Commands" },
  { value: "skill-pack", label: "Skill packs" },
];

export function MarketplaceHome({ packages }: { packages: Package[] }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<PackageType | "all">("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return packages.filter((p) => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.author.toLowerCase().includes(q)
      );
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [packages, query, typeFilter]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section id="packages" className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
          <div className="border-b border-[var(--line)] pb-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--txt)] sm:text-4xl">
                  Community packages
                </h1>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Skills, agents, and commands for OpenCode.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_200px]">
              <div className="relative block">
                <input
                  type="search"
                  aria-label="Search packages by name, description, tag, or author"
                  placeholder="Search packages"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-11 w-full rounded-md border border-[var(--line)] bg-[var(--surface)] py-2.5 pl-4 pr-10 text-sm text-[var(--txt)] placeholder-[var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <div>
                <select
                  aria-label="Filter by package type"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as PackageType | "all")}
                  className="min-h-11 w-full rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 text-sm text-[var(--txt)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  {TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex min-h-5 items-center justify-between gap-3 text-xs text-[var(--muted)]">
              <p role="status" aria-live="polite">
                {filtered.length === packages.length
                  ? `${packages.length} packages`
                  : `${filtered.length} of ${packages.length} packages`}
              </p>
            </div>
          </div>

          <div className="pt-6">
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-5 py-14 text-center">
                <p className="text-sm font-medium text-[var(--txt)]">No packages found</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Try another search or package type.</p>
                <button
                  onClick={() => { setQuery(""); setTypeFilter("all"); }}
                  type="button"
                  className="mt-4 min-h-10 rounded-md px-3 text-sm font-medium text-[var(--accent-text)] hover:bg-[var(--surface-overlay)]"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.name} pkg={pkg} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
