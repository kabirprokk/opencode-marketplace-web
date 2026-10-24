export function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-[var(--txt)]">
              OpenCode Marketplace
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
              A community-built directory of skills, tools, agents, and commands
              for OpenCode. Free and open source.
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <a
                  href="https://github.com/kabirprokk/opencode-registry"
                  className="transition-colors hover:text-[var(--txt)]"
                >
                  Registry
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/kabirprokk/opencode-marketplace"
                  className="transition-colors hover:text-[var(--txt)]"
                >
                  CLI Tool
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/anomalyco/opencode"
                  className="transition-colors hover:text-[var(--txt)]"
                >
                  OpenCode
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              Community
            </p>
            <p className="text-sm leading-6 text-[var(--muted)]">
              Made with OpenCode. Independent and not affiliated with or endorsed
              by Anomaly.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 OpenCode Community Marketplace</span>
          <span>Open source · MIT License</span>
        </div>
      </div>
    </footer>
  );
}
