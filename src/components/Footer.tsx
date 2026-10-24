"use client";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(130,195,255,0.11)] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-bold text-lg mb-3">
              OpenCode <span className="text-gradient">Marketplace</span>
            </div>
            <p className="text-sm text-dim leading-relaxed">
              Free community skills, tools, agents, and commands for OpenCode.
              100% free and open source.
            </p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3 text-cyan-400">Links</div>
            <ul className="space-y-2 text-sm text-dim">
              <li><a href="https://github.com/kabirprokk/opencode-registry" className="hover:text-cyan-400 transition-colors">Registry</a></li>
              <li><a href="https://github.com/kabirprokk/opencode-marketplace" className="hover:text-cyan-400 transition-colors">CLI Tool</a></li>
              <li><a href="https://github.com/anomalyco/opencode" className="hover:text-cyan-400 transition-colors">OpenCode</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3 text-cyan-400">Made by</div>
            <p className="text-sm text-dim leading-relaxed">
              Built with OpenCode AI by the community. Independent project, not affiliated with Anomaly.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[rgba(130,195,255,0.08)] text-center text-xs text-dim">
          © 2026 OpenCode Marketplace. MIT License.
        </div>
      </div>
    </footer>
  );
}
