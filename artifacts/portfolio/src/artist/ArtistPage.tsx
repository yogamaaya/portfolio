import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Instagram, Music, Video as VideoIcon, ChevronDown } from "lucide-react";
import RouteSeo from "../seo/RouteSeo";

const strips = [
  { 
    id: "spanda", 
    title: "SPANDA", 
    summary: "The vibration of the universe.", 
    type: "project", 
    href: "/spanda", 
    bgClass: "ink-blot-spanda", 
    color: "#a98bff" 
  },
  { 
    id: "breath", 
    title: "BREATH", 
    summary: "Inhale. Exhale. Form.", 
    type: "project", 
    href: "/breath", 
    bgClass: "ink-blot-breath", 
    color: "#34d8ee" 
  },
  { 
    id: "cyma", 
    title: "CYMA", 
    summary: "Digital water studio.", 
    type: "project", 
    href: "/cyma", 
    bgClass: "ink-blot-cyma", 
    color: "#ff7ab8" 
  },
  { 
    id: "kleam", 
    title: "KLEAM.AI", 
    summary: "Voice-giving AI persona.", 
    type: "expand", 
    bgClass: "ink-blot-kleam", 
    color: "#21e6b3" 
  }
];

export default function ArtistPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#070414] text-[#edf0f7] font-sans flex flex-col overflow-x-hidden">
      <RouteSeo
        title="Snieaks | Creative & Digital Art by Snigdha Motadaka"
        description="Snieaks is the creative identity of Snigdha Motadaka, connecting systems architecture and cybersecurity with digital art, music, and multimedia."
        path="/snieaks"
        pageSchema={[
          {
            "@type": "WebPage",
            "@id": "https://motadaka.com/snieaks#webpage",
            url: "https://motadaka.com/snieaks",
            name: "Snieaks | Creative & Digital Art by Snigdha Motadaka",
            alternateName: "snieaks",
            isPartOf: { "@id": "https://motadaka.com/#website" },
            about: { "@id": "https://motadaka.com/#person" },
          },
        ]}
      />
      
      {/* Header */}
      <header className="pt-12 pb-10 px-6 md:px-12 flex justify-between items-center max-w-[1200px] mx-auto w-full z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 backdrop-blur-md bg-black/30 px-5 py-2.5 rounded-full border border-white/10 uppercase tracking-widest text-[11px] font-medium no-underline"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Portfolio
        </Link>
        
        <div className="flex items-center gap-3 backdrop-blur-md bg-black/30 px-6 py-2.5 rounded-full border border-white/10">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff7ab8] shadow-[0_0_10px_#ff7ab8]" />
          <span className="font-sans font-semibold text-[11px] tracking-[0.2em] uppercase text-white/80">
            Digital Arts
          </span>
        </div>
      </header>

      <section className="px-6 pb-12 text-center relative z-10" aria-labelledby="snieaks-title">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#ff7ab8] mb-4">Creative identity of Snigdha Motadaka</p>
        <h1 id="snieaks-title" className="font-sans font-semibold uppercase tracking-[0.24em] text-[clamp(34px,7vw,70px)] metallic-text" style={{ "--glow": "#ff7ab8" } as React.CSSProperties}>
          Snieaks
        </h1>
        <p className="mt-5 mx-auto max-w-[58ch] text-white/55 leading-relaxed">
          Digital art, music, and multimedia experiments shaped by the same systems thinking that informs the technical work.
        </p>
      </section>

      {/* Main Strips Container */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-8 pb-20 flex flex-col gap-5 relative z-10">
        {strips.map((strip) => {
          const isExpanded = expanded === strip.id;
          const isDimmed = expanded !== null && !isExpanded;
          
          return (
            <motion.div
              key={strip.id}
              layout
              initial={false}
              animate={{ 
                opacity: isDimmed ? 0.4 : 1,
                filter: isDimmed ? "grayscale(70%) brightness(0.6)" : "grayscale(0%) brightness(1)",
                scale: isDimmed ? 0.98 : 1
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative w-full rounded-[28px] border border-white/[0.12] overflow-hidden cursor-pointer molten-bg-container ${strip.bgClass} shadow-2xl`}
              style={{
                 boxShadow: `0 20px 40px -10px ${strip.color}20, inset 0 1px 1px rgba(255,255,255,0.15)`,
                 backdropFilter: "blur(20px)",
              }}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpanded(isExpanded ? null : strip.id);
                }
              }}
              onClick={() => {
                 setExpanded(isExpanded ? null : strip.id);
              }}
              data-testid={`strip-${strip.id}`}
            >
              {/* Molten Neon Fluids */}
              <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100"
                   style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)" }}>
                 <div className="molten-fluid-container">
                   <div className="molten-layer molten-layer-1" />
                   <div className="molten-layer molten-layer-2" />
                   <div className="molten-layer molten-layer-3" />
                 </div>
              </div>

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700 z-0" />

              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                
                {/* Header Row */}
                <div className="flex flex-col items-center justify-center px-6 md:px-12 py-10 md:py-12 pointer-events-none w-full">
                  
                  <motion.h2 
                    layout="position"
                    className="font-sans font-bold uppercase m-0 leading-none metallic-text mb-3"
                    animate={{ 
                      fontSize: isExpanded ? "clamp(34px, 5.5vw, 68px)" : "clamp(26px, 4vw, 44px)",
                      letterSpacing: isExpanded ? "0.15em" : "0.3em",
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ "--glow": strip.color } as any}
                  >
                    {strip.title}
                  </motion.h2>
                  
                  <AnimatePresence>
                    {!isExpanded && (
                      <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="font-sans font-light text-white/70 tracking-widest text-[11px] md:text-[12px] uppercase mb-4"
                      >
                        {strip.summary}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Expand Indicator */}
                  <motion.div 
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 backdrop-blur-md bg-white/5 group-hover:bg-white/15 group-hover:text-white transition-colors duration-300 pointer-events-auto mt-2 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  >
                    <ChevronDown size={18} strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="px-6 md:px-12 pb-12 flex flex-col items-center pointer-events-auto w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {strip.type === "project" && (
                        <div className="mt-2 flex flex-col items-center gap-8 border-t border-white/10 pt-10 w-full max-w-3xl">
                          <p className="text-[clamp(17px,2vw,22px)] leading-[1.6] text-white/80 font-light text-center">
                            {strip.summary} Enter the full interactive work in its own space.
                          </p>
                          <Link
                            href={strip.href!}
                            data-testid={`link-${strip.id}`}
                            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-white no-underline backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                          >
                            Open {strip.title}
                            <ExternalLink size={14} />
                          </Link>
                        </div>
                      )}

                      {strip.type === "expand" && strip.id === "kleam" && (
                        <div className="w-full mt-2 bg-black/60 backdrop-blur-2xl border border-white/15 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-[65vh] min-h-[500px]">
                          <div className="flex justify-between items-center px-6 py-3.5 border-b border-white/10 bg-white/5">
                            <span className="text-[11px] tracking-[0.15em] uppercase text-white/60">Live Embed</span>
                            <a 
                              href="https://kleam.ai" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              data-testid={`external-${strip.id}`}
                              className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[#21e6b3] hover:text-white transition-colors no-underline px-4 py-2 rounded-full border border-[#21e6b3]/30 hover:border-[#21e6b3]/80 bg-[#21e6b3]/5 hover:bg-[#21e6b3]/20"
                            >
                              Open in new tab <ExternalLink size={12} />
                            </a>
                          </div>
                          <iframe 
                            src="https://kleam.ai" 
                            title="Kleam.ai"
                            className="w-full h-full flex-1 border-none bg-black"
                            sandbox="allow-scripts allow-same-origin allow-popups"
                            allow="microphone; autoplay"
                          />
                        </div>
                      )}
                      
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>
            </motion.div>
          );
        })}
      </main>

      {/* Footer / Media Links */}
      <footer className="mt-auto py-10 px-6 md:px-12 border-t border-white/[0.06] w-full bg-black/20 backdrop-blur-lg">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] tracking-[0.2em] text-white/40 uppercase">
            Media
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/snieaks"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-instagram"
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:border-[#ff7ab8]/50 hover:bg-[#ff7ab8]/10 transition-all duration-300 group no-underline"
            >
              <Instagram size={16} className="text-[#ff7ab8] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium tracking-[0.15em] text-white uppercase">Instagram</span>
            </a>
            <a 
              href="https://open.spotify.com/artist/06mzs8F4CeZb90aS788tYl"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-spotify"
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:border-[#1DB954]/50 hover:bg-[#1DB954]/10 transition-all duration-300 group no-underline"
            >
              <Music size={16} className="text-[#1DB954] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium tracking-[0.15em] text-white uppercase">Spotify</span>
            </a>
            <a 
              href="https://www.youtube.com/@snieaks"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-youtube"
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10 transition-all duration-300 group no-underline"
            >
              <VideoIcon size={16} className="text-[#FF0000] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium tracking-[0.15em] text-white uppercase">YouTube</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
