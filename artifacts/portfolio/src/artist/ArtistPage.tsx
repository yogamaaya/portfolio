import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Music, Video as VideoIcon, ChevronDown } from "lucide-react";

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
    summary: "Sound made visible.", 
    type: "project", 
    href: "/cyma", 
    bgClass: "ink-blot-cyma", 
    color: "#ff7ab8" 
  },
  { 
    id: "kleam", 
    title: "KLEAM.AI", 
    summary: "Multi-model deliberation arena.", 
    type: "expand", 
    bgClass: "ink-blot-kleam", 
    color: "#21e6b3" 
  }
];

export default function ArtistPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#070414] text-[#edf0f7] font-sans flex flex-col overflow-x-hidden">
      
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
          <span className="font-display font-semibold text-sm tracking-[0.2em] uppercase"
            style={{
              background: "linear-gradient(108deg, #ffcf6b, #ff7ab8, #ffcf6b)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "auraDrift 9s ease-in-out infinite",
            }}>
            Snieaks
          </span>
        </div>
      </header>

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
              className={`group relative w-full rounded-[28px] border border-white/[0.08] overflow-hidden cursor-pointer ink-bg-container ${strip.bgClass} shadow-2xl`}
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
              {/* Bioluminescent Ink Blots */}
              <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100">
                 <div className="ink-blob ink-blob-1" />
                 <div className="ink-blob ink-blob-2" />
              </div>

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-0" />

              <div className="relative min-h-[140px] md:min-h-[160px] z-10 flex flex-col">
                
                {/* Header Row (always visible) */}
                <div className="h-[140px] md:h-[160px] flex items-center justify-between px-6 md:px-12 pointer-events-none">
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                    <motion.h2 
                      layout="position"
                      className="font-display font-semibold uppercase m-0 leading-none"
                      animate={{ 
                        fontSize: isExpanded ? "clamp(34px, 5.5vw, 68px)" : "clamp(26px, 4vw, 44px)",
                        letterSpacing: isExpanded ? "0.1em" : "0.15em",
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ color: strip.color, textShadow: `0 0 40px ${strip.color}55` }}
                    >
                      {strip.title}
                    </motion.h2>
                    
                    <AnimatePresence>
                      {!isExpanded && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          className="font-sans font-light text-white/70 tracking-widest text-[11px] md:text-[12px] uppercase mt-1 md:mt-0"
                        >
                          {strip.summary}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Expand Indicator */}
                  <motion.div 
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 backdrop-blur-md bg-black/20 group-hover:bg-white/10 group-hover:text-white transition-colors duration-300 shrink-0 ml-4 pointer-events-auto"
                  >
                    <ChevronDown size={20} strokeWidth={1.2} />
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
                      className="px-6 md:px-12 pb-10 flex flex-col pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {strip.type === "project" && (
                        <div className="mt-4 flex flex-col items-start gap-8 border-t border-white/10 pt-8">
                          <p className="text-[clamp(17px,2vw,22px)] leading-[1.6] text-white/80 max-w-2xl font-light">
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
                        <div className="w-full mt-4 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-[65vh] min-h-[500px]">
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
