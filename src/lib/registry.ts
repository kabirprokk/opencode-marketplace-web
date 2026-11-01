export type PackageType = "skill" | "agent" | "command" | "skill-pack" | "mcp";

export interface Package {
  name: string;
  type: PackageType;
  version: string;
  description: string;
  author: string;
  repo: string;
  path?: string;
  skill_count?: number;
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
const PACKAGE_TYPES: PackageType[] = ["skill", "agent", "command", "skill-pack", "mcp"];

function isPackage(value: unknown): value is Package {
  if (!value || typeof value !== "object") return false;
  const pkg = value as Record<string, unknown>;
  return typeof pkg.name === "string" &&
    typeof pkg.type === "string" && PACKAGE_TYPES.includes(pkg.type as PackageType) &&
    typeof pkg.version === "string" &&
    typeof pkg.description === "string" &&
    typeof pkg.author === "string" &&
    typeof pkg.repo === "string" &&
    (pkg.path === undefined || typeof pkg.path === "string") &&
    typeof pkg.install === "string" &&
    Array.isArray(pkg.tags) && pkg.tags.every((tag) => typeof tag === "string") &&
    typeof pkg.license === "string";
}

export function parseRegistry(value: unknown): Registry | null {
  if (!value || typeof value !== "object") return null;
  const registry = value as Record<string, unknown>;
  if (typeof registry.version !== "number" ||
    typeof registry.updated !== "string" ||
    !Array.isArray(registry.packages) || !registry.packages.every(isPackage)) return null;
  return registry as unknown as Registry;
}

export async function fetchLiveRegistry(fetcher: typeof fetch = fetch): Promise<Registry> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetcher(REGISTRY_URL, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Registry request failed (HTTP ${response.status})`);
    const registry = parseRegistry(await response.json());
    if (!registry) throw new Error("Registry response has an invalid registry format");
    return registry;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchRegistry(): Promise<Registry> {
  try {
    const res = await fetch(REGISTRY_URL, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Failed to fetch registry");
    const registry = parseRegistry(await res.json());
    if (!registry) throw new Error("Registry response has an invalid format");
    return registry;
  } catch {
    // The exported page still has a valid, renderable empty snapshot.
    return { version: 1, updated: "", packages: [] };
  }
}

export function getTypeColor(type: PackageType): string {
  const colors: Record<PackageType, string> = {
    skill: "cyan",
    agent: "violet",
    command: "ok",
    "skill-pack": "warn",
    mcp: "violet",
  };
  return colors[type] || "cyan";
}
