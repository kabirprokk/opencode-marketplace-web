"use client";

import { useEffect, useState } from "react";

const INTRO_SEEN_KEY = "ocm-intro-seen-v1";
const INTRO_VIDEO = "/opencode-intro.mp4";

export function IntroVideo() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(INTRO_SEEN_KEY)) return;
      window.localStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage may be disabled; still show the intro for this page view.
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = window.requestAnimationFrame(() => setShowIntro(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <section
        aria-labelledby="intro-video-title"
        className="mx-auto max-w-7xl px-5 pb-8 pt-2 sm:px-6 sm:pb-10"
      >
        <div className="grid items-center gap-6 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:grid-cols-[minmax(0,1fr)_minmax(18rem,0.85fr)] sm:p-7">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
              OpenCode Community Marketplace
            </p>
            <h2 id="intro-video-title" className="text-xl font-semibold tracking-tight text-[var(--txt)] sm:text-2xl">
              A community-built toolkit for OpenCode
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Explore skills, agents, commands, and tools made by the community.
            </p>
          </div>
          <video
            className="aspect-video w-full rounded-lg border border-[var(--line)] bg-black object-contain"
            controls
            playsInline
            preload="metadata"
            src={INTRO_VIDEO}
            aria-label="OpenCode Marketplace logo intro"
          >
            Your browser does not support embedded video.
          </video>
        </div>
      </section>

      {showIntro && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#090909] p-4"
          role="dialog"
          aria-modal="true"
          aria-label="OpenCode Marketplace introduction"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            src={INTRO_VIDEO}
            onEnded={() => setShowIntro(false)}
            className="max-h-full w-full max-w-6xl object-contain"
            aria-label="OpenCode Marketplace logo intro"
          />
          <button
            type="button"
            onClick={() => setShowIntro(false)}
            className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/50 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Skip intro
          </button>
        </div>
      )}
    </>
  );
}
