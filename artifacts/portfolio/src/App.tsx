import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Shield, RadioTower } from "lucide-react";

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0a0d18]" aria-hidden="true">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-cyan-accent/20 blur-[100px] rounded-full mix-blend-screen animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-violet-accent/15 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-teal-accent/15 blur-[100px] rounded-full mix-blend-screen animate-blob animation-delay-4000" />
      <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[700px] max-h-[700px] bg-indigo/20 blur-[90px] rounded-full mix-blend-screen animate-blob animation-delay-6000" />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const capabilities = [
  "Security Architecture", "Zero-Trust IAM", "OAuth 2.0 · SAML · JWT", "Cloud-Native (AWS)",
  "AI Governance", "Responsible AI", "Conversational AI", "Data Sovereignty",
  "Threat Mitigation", "Incident Documentation", "Vendor Risk", "Platform Migration", "Cross-Functional Governance"
];

const metrics = [
  { value: "7× faster", label: "transcript creation" },
  { value: "10+", label: "AWS services governed" },
  { value: "2", label: "AI platforms owned" },
  { value: "0", label: "data breaches" }
];

const projects = [
  {
    id: "textract",
    title: "Textract / AI Automation",
    link: "https://textract.replit.app/",
    impact: "Cut transcript creation from a week to 4 hours.",
    narrative: "Built Textract to automate transcript generation for A Thousand Suns Academy's educational platform. Before this existed, instructors spent 5-7 days manually creating transcripts for course content. The AI-powered pipeline reduced that to under 4 hours — a 7× reduction in one of the most time-consuming production tasks in the org. Shipped directly on Replit as a working tool, not a prototype.",
    chips: ["AI Automation", "Transcript Pipeline", "Replit", "Python", "Educational Tech"]
  },
  {
    id: "atsa",
    title: "ATSA / Cloud Architecture",
    link: "atsabrief.lovable.app",
    impact: "Governed the production stack across competing proposals and versions.",
    narrative: "Reviewed and approved the cloud architecture across Flutter (iOS + Android), AWS Application Load Balancer, NestJS API, Cognito identity (OAuth 2.0 / SAML 2.0 / JWT), RDS PostgreSQL, and an async media pipeline (S3 → Lambda → MediaConvert → CloudFront). Maintained the stack as the single source of truth through every revision, and communicated misalignments between production and actual digital infrastructure — including surfacing a superior migration path when the existing build drifted from original agreements. Threat mitigation through documentation, structured communication, and org-wide audit frameworks.",
    chips: ["AWS", "Flutter", "NestJS", "Cognito", "OAuth 2.0", "SAML", "JWT", "RDS PostgreSQL", "CloudFront", "Architecture Governance"]
  },
  {
    id: "justshreem",
    title: "JustShreem / AI Layer Ownership",
    link: "justshreemlabs.lovable.app",
    impact: "Owned the AI layer end-to-end — research, build, ship, maintain.",
    narrative: "Researched and implemented Kommunicate as the conversational AI layer for the mobile app, integrating it into the client-facing surface. Then took complete ownership of the GoHighLevel AI bot — created it from scratch, surfaced it on the client homepage, and maintained the integration as the critical communication bridge between founders and production. Held data integrity and strategy alignment across both products while managing chaotic organizational drift through focus documentation and executive migration strategy.",
    chips: ["Conversational AI", "Kommunicate", "GoHighLevel", "AI Bot Development", "Data Integrity", "Product Strategy"]
  }
];

const approaches = [
  {
    icon: FileText,
    title: "Documentation as Architecture",
    description: "I treat written strategy as infrastructure. Briefs, audits, and process docs are the source of truth that outlasts any sprint."
  },
  {
    icon: Shield,
    title: "AI Governance Before Hype",
    description: "I research, select, and own AI tools based on data integrity, vendor risk, and organizational fit — not momentum."
  },
  {
    icon: RadioTower,
    title: "Incident as Signal",
    description: "Production misalignments become architectural decisions. I read drift early and document the better path."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(projects[0].id);

  return (
    <div className="min-h-screen text-foreground selection:bg-cyan-accent selection:text-[#0a0d18] relative">
      <AuroraBackground />
      
      <main className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-32">
        {/* HERO */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeUp}>
            <p className="text-sm md:text-base text-muted-foreground font-mono mb-6 uppercase tracking-wider">
              Snigdha Motadaka · Strategy & Security Architecture
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              MOTADAKA
            </h1>
            <h2 className="text-3xl md:text-5xl font-medium max-w-4xl leading-tight mb-8 text-aurora">
              Security-minded systems strategy.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              I make the call on the cloud stack, govern the AI layer, and hold the line on data integrity as systems scale.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
            {capabilities.map(cap => (
              <span 
                key={cap} 
                className="font-mono text-xs md:text-sm px-4 py-2 rounded-full glass-card text-foreground/90 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/20"
              >
                {cap}
              </span>
            ))}
          </motion.div>
        </motion.section>

        {/* METRICS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/5">
            {metrics.map((metric, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="flex flex-col gap-2 pl-0 md:pl-8 first:pl-0 border-l border-white/5 first:border-0"
              >
                <span className="text-4xl md:text-5xl font-bold font-display text-white">{metric.value}</span>
                <span className="text-sm font-mono text-faint uppercase tracking-wider">{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-2xl md:text-3xl font-bold font-display">Select Initiatives</h3>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-8">
            <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 gap-4 scrollbar-hide">
              {projects.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  data-testid={`tab-${p.id}`}
                  className={`whitespace-nowrap px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                    activeTab === p.id 
                      ? 'bg-white/10 text-white border border-white/20' 
                      : 'text-muted-foreground hover:text-white glass-card hover:-translate-y-[2px]'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-8 md:p-12 min-h-[400px]">
              <AnimatePresence mode="wait">
                {projects.map((p) => p.id === activeTab && (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full justify-between gap-12"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <a 
                          href={p.link.startsWith('http') ? p.link : `https://${p.link}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-mono text-sm text-cyan-accent hover:text-cyan-accent/80 transition-colors w-fit flex items-center gap-2"
                        >
                          {p.link}
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                        <h4 className="text-3xl md:text-4xl font-bold font-display text-white leading-tight">
                          {p.impact}
                        </h4>
                      </div>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {p.narrative}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-8 border-t border-white/10">
                      {p.chips.map(chip => (
                        <span key={chip} className="text-xs font-mono text-faint px-3 py-1 rounded bg-white/5 border border-white/5">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.section>

        {/* APPROACH */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-2xl md:text-3xl font-bold font-display">Approach</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {approaches.map((approach, i) => {
              const Icon = approach.icon;
              return (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-[4px] hover:border-white/20 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-cyan-accent group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xl font-bold font-display text-white">{approach.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{approach.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.footer 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-faint font-mono text-sm"
        >
          <span>MOTADAKA</span>
          <span>Strategy & Security Architecture · 2026</span>
        </motion.footer>

      </main>
    </div>
  );
}
