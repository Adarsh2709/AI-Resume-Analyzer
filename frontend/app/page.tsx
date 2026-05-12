import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { UploadBox } from "@/components/UploadBox";

function IconDocument() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  );
}

function IconChart() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006-4.5-.165m0 0a48.11 48.11 0 0 0-3.478-.397m4.5 8.006v-4.006m0 0c-.22.017-.443.025-.665.025a48.115 48.115 0 0 1-3.255-.186m0 0a2.18 2.18 0 0 1-.75-1.661V6.365c0-.22.017-.443.025-.665C6.845 4.905 6.5 4.436 6.5 3.73v-.372c0-.516.435-.94.95-.94h10.1c.516 0 .95.424.95.94v.372c0 .716-.345 1.184-.805 1.852M4.667 6.198v4.067c0 .753.333 1.429.86 1.877A48.255 48.255 0 0 0 5.455 15.11m11.517.858A48.11 48.11 0 0 1 12 20.478a48.11 48.11 0 0 1-3.974-.967 6.03 6.03 0 0 1-.86-1.877m0 0v-4.067m0 0A48.255 48.255 0 0 0 12 5.455"
      />
    </svg>
  );
}

const features = [
  {
    title: "Resume Parsing",
    description:
      "Structured extraction of roles, impact bullets, education, and timelines from PDF and Word—ready for downstream scoring.",
    icon: <IconDocument />,
  },
  {
    title: "Skill Extraction",
    description:
      "Semantic skill tagging across frameworks, domains, and soft skills with confidence signals you can trust.",
    icon: <IconSparkles />,
  },
  {
    title: "Match Scoring",
    description:
      "Role-aware fit scores that weight must-have skills, seniority, and stack overlap—not naive keyword overlap.",
    icon: <IconChart />,
  },
  {
    title: "Job Recommendations",
    description:
      "Ranked openings aligned to your profile, with rationale snippets so you know why each role is a strong next step.",
    icon: <IconBriefcase />,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <main>
        <HeroSection />

        <section
          id="upload"
          className="relative scroll-mt-28 overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
          aria-labelledby="upload-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(34,211,238,0.1),transparent)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl">
            <UploadBox />
          </div>
        </section>

        <section
          id="features"
          className="relative scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8"
          aria-labelledby="features-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2
                id="features-heading"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Intelligence built for matching
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                Glassmorphism panels, neon telemetry, and production-grade
                parsing—so every signal you ship to hiring teams feels
                deliberate.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <FeatureCard
                  key={f.title}
                  title={f.title}
                  description={f.description}
                  icon={f.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-28 border-y border-white/5 bg-white/[0.02] px-4 py-20 backdrop-blur-sm sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              How it works
            </h2>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Upload",
                  body: "Drop your resume. We normalize format and run secure ingestion.",
                },
                {
                  step: "02",
                  title: "Analyze",
                  body: "Models parse structure, extract skills, and compute match vectors.",
                },
                {
                  step: "03",
                  title: "Act",
                  body: "Review scores, tune targets, and export recommendations.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 transition duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_40px_-16px_rgba(34,211,238,0.28)]"
                >
                  <span className="font-mono text-sm font-semibold text-cyan-400/95">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="pricing"
          className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8"
          aria-labelledby="pricing-heading"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="pricing-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Ready when you are
            </h2>
            <p className="mt-4 text-zinc-400">
              Start with analysis on your latest resume. Scale to team
              workspaces when you need shared benchmarks and audit trails.
            </p>
            <a
              href="#upload"
              className="mt-8 inline-flex rounded-full border border-cyan-400/45 bg-cyan-500/10 px-8 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20 hover:shadow-[0_0_32px_-8px_rgba(34,211,238,0.5)]"
            >
              Start upload
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
