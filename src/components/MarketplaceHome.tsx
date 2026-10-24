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
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-cyan-400 mb-6 animate-pulse-glow">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Built with OpenCode AI
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-5 sm:mb-6 animate-rise">
              Free <span className="block sm:inline text-gradient">Skills, Tools</span>
              <br className="hidden sm:block" /><span className="block sm:inline">&amp; Agents for OpenCode</span>
            </h1>
            <p className="text-lg md:text-xl text-dim max-w-2xl mx-auto mb-10 animate-rise">
              Browse and install community-built skills, agents, and commands.
              100% free, 100% open source. Built with OpenCode, by the community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-rise">
              <a
                href="https://github.com/kabirprokk/opencode-marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Install CLI →
              </a>
              <code className="max-w-full break-all px-4 sm:px-5 py-3 rounded-xl glass font-mono text-xs sm:text-sm text-cyan-400">
                npm i -g github:kabirprokk/opencode-marketplace
              </code>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Packages", value: packages.length },
              { label: "Free Forever", value: "100%" },
              { label: "Open Source", value: "MIT" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-[9px] sm:text-xs text-dim mt-1 uppercase tracking-wide sm:tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Search + Filter */}
        <section id="packages" className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search packages, tags, authors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-xl glass text-white placeholder-dim focus:outline-none focus:border-cyan-400 transition-colors"
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
          <div className="glass rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-4">
              Built with <span className="text-gradient">OpenCode AI</span>
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
                <div key={f.title} className="p-4 rounded-xl bg-[rgba(130,195,255,0.04)]">
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
