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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_380px] lg:gap-16 lg:py-32">
            <div className="animate-rise">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                Community-built directory for OpenCode
              </p>
              <h1 className="display-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-[var(--txt)]">
                Find your next
                <br />
                <span className="text-[var(--accent)]">way to build.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-[var(--muted)]">
                Skills, agents, and commands made by the community—collected in
                one place for your OpenCode workflow.
              </p>
              <p className="mt-3 text-xs text-[var(--muted)]">
                Independent community project. Not affiliated with Anomaly.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#packages"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
                >
                  Browse catalog
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </a>
                <a
                  href="https://github.com/kabirprokk/opencode-marketplace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[var(--line-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--txt)] transition-colors hover:border-[var(--accent)]"
                >
                  Get the CLI
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                  Community toolbox
                </span>
                <span className="rounded-full bg-[var(--surface-overlay)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
                  Open source
                </span>
              </div>
              <div className="mt-6">
                <div className="display-serif text-6xl leading-none tracking-tight text-[var(--txt)] sm:text-7xl">
                  {String(packages.length).padStart(2, "0")}
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  community packages available
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Skills", "Agents", "Commands", "Packs"].map((label) => (
                  <span
                    key={label}
                    className="rounded-md bg-[var(--surface-overlay)] px-2.5 py-1 text-xs text-[var(--muted)]"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-6 border-t border-[var(--line)] pt-4">
                <p className="text-xs leading-5 text-[var(--muted)]">
                  Community maintained. Not official Anomaly software.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Catalog */}
        <section
          id="packages"
          className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24"
        >
          <div className="mb-8 flex flex-col gap-4 border-t border-[var(--line)] pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                Browse
              </p>
              <h2 className="display-serif text-3xl tracking-tight text-[var(--txt)] sm:text-4xl">
                The directory
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[var(--muted)]">
              Explore community submissions. Review each project before
              installing.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <input
                type="search"
                aria-label="Search packages by name, tag, or author"
                placeholder="Search by name, tag, or author..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-11 w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] py-2.5 pl-4 pr-10 text-sm text-[var(--txt)] placeholder-[var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
              <SearchIcon className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            </div>
            <div className="flex flex-wrap gap-1 pb-1 sm:flex-nowrap sm:pb-0">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTypeFilter(t.value)}
                  aria-pressed={typeFilter === t.value}
                  className={`min-h-11 shrink-0 rounded-lg px-2.5 text-sm font-medium transition-colors sm:px-3 ${
                    typeFilter === t.value
                      ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface-overlay)] hover:text-[var(--txt)]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-[var(--muted)]" role="status" aria-live="polite">
            Showing {filtered.length} of {packages.length} packages
          </p>

          <div className="mt-6">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-[var(--muted)]">No packages found.</p>
                <button
                  onClick={() => {
                    setQuery("");
                    setTypeFilter("all");
                  }}
                  type="button"
                  className="mt-3 min-h-11 text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.name} pkg={pkg} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24"
        >
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Independent by design
            </p>
            <h2 className="display-serif mb-4 text-3xl tracking-tight text-[var(--txt)] sm:text-4xl">
              Built with OpenCode.
            </h2>
            <p className="mb-8 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              This independent community project was built with OpenCode, the
              open-source AI coding agent. It is not an official Anomaly project.
              The registry, CLI, and website are open source, and anyone can
              contribute packages.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  title: "100% Free",
                  desc: "No paywalls, no subscriptions. Every skill and tool is free to use.",
                },
                {
                  title: "Open Source",
                  desc: "Registry, CLI, and website are all MIT licensed. Fork and customize.",
                },
                {
                  title: "Community Driven",
                  desc: "Anyone can publish. Submit a PR to add your skill or agent.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl bg-[var(--surface-overlay)] p-4"
                >
                  <h3 className="mb-1 text-sm font-semibold text-[var(--txt)]">
                    {f.title}
                  </h3>
                  <p className="text-xs leading-5 text-[var(--muted)]">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting started */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
          <div className="mb-8">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Quick start
            </p>
            <h2 className="display-serif text-3xl tracking-tight text-[var(--txt)] sm:text-4xl">
              Get started in 3 steps
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Install the CLI",
                cmd: "npm i -g github:kabirprokk/opencode-marketplace",
              },
              { step: "2", title: "Browse packages", cmd: "ocm list" },
              { step: "3", title: "Install a skill", cmd: "ocm install caveman" },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)] text-xs font-bold text-[var(--bg)]">
                  {s.step}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-[var(--txt)]">
                  {s.title}
                </h3>
                <code className="code-bg mt-2 block break-all rounded-md px-2.5 py-1.5 font-mono text-xs text-[var(--accent)]">
                  {s.cmd}
                </code>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
