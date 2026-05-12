type LoaderProps = {
  label?: string;
  className?: string;
};

export function Loader({ label = "Loading", className = "" }: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span
        className="relative inline-flex h-12 w-12 rounded-full border-2 border-cyan-400/15 border-t-cyan-400 shadow-[0_0_24px_-4px_rgba(34,211,238,0.45)] animate-spin"
        aria-hidden
      />
      {label ? (
        <p className="text-sm font-medium tracking-wide text-zinc-500">{label}</p>
      ) : null}
    </div>
  );
}
