import Link from "next/link";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#privacy", label: "Privacy" },
  { href: "#terms", label: "Terms" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight text-white"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 text-sm font-bold text-cyan-300"
                aria-hidden
              >
                AI
              </span>
              Resume Analyzer
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
              Intelligent resume intelligence for modern hiring—parsing,
              scoring, and recommendations in one flow.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-zinc-400"
            aria-label="Footer"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-cyan-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.</p>
          <p className="font-mono text-xs text-zinc-500">
            Built for clarity. Designed for impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
