"use client";

import { useEffect } from "react";
import Link from "next/link";

function ThemeToggle() {
  useEffect(() => {
    const saved = window.localStorage.getItem("marketplace-theme");
    const initial = saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("marketplace-theme", next);
  };

  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle color theme" title="Toggle color theme" className="theme-toggle flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-dim transition-colors hover:text-[var(--txt)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-sun h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-moon h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z"/></svg>
    </button>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-black text-sm">
            OC
          </div>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-semibold text-sm sm:text-base tracking-tight">OpenCode <span className="text-gradient">Marketplace</span></span>
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-dim">Independent community project</span>
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
          <ThemeToggle />
        </nav>
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <Link href="/#packages" className="shrink-0 rounded-lg border border-[var(--line-strong)] px-3 py-2 text-xs font-semibold text-[var(--txt)]">Browse</Link>
        </div>
      </div>
    </header>
  );
}
