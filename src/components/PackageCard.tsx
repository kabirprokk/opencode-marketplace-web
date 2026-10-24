"use client";

import { useState } from "react";
import { Package } from "@/lib/registry";
import { CheckIcon, TypeIcon } from "@/components/TypeIcon";

export function PackageCard({ pkg }: { pkg: Package }) {
  const [copied, setCopied] = useState(false);
  const installCmd = `ocm install ${pkg.name}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const typeClass: Record<string, string> = {
    skill: "text-cyan-400",
    agent: "text-violet-400",
    command: "text-ok",
    "skill-pack": "text-warn",
    plugin: "text-cyan-400",
    mcp: "text-violet-400",
  };

  return (
    <article className="glass group rounded-2xl p-5 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow)] sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(49,229,255,0.16)] bg-[rgba(49,229,255,0.06)] text-cyan-300">
            <TypeIcon type={pkg.type} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-semibold text-lg text-[var(--txt)] transition-colors group-hover:text-cyan-400">
              {pkg.name}
            </h3>
            <span className={`text-xs font-mono uppercase tracking-wider ${typeClass[pkg.type] || "text-cyan-400"}`}>
              {pkg.type}
            </span>
          </div>
        </div>
        <span className="text-xs text-dim font-mono">v{pkg.version}</span>
      </div>

      <p className="text-sm text-[#a9b8d5] leading-relaxed mb-4 line-clamp-2">
        {pkg.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {pkg.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-[var(--line)] bg-[var(--soft)] px-2 py-1 text-xs text-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-3 border-t border-[var(--line)] pt-4 sm:flex-row sm:items-center">
        <span className="text-xs text-dim">by {pkg.author}</span>
        <div className="flex min-w-0 items-center gap-2">
          <code className="command-code min-w-0 truncate rounded px-2 py-1 font-mono text-xs text-cyan-400">
            {installCmd}
          </code>
          <button
            onClick={copy}
            className="shrink-0 rounded-md border border-[var(--line)] px-3 py-1 text-xs font-semibold text-cyan-400 transition-colors hover:bg-[var(--soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            {copied ? <span className="inline-flex items-center gap-1"><CheckIcon className="h-3.5 w-3.5" /> Copied</span> : "Copy"}
          </button>
        </div>
      </div>
    </article>
  );
}
