"use client";

import { useState } from "react";
import { Package } from "@/lib/registry";
import { CheckIcon } from "@/components/TypeIcon";

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
    <article className="group flex min-h-56 flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--line-strong)]">
      <div className="mb-2">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
          {pkg.type.replace("-", " ")}
        </span>
      </div>
      <h2 className="truncate text-base font-semibold tracking-tight text-[var(--txt)] transition-colors group-hover:text-[var(--accent-text)]">
        {pkg.name}
      </h2>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-[var(--muted)]">
        {pkg.description}
      </p>
      <p className="mt-3 text-xs text-[var(--muted)]">by {pkg.author} <span aria-hidden="true">·</span> {pkg.license}</p>
      <button
        onClick={copy}
        type="button"
        aria-label={`Copy install command: ${installCmd}`}
        className="mt-4 flex min-h-11 w-full items-center justify-between gap-3 rounded-md bg-[var(--surface-overlay)] px-3 text-left transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
      >
        <code className="min-w-0 truncate font-mono text-xs">{installCmd}</code>
        <span className="shrink-0 text-xs font-medium">
          {copied ? <span className="inline-flex items-center gap-1"><CheckIcon className="h-3 w-3" />Copied</span> : "Copy"}
        </span>
      </button>
    </article>
  );
}
