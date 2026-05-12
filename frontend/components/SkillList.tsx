export type SkillListProps = {
  skills: string[];
  title?: string;
};

export function SkillList({
  skills,
  title = "Extracted skills",
}: SkillListProps) {
  return (
    <section className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl transition duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_48px_-20px_rgba(34,211,238,0.28)] sm:p-7">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight text-white">
            {title}
          </h2>
          <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-200/90">
            {skills.length} tags
          </span>
        </div>
        {skills.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">No skills extracted.</p>
        ) : (
          <ul className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <li key={`${skill}-${index}`}>
                <span className="inline-flex cursor-default items-center rounded-full border border-cyan-400/25 bg-gradient-to-br from-cyan-500/15 to-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.08)_inset] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:shadow-[0_0_20px_-6px_rgba(34,211,238,0.45)]">
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
