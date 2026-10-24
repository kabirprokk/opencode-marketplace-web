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

  return (
    <article className="group flex flex-col rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-all duration-200 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-md)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-overlay)] text-[var(--accent-text)]">
            <TypeIcon type={pkg.type} className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[var(--txt)] transition-colors group-hover:text-[var(--accent-text)]">
              {pkg.name}
            </h3>
            <span className="text-xs text-[var(--muted)]">{pkg.type}</span>
          </div>
        </div>
        <span className="shrink-0 font-mono text-xs text-[var(--muted)]">
          v{pkg.version}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-[var(--muted)]">
        {pkg.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {pkg.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[var(--surface-overlay)] px-2 py-0.5 text-xs text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
        {pkg.tags.length > 3 && (
          <span className="px-1 py-0.5 text-xs text-[var(--muted)]">
            +{pkg.tags.length - 3}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-3">
        <span className="text-xs text-[var(--muted)]">by {pkg.author}</span>
        <div className="flex min-w-0 items-center gap-2">
          <code className="code-bg min-w-0 truncate rounded-md px-2 py-1 font-mono text-xs text-[var(--accent-text)]">
            {installCmd}
          </code>
          <button
            onClick={copy}
            aria-label={`Copy install command for ${pkg.name}`}
            className="min-h-11 shrink-0 rounded-md border border-[var(--line)] px-3 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--txt)]"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1">
                <CheckIcon className="h-3 w-3" /> Copied
              </span>
            ) : (
              "Copy"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
