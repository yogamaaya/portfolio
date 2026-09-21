import React, { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, ExternalLink } from "lucide-react";
import RouteSeo from "./seo/RouteSeo";

function MandelbrotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 480, H = 320;
    canvas.width = W; canvas.height = H;
    const maxIter = 140;
    const cx = -0.7269, cy = 0.1889;
    const imageData = ctx.createImageData(W, H);
    for (let px = 0; px < W; px++) {
      for (let py = 0; py < H; py++) {
        const x0 = cx + (px - W / 2) / (0.26 * W);
        const y0 = cy + (py - H / 2) / (0.26 * H);
        let x = 0, y = 0, iter = 0;
        while (x * x + y * y <= 4 && iter < maxIter) {
          const t = x * x - y * y + x0;
          y = 2 * x * y + y0; x = t; iter++;
        }
        const idx = (py * W + px) * 4;
        if (iter === maxIter) {
          imageData.data[idx + 3] = 255;
        } else {
          const t = iter / maxIter;
          const s = Math.pow(t, 0.45);
          imageData.data[idx]     = Math.floor(255 * s * s);
          imageData.data[idx + 1] = Math.floor(60  * s * (1 - s) * 4);
          imageData.data[idx + 2] = Math.floor(200 * s * (1 - s) * 4);
          imageData.data[idx + 3] = Math.floor(200 * s);
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0.38, animation: "fractalZoom 22s ease-in-out infinite alternate", transformOrigin: "54% 44%" }}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } }
};

const stats = [
  { num: "11", label: "Systems Shipped", desc: "End-to-end products live in the world." },
  { num: "5", label: "Organisations Transformed", desc: "M&T Bank, ATSA, JustShreem, Billion Readers, devipuram.org" },
  { num: "7×", label: "Speed Uplift", desc: "Quality and velocity in the same body of work." },
  { num: "2", label: "Tier-One Laboratories", desc: "Invisible Technologies supporting tier-one frontier artificial intelligence laboratories." },
];

const experience = [
  {
    id: "mt-bank",
    period: "2022 – 2024",
    org: "M&T Bank",
    role: "Change Champion · Enterprise Reorg",
    color: "#34d8ee",
    body: "Embedded during a critical period of organisational restructuring as M&T Bank scaled to its next tier. Translated executive strategy into ground-level behavioural change across thousands of employees, holding clarity, alignment, and momentum through institutional ambiguity. Change governance inside a regulated financial institution at scale.",
    chips: ["Enterprise Change Management", "Cross-Functional Alignment", "Financial Services", "Stakeholder Communication"],
  },
  {
    id: "frontier-labs",
    period: "2024 – 2025",
    org: "Invisible Technologies",
    role: "Data Quality Assurance · Tier-One Frontier Artificial Intelligence Laboratories",
    color: "#a98bff",
    body: "High-precision data quality assurance for text-to-vision model training pipelines through Invisible Technologies, supporting tier-one frontier artificial intelligence laboratories. Reviewing, annotating, and validating multimodal data at the boundary where human judgment shapes machine intelligence. Data quality at this level operates as fundamental architecture.",
    chips: ["Invisible Technologies", "Multimodal AI", "Data QA", "Text-to-Vision", "AI Annotation"],
  },
  {
    id: "atsa",
    period: "2025 – 2026",
    org: "A Thousand Suns Academy",
    role: "Systems Architect · Product Owner",
    color: "#21e6b3",
    body: "Approved and governed the production cloud architecture: Flutter (iOS + Android), AWS ALB, NestJS API, Cognito identity (OAuth 2.0 / SAML / JWT), RDS PostgreSQL, and an async media pipeline (S3 to Lambda to MediaConvert to CloudFront). Maintained the stack as the single source of truth across every revision. Built the Drive Transcriber pipeline, converting event recording to three viral-ready short clips in under 10 minutes. Surfaced production-infrastructure misalignments and held the line on data integrity when authority pushed back.",
    chips: ["AWS", "Flutter", "NestJS", "Cognito", "OAuth 2.0", "SAML", "JWT", "CloudFront", "Architecture Governance"],
  },
  {
    id: "justshreem",
    period: "2024 – Present",
    org: "JustShreem Labs",
    role: "Product Owner · AI Layer Architect",
    color: "#6f76ff",
    body: "Product ownership of the JustShreem consumer mobile app from first architecture decision to live client surface. Researched and implemented Kommunicate as the conversational AI layer. Created the GoHighLevel AI bot from zero, surfaced it on the client homepage, and maintained the integration as the critical bridge between founders and production. Data integrity and strategic alignment held across chaotic organisational drift through documentation, executive migration strategy, and communication frameworks that held the line when authority failed to.",
    chips: ["Product Ownership", "Conversational AI", "Kommunicate", "GoHighLevel", "Data Integrity", "Mobile"],
  },
  {
    id: "bird",
    period: "2025 – 2026",
    org: "Billion Readers · BIRD",
    role: "Technology Strategist · Cultural Architect",
    color: "#ffcf6b",
    body: "Architected and automated the operational systems that allowed Billion Readers to establish cross-country subtitling branches, culminating in a contracting relationship with Indian national television. The FirstSongs initiative uses AI tools including Suno to bring indigenous songs to professional audio quality and embed them in archival infrastructure designed for longevity. Monthly AI skill-share sessions with high engagement and concrete skill transfer drove organisational adoption of Claude, Adobe Firefly, and Gemini, reshaping how a distributed nonprofit collaborates at scale.",
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
    narrative: "A 'Deliberation Arena' where distinct AI personas engage users in cross-model reasoning. Fractal landing animations, a full Stripe subscription and checkout flow, and a playground experience. The most architecturally complete Replit build: a multi-model AI product with its own brand identity, custom domain, and monetisation layer.",
    chips: ["Multi-Model AI", "Stripe", "Subscription", "AI Personas", "kleam.ai"],
  },
  {
    id: "drive-transcriber",
    title: "Drive Transcriber",
    wave: "Automation Pipeline",
    url: "https://drivetranscribe.replit.app",
    color: "#21e6b3",
    impact: "Event recording converted to 3 viral-ready clips in under 10 minutes.",
    narrative: "Google Drive authenticated transcription pipeline that watches a folder, runs AI transcription, and auto-identifies high-outreach viral moments from deep esoteric content, delivering edit-ready outputs to the production team without manual review.",
    chips: ["Google OAuth", "Drive API", "AI Transcription", "ATSA", "Automation"],
  },
  {
    id: "textract",
    title: "Textract / OCR",
    wave: "Quality Layer",
    url: "https://textract.replit.app",
    color: "#34d8ee",
    impact: "AI vision OCR and Tesseract serving as the integrity checkpoint.",
    narrative: "Screenshot-to-text extraction using AI vision OCR and Tesseract in parallel, with formatting tools for case conversion and post-processing. The quality gate of the transcription pipeline ensures what enters the system is clean, structured, and correct.",
    chips: ["AI Vision", "Tesseract OCR", "Text Processing", "Pipeline"],
  },
  {
    id: "quotepicmaker",
    title: "QuotePicMaker",
    wave: "Content Automation",
    url: "https://imageni.replit.app",
    color: "#ffcf6b",
    impact: "devipuram.org: 3 weeks of content reduced to 3 hours.",
    narrative: "Canvas-based styled quote image generator featuring font, colour, layout, and download capabilities. Built for a spiritual and cultural organisation whose content team previously spent three weeks producing what this tool renders in hours.",
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
    impact: "Lossless frame capture handled entirely client-side.",
    narrative: "Browser-native tool for capturing still frames from video at full native resolution, exported as lossless PNG. Zero uploads, zero server dependency. The fastest tool removes the most steps.",
    chips: ["Client-Side", "Video", "PNG Export", "Privacy-First"],
  },
  {
    id: "chimescheduler",
    title: "ChimeScheduler",
    wave: "Team Infrastructure",
    url: "https://tuime.replit.app",
    color: "#ffcf6b",
    impact: "Tracks hours and keeps the team in rhythm.",
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
      <RouteSeo
        title="Snigdha Motadaka | AI Systems Architect"
        description="Snigdha Motadaka is an AI systems architect working across systems design, cybersecurity, AI governance, and multidisciplinary digital art as Snieaks."
        path="/"
      />

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

      <header>
      {/* STICKY NAV */}
      <nav aria-label="Primary navigation" className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-[11px]"
        style={{ background: "linear-gradient(180deg, rgba(7,8,15,0.82), rgba(7,8,15,0.32))" }}>
        <div className="max-w-[1080px] mx-auto px-6 py-[14px] flex items-center justify-between gap-5">
          <div className="font-display font-semibold text-xl tracking-wide flex items-center gap-2">
            <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#21e6b3] shadow-[0_0_12px_#21e6b3]" />
            Motadaka
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/systems"
              className="text-[13px] tracking-[0.1em] uppercase text-[#a3aec5] hover:text-[#edf0f7] transition-colors duration-300 no-underline">
              Technical Research & Systems
            </Link>
            <Link href="/snieaks"
              className="text-[13px] tracking-[0.1em] uppercase text-[#a3aec5] hover:text-[#edf0f7] transition-colors duration-300 no-underline">
              Snieaks (Art & Media)
            </Link>
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
            className="font-display font-light leading-none tracking-[0.12em] uppercase"
            style={{
              fontSize: "clamp(52px, 9.5vw, 148px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.52)",
              textShadow: "0 0 140px rgba(255,255,255,0.06), 0 0 60px rgba(52,216,238,0.12)",
              mixBlendMode: "screen",
            }}>
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
      </header>

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

        {/* KEYWORDS MARQUEE */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="w-full overflow-hidden pt-10"
        >
          <motion.p variants={fadeUp} className="text-[12px] tracking-[0.26em] uppercase text-[#34d8ee] font-sans font-medium mb-8">
            Professional Focus
          </motion.p>
          <div className="flex overflow-hidden relative w-full" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <motion.div 
               className="flex gap-10 whitespace-nowrap min-w-max pr-10"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
               {[
                 "Governance, Risk & Compliance", "AI Systems Architecture", "Technology Strategy", "Regulatory Data Integrity", "Agentic AI Design", "Product Ownership", "Market and Technology R&D", "Technical Liaison Work", "Privacy By Design", "Audit Integrity", "Enterprise Change Management",
                 "Governance, Risk & Compliance", "AI Systems Architecture", "Technology Strategy", "Regulatory Data Integrity", "Agentic AI Design", "Product Ownership", "Market and Technology R&D", "Technical Liaison Work", "Privacy By Design", "Audit Integrity", "Enterprise Change Management"
               ].map((kw, i) => (
                 <div key={i} className="flex items-center gap-10">
                   <span className="text-[clamp(18px,2.2vw,28px)] font-sans font-medium tracking-[0.15em] uppercase text-[#a3aec5]">
                     {kw}
                   </span>
                   <span className="w-1.5 h-1.5 rounded-full bg-[#34d8ee]/40 inline-block"></span>
                 </div>
               ))}
            </motion.div>
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

        {/* ARTIST CARD */}
        <motion.section id="artist"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-[12px] tracking-[0.26em] uppercase font-sans font-medium mb-4"
            style={{ color: "#ffcf6b" }}>
            Artist
          </motion.p>
          <motion.div variants={fadeUp}>
            {/* Outer card */}
            <Link href="/snieaks" className="block relative rounded-[22px] border border-white/[0.06] overflow-hidden group cursor-pointer hover:border-[rgba(255,207,107,0.4)] transition-all duration-300 no-underline"
              style={{ background: "rgba(7,8,15,0.82)" }}
              data-testid="link-artist-page"
            >
              {/* Mandelbrot fractal background */}
              <MandelbrotCanvas />

              {/* Dark overlay on top of fractal */}
              <div className="absolute inset-0 rounded-[22px]"
                style={{ background: "linear-gradient(160deg, rgba(7,8,15,0.62) 0%, rgba(7,8,15,0.85) 100%)" }} />

              {/* Warm gradient border inset */}
              <div className="absolute inset-0 rounded-[22px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  padding: "1px",
                  background: "linear-gradient(140deg, rgba(255,207,107,0.45), transparent 44%, transparent 58%, rgba(255,122,184,0.38))",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }} />

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col gap-6 items-center text-center pointer-events-none">
                <h3 className="font-display font-semibold text-[clamp(28px,4vw,46px)] leading-[1.0]"
                  style={{
                    background: "linear-gradient(108deg, #ffcf6b, #ff7ab8, #ffcf6b)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "auraDrift 9s ease-in-out infinite",
                  }}>
                  Digital Arts & Sound
                </h3>
                <p className="text-[clamp(15px,1.7vw,17px)] text-[#a3aec5] leading-[1.76] max-w-[54ch] font-sans">
                  The accumulation of multiple theories of everything. Fractal worlds, immersive environments, and sound design forming a unified interactive space.
                </p>
                <div className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(255,207,107,0.3)] text-[12px] uppercase tracking-widest text-[#edf0f7] group-hover:bg-[rgba(255,207,107,0.1)] transition-colors duration-300">
                  Enter Gallery
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.section>

        {/* CLOSING */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col gap-14 pb-8"
        >
          <div className="flex flex-col items-center text-center gap-5">
            <motion.p variants={fadeUp} className="text-[12px] tracking-[0.26em] uppercase text-[#a98bff] font-sans font-medium">
              The Thread
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="font-display font-semibold italic text-[clamp(30px,4.5vw,52px)] leading-[1.06] max-w-[18ch]"
              style={{
                background: "linear-gradient(120deg, #edf0f7 0%, #a98bff 48%, #34d8ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              A living synthesis.
            </motion.h2>
            <motion.p variants={fadeUp}
              className="text-[clamp(16px,1.85vw,19px)] text-[#a3aec5] leading-[1.78] max-w-[60ch] font-sans text-center">
              A security architect who writes the music that plays on the internet. A keeper of ancient and esoteric wisdom who governs the cloud infrastructure that carries it. A specialist in the quality of what machines are taught to see, who also builds the tools that preserve what human eyes once feared would be lost forever.
            </motion.p>
            <motion.p variants={fadeUp}
              className="text-[clamp(15px,1.7vw,17px)] text-[#727e9c] leading-[1.80] max-w-[58ch] font-sans text-center">
              The rarest things coexist here in one body of work. Speed and quality. Precision and feeling. The frontier of what is possible and the depth of what has always been true. A financial institution and a fractal. An indigenous song and a language model. A change governance framework and a song about the void.
            </motion.p>
            <motion.p variants={fadeUp}
              className="font-display font-semibold italic text-[clamp(18px,2.2vw,24px)] text-[#edf0f7]/70 max-w-[36ch] text-center">
              The thread is the accumulation of multiple theories of everything, held by one standard: integrity in the data, in the systems, and in the people on either side of every decision.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {[
              {
                label: "Precision + Poetry",
                body: "The same mind that validates what a machine learns to see also writes the music that plays when you close your eyes. These spring from the exact same impulse.",
                color: "#34d8ee",
              },
              {
                label: "Ancient + Emergent",
                body: "Cloud infrastructure in service of esoteric wisdom. AI tools in service of indigenous songs. The newest thing preserving the oldest. The boundary between them is where the work lives.",
                color: "#a98bff",
              },
              {
                label: "Scale + Soul",
                body: "Systems that reach national television and tier-one frontier artificial intelligence laboratories. Tools that give a single team member three weeks of their life back. Both matter deeply. Both demand the identical level of care.",
                color: "#21e6b3",
              },
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-[18px] p-7 flex flex-col gap-3 border border-white/[0.06]"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.03))" }}>
                <div className="w-[6px] h-[6px] rounded-full shrink-0" style={{ background: c.color, boxShadow: `0 0 10px ${c.color}88` }} />
                <h4 className="font-display font-semibold text-[20px] text-[#edf0f7] leading-snug">{c.label}</h4>
                <p className="text-[13.5px] text-[#727e9c] leading-[1.68] font-sans">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="font-display font-semibold text-lg tracking-widest text-[#edf0f7]">MOTADAKA</div>
          <div className="flex flex-wrap justify-center gap-5 text-[12.5px] text-[#727e9c] font-sans tracking-[0.04em]">
            {[
              ["https://billionreaders.org", "billionreaders.org"],
              ["https://kleam.ai", "kleam.ai"],
            ].map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#edf0f7] transition-colors no-underline">{label}</a>
            ))}
            <Link href="/legal" className="hover:text-[#edf0f7] transition-colors no-underline">Legal</Link>
          </div>
          <div className="text-[12px] text-[#727e9c] font-sans">
            Strategy · Security Architecture · AI Research · 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
