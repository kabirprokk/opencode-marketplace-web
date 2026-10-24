"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Package, PackageType } from "@/lib/registry";
import { PackageCard } from "@/components/PackageCard";
import { CheckIcon } from "@/components/TypeIcon";

const TOPICS = [
  {
    id: "build",
    title: "Build apps",
    detail: "Code, UI, and implementation",
    keywords: ["coding", "engineering", "implementation", "frontend", "backend", "web", "python", "javascript", "typescript", "react", "nextjs", "design", "ui", "ux", "mobile", "prototype", "animation"],
  },
  {
    id: "automate",
    title: "Automate work",
    detail: "Agents, workflows, and integrations",
    keywords: ["automation", "agents", "agent", "workflow", "mcp", "cli", "productivity", "tools"],
  },
  {
    id: "debug",
    title: "Test and debug",
    detail: "Find issues and improve quality",
    keywords: ["debugging", "testing", "review", "verification", "quality", "troubleshooting", "qa"],
  },
  {
    id: "data-cloud",
    title: "Work with data and cloud",
    detail: "Databases, infrastructure, and deployment",
    keywords: ["database", "postgres", "sql", "neon", "prisma", "cloud", "azure", "cloudflare", "infrastructure", "deployment", "devops"],
  },
  {
    id: "media",
    title: "Create media",
    detail: "Video, images, audio, and editing",
    keywords: ["video", "images", "image", "audio", "music", "generation", "editing", "runcomfy", "hyperframes", "remotion"],
  },
  {
    id: "writing-planning",
    title: "Write and plan",
    detail: "Docs, research, specs, and project work",
    keywords: ["documentation", "writing", "planning", "research", "specification", "tickets", "handoff", "github"],
  },
] as const;

const TYPE_LABELS: Record<string, string> = {
  skill: "Skills",
  agent: "Agents",
  command: "Commands",
  "skill-pack": "Skill packs",
  plugin: "Plugins",
  mcp: "MCP servers",
};

function tokens(value: string) {
  return new Set(value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
}

function recommend(packages: Package[], selectedTopics: string[], type: PackageType | "all") {
  return packages
    .filter((pkg) => type === "all" || pkg.type === type)
    .map((pkg) => {
      const tagTokens = tokens(pkg.tags.join(" "));
      const textTokens = tokens(`${pkg.name} ${pkg.description} ${pkg.author}`);
      const matchedTopics = TOPICS.filter((topic) => selectedTopics.includes(topic.id)).filter((topic) => {
        const tagHits = topic.keywords.filter((keyword) => tagTokens.has(keyword)).length;
        const textHits = topic.keywords.filter((keyword) => textTokens.has(keyword) && !tagTokens.has(keyword)).length;
        return tagHits > 0 || textHits > 0;
      });
      const score = matchedTopics.reduce((total, topic) => {
        const tagHits = topic.keywords.filter((keyword) => tagTokens.has(keyword)).length;
        const textHits = topic.keywords.filter((keyword) => textTokens.has(keyword) && !tagTokens.has(keyword)).length;
        return total + tagHits * 5 + textHits;
      }, 0);
      return { pkg, score, reasons: matchedTopics.map((topic) => topic.title) };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.pkg.name.localeCompare(b.pkg.name))
}

export function PackageFinder({ packages }: { packages: Package[] }) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<PackageType | "all">("all");
  const [submitted, setSubmitted] = useState(false);
  const skills = useMemo(
    () => packages.filter((pkg) => pkg.type === "skill").sort((a, b) => a.name.localeCompare(b.name)),
    [packages],
  );
  const packageTypes = useMemo(() => [...new Set(packages.map((pkg) => pkg.type))], [packages]);
  const matches = useMemo(
    () => recommend(packages, selectedTopics, selectedType),
    [packages, selectedTopics, selectedType],
  );

  function toggleTopic(id: string) {
    setSubmitted(false);
    setSelectedTopics((current) => {
      if (current.includes(id)) return current.filter((topic) => topic !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  }

  function reset() {
    setSelectedTopics([]);
    setSelectedType("all");
    setSubmitted(false);
  }

  return (
    <section id="finder" className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 sm:pb-16">
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">Quick match · no typing</p>
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--txt)] sm:text-3xl">What do you want help with?</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Pick up to three cards. We’ll match them to packages in the catalog.</p>
          </div>
          {selectedTopics.length > 0 && (
            <button type="button" onClick={reset} className="min-h-10 rounded-md px-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-overlay)] hover:text-[var(--txt)]">
              Clear choices
            </button>
          )}
        </div>

        <fieldset className="mt-6">
          <legend className="sr-only">Choose up to three work areas</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            {TOPICS.map((topic) => {
              const selected = selectedTopics.includes(topic.id);
              const disabled = !selected && selectedTopics.length >= 3;
              return (
                <button
                  key={topic.id}
                  type="button"
                  aria-pressed={selected}
                  disabled={disabled}
                  onClick={() => toggleTopic(topic.id)}
                  className={`relative flex min-h-24 flex-col items-start justify-center rounded-lg border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:p-4 ${selected ? "border-[var(--accent)] bg-[var(--surface-overlay)]" : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-overlay)]"} ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
                >
                  <span className="flex w-full items-center justify-between gap-2 text-sm font-semibold text-[var(--txt)]">
                    {topic.title}
                    {selected && <CheckIcon className="h-4 w-4 shrink-0 text-[var(--accent-text)]" />}
                  </span>
                  <span className="mt-1 text-xs leading-5 text-[var(--muted)]">{topic.detail}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-6 border-t border-[var(--line)] pt-5">
          <legend className="text-sm font-medium text-[var(--txt)]">Prefer a package type? <span className="font-normal text-[var(--muted)]">Optional</span></legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={selectedType === "all"}
              onClick={() => { setSelectedType("all"); setSubmitted(false); }}
              className={`min-h-10 rounded-md border px-3 text-sm transition-colors ${selectedType === "all" ? "border-[var(--accent)] bg-[var(--surface-overlay)] text-[var(--txt)]" : "border-[var(--line)] text-[var(--muted)] hover:bg-[var(--surface-overlay)]"}`}
            >
              Any type
            </button>
            {packageTypes.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={selectedType === type}
                onClick={() => { setSelectedType(type); setSubmitted(false); }}
                className={`min-h-10 rounded-md border px-3 text-sm transition-colors ${selectedType === type ? "border-[var(--accent)] bg-[var(--surface-overlay)] text-[var(--txt)]" : "border-[var(--line)] text-[var(--muted)] hover:bg-[var(--surface-overlay)]"}`}
              >
                {TYPE_LABELS[type] ?? type}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-5">
          <button
            type="button"
            disabled={selectedTopics.length === 0}
            onClick={() => setSubmitted(true)}
            className="inline-flex min-h-11 items-center rounded-md bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Show my matches
          </button>
          <Link href="/marketplace" className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-overlay)] hover:text-[var(--txt)]">
            Browse all packages instead
          </Link>
          <p className="text-xs text-[var(--muted)]">Your choices stay in this page; nothing is sent or saved.</p>
        </div>
      </div>

      {submitted && (
        <>
          <section aria-labelledby="matches-title" className="mt-10 scroll-mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-4">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">Your shortlist</p>
                <h2 id="matches-title" className="text-2xl font-semibold tracking-tight text-[var(--txt)]">{matches.length ? "A good place to start" : "No exact matches yet"}</h2>
              </div>
              <p className="text-sm text-[var(--muted)]" role="status" aria-live="polite">{matches.length} matching {matches.length === 1 ? "package" : "packages"}</p>
            </div>
            {matches.length ? (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {matches.slice(0, 6).map((item) => (
                  <div key={item.pkg.name}>
                    <p className="mb-2 text-xs text-[var(--muted)]">Matched for {item.reasons.join(" · ")}</p>
                    <PackageCard pkg={item.pkg} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 text-sm leading-6 text-[var(--muted)]">
                Try another card or package type, or browse the full catalog to explore everything.
              </p>
            )}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              {matches.length > 6 && <p className="text-sm text-[var(--muted)]">Showing the top 6 of {matches.length} matches.</p>}
              <Link href="/marketplace" className="ml-auto inline-flex min-h-10 items-center rounded-md border border-[var(--line-strong)] px-3 text-sm font-medium text-[var(--txt)] transition-colors hover:bg-[var(--surface-overlay)]">
                Explore all {packages.length} packages
              </Link>
            </div>
          </section>

          <section id="skills" className="mx-auto mt-16 max-w-7xl scroll-mt-8 border-t border-[var(--line)] px-0 pt-10">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">Explore the collection</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--txt)] sm:text-3xl">Community skills</h2>
              </div>
              <p className="text-sm text-[var(--muted)]">{skills.length} skills · A–Z</p>
            </div>
            {skills.length ? (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {skills.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} showType={false} />)}
              </div>
            ) : (
              <p className="mt-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">No skills are listed yet.</p>
            )}
            <div className="mt-8 flex justify-center">
              <Link href="/marketplace" className="inline-flex min-h-11 items-center rounded-md border border-[var(--line-strong)] px-4 text-sm font-medium text-[var(--txt)] transition-colors hover:bg-[var(--surface-overlay)]">
                Browse all package types
              </Link>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
