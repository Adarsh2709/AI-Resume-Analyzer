export type MissingSkillsProps = {
  skills: string[];
  title?: string;
};

export function MissingSkills({
  skills,
  title = "Missing skills",
}: MissingSkillsProps) {
  return (
    <section className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl transition duration-300 hover:border-orange-400/25 hover:shadow-[0_0_48px_-20px_rgba(249,115,22,0.22)] sm:p-7">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-1/2 h-28 w-44 -translate-x-1/2 rounded-full bg-red-500/10 blur-2xl"
        aria-hidden
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight text-white">
            {title}
          </h2>
          <span className="rounded-full border border-red-400/30 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-200/90">
            Gaps
          </span>
        </div>

        {skills.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">
            No critical gaps flagged for this match profile.
          </p>
        ) : (
          <ul className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <li key={`${skill}-${index}`}>
                <span className="inline-flex cursor-default items-center rounded-full border border-orange-400/35 bg-gradient-to-br from-orange-500/20 to-red-600/15 px-3 py-1.5 text-xs font-semibold text-orange-100 shadow-[0_0_0_1px_rgba(249,115,22,0.12)_inset] transition duration-200 hover:-translate-y-0.5 hover:border-red-400/45 hover:shadow-[0_0_22px_-6px_rgba(248,113,113,0.45)]">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
