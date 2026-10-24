import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-black text-sm">
            OC
          </div>
          <span className="truncate font-bold text-sm sm:text-lg tracking-tight">
            OpenCode <span className="text-gradient">Marketplace</span>
          </span>
        </Link>
        <nav className="hidden sm:flex items-center gap-4 lg:gap-6 text-sm">
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
        <Link href="/#packages" className="sm:hidden shrink-0 rounded-lg border border-[rgba(49,229,255,0.24)] px-3 py-2 text-xs font-semibold text-cyan-300">
          Browse
        </Link>
      </div>
    </header>
  );
}
