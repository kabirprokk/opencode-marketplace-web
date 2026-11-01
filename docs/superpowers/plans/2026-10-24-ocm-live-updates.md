# OCM website live updates implementation plan

This plan updates the static Cloudflare Pages export to read the public
registry in the visitor's browser while retaining its build-time snapshot as a
fallback. The page displays instructions only; it does not update a visitor's
local OCM installation.

## Task 1: Add client-side live registry refresh with fallback

**Files:** `src/lib/registry.ts`, `src/components/MarketplaceHome.tsx`,
`src/components/LandingHome.tsx`

1. Extend the registry helper with a browser-safe live fetch function using the
   existing public registry URL, `cache: "no-store"`, a bounded timeout, and
   the current registry/package validation.
2. Keep `fetchRegistry()` and its build-time result as the initial snapshot.
   Return a clear live/fallback result without replacing valid initial data
   when the network request fails or returns invalid data.
3. Refresh the client-side package state after mount in both the directory and
   landing page. Preserve filters, URL state, and the initial static render.
4. Show the registry's valid `updated` date, current total and per-type package
   counts, plus a freshness indicator. Retain snapshot values when live data is
   unavailable.
5. Add a copyable OCM CLI install/update command using the repository's
   documented command: `npm install --global
   github:kabirprokk/opencode-marketplace`. Explain that visitors run it
   themselves; never execute it from the page.

**Verification:** Unit-test registry validation and fallback behavior. Verify
the page initially renders snapshot data, switches to valid live data, and
retains snapshot values for failed, timed-out, and malformed responses.

## Task 2: Verify static export and user interactions

**Files:** `src/lib/registry.ts`, `src/components/MarketplaceHome.tsx`,
`src/components/LandingHome.tsx`, and focused tests

1. Read the installed Next.js 16.4.3 client-component and data-fetching guides
   before implementation, and keep browser-only fetch logic in client code.
2. Run lint, TypeScript checks, and the production static-export build.
3. Serve the export and verify live updates, copy feedback, filters, navigation,
   and fallback behavior at desktop and mobile widths.
4. Confirm the solution requires no server runtime, secret, deployment token,
   or local-machine installation capability.
