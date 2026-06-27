import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";

const experience = [
  {
    id: "mt-bank",
    period: "2022 – 2024",
    org: "M&T Bank",
    title: "Change Champion · Enterprise Reorg",
    accent: "bg-cyan-accent",
    summary: "Drove organisational change across one of the largest regional banks in the United States as it scaled to the next tier of operations.",
    detail: "Embedded as a change champion during a critical period of M&T Bank's organisational restructuring — a transformation affecting thousands of employees and reshaping how the institution operated at scale. The role required holding clarity amid institutional ambiguity: translating top-level strategic mandates into ground-level behavioural change, maintaining alignment across cross-functional teams, and ensuring that new processes took root rather than stalling at rollout. This is what change governance looks like inside a regulated, complex financial institution.",
    chips: ["Enterprise Change Management", "Organisational Design", "Financial Services", "Cross-Functional Alignment", "Stakeholder Communication"]
  },
  {
    id: "meta-openai",
    period: "2024 – 2025",
    org: "Meta · OpenAI",
    title: "Data Quality Assurance · Text-to-Vision Models",
    accent: "bg-violet-accent",
    summary: "Contributed to the data quality pipeline for frontier text-to-vision AI models at the scale where correctness is not optional.",
    detail: "Performed high-precision data quality assurance for text-to-vision model training pipelines at Meta and OpenAI — two of the most consequential AI research organisations in the world. The work operated at the intersection of human judgment and machine learning: reviewing, annotating, and validating multimodal data to ensure the models learned from clean, correctly-labelled signal. Data quality at this level is not a support function — it is architecture. What a model learns is determined entirely by what it is shown.",
    chips: ["Multimodal AI", "Data Quality Assurance", "Text-to-Vision", "AI Annotation", "Meta", "OpenAI", "Model Training Pipeline"]
  },
  {
    id: "atsa",
    period: "2023 – Present",
    org: "A Thousand Suns Academy",
    title: "Systems Architect · Product Owner",
    accent: "bg-teal-accent",
    summary: "Encoding esoteric and ancient wisdom into a secure, scalable modern infrastructure — from architecture approval to AI automation.",
    detail: "Reviewed and approved the production cloud architecture across Flutter (iOS + Android), AWS Application Load Balancer, NestJS API, Cognito identity (OAuth 2.0 / SAML 2.0 / JWT), RDS PostgreSQL, and an async media pipeline (S3 → Lambda → MediaConvert → CloudFront). Maintained the stack as the single source of truth through every revision. Built the Drive Transcriber pipeline: event recording to three viral-ready short clips in under 10 minutes. Surfaced production-infrastructure misalignments and documented the superior migration path. Threat mitigation through briefs, audits, and communication frameworks that held the line when authority failed to.",
    chips: ["AWS", "Flutter", "NestJS", "OAuth 2.0", "SAML", "JWT", "CloudFront", "Architecture Governance", "AI Automation"]
  },
  {
    id: "justshreem",
    period: "2024 – Present",
    org: "JustShreem Labs",
    title: "Product Owner · AI Layer Architect",
    accent: "bg-indigo-accent",
    summary: "Product ownership of a consumer mobile app from first architecture decision to live AI-integrated client surface.",
    detail: "Held product ownership of the JustShreem app through its development lifecycle — steering the JavaScript codebase from architectural decisions through to a working demo at login and homescreen. Researched and implemented Kommunicate as the conversational AI layer. Created the GoHighLevel AI bot from zero and surfaced it on the client homepage. Maintained data integrity and strategic alignment across chaotic organisational drift through documentation, executive migration strategy, and clear communication frameworks.",
    chips: ["Product Ownership", "Conversational AI", "Kommunicate", "GoHighLevel", "Data Integrity", "Mobile App", "AI Integration"]
  },
  {
    id: "bird",
    period: "2023 – Present",
    org: "Billion Readers · BIRD",
    title: "Technology Strategist · Cultural Architect",
    accent: "bg-amber-accent",
    summary: "Automated systems to enable cross-country scale, indigenous cultural preservation, and a contract with Indian national television.",
    detail: "Architected and automated the operational systems that allowed Billion Readers to establish cross-country branches for subtitling — culminating in a contracting relationship with Indian national television. The FirstSongs initiative embedded AI tools including Suno to bring indigenous songs to professional audio quality, archiving them in infrastructure designed for longevity. Monthly AI skill-share sessions — consistently high engagement, concrete skill transfer — drove organisational adoption of Claude, Adobe Firefly, and Gemini, transforming how a distributed nonprofit collaborates, creates, and delivers at scale.",
    chips: ["Systems Automation", "Indigenous Preservation", "Subtitling Infrastructure", "AI Skill-Share", "Claude", "Adobe Firefly", "Gemini", "Nonprofit Scale", "Indian National TV"]
  }
];

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20" aria-hidden="true">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-cyan-accent/35 blur-[80px] rounded-full mix-blend-screen animate-blob" style={{ animationDuration: '30s' }} />
      <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-violet-accent/35 blur-[80px] rounded-full mix-blend-screen animate-blob animation-delay-2000" style={{ animationDuration: '35s' }} />
      <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-teal-accent/35 blur-[80px] rounded-full mix-blend-screen animate-blob animation-delay-4000" style={{ animationDuration: '28s' }} />
      <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[700px] max-h-[700px] bg-indigo-accent/35 blur-[80px] rounded-full mix-blend-screen animate-blob animation-delay-6000" style={{ animationDuration: '40s' }} />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const domains = [
  { num: "11", label: "systems shipped", desc: "End-to-end products live in the world." },
  { num: "3", label: "organisations transformed", desc: "A Thousand Suns Academy. JustShreem Labs. Billion Readers." },
  { num: "7×", label: "speed uplift", desc: "The rarest thing: quality and velocity in the same body of work." },
  { num: "0", label: "data breaches", desc: "Security-first architecture. Every time." },
  { num: "Monthly", label: "AI skill-share sessions", desc: "High engagement. Concrete skill transfer. Organisations adapting." },
  { num: "Indian National TV", label: "contracting milestone", desc: "Scalable subtitling infrastructure. Billion Readers." }
];

const projects = [
  {
    id: "snieaks",
    title: "SNIEAKS",
    subtitle: "Artist · Songwriter · Producer",
    url: "https://spandance.replit.app",
    color: "bg-amber-accent",
    impact: "On Spotify, Apple Music, YouTube, and every major platform. A pop artist with her own visual universe.",
    narrative: "Snieaks is the musical identity of Snigdha Motadaka — a singer, songwriter, and producer whose work exists across Spotify, Apple Music, YouTube, and every major streaming platform. The Snieaks digital experience at spandance.replit.app is a custom-built interactive web world: fractal Mandelbrot zoom animations, particle colour effects, video autoplay, and a visual identity that matches the music's layered depth. This is what it looks like when an architect builds for herself.",
    chips: ["Artist", "Spotify", "Apple Music", "YouTube", "Web Experience", "Fractal Animation"]
  },
  {
    id: "kleam",
    title: "KLEAM.AI",
    subtitle: "AI Platform · Multi-Model Deliberation",
    url: "https://kleam.ai",
    color: "bg-violet-accent",
    impact: "A live AI arena where multiple models think in dialogue. The most polished Replit build. Custom .ai domain.",
    narrative: "kleam.ai is an AI deliberation platform — a 'Genius Arena' where distinct AI personas engage users in cross-model reasoning. Built with a Stripe subscription/checkout flow, fractal landing animations, and a playground experience, Kleam represents the architectural ceiling: a multi-model AI product with its own brand identity, custom domain, and monetisation layer. This is what AI governance looks like when it ships.",
    chips: ["Multi-Model AI", "Stripe", "Subscription", "AI Personas", "Product Design", "kleam.ai"]
  },
  {
    id: "drive-transcriber",
    title: "DRIVE TRANSCRIBER",
    subtitle: "Automation Pipeline · Shorts Production",
    url: "https://drivetranscribe.replit.app",
    color: "bg-teal-accent",
    impact: "Event recording to 3 viral-ready short clips in under 10 minutes.",
    narrative: "A Google Drive-authenticated video transcription workflow that watches a folder, runs AI transcription jobs, and auto-identifies high-outreach viral moments from deep esoteric content — then delivers edit-ready outputs to the production team. What once took hours of manual review now produces three targeted short-form clips with a 10-minute pipeline. Built for A Thousand Suns Academy's production cadence.",
    chips: ["Google OAuth", "Drive API", "AI Transcription", "Viral Moment Detection", "ATSA", "Automation"]
  },
  {
    id: "textract",
    title: "TEXTRACT / OCR",
    subtitle: "Quality Layer · Text Integrity",
    url: "https://textract.replit.app",
    color: "bg-cyan-accent",
    impact: "AI vision OCR + Tesseract. The quality checkpoint in every content pipeline.",
    narrative: "Screenshot-to-text extraction using AI vision OCR and Tesseract in parallel — with formatting tools for case conversion and post-processing. Built as the integrity layer of the transcription pipeline: ensuring that what enters the system is clean, correct, and structured. Where the Drive Transcriber creates at speed, Textract holds the standard.",
    chips: ["AI Vision", "Tesseract OCR", "Text Processing", "Quality Assurance", "Pipeline"]
  },
  {
    id: "quotepicmaker",
    title: "QUOTEPICMAKER",
    subtitle: "Content Automation · Social Production",
    url: "https://imageni.replit.app",
    color: "bg-amber-accent",
    impact: "Social media content production at devipuram.org: 3 weeks reduced to 3 hours.",
    narrative: "A canvas-based tool for generating styled quote images — font, colour, layout, download. Built for devipuram.org, a spiritual and cultural organisation whose content team previously spent three weeks producing what this tool renders in hours. One tool. One org. One complete transformation of creative throughput.",
    chips: ["Canvas Rendering", "Content Automation", "Social Media", "devipuram.org", "Design Tools"]
  },
  {
    id: "speedreader",
    title: "SPEED READER",
    subtitle: "Literacy Technology · RSVP Reading",
    url: "https://speead.replit.app",
    color: "bg-teal-accent",
    impact: "Word-by-word at speed. Built for literacy. Aligned with Billion Readers' mission.",
    narrative: "An RSVP-style speed reading application that flashes text word-by-word at a fixed focal point, trained to improve reading speed and comprehension. Paste text or pull from a URL. Designed with an elegant font experience and built in direct alignment with the Billion Readers mission of improving global literacy — the same organisation that subtitles, archives indigenous songs, and contracts with national television.",
    chips: ["RSVP", "Literacy", "Reading Technology", "Billion Readers", "Accessibility"]
  },
  {
    id: "freezeframe",
    title: "VIDEO FREEZE FRAME",
    subtitle: "Production Tooling · Frame Extraction",
    url: "https://video-freeze-frame.replit.app",
    color: "bg-indigo-accent",
    impact: "Lossless frame capture from any video. Runs entirely client-side.",
    narrative: "A browser-native tool for capturing still frames from video at full native resolution, exported as lossless PNG. Zero uploads. Zero server dependency. Built for the production team to extract seamless visual assets from video content without losing quality. An example of the principle that runs through all the tooling: the fastest tool is the one that removes the most steps.",
    chips: ["Client-Side", "Video", "PNG Export", "Production Tooling", "Privacy-First"]
  },
  {
    id: "chimescheduler",
    title: "CHIMESCHEDULER",
    subtitle: "Team Infrastructure · Time Awareness",
    url: "https://tuime.replit.app",
    color: "bg-amber-accent",
    impact: "Built for the team. Tracks hours. Keeps the rhythm.",
    narrative: "An interval timer with custom chimes, start/stop/resume/reset sessions, and colour-coded time-stamped logs persisted via localStorage. Built for the production team to track working hours and maintain organisational rhythm. Small tool. Large signal: an architect who builds for the people around her.",
    chips: ["Team Tooling", "Time Tracking", "localStorage", "Productivity", "Org Design"]
  }
];

export default function App() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-foreground selection:bg-cyan-accent selection:text-[#07080f] relative font-sans">
      <AuroraBackground />

      {/* HERO */}
      <section className="h-screen flex flex-col items-center justify-center px-6 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center w-full"
        >
          <h1 className="text-[clamp(52px,9.5vw,148px)] font-display font-light tracking-[0.14em] uppercase text-aurora leading-none w-full text-center">
            MOTADAKA
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 text-center flex flex-col items-center"
        >
          <p className="font-sans text-sm md:text-base font-normal tracking-widest text-foreground">
            Snigdha Motadaka &nbsp;·&nbsp; Strategy · Security Architecture · Cultural Technology
          </p>
          <div className="w-full max-w-lg h-px bg-white/10 my-8"></div>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="text-white/40" size={20} strokeWidth={1} />
          </motion.div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-32 flex flex-col gap-32 md:gap-48">
        
        {/* SECTION 1: THE WORK */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {domains.map((d, i) => (
            <motion.div key={i} variants={fadeUp} className="glass-card rounded-xl p-8 flex flex-col gap-4">
              <div className="text-5xl md:text-6xl font-display text-white">{d.num}</div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted">{d.label}</div>
              <p className="font-sans text-sm md:text-base text-foreground mt-2 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* SECTION 2: THE NARRATIVE */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto flex flex-col gap-12"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display italic text-white text-center md:text-left">
            An Architect at the Intersection
          </motion.h2>

          <div className="flex flex-col gap-8 font-sans text-lg md:text-xl text-foreground leading-relaxed">
            <motion.p variants={fadeUp}>
              At A Thousand Suns Academy, the mandate was nothing less than encoding esoteric and ancient wisdom into a secure, scalable modern infrastructure — a Flutter mobile app governed by a 10-service AWS stack, identity secured through OAuth 2.0, SAML, and JWT, and a media pipeline that moves sacred content from recording to platform without losing integrity. Every architecture decision was owned, version-controlled, and defended.
            </motion.p>
            <motion.p variants={fadeUp}>
              At Billion Readers — billionreaders.org — the work extended to indigenous cultural preservation. The FirstSongs initiative uses AI tools like Suno to bring indigenous songs to professional audio quality, embedding them in an archival infrastructure designed for longevity. Monthly AI skill-share sessions have driven the organisation's adoption of Claude, Adobe Firefly, and Gemini — transforming how a cross-country nonprofit collaborates, subtitles, and contracts at national scale, including with Indian national television.
            </motion.p>
            <motion.p variants={fadeUp}>
              At JustShreem Labs, the AI layer was researched, chosen, integrated, and maintained — Kommunicate embedded into the client surface, GoHighLevel's AI bot created from zero and surfaced on the homepage. Data integrity and product strategy held steady across chaotic organisational drift, through documentation, executive migration strategy, and clear communication frameworks that held the line when authority failed to.
            </motion.p>
          </div>
        </motion.section>

        {/* SECTION 3: EXPERIENCE TIMELINE */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display text-white">
            Experience
          </motion.h2>

          <div className="flex flex-col gap-0">
            {experience.map((e, i) => (
              <motion.div
                key={e.id}
                variants={fadeUp}
                className="group relative flex gap-8 pb-12 last:pb-0"
              >
                {/* Timeline spine */}
                <div className="flex flex-col items-center shrink-0 w-6">
                  <div className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${e.accent}`} />
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 bg-white/8 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 pb-2 flex-1">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                    <span className="font-mono text-xs text-faint tracking-widest">{e.period}</span>
                    <span className="font-display text-2xl md:text-3xl text-white font-light">{e.org}</span>
                  </div>
                  <div className="font-mono text-xs text-muted tracking-wide">{e.title}</div>
                  <p className="font-sans text-base text-foreground leading-relaxed max-w-3xl">{e.summary}</p>
                  <p className="font-sans text-sm text-muted leading-relaxed max-w-3xl">{e.detail}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {e.chips.map(chip => (
                      <span key={chip} className="text-xs font-mono text-faint px-3 py-1 rounded bg-white/4 border border-white/6">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: PROJECTS CAROUSEL */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col gap-12 w-full"
        >
          <div className="flex justify-between items-end">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display text-white">
              The Systems
            </motion.h2>
            <motion.div variants={fadeUp} className="flex gap-2">
              <button 
                onClick={scrollLeft} 
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                data-testid="carousel-left"
              >
                <ChevronLeft strokeWidth={1} />
              </button>
              <button 
                onClick={scrollRight} 
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                data-testid="carousel-right"
              >
                <ChevronRight strokeWidth={1} />
              </button>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="relative w-full">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide"
            >
              {projects.map((p) => (
                <div 
                  key={p.id} 
                  className="snap-start shrink-0 w-[300px] md:w-[340px]"
                >
                  <button
                    onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                    data-testid={`expand-${p.id}`}
                    className={`w-full text-left glass-card rounded-xl p-6 transition-all duration-300 hover:border-white/20 flex flex-col gap-4 h-full ${
                      expandedProject === p.id ? 'border-white/30 bg-white/5' : ''
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${p.color}`} />
                    <div>
                      <h3 className="text-xl font-display font-medium text-white tracking-wide">{p.title}</h3>
                      <div className="font-mono text-xs text-muted mt-1">{p.subtitle}</div>
                    </div>
                    <p className="font-sans text-sm text-foreground leading-relaxed mt-4 flex-grow">
                      {p.impact}
                    </p>
                  </button>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {expandedProject && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-2"
                >
                  {projects.map((p) => p.id === expandedProject && (
                    <div key={p.id} className="glass-card rounded-2xl p-8 md:p-12 flex flex-col gap-8 border-t-0 border-white/20 relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1 ${p.color} opacity-50`} />
                      
                      <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                        <div className="flex flex-col gap-2 max-w-3xl">
                          <h3 className="text-3xl md:text-4xl font-display text-white">{p.title}</h3>
                          <a 
                            href={p.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-mono text-sm text-muted hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                          >
                            {p.url.replace('https://', '')}
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-col gap-8 max-w-4xl">
                        <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed">
                          {p.narrative}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                          {p.chips.map(chip => (
                            <span key={chip} className="text-xs font-mono text-muted px-3 py-1.5 rounded bg-white/5 border border-white/5">
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* SECTION 4: THE THREAD */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="flex flex-col items-center gap-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-display italic text-white text-center">
            What connects it all
          </motion.h2>

          <motion.p variants={fadeUp} className="font-sans text-xl md:text-2xl text-center max-w-[680px] leading-relaxed text-foreground">
            Speed and quality in the same system. Indigenous culture and modern infrastructure in the same breath. Security architecture and artistic identity in the same person. Whether the domain is cloud governance, AI integration, cultural preservation, or production automation — the same instinct applies: find the constraint, architect the solution, hold the standard.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
            <motion.div variants={fadeUp} className="glass-card rounded-xl p-8 flex flex-col gap-4 text-center items-center">
              <h4 className="font-display text-xl text-white">Speed + Quality</h4>
              <p className="font-sans text-sm text-muted">The rarest combination. Every system here delivers both.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="glass-card rounded-xl p-8 flex flex-col gap-4 text-center items-center">
              <h4 className="font-display text-xl text-white">Security First</h4>
              <p className="font-sans text-sm text-muted">Data sovereignty, zero-trust principles, and incident documentation as standard practice — not afterthought.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="glass-card rounded-xl p-8 flex flex-col gap-4 text-center items-center">
              <h4 className="font-display text-xl text-white">Cultural Integrity</h4>
              <p className="font-sans text-sm text-muted">Technology in service of preservation: indigenous songs, esoteric wisdom, and literacy as equally valid architectural mandates.</p>
            </motion.div>
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display font-medium text-xl text-white tracking-widest">
            MOTADAKA
          </div>
          <div className="flex gap-4 font-mono text-xs text-faint text-center">
            <a href="https://billionreaders.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">billionreaders.org</a>
            <span>|</span>
            <a href="https://kleam.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">kleam.ai</a>
            <span>|</span>
            <a href="https://spandance.replit.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">spandance.replit.app</a>
          </div>
          <div className="font-sans text-sm text-muted text-center md:text-right">
            Strategy · Security Architecture · Cultural Technology · 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
