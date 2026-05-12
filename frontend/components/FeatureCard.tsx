import type { ReactNode } from "react";

export type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/45 hover:bg-white/[0.06] hover:shadow-[0_0_44px_-12px_rgba(34,211,238,0.4),0_0_80px_-28px_rgba(34,211,238,0.12)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition-opacity duration-300 group-hover:bg-cyan-400/20"
      />
      <div className="relative flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 text-cyan-300 transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400/50 group-hover:text-cyan-100 group-hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.55)]">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
