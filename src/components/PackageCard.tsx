"use client";

import { useState } from "react";
import { Package } from "@/lib/registry";
import { CheckIcon, TypeIcon } from "@/components/TypeIcon";

export function PackageCard({ pkg }: { pkg: Package }) {
  const [copied, setCopied] = useState(false);
  const installCmd = `ocm install ${pkg.name}`;

  const copy = async () => {
    await navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="glass rounded-2xl p-6 hover:border-[rgba(49,229,255,0.3)] transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(49,229,255,0.16)] bg-[rgba(49,229,255,0.06)] text-cyan-300">
            <TypeIcon type={pkg.type} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
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
            className="px-2 py-1 text-xs rounded-md bg-[rgba(130,195,255,0.06)] text-dim border border-[rgba(130,195,255,0.1)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[rgba(130,195,255,0.08)]">
        <span className="text-xs text-dim">by {pkg.author}</span>
        <div className="flex items-center gap-2 min-w-0">
          <code className="text-xs font-mono text-cyan-400 bg-[rgba(49,229,255,0.06)] px-2 py-1 rounded truncate">
            {installCmd}
          </code>
          <button
            onClick={copy}
            className="px-3 py-1 text-xs rounded-md bg-[rgba(49,229,255,0.1)] text-cyan-400 hover:bg-[rgba(49,229,255,0.2)] transition-colors font-semibold"
          >
            {copied ? <span className="inline-flex items-center gap-1"><CheckIcon className="h-3.5 w-3.5" /> Copied</span> : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
