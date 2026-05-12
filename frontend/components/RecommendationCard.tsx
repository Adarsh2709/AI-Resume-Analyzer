export type RecommendationCardProps = {
  title: string;
  description?: string;
  rank: number;
};

export function RecommendationCard({
  title,
  description,
  rank,
}: RecommendationCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:shadow-[0_0_40px_-16px_rgba(34,211,238,0.35)] sm:p-6">
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition-opacity duration-300 group-hover:bg-cyan-400/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/25 to-emerald-500/10 font-mono text-xs font-bold text-cyan-100 shadow-[0_0_18px_-4px_rgba(34,211,238,0.45)] transition duration-300 group-hover:scale-105">
            {String(rank).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold tracking-tight text-white">
              {title}
            </h3>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/85">
              Recommended role
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400 transition group-hover:border-emerald-400/25 group-hover:text-emerald-200/90">
          AI pick
        </span>
      </div>

      {description ? (
        <p className="relative mt-4 text-sm leading-relaxed text-zinc-400 transition group-hover:text-zinc-300">
          {description}
        </p>
      ) : null}

      <div
        className={`relative flex items-center justify-between border-t border-white/5 pt-4 ${description ? "mt-5" : "mt-8"}`}
      >
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Rank
        </span>
        <span className="font-mono text-xs font-semibold text-cyan-300/90">
          #{rank}
        </span>
      </div>
    </article>
  );
}
