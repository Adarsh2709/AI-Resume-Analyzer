"use client";

import Link from "next/link";

const navLinks = [
  { href: "#upload", label: "Upload" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-white transition hover:text-cyan-300"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/35 bg-gradient-to-br from-cyan-500/25 to-cyan-600/5 text-sm font-bold text-cyan-200 shadow-[0_0_22px_-4px_rgba(34,211,238,0.55)]"
            aria-hidden
          >
            AI
          </span>
          <span className="hidden sm:inline">Resume Analyzer</span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm font-medium text-zinc-400 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-cyan-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#sign-in"
            className="hidden text-sm font-medium text-zinc-400 transition hover:text-white sm:inline"
          >
            Sign in
          </Link>
          <Link
            href="#upload"
            className="rounded-full border border-cyan-400/45 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_26px_-8px_rgba(34,211,238,0.65)] transition hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_36px_-6px_rgba(34,211,238,0.75)]"
          >
            Get started
          </Link>
        </div>
      </div>

      <nav
        className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-white/5 px-3 py-2.5 lg:hidden"
        aria-label="Mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-cyan-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
