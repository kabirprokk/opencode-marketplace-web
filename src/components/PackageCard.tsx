"use client";

import { useState } from "react";
import { Package, getTypeColor, getTypeIcon } from "@/lib/registry";

export function PackageCard({ pkg }: { pkg: Package }) {
  const [copied, setCopied] = useState(false);
  const installCmd = `ocm install ${pkg.name}`;

  const copy = async () => {
    await navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const color = getTypeColor(pkg.type);

  return (
    <div className="glass rounded-2xl p-6 hover:border-[rgba(49,229,255,0.3)] transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getTypeIcon(pkg.type)}</span>
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
              {pkg.name}
            </h3>
            <span className={`text-xs font-mono uppercase tracking-wider text-${color}-400`}>
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

      <div className="flex items-center justify-between pt-4 border-t border-[rgba(130,195,255,0.08)]">
        <span className="text-xs text-dim">by {pkg.author}</span>
        <div className="flex items-center gap-2">
          <code className="text-xs font-mono text-cyan-400 bg-[rgba(49,229,255,0.06)] px-2 py-1 rounded">
            {installCmd}
          </code>
          <button
            onClick={copy}
            className="px-3 py-1 text-xs rounded-md bg-[rgba(49,229,255,0.1)] text-cyan-400 hover:bg-[rgba(49,229,255,0.2)] transition-colors font-semibold"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
