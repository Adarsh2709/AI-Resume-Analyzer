export function HeroSection() {
  const stats = [
    { label: "Parse time", value: "< 3s" },
    { label: "Skill tags", value: "50+" },
    { label: "Match depth", value: "Role-aware" },
    { label: "Privacy", value: "Encrypted" },
  ] as const;

  return (
    <section
      className="relative overflow-hidden border-b border-white/5 px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-20 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(9,9,11,0.88))]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-300/95">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.55)]" />
          Live matching engine
        </p>

        <h1
          id="hero-heading"
          className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl sm:leading-[1.08] lg:text-6xl lg:leading-[1.06]"
        >
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_48px_rgba(34,211,238,0.28)]">
            AI Resume Analyzer
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          AI-powered resume matching that reads between the lines—map skills to
          roles, score fit against live job specs, and surface opportunities
          aligned to how you actually work.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <a
            href="#upload"
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-8 py-3.5 text-base font-semibold text-zinc-950 shadow-[0_0_40px_-8px_rgba(34,211,238,0.75)] transition hover:scale-[1.02] hover:shadow-[0_0_52px_-6px_rgba(34,211,238,0.85)] active:scale-[0.98] sm:w-auto"
          >
            Upload your resume
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-base font-medium text-zinc-200 backdrop-blur-sm transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white"
          >
            View features
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-left">
              <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {stat.label}
              </dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-cyan-200 sm:text-xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
