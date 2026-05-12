"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { MatchCard } from "@/components/MatchCard";
import { MissingSkills } from "@/components/MissingSkills";
import { Navbar } from "@/components/Navbar";
import { RecommendationCard } from "@/components/RecommendationCard";
import { SkillList } from "@/components/SkillList";
import type { AnalyzeResponse } from "@/lib/api";
import { clearAnalyzeResultFromStorage, loadAnalyzeResultFromStorage } from "@/lib/api";

export default function ResultsPage() {
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setData(loadAnalyzeResultFromStorage());
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <main className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(52,211,153,0.08),transparent)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl">
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/80">
                Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Analysis results
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                Live view of your last successful analyze run, restored from
                this browser&apos;s local storage.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/#upload"
                className="inline-flex items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 shadow-[0_0_28px_-10px_rgba(34,211,238,0.55)] transition hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_36px_-8px_rgba(34,211,238,0.65)]"
              >
                New upload
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearAnalyzeResultFromStorage();
                  setData(null);
                }}
                className="inline-flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:border-red-400/45 hover:bg-red-500/15"
              >
                Clear saved results
              </button>
            </div>
          </header>

          {!ready ? (
            <div className="mt-20">
              <Loader label="Restoring session data" />
            </div>
          ) : !data ? (
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-[0_0_60px_-24px_rgba(34,211,238,0.25)] backdrop-blur-xl sm:p-14">
              <p className="text-lg font-semibold text-white">
                No saved analysis yet
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                Upload a PDF from the home page. After the API returns a
                payload, results are cached here and this dashboard unlocks.
              </p>
              <Link
                href="/#upload"
                className="mt-8 inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_-10px_rgba(34,211,238,0.65)] transition hover:shadow-[0_0_52px_-8px_rgba(52,211,153,0.55)]"
              >
                Go to upload
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-12">
                <MatchCard
                  bestMatch={data.best_match}
                  matchScore={data.match_score}
                />
              </div>

              <div className="lg:col-span-7">
                <SkillList skills={data.skills} />
              </div>
              <div className="lg:col-span-5">
                <MissingSkills skills={data.missing_skills} />
              </div>

              <section className="lg:col-span-12">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-white">
                      Recommended jobs
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      Ranked targets derived from your profile embedding.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200/90">
                    {data.recommendations.length} roles
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {data.recommendations.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-sm text-zinc-500 backdrop-blur-xl sm:col-span-2 xl:col-span-3">
                      No recommended jobs were returned for this run.
                    </div>
                  ) : (
                    data.recommendations.map((title, index) => (
                      <RecommendationCard
                        key={`${title}-${index}`}
                        rank={index + 1}
                        title={title}
                      />
                    ))
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
