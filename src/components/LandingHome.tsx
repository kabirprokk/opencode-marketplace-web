import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PackageCard } from "@/components/PackageCard";
import { Package } from "@/lib/registry";

export function LandingHome({ packages }: { packages: Package[] }) {
  const skills = packages
    .filter((pkg) => pkg.type === "skill")
    .sort((a, b) => a.name.localeCompare(b.name));

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

            <aside className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8" aria-label="Community marketplace overview">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                The community library
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-5xl font-semibold tracking-tight text-[var(--txt)]">{skills.length}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">community skills</p>
                </div>
                <div className="border-l border-[var(--line)] pl-5">
                  <p className="text-5xl font-semibold tracking-tight text-[var(--txt)]">{packages.length}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">total packages</p>
                </div>
              </div>
              <div className="mt-8 border-t border-[var(--line)] pt-5">
                <p className="text-xs font-medium text-[var(--muted)]">Install any package with</p>
                <code className="mt-3 block rounded-md bg-[var(--bg)] px-4 py-3 font-mono text-sm text-[var(--txt)]">
                  ocm install &lt;package&gt;
                </code>
              </div>
            </aside>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                Explore the collection
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--txt)] sm:text-3xl">
                Community skills
              </h2>
            </div>
            <p className="text-sm text-[var(--muted)]">{skills.length} skills · A–Z</p>
          </div>

          {skills.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {skills.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} showType={false} />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
              No skills are listed yet. Visit the marketplace to browse all community packages.
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <Link
              href="/marketplace"
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--line-strong)] px-4 text-sm font-medium text-[var(--txt)] transition-colors hover:bg-[var(--surface-overlay)]"
            >
              Browse all package types
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
