export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_.7fr_.9fr]">
          <div>
            <div className="mb-3 font-semibold text-lg">
              OpenCode <span className="text-gradient">Marketplace</span>
            </div>
            <p className="text-sm text-dim leading-relaxed">
              A community-built directory of skills, tools, agents, and commands for OpenCode.
            </p>
          </div>
          <div>
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">Explore</div>
            <ul className="space-y-2 text-sm text-dim">
              <li><a href="https://github.com/kabirprokk/opencode-registry" className="hover:text-cyan-400 transition-colors">Registry</a></li>
              <li><a href="https://github.com/kabirprokk/opencode-marketplace" className="hover:text-cyan-400 transition-colors">CLI Tool</a></li>
              <li><a href="https://github.com/anomalyco/opencode" className="hover:text-cyan-400 transition-colors">OpenCode</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">A community project</div>
            <p className="text-sm text-dim leading-relaxed">
              Made with OpenCode. Independent and not affiliated with or endorsed by Anomaly.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--line)] pt-5 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 OpenCode Community Marketplace</span>
          <span>Open source · MIT License</span>
        </div>
      </div>
    </footer>
  );
}
