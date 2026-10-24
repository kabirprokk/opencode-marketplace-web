"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PackageCard } from "@/components/PackageCard";
import { SearchIcon } from "@/components/TypeIcon";
import { Package, PackageType } from "@/lib/registry";

const TYPES: { value: PackageType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "skill", label: "Skills" },
  { value: "agent", label: "Agents" },
  { value: "command", label: "Commands" },
  { value: "skill-pack", label: "Packs" },
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
    });
  }, [packages, query, typeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Editorial introduction */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.12fr_.88fr] lg:gap-16 lg:py-28">
            <div className="animate-rise">
              <div className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">
                <span className="h-px w-8 bg-[var(--accent-warm)]" />
                A community-built OpenCode directory
              </div>
              <h1 className="display-serif max-w-3xl text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.94] tracking-[-0.045em]">
                Find your next <span className="text-gradient italic">way to build.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-dim sm:text-lg sm:leading-8">
                Skills, agents, and commands made by the community—collected in one simple place for your OpenCode workflow.
              </p>
              <p className="mt-3 text-xs leading-5 text-dim">Independent community project. Not affiliated with Anomaly.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#packages" className="inline-flex items-center gap-3 rounded-full bg-[var(--txt)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
                  Explore the catalog <span aria-hidden="true">↘</span>
                </a>
                <a href="https://github.com/kabirprokk/opencode-marketplace" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold text-[var(--txt)] transition-colors hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
                  Get the CLI
                </a>
              </div>
            </div>

            <aside className="hero-panel relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] p-6 sm:p-9 lg:min-h-[390px]">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[var(--line)] sm:h-96 sm:w-96" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-5 -top-12 h-52 w-52 rounded-full border border-[var(--line-strong)] sm:h-72 sm:w-72" />
              <div className="relative flex h-full flex-col justify-between gap-16">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-dim">The community toolbox</span>
                  <span className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Open source</span>
                </div>
                <div>
                  <div className="display-serif text-7xl leading-none tracking-[-0.05em] sm:text-8xl">{String(packages.length).padStart(2, "0")}</div>
                  <p className="mt-3 text-sm text-dim">community packages and growing</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {["Skills", "Agents", "Commands"].map((label) => <span key={label} className="rounded-full border border-[var(--line)] bg-[var(--soft)] px-3 py-1.5 text-xs text-[var(--txt)]">{label}</span>)}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 border-t border-[var(--line)] pt-4">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-dim">A note on provenance</div>
                    <div className="mt-1 text-xs text-dim">Community maintained · Not official Anomaly software</div>
                  </div>
                  <span aria-hidden="true" className="display-serif text-3xl italic text-[var(--accent-warm)]">OC</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Search + Filter */}
        <section id="packages" className="max-w-7xl mx-auto px-5 pb-20 sm:px-6 sm:pb-28">
          <div className="mb-8 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-end sm:pt-10">
            <div>
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-warm)]">Browse the collection</div>
              <h2 className="display-serif text-4xl tracking-tight sm:text-5xl">The directory</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-dim">Explore community submissions. Review each project before installing.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search packages, tags, authors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl glass px-5 py-3 text-[var(--txt)] placeholder-dim transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--accent)_20%,transparent)]"
              />
              <SearchIcon className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dim" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTypeFilter(t.value)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    typeFilter === t.value
                      ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-black"
                      : "glass text-dim hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-dim">No packages found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
          )}
        </section>

        {/* About */}
        <section id="about" className="max-w-7xl mx-auto px-6 pb-20">
          <div className="glass rounded-[1.75rem] p-6 sm:p-10 lg:p-12">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-warm)]">Independent by design</div>
            <h2 className="display-serif mb-4 text-4xl sm:text-5xl">
              Built with <span className="text-gradient italic">OpenCode.</span>
            </h2>
            <p className="text-dim leading-relaxed max-w-3xl mb-6">
              This independent community project was built with OpenCode, the open-source AI coding agent. It is not an official Anomaly project. The registry, CLI, and website are open source, and anyone can contribute packages.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { title: "100% Free", desc: "No paywalls, no subscriptions. Every skill and tool is free to use." },
                { title: "Open Source", desc: "Registry, CLI, and website are all MIT licensed. Fork and customize." },
                { title: "Community Driven", desc: "Anyone can publish. Submit a PR to add your skill or agent." },
              ].map((f) => (
                  <div key={f.title} className="surface-soft rounded-xl border border-[var(--line)] p-4">
                    <div className="font-semibold text-cyan-400 mb-1">{f.title}</div>
                  <div className="text-sm text-dim">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Get started in <span className="text-gradient">3 steps</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Install the CLI", cmd: "npm i -g github:kabirprokk/opencode-marketplace" },
              { step: "2", title: "Browse packages", cmd: "ocm list" },
              { step: "3", title: "Install a skill", cmd: "ocm install caveman" },
            ].map((s) => (
              <div key={s.step} className="glass rounded-xl p-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center text-black font-bold text-sm mb-4">
                  {s.step}
                </div>
                <div className="font-semibold mb-2">{s.title}</div>
                <code className="text-sm font-mono text-cyan-400">{s.cmd}</code>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
