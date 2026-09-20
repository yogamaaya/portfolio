import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Music, Video as VideoIcon } from "lucide-react";

const strips = [
  { 
    id: "spanda", 
    title: "SPANDA", 
    summary: "The vibration of the universe.", 
    type: "project", 
    href: "/spanda", 
    bgClass: "bg-fluid-spanda", 
    color: "#a98bff" 
  },
  { 
    id: "breath", 
    title: "BREATH", 
    summary: "Inhale. Exhale. Form.", 
    type: "project", 
    href: "/breath", 
    bgClass: "bg-fluid-breath", 
    color: "#34d8ee" 
  },
  { 
    id: "cyma", 
    title: "CYMA", 
    summary: "Sound made visible.", 
    type: "project", 
    href: "/cyma", 
    bgClass: "bg-fluid-cyma", 
    color: "#ff7ab8" 
  },
  { 
    id: "kleam", 
    title: "KLEAM.AI", 
    summary: "Multi-model deliberation arena.", 
    type: "expand", 
    bgClass: "bg-fluid-kleam", 
    color: "#21e6b3" 
  },
  { 
    id: "social", 
    title: "FREQUENCIES", 
    summary: "The sound that holds it all.", 
    type: "expand", 
    bgClass: "bg-fluid-social", 
    color: "#ffcf6b" 
  }
];

export default function ArtistPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#070414] text-[#edf0f7] font-sans overflow-hidden flex flex-col">
      
      {/* Header / Nav Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest text-[11px] font-medium no-underline">
          <ArrowLeft size={14} strokeWidth={1.5} />
          Portfolio
        </Link>
        
        <div className="flex items-center gap-3 pointer-events-auto backdrop-blur-md bg-black/20 px-5 py-2 rounded-full border border-white/10">
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
      </div>

      {/* Strips Container */}
      <div className="flex-1 flex flex-col w-full h-full">
        {strips.map((strip) => {
          const isExpanded = expanded === strip.id;
          const isHovered = hovered === strip.id;
          const isDimmed = expanded !== null && !isExpanded;
          
          return (
            <motion.div
              key={strip.id}
              layout
              onMouseEnter={() => setHovered(strip.id)}
              onMouseLeave={() => setHovered(null)}
              initial={{ flex: 1 }}
              animate={{ 
                flex: isExpanded ? 5 : (isHovered && !expanded ? 1.2 : 1),
                opacity: isDimmed ? 0.4 : 1,
                filter: isDimmed ? "grayscale(80%) brightness(0.6)" : "grayscale(0%) brightness(1)"
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full border-b border-white/[0.04] last:border-b-0 cursor-pointer ${strip.bgClass} ${isExpanded ? 'overflow-y-auto overflow-x-hidden' : 'overflow-hidden'}`}
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
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 hover:bg-black/10" />
              
              {/* Accent colored glow on hover */}
              <motion.div 
                className="absolute inset-0 opacity-0 mix-blend-screen pointer-events-none transition-opacity duration-700"
                animate={{ opacity: isHovered || isExpanded ? 0.3 : 0 }}
                style={{ background: `radial-gradient(circle at center, ${strip.color}, transparent 60%)` }}
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-12 z-10 pointer-events-none">
                
                <motion.h2 
                  layout="position"
                  className="font-display font-semibold uppercase text-center"
                  animate={{ 
                    fontSize: isExpanded ? "clamp(40px, 8vw, 90px)" : "clamp(28px, 4vw, 50px)",
                    letterSpacing: isExpanded ? "0.15em" : "0.3em",
                    y: isExpanded ? -20 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: strip.color, textShadow: `0 0 40px ${strip.color}66` }}
                >
                  {strip.title}
                </motion.h2>

                <AnimatePresence>
                  {((isHovered && !expanded) || isExpanded) && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="font-sans font-light text-white/80 tracking-widest text-[12px] md:text-[14px] uppercase mt-2 text-center"
                    >
                      {strip.summary}
                    </motion.p>
                  )}
                </AnimatePresence>
                
                {/* Expand Indicator */}
                {!isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute bottom-6 text-[10px] tracking-[0.2em] text-white/40 uppercase"
                  >
                    Click to expand
                  </motion.div>
                )}

              </div>

              {/* EXPANDED CONTENT (Kleam & Social) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute inset-0 top-[20%] flex justify-center items-start p-6 z-20 pointer-events-none"
                  >
                    
                    {strip.type === "project" && (
                      <div
                        className="pointer-events-auto mt-8 flex flex-col items-center gap-5 text-center"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <p className="max-w-xl text-[clamp(15px,1.8vw,19px)] leading-relaxed text-white/72">
                          {strip.summary} Enter the full interactive work in its own space.
                        </p>
                        <Link
                          href={strip.href!}
                          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white no-underline backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
                        >
                          Open {strip.title}
                          <ExternalLink size={13} />
                        </Link>
                      </div>
                    )}

                    {strip.id === "kleam" && (
                      <div 
                        className="w-full max-w-5xl h-[70%] bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-center px-6 py-3 border-b border-white/10 bg-white/5">
                          <span className="text-[11px] tracking-[0.15em] uppercase text-white/60">Live Embed</span>
                          <a 
                            href="https://kleam.ai" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[#21e6b3] hover:text-white transition-colors no-underline px-3 py-1.5 rounded-full border border-[#21e6b3]/30 hover:border-white/40"
                          >
                            Open in new tab <ExternalLink size={12} />
                          </a>
                        </div>
                        <iframe 
                          src="https://kleam.ai" 
                          title="Kleam.ai"
                          className="w-full h-full border-none bg-black"
                          sandbox="allow-scripts allow-same-origin allow-popups"
                          allow="microphone; autoplay"
                        />
                      </div>
                    )}

                    {strip.id === "social" && (
                      <div 
                        className="flex flex-col md:flex-row gap-6 mt-10 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a 
                          href="https://open.spotify.com/artist/06mzs8F4CeZb90aS788tYl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-4 p-6 md:p-10 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#1DB954] hover:bg-[#1DB954]/10 transition-all duration-500 group no-underline min-w-[200px] md:min-w-[280px]"
                        >
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1DB954]/20 flex justify-center items-center group-hover:scale-110 transition-transform duration-500">
                            <Music size={24} color="#1DB954" className="md:w-7 md:h-7" />
                          </div>
                          <div className="text-center">
                            <div className="font-display text-xl md:text-2xl text-white tracking-widest mb-1 md:mb-2">SPOTIFY</div>
                            <div className="text-[10px] md:text-[11px] tracking-[0.15em] text-white/50 uppercase">Listen to Snieaks</div>
                          </div>
                        </a>

                        <a 
                          href="https://www.youtube.com/@snieaks"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-4 p-6 md:p-10 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all duration-500 group no-underline min-w-[200px] md:min-w-[280px]"
                        >
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#FF0000]/20 flex justify-center items-center group-hover:scale-110 transition-transform duration-500">
                            <VideoIcon size={24} color="#FF0000" className="md:w-7 md:h-7" />
                          </div>
                          <div className="text-center">
                            <div className="font-display text-xl md:text-2xl text-white tracking-widest mb-1 md:mb-2">YOUTUBE</div>
                            <div className="text-[10px] md:text-[11px] tracking-[0.15em] text-white/50 uppercase">Watch Snieaks</div>
                          </div>
                        </a>
                      </div>
                    )}
                    
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
