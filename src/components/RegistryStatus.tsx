"use client";

import { useState } from "react";
import { PackageType, Registry } from "@/lib/registry";

const TYPE_LABELS: Record<PackageType, string> = {
  skill: "Skills",
  agent: "Agents",
  command: "Commands",
  "skill-pack": "Packs",
  mcp: "MCP servers",
};

const UPDATE_COMMAND = "npm install --global github:kabirprokk/opencode-marketplace";

function formatUpdatedDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  if (!value || !Number.isFinite(date.getTime())) return "date unavailable";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "long", timeZone: "UTC" }).format(date);
}

export function RegistryStatus({ registry, isLive, isChecking }: {
  registry: Registry;
  isLive: boolean;
  isChecking: boolean;
}) {
  const [copyStatus, setCopyStatus] = useState("");
  const counts = registry.packages.reduce<Partial<Record<PackageType, number>>>((result, pkg) => {
    result[pkg.type] = (result[pkg.type] ?? 0) + 1;
    return result;
  }, {});

  async function copyUpdateCommand() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(UPDATE_COMMAND);
      } else {
        const field = document.createElement("textarea");
        field.value = UPDATE_COMMAND;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("Clipboard copy failed");
      }
      setCopyStatus("Command copied. Run it yourself to install or update OCM.");
    } catch {
      setCopyStatus("Copy failed. Select and copy the command manually.");
    }
  }

  return (
    <aside className="mb-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5" aria-label="Registry update information">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--txt)]">Registry status</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {registry.packages.length.toLocaleString()} packages · updated {formatUpdatedDate(registry.updated)}
          </p>
        </div>
        <p className="text-xs text-[var(--muted)]" role="status" aria-live="polite">
          {isLive ? "Live registry data" : isChecking ? "Checking for updates…" : "Showing the saved site snapshot"}
        </p>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Package counts by type">
        {(Object.keys(TYPE_LABELS) as PackageType[]).filter((type) => counts[type]).map((type) => (
          <li key={type} className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] text-[var(--muted)]">
            {TYPE_LABELS[type]} <span className="font-mono text-[var(--txt)]">{counts[type]}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <code className="min-w-0 flex-1 overflow-x-auto rounded-md bg-[var(--surface-overlay)] px-3 py-2.5 font-mono text-xs text-[var(--txt)]">{UPDATE_COMMAND}</code>
        <button
          type="button"
          onClick={copyUpdateCommand}
          aria-label="Copy OCM install and update command"
          className="min-h-10 shrink-0 rounded-md border border-[var(--line-strong)] px-3 text-xs font-medium text-[var(--txt)] transition-colors hover:bg-[var(--surface-overlay)]"
        >
          Copy update command
        </button>
      </div>
      <p className="mt-2 min-h-4 text-[11px] text-[var(--muted)]" role="status" aria-live="polite">
        {copyStatus || "The website displays instructions only; it never changes your local OCM installation."}
      </p>
    </aside>
  );
}
