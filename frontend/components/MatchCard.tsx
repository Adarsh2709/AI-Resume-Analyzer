"use client";

import { useEffect, useState } from "react";

export type MatchCardProps = {
  bestMatch: string;
  matchScore: number;
};

export function MatchCard({ bestMatch, matchScore }: MatchCardProps) {
  const [barWidth, setBarWidth] = useState(0);
  const clamped = Math.min(100, Math.max(0, Math.round(matchScore)));

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setBarWidth(clamped);
    });
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_64px_-28px_rgba(34,211,238,0.35)] backdrop-blur-xl transition duration-500 hover:border-cyan-400/35 hover:shadow-[0_0_72px_-24px_rgba(34,211,238,0.45)] sm:p-8">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500 group-hover:bg-cyan-400/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-500 group-hover:bg-emerald-400/12"
        aria-hidden
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Best matching role
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent">
              {bestMatch}
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            Composite fit signal for this role cluster, scaled from{" "}
            <span className="font-mono text-zinc-300">0</span> to{" "}
            <span className="font-mono text-zinc-300">100</span>.
          </p>
        </div>

        <div className="relative w-full shrink-0 lg:max-w-md">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Match score
              </p>
              <p className="mt-1 flex items-baseline gap-1">
                <span className="text-4xl font-black tabular-nums text-cyan-300 drop-shadow-[0_0_28px_rgba(34,211,238,0.45)] sm:text-5xl">
                  {clamped}
                </span>
                <span className="text-lg font-semibold text-emerald-300/90">
                  %
                </span>
              </p>
            </div>
            <div className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-200/90 shadow-[0_0_20px_-6px_rgba(52,211,153,0.35)]">
              Live fit
            </div>
          </div>

          <div
            className="mt-5 h-3.5 w-full overflow-hidden rounded-full border border-white/10 bg-zinc-900/80 p-0.5 shadow-inner"
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Match score ${clamped} percent`}
          >
            <div
              className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 transition-[width] duration-[1100ms] ease-out shadow-[0_0_24px_rgba(34,211,238,0.55)]"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-zinc-500">
            Normalized to <span className="font-mono text-zinc-400">0–100</span>
          </p>
        </div>
      </div>
    </article>
  );
}
