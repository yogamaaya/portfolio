import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } }
};

const stats = [
  { num: "11", label: "Systems Shipped", desc: "End-to-end products live in the world." },
  { num: "5", label: "Organisations Transformed", desc: "M&T Bank · ATSA · JustShreem · Billion Readers · devipuram.org" },
  { num: "7×", label: "Speed Uplift", desc: "Quality and velocity in the same body of work — the rarest combination." },
  { num: "2", label: "Frontier AI Companies", desc: "Text-to-vision model data quality at Meta and OpenAI." },
];

const experience = [
  {
    id: "mt-bank",
    period: "2022 – 2024",
    org: "M&T Bank",
    role: "Change Champion · Enterprise Reorg",
    color: "#34d8ee",
    body: "Embedded during a critical period of organisational restructuring as M&T Bank scaled to its next tier. Translated executive strategy into ground-level behavioural change across thousands of employees — holding clarity, alignment, and momentum through institutional ambiguity. Change governance inside a regulated financial institution at scale.",
    chips: ["Enterprise Change Management", "Cross-Functional Alignment", "Financial Services", "Stakeholder Communication"],
  },
  {
    id: "meta-openai",
    period: "2024 – 2025",
    org: "Meta · OpenAI",
    role: "Data Quality Assurance · Text-to-Vision Models",
    color: "#a98bff",
    body: "High-precision data quality assurance for text-to-vision model training pipelines at two of the most consequential AI research organisations in the world. Reviewing, annotating, and validating multimodal data at the boundary where human judgment shapes machine intelligence. Data quality at this level is not a support function — it is architecture.",
    chips: ["Multimodal AI", "Data QA", "Text-to-Vision", "AI Annotation", "Meta", "OpenAI"],
  },
  {
    id: "atsa",
    period: "2023 – Present",
    org: "A Thousand Suns Academy",
    role: "Systems Architect · Product Owner",
    color: "#21e6b3",
    body: "Approved and governed the production cloud architecture: Flutter (iOS + Android), AWS ALB, NestJS API, Cognito identity (OAuth 2.0 / SAML / JWT), RDS PostgreSQL, and an async media pipeline (S3 → Lambda → MediaConvert → CloudFront). Maintained the stack as the single source of truth across every revision. Built the Drive Transcriber pipeline — event recording to three viral-ready short clips in under 10 minutes. Surfaced production-infrastructure misalignments and held the line on data integrity when authority pushed back.",
    chips: ["AWS", "Flutter", "NestJS", "Cognito", "OAuth 2.0", "SAML", "JWT", "CloudFront", "Architecture Governance"],
  },
  {
    id: "justshreem",
    period: "2024 – Present",
    org: "JustShreem Labs",
    role: "Product Owner · AI Layer Architect",
    color: "#6f76ff",
    body: "Product ownership of the JustShreem consumer mobile app from first architecture decision to live client surface. Researched and implemented Kommunicate as the conversational AI layer. Created the GoHighLevel AI bot from zero, surfaced it on the client homepage, and maintained the integration as the critical bridge between founders and production. Data integrity and strategic alignment held across chaotic organisational drift — through documentation, executive migration strategy, and communication frameworks that held the line when authority failed to.",
    chips: ["Product Ownership", "Conversational AI", "Kommunicate", "GoHighLevel", "Data Integrity", "Mobile"],
  },
  {
    id: "bird",
    period: "2023 – Present",
    org: "Billion Readers · BIRD",
    role: "Technology Strategist · Cultural Architect",
    color: "#ffcf6b",
    body: "Architected and automated the operational systems that allowed Billion Readers to establish cross-country subtitling branches — culminating in a contracting relationship with Indian national television. The FirstSongs initiative uses AI tools including Suno to bring indigenous songs to professional audio quality and embed them in archival infrastructure designed for longevity. Monthly AI skill-share sessions — high engagement, concrete skill transfer — drove organisational adoption of Claude, Adobe Firefly, and Gemini, reshaping how a distributed nonprofit collaborates at scale.",
    chips: ["Systems Automation", "Indigenous Preservation", "Subtitling", "AI Skill-Share", "Claude", "Gemini", "Nonprofit Scale"],
  },
];

const projects = [
  {
    id: "kleam",
    title: "Kleam.ai",
    wave: "AI Platform",
    url: "https://kleam.ai",
    color: "#a98bff",
    impact: "Multi-model AI deliberation. Custom .ai domain. Stripe-powered.",
    narrative: "A 'Deliberation Arena' where distinct AI personas engage users in cross-model reasoning. Fractal landing animations, a full Stripe subscription and checkout flow, and a playground experience. The most architecturally complete Replit build — a multi-model AI product with its own brand identity, custom domain, and monetisation layer.",
    chips: ["Multi-Model AI", "Stripe", "Subscription", "AI Personas", "kleam.ai"],
  },
  {
    id: "drive-transcriber",
    title: "Drive Transcriber",
    wave: "Automation Pipeline",
    url: "https://drivetranscribe.replit.app",
    color: "#21e6b3",
    impact: "Event recording → 3 viral-ready clips in under 10 minutes.",
    narrative: "Google Drive–authenticated transcription pipeline that watches a folder, runs AI transcription, and auto-identifies high-outreach viral moments from deep esoteric content — delivering edit-ready outputs to the production team without manual review.",
    chips: ["Google OAuth", "Drive API", "AI Transcription", "ATSA", "Automation"],
  },
  {
    id: "textract",
    title: "Textract / OCR",
    wave: "Quality Layer",
    url: "https://textract.replit.app",
    color: "#34d8ee",
    impact: "AI vision OCR + Tesseract. The integrity checkpoint.",
    narrative: "Screenshot-to-text extraction using AI vision OCR and Tesseract in parallel, with formatting tools for case conversion and post-processing. The quality gate of the transcription pipeline: ensuring what enters the system is clean, structured, and correct.",
    chips: ["AI Vision", "Tesseract OCR", "Text Processing", "Pipeline"],
  },
  {
    id: "quotepicmaker",
    title: "QuotePicMaker",
    wave: "Content Automation",
    url: "https://imageni.replit.app",
    color: "#ffcf6b",
    impact: "devipuram.org: 3 weeks of content → 3 hours.",
    narrative: "Canvas-based styled quote image generator — font, colour, layout, download. Built for a spiritual and cultural organisation whose content team previously spent three weeks producing what this tool renders in hours.",
    chips: ["Canvas", "Content Automation", "Social Media", "devipuram.org"],
  },
  {
    id: "speedreader",
    title: "Speed Reader",
    wave: "Literacy Technology",
    url: "https://speead.replit.app",
    color: "#21e6b3",
    impact: "Word-by-word at speed. Built for literacy.",
    narrative: "RSVP-style reading application that flashes text word-by-word at a fixed focal point. Built in direct alignment with the Billion Readers mission of improving global literacy.",
    chips: ["RSVP", "Literacy", "Billion Readers", "Accessibility"],
  },
  {
    id: "freezeframe",
    title: "Video Freeze Frame",
    wave: "Production Tooling",
    url: "https://video-freeze-frame.replit.app",
    color: "#6f76ff",
    impact: "Lossless frame capture. Entirely client-side.",
    narrative: "Browser-native tool for capturing still frames from video at full native resolution, exported as lossless PNG. Zero uploads, zero server dependency. The fastest tool removes the most steps.",
    chips: ["Client-Side", "Video", "PNG Export", "Privacy-First"],
  },
  {
    id: "chimescheduler",
    title: "ChimeScheduler",
    wave: "Team Infrastructure",
    url: "https://tuime.replit.app",
    color: "#ffcf6b",
    impact: "Tracks hours. Keeps the team in rhythm.",
    narrative: "Interval timer with custom chimes, colour-coded timestamps, and localStorage persistence. Built for the production team. Small tool, large signal: an architect who builds for the people around her.",
    chips: ["Team Tooling", "Time Tracking", "localStorage", "Org Design"],
  },
];

export default function App() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);

  const toggleSound = () => {
    if (playerRef.current?.contentWindow) {
      const func = muted ? "unMute" : "mute";
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "*"
      );
      setMuted(!muted);
    }
  };

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -360, behavior: "smooth" });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 360, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#07080f] text-[#edf0f7] font-sans overflow-x-hidden">

      {/* AURORA BLOBS */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[12vw] -left-[14vw] w-[60vw] h-[60vw] rounded-full blur-[76px] opacity-40 mix-blend-screen animate-blob"
          style={{ background: "radial-gradient(circle at 30% 30%, #6f76ff, transparent 62%)", animationDuration: "30s" }} />
        <div className="absolute top-[4vw] -right-[12vw] w-[52vw] h-[52vw] rounded-full blur-[76px] opacity-40 mix-blend-screen animate-blob animation-delay-2000"
          style={{ background: "radial-gradient(circle at 60% 40%, #34d8ee, transparent 60%)", animationDuration: "34s" }} />
        <div className="absolute top-[130vh] left-[6vw] w-[50vw] h-[50vw] rounded-full blur-[76px] opacity-38 mix-blend-screen animate-blob animation-delay-4000"
          style={{ background: "radial-gradient(circle at 50% 50%, #21e6b3, transparent 62%)", animationDuration: "38s" }} />
        <div className="absolute top-[235vh] right-[2vw] w-[44vw] h-[44vw] rounded-full blur-[76px] opacity-38 mix-blend-screen animate-blob animation-delay-6000"
          style={{ background: "radial-gradient(circle at 50% 50%, #a98bff, transparent 60%)", animationDuration: "28s" }} />
        <div className="absolute top-[330vh] left-[10vw] w-[46vw] h-[46vw] rounded-full blur-[76px] opacity-35 mix-blend-screen animate-blob animation-delay-2000"
          style={{ background: "radial-gradient(circle at 50% 50%, #ff7ab8, transparent 64%)", animationDuration: "32s" }} />
      </div>

      {/* STICKY NAV */}
      <nav className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-[11px]"
        style={{ background: "linear-gradient(180deg, rgba(7,8,15,0.82), rgba(7,8,15,0.32))" }}>
        <div className="max-w-[1080px] mx-auto px-6 py-[14px] flex items-center justify-between gap-5">
          <div className="font-display font-semibold text-xl tracking-wide flex items-center gap-2">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#21e6b3] shadow-[0_0_12px_#21e6b3]" />
            Motadaka
          </div>
          <div className="hidden md:flex gap-6">
            {[["#work","Work"],["#timeline","Experience"],["#builds","Builds"],["#artist","Artist"]].map(([href, label]) => (
              <a key={href} href={href}
                className="text-[13px] tracking-[0.1em] uppercase text-[#a3aec5] hover:text-[#edf0f7] transition-colors duration-300 no-underline">
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* YouTube background */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            ref={playerRef}
            src="https://www.youtube.com/embed/7pzVvWEr_WI?autoplay=1&mute=1&loop=1&playlist=7pzVvWEr_WI&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: "max(100%, 177.78vh)", height: "max(100%, 56.25vw)", border: "none" }}
            title="Hero background"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-[#07080f]/62" />
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(120% 120% at 50% 0%, transparent 52%, rgba(5,7,14,0.82) 100%)" }} />
        </div>

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          data-testid="sound-toggle"
          title={muted ? "Unmute" : "Mute"}
          className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[#a3aec5] hover:text-[#edf0f7] hover:border-white/20 transition-all duration-300 text-xs tracking-widest uppercase font-sans"
        >
          {muted ? <VolumeX size={14} strokeWidth={1.5} /> : <Volume2 size={14} strokeWidth={1.5} />}
          <span>{muted ? "Sound off" : "Sound on"}</span>
        </button>

        {/* Hero text */}
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="relative z-10 text-center px-6 flex flex-col items-center gap-5"
        >
          <motion.span variants={fadeUp}
            className="font-sans font-light text-[12px] tracking-[0.38em] text-[#a3aec5]/80 uppercase">
            Snigdha
          </motion.span>

          <motion.h1 variants={fadeUp}
            className="font-display font-semibold leading-none tracking-[0.12em] uppercase text-aurora"
            style={{ fontSize: "clamp(52px, 9.5vw, 148px)" }}>
            MOTADAKA
          </motion.h1>

          <motion.p variants={fadeUp}
            className="font-sans font-light text-base tracking-[0.14em] text-[#a3aec5]/90">
            Strategy &nbsp;·&nbsp; Security Architecture &nbsp;·&nbsp; AI Research
          </motion.p>

          <motion.div variants={fadeUp} className="mt-4">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="text-white/30 text-xl select-none"
            >↓</motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-[1080px] mx-auto px-6 pb-32 flex flex-col gap-28 md:gap-40">

        {/* STATS */}
        <motion.section id="work"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="pt-20"
        >
          <motion.p variants={fadeUp} className="text-[12px] tracking-[0.26em] uppercase text-[#34d8ee] font-sans font-medium mb-4">
            The Work
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-display font-semibold text-[clamp(30px,4.6vw,50px)] leading-[1.04] mb-10 max-w-[20ch]">
            Five organisations transformed.<br />
            Eleven systems shipped.<br />
            One standard.
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-[18px] p-6 flex flex-col gap-2 border border-white/[0.06] hover:border-[rgba(52,216,238,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.035))" }}>
                <div className="font-sans font-light leading-none mb-1"
                  style={{
                    fontSize: "clamp(34px,4.5vw,52px)",
                    background: "linear-gradient(120deg, #34d8ee, #a98bff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  {s.num}
                </div>
                <div className="text-[12px] tracking-[0.14em] uppercase text-[#a3aec5] font-sans font-medium">{s.label}</div>
                <p className="text-[13px] text-[#727e9c] leading-relaxed mt-1 font-sans">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* NARRATIVE */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-[720px]"
        >
          <motion.p variants={fadeUp} className="text-[12px] tracking-[0.26em] uppercase text-[#34d8ee] font-sans font-medium mb-4">
            An Architect at the Intersection
          </motion.p>
          <div className="flex flex-col gap-6 text-[clamp(17px,1.9vw,19px)] text-[#a3aec5] leading-[1.72] font-sans">
            <motion.p variants={fadeUp}>
              At <strong className="text-[#edf0f7] font-semibold">A Thousand Suns Academy</strong>, the mandate was encoding esoteric and ancient wisdom into secure, scalable modern infrastructure — a Flutter mobile app governed by a 10-service AWS stack, identity secured through OAuth 2.0, SAML, and JWT, and a media pipeline that moves sacred content from recording to platform without losing integrity.
            </motion.p>
            <motion.p variants={fadeUp}>
              At <strong className="text-[#edf0f7] font-semibold">Billion Readers</strong>, the work extended to indigenous cultural preservation. The <em>FirstSongs</em> initiative uses AI tools like Suno to bring indigenous songs to professional audio quality and embed them in archival infrastructure designed for longevity. AI skill-share sessions drove organisational adoption of Claude, Adobe Firefly, and Gemini — transforming how a cross-country nonprofit collaborates and contracts at national scale.
            </motion.p>
            <motion.p variants={fadeUp}>
              At <strong className="text-[#edf0f7] font-semibold">Meta and OpenAI</strong>, the standard was different in kind: data quality assurance for text-to-vision model training pipelines where correctness is not optional. What a model learns is determined entirely by what it is shown.
            </motion.p>
          </div>
        </motion.section>

        {/* EXPERIENCE TIMELINE */}
        <motion.section id="timeline"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-[12px] tracking-[0.26em] uppercase text-[#34d8ee] font-sans font-medium mb-4">
            Experience
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-display font-semibold text-[clamp(28px,4vw,46px)] leading-[1.04] mb-12">
            Where the work happened.
          </motion.h2>

          <div className="relative pl-8">
            {/* Spine */}
            <div className="absolute left-[9px] top-2 bottom-2 w-[2px] opacity-50 rounded-full"
              style={{ background: "linear-gradient(180deg, #34d8ee, #a98bff, #21e6b3, #ff7ab8)" }} />

            <div className="flex flex-col gap-8">
              {experience.map((e) => (
                <motion.div key={e.id} variants={fadeUp} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-8 top-[34px] w-[14px] h-[14px] rounded-full border-2 bg-[#07080f]"
                    style={{ borderColor: e.color, boxShadow: `0 0 14px ${e.color}99` }} />

                  {/* Card */}
                  <div className="relative rounded-[20px] border border-white/[0.06] backdrop-blur-sm overflow-hidden"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.035))" }}>
                    {/* Gradient border inset */}
                    <div className="absolute inset-0 rounded-[20px] pointer-events-none"
                      style={{
                        padding: "1px",
                        background: `linear-gradient(140deg, ${e.color}42, transparent 42%, transparent 64%, ${e.color}30)`,
                        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }} />
                    <div className="p-7 md:p-9">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-[12px] tracking-[0.16em] uppercase font-sans font-medium" style={{ color: e.color }}>
                          {e.period}
                        </span>
                        <span className="text-[12px] tracking-[0.1em] uppercase text-[#727e9c] font-sans">
                          {e.role}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-[clamp(24px,3.2vw,36px)] leading-[1.05] mb-4">
                        {e.org}
                      </h3>
                      <p className="text-[clamp(15px,1.7vw,17px)] text-[#a3aec5] leading-[1.72] mb-5 max-w-[64ch] font-sans">
                        {e.body}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {e.chips.map(c => (
                          <span key={c} className="text-[12px] font-sans px-[13px] py-[6px] rounded-full text-[#cfe2f1]"
                            style={{ background: "rgba(86,196,255,0.07)", border: "1px solid rgba(86,196,255,0.18)" }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* BUILDS CAROUSEL */}
        <motion.section id="builds"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="flex items-end justify-between mb-3">
            <motion.p variants={fadeUp} className="text-[12px] tracking-[0.26em] uppercase text-[#34d8ee] font-sans font-medium">
              Builds
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-2">
              {[scrollLeft, scrollRight].map((fn, i) => (
                <button key={i} onClick={fn}
                  data-testid={i === 0 ? "carousel-left" : "carousel-right"}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#edf0f7] transition-all duration-300 hover:border-[rgba(52,216,238,0.5)] hover:bg-white/5"
                  style={{ background: "rgba(255,255,255,0.035)" }}>
                  {i === 0 ? <ChevronLeft size={18} strokeWidth={1.2} /> : <ChevronRight size={18} strokeWidth={1.2} />}
                </button>
              ))}
            </motion.div>
          </div>
          <motion.h2 variants={fadeUp}
            className="font-display font-semibold text-[clamp(28px,4vw,46px)] leading-[1.04] mb-8">
            The Systems
          </motion.h2>

          <motion.div variants={fadeUp}>
            <div ref={carouselRef}
              className="flex gap-4 overflow-x-auto pb-4"
              style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
              {projects.map((p) => (
                <button key={p.id}
                  onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                  data-testid={`expand-${p.id}`}
                  className="text-left shrink-0 flex flex-col gap-3 rounded-[16px] border border-white/[0.06] p-5 no-underline transition-all duration-300 hover:-translate-y-[3px] hover:border-[rgba(52,216,238,0.4)]"
                  style={{
                    scrollSnapAlign: "start",
                    width: "min(300px, 80vw)",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.035))",
                    outline: expandedProject === p.id ? `1px solid ${p.color}66` : undefined,
                  }}>
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                  <div>
                    <div className="font-display font-semibold text-xl text-[#edf0f7] tracking-[-.005em]">{p.title}</div>
                    <div className="text-[11px] tracking-[0.1em] uppercase font-sans mt-1" style={{ color: p.color }}>{p.wave}</div>
                  </div>
                  <p className="text-[13.5px] text-[#a3aec5] leading-[1.55] font-sans flex-1">{p.impact}</p>
                  <div className="text-[12px] text-[#727e9c] tracking-[0.04em] font-sans mt-1"
                    style={{ color: expandedProject === p.id ? p.color : undefined }}>
                    {expandedProject === p.id ? "collapse ↑" : "read more →"}
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {expandedProject && (() => {
                const p = projects.find(x => x.id === expandedProject);
                if (!p) return null;
                return (
                  <motion.div key={p.id}
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}
                    className="overflow-hidden mt-3">
                    <div className="rounded-[20px] border border-white/[0.06] p-7 md:p-10 relative"
                      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.035))" }}>
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px] opacity-60"
                        style={{ background: p.color }} />
                      <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-start mb-5">
                        <h3 className="font-display font-semibold text-[clamp(26px,3.4vw,38px)] leading-[1.05]">{p.title}</h3>
                        <a href={p.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[13px] text-[#a3aec5] hover:text-[#edf0f7] transition-colors no-underline mt-1 shrink-0"
                          onClick={e => e.stopPropagation()}>
                          <ExternalLink size={13} strokeWidth={1.5} />
                          {p.url.replace("https://", "")}
                        </a>
                      </div>
                      <p className="text-[clamp(16px,1.85vw,18px)] text-[#a3aec5] leading-[1.72] max-w-[64ch] mb-6 font-sans">{p.narrative}</p>
                      <div className="flex flex-wrap gap-2 pt-5 border-t border-white/[0.06]">
                        {p.chips.map(c => (
                          <span key={c} className="text-[12px] font-sans px-3 py-1.5 rounded text-[#a3aec5]"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* SNIEAKS */}
        <motion.section id="artist"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-[12px] tracking-[0.26em] uppercase font-sans font-medium mb-4"
            style={{ color: "#ffcf6b" }}>
            Artist
          </motion.p>
          <motion.div variants={fadeUp}>
            <div className="relative rounded-[22px] border border-white/[0.06] overflow-hidden p-8 md:p-12"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.035))" }}>
              {/* Warm gradient border */}
              <div className="absolute inset-0 rounded-[22px] pointer-events-none"
                style={{
                  padding: "1px",
                  background: "linear-gradient(140deg, rgba(255,207,107,0.4), transparent 44%, transparent 58%, rgba(255,122,184,0.4))",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }} />

              <div className="relative flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-[clamp(32px,5vw,54px)] leading-[1.0] mb-4"
                    style={{
                      background: "linear-gradient(108deg, #ffcf6b, #ff7ab8, #ffcf6b)",
                      backgroundSize: "300% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "auraDrift 9s ease-in-out infinite",
                    }}>
                    Snieaks
                  </h3>
                  <p className="text-[clamp(16px,1.85vw,18px)] text-[#a3aec5] leading-[1.72] max-w-[52ch] mb-6 font-sans">
                    Singer, songwriter, producer. Released across Spotify, Apple Music, YouTube, and every major streaming platform. The Snieaks digital universe at <a href="https://spandance.replit.app" target="_blank" rel="noopener noreferrer" className="text-[#edf0f7] hover:text-[#ffcf6b] transition-colors no-underline">spandance.replit.app</a> is a custom-built interactive experience: fractal Mandelbrot zoom animations, particle colour effects, and a visual identity built from the same architectural instinct as everything else.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://open.spotify.com/artist/06mzs8F4CeZb90aS788tYl"
                      target="_blank" rel="noopener noreferrer"
                      data-testid="link-spotify"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-[11px] border border-white/10 text-[13.5px] font-sans font-medium text-[#edf0f7] no-underline transition-all duration-300 hover:border-[#1DB954] hover:-translate-y-[2px]"
                      style={{ background: "rgba(255,255,255,0.035)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                      Spotify
                    </a>
                    <a href="https://www.youtube.com/@snieaks"
                      target="_blank" rel="noopener noreferrer"
                      data-testid="link-youtube"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-[11px] border border-white/10 text-[13.5px] font-sans font-medium text-[#edf0f7] no-underline transition-all duration-300 hover:border-[#FF0000] hover:-translate-y-[2px]"
                      style={{ background: "rgba(255,255,255,0.035)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      YouTube
                    </a>
                    <a href="https://spandance.replit.app"
                      target="_blank" rel="noopener noreferrer"
                      data-testid="link-snieaks-site"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-[11px] border border-white/10 text-[13.5px] font-sans font-medium text-[#edf0f7] no-underline transition-all duration-300 hover:border-[rgba(255,207,107,0.5)] hover:-translate-y-[2px]"
                      style={{ background: "rgba(255,255,255,0.035)" }}>
                      <ExternalLink size={14} strokeWidth={1.5} />
                      The Experience
                    </a>
                  </div>
                </div>

                {/* Decorative visual */}
                <div className="shrink-0 w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-2xl overflow-hidden relative"
                  style={{ background: "linear-gradient(135deg, rgba(255,207,107,0.15), rgba(255,122,184,0.15))", border: "1px solid rgba(255,207,107,0.2)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-display font-semibold text-[56px] leading-none tracking-widest"
                      style={{
                        background: "linear-gradient(108deg, #ffcf6b, #ff7ab8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                      S
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl"
                    style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,207,107,0.2), transparent 60%)" }} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* CLOSING PRINCIPLES */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col items-center text-center gap-10 pb-8"
        >
          <motion.h2 variants={fadeUp}
            className="font-display font-semibold italic text-[clamp(28px,4vw,46px)] leading-[1.08] max-w-[22ch]">
            Speed and quality. Integrity on both sides. Every time.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left">
            {[
              { label: "Speed + Quality", body: "The rarest combination in systems work. Every build here delivers both.", color: "#34d8ee" },
              { label: "Security First", body: "Zero-trust principles, data sovereignty, and incident governance — standard, not optional.", color: "#a98bff" },
              { label: "Cultural Integrity", body: "Indigenous songs, esoteric wisdom, global literacy — technology in service of what matters.", color: "#21e6b3" },
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-[18px] p-7 flex flex-col gap-3 border border-white/[0.06]"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.035))" }}>
                <div className="w-[6px] h-[6px] rounded-full" style={{ background: c.color }} />
                <h4 className="font-display font-semibold text-xl text-[#edf0f7]">{c.label}</h4>
                <p className="text-[14px] text-[#727e9c] leading-relaxed font-sans">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="font-display font-semibold text-lg tracking-widest text-[#edf0f7]">MOTADAKA</div>
          <div className="flex gap-5 text-[12.5px] text-[#727e9c] font-sans tracking-[0.04em]">
            {[
              ["https://billionreaders.org", "billionreaders.org"],
              ["https://kleam.ai", "kleam.ai"],
              ["https://open.spotify.com/artist/06mzs8F4CeZb90aS788tYl", "Snieaks on Spotify"],
            ].map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#edf0f7] transition-colors no-underline">{label}</a>
            ))}
          </div>
          <div className="text-[12px] text-[#727e9c] font-sans">
            Strategy · Security Architecture · AI Research · 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
