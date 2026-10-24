import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Package } from "@/lib/registry";

export function LandingHome({ packages }: { packages: Package[] }) {
  const featured = packages.find((pkg) => pkg.name === "brainstorming") ?? packages[0];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:min-h-[min(760px,calc(100vh-69px))] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                The community marketplace for OpenCode
              </p>
              <h1 className="mt-7 max-w-3xl text-[clamp(3rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--txt)]">
                Your OpenCode.
                <br />
                Your toolkit.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                Find community-built skills, agents, and commands that make your
                coding workflow feel like your own.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/marketplace"
                  className="inline-flex min-h-12 items-center gap-3 rounded-md bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
                >
                  Browse {packages.length} packages
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            <aside className="relative rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8" aria-label="Featured community package">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
                <span className="text-xs font-medium text-[var(--muted)]">A look inside the catalog</span>
                <span className="rounded-full bg-[var(--surface-overlay)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
                  {featured?.type.replace("-", " ") ?? "Community skill"}
                </span>
              </div>
              {featured ? (
                <>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--txt)] sm:text-3xl">
                    {featured.name}
                  </h2>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-[var(--muted)]">
                    {featured.description}
                  </p>
                  <div className="mt-7 rounded-md border border-[var(--line)] bg-[var(--bg)] p-4">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                      Install command
                    </p>
                    <code className="break-all font-mono text-sm text-[var(--txt)]">
                      ocm install {featured.name}
                    </code>
                  </div>
                  <p className="mt-5 text-xs text-[var(--muted)]">
                    By {featured.author} <span aria-hidden="true">·</span> {featured.license}
                  </p>
                </>
              ) : (
                <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
                  Browse the catalog to discover community-built OpenCode tools.
                </p>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
