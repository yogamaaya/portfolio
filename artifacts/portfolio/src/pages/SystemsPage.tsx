import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import RouteSeo from "../seo/RouteSeo";

const systems = [
  {
    title: "Systems Architecture",
    description:
      "Cloud, identity, data, and media architectures governed as one coherent operating system.",
    topics: ["AWS", "Identity Architecture", "Data Integrity", "Production Governance"],
  },
  {
    title: "Cybersecurity & Privacy",
    description:
      "Security decisions grounded in privacy by design, audit integrity, and regulated environments.",
    topics: ["Cybersecurity", "GRC", "Privacy by Design", "Audit Integrity"],
  },
  {
    title: "AI Governance",
    description:
      "Human judgment, model quality, and organizational controls designed into applied AI systems.",
    topics: ["Agentic AI", "Multimodal QA", "AI Strategy", "Responsible Deployment"],
  },
  {
    title: "Technology Strategy",
    description:
      "Research, product ownership, and technical liaison work that turns ambiguity into executable systems.",
    topics: ["Product Ownership", "Technical R&D", "Enterprise Change", "Automation"],
  },
];

const selectedWork = [
  {
    name: "Kleam.ai",
    detail: "Multi-model AI deliberation platform and voice-giving persona system.",
    href: "https://kleam.ai",
  },
  {
    name: "Drive Transcriber",
    detail: "Authenticated AI transcription pipeline producing edit-ready media outputs.",
    href: "https://drivetranscribe.replit.app",
  },
  {
    name: "Textract / OCR",
    detail: "Parallel AI vision and Tesseract quality layer for reliable text extraction.",
    href: "https://textract.replit.app",
  },
];

const pageSchema = [
  {
    "@type": "ItemPage",
    "@id": "https://motadaka.com/systems#webpage",
    url: "https://motadaka.com/systems",
    name: "Systems & Technical Research | Snigdha Motadaka",
    description:
      "Snigdha Motadaka's systems architecture, cybersecurity, AI governance, and technical research.",
    isPartOf: { "@id": "https://motadaka.com/#website" },
    about: { "@id": "https://motadaka.com/#person" },
    breadcrumb: { "@id": "https://motadaka.com/systems#breadcrumb" },
  },
  {
    "@type": "BreadcrumbList",
    "@id": "https://motadaka.com/systems#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://motadaka.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Systems & Research",
        item: "https://motadaka.com/systems",
      },
    ],
  },
];

export default function SystemsPage() {
  return (
    <div className="min-h-screen bg-[#07080f] text-[#edf0f7] font-sans overflow-x-hidden">
      <RouteSeo
        title="Systems & Technical Research | Snigdha Motadaka"
        description="Explore Snigdha Motadaka's systems architecture, cybersecurity, AI governance, and technical research, alongside creative work as snieaks."
        path="/systems"
        pageSchema={pageSchema}
      />

      <header className="border-b border-white/[0.07] bg-[#07080f]/90 backdrop-blur-xl">
        <nav className="max-w-[1080px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4" aria-label="Primary navigation">
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/60 hover:text-white no-underline">
            <ArrowLeft size={14} />
            Snigdha Motadaka
          </Link>
          <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.16em]">
            <Link href="/systems" className="text-[#34d8ee] no-underline">Technical Research & Systems</Link>
            <Link href="/snieaks" className="text-white/55 hover:text-white no-underline">Snieaks (Art & Media)</Link>
          </div>
        </nav>
      </header>

      <main>
        <article>
          <section className="max-w-[1080px] mx-auto px-6 pt-24 pb-20 md:pt-32">
            <p className="text-[12px] uppercase tracking-[0.28em] text-[#34d8ee] mb-6">Systems & Technical Research</p>
            <h1 className="font-display font-semibold text-[clamp(44px,8vw,92px)] leading-[0.98] max-w-[11ch]">
              Architecture with integrity at every layer.
            </h1>
            <p className="mt-8 text-[clamp(17px,2vw,22px)] leading-[1.7] text-[#a3aec5] max-w-[70ch]">
              Snigdha Motadaka is an AI systems architect and technologist working across cybersecurity,
              AI governance, technical strategy, product ownership, and regulatory data integrity.
            </p>
          </section>

          <section className="max-w-[1080px] mx-auto px-6 pb-24 grid md:grid-cols-2 gap-5" aria-labelledby="capabilities-heading">
            <h2 id="capabilities-heading" className="sr-only">Technical capabilities</h2>
            {systems.map((system) => (
              <article key={system.title} className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-7 md:p-9">
                <h3 className="font-display text-2xl md:text-3xl font-semibold">{system.title}</h3>
                <p className="mt-4 text-[#a3aec5] leading-relaxed">{system.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2 list-none p-0" aria-label={`${system.title} topics`}>
                  {system.topics.map((topic) => (
                    <li key={topic} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-white/55">
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="border-y border-white/[0.07] bg-white/[0.025]" aria-labelledby="selected-systems-heading">
            <div className="max-w-[1080px] mx-auto px-6 py-24">
              <h2 id="selected-systems-heading" className="font-display text-[clamp(32px,5vw,54px)] font-semibold">Selected systems</h2>
              <div className="mt-10 divide-y divide-white/[0.08]">
                {selectedWork.map((work) => (
                  <a key={work.name} href={work.href} target="_blank" rel="noopener noreferrer"
                    className="py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-white no-underline group">
                    <div>
                      <h3 className="text-xl font-medium group-hover:text-[#34d8ee] transition-colors">{work.name}</h3>
                      <p className="mt-2 text-[#727e9c]">{work.detail}</p>
                    </div>
                    <ExternalLink size={18} className="text-white/35 group-hover:text-[#34d8ee]" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-[1080px] mx-auto px-6 py-24" aria-labelledby="research-profiles-heading">
            <h2 id="research-profiles-heading" className="font-display text-[clamp(30px,4vw,46px)] font-semibold">Research and professional profiles</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                ["LinkedIn", "https://www.linkedin.com/in/motadaka"],
                ["GitHub", "https://github.com/snigui"],
                ["Google Scholar", "https://scholar.google.com/citations?hl=en&user=d2B5jccAAAAJ"],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm text-white/75 hover:text-white hover:border-[#34d8ee]/60 no-underline">
                  {label}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </section>
        </article>
      </main>

      <footer className="border-t border-white/[0.07]">
        <div className="max-w-[1080px] mx-auto px-6 py-8 flex flex-wrap justify-between gap-4 text-[12px] text-white/40">
          <span>© 2026 Snigdha Motadaka</span>
          <Link href="/snieaks" className="text-white/50 hover:text-white no-underline">Explore Snieaks art and media</Link>
        </div>
      </footer>
    </div>
  );
}
