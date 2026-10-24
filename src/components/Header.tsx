"use client";

import { useEffect } from "react";
import Link from "next/link";

function ThemeToggle() {
  useEffect(() => {
    const saved = window.localStorage.getItem("marketplace-theme");
    const initial =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("marketplace-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--txt)]"
    >
      <svg
        aria-hidden="true"
        className="theme-sun h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      <svg
        aria-hidden="true"
        className="theme-moon h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <path d="M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />
      </svg>
    </button>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--mark-bg)] text-xs font-bold text-[var(--mark-fg)]">
            OC
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-[var(--txt)]">
            OpenCode Marketplace
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            href="/#packages"
            className="rounded-md px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--txt)]"
          >
            Browse
          </Link>
          <Link
            href="/#about"
            className="rounded-md px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--txt)]"
          >
            About
          </Link>
          <a
            href="https://github.com/kabirprokk/opencode-registry"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--txt)]"
          >
            GitHub
          </a>
          <a
            href="https://github.com/kabirprokk/opencode-marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            Get CLI
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <Link
            href="/#packages"
            className="min-h-11 rounded-lg border border-[var(--line-strong)] px-3 py-2 text-xs font-semibold text-[var(--txt)]"
          >
            Browse
          </Link>
        </div>
      </div>
    </header>
  );
}
