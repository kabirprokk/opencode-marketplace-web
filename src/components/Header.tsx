import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-black text-sm">
            OC
          </div>
          <span className="font-bold text-lg tracking-tight">
            OpenCode <span className="text-gradient">Marketplace</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/#packages" className="text-dim hover:text-cyan-400 transition-colors">
            Browse
          </Link>
          <Link href="/#about" className="text-dim hover:text-cyan-400 transition-colors">
            About
          </Link>
          <a
            href="https://github.com/kabirprokk/opencode-registry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/kabirprokk/opencode-marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            Install CLI
          </a>
        </nav>
      </div>
    </header>
  );
}
