export type PackageType = "skill" | "agent" | "command" | "skill-pack" | "plugin" | "mcp";

export interface Package {
  name: string;
  type: PackageType;
  version: string;
  description: string;
  author: string;
  repo: string;
  path?: string;
  install: string;
  tags: string[];
  license: string;
}

export interface Registry {
  version: number;
  updated: string;
  packages: Package[];
}

const REGISTRY_URL =
  "https://raw.githubusercontent.com/kabirprokk/opencode-registry/main/registry.json";

export async function fetchRegistry(): Promise<Registry> {
  try {
    const res = await fetch(REGISTRY_URL, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Failed to fetch registry");
    return res.json();
  } catch {
    // Fallback to empty registry on error
    return { version: 1, updated: "", packages: [] };
  }
}

export function getTypeColor(type: PackageType): string {
  const colors: Record<PackageType, string> = {
    skill: "cyan",
    agent: "violet",
    command: "ok",
    "skill-pack": "warn",
    plugin: "cyan",
    mcp: "violet",
  };
  return colors[type] || "cyan";
}

export function getTypeIcon(type: PackageType): string {
  const icons: Record<PackageType, string> = {
    skill: "⚡",
    agent: "🤖",
    command: "⌨️",
    "skill-pack": "📦",
    plugin: "🔌",
    mcp: "🔗",
  };
  return icons[type] || "📦";
}
