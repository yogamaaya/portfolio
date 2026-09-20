import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CharFade } from "./CharFade";

const BOOK_PURCHASE_URL = "https://snieaks.com";

export default function BookLandingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
  const coverUrl = `${baseUrl}/breath-assets/book-cover.jpg`;

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] bg-[#020104] flex flex-col items-center justify-center px-6 py-24 pb-48 overflow-hidden z-20">
      
      {/* Glow behind the book */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-lg aspect-square bg-[#fff8f0] rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen"
      />

      <motion.div
        style={{ scale, opacity, y }}
        className="relative z-10 flex flex-col items-center w-full max-w-md"
      >
        <p className="font-serif italic text-primary-foreground/50 text-lg md:text-xl text-center leading-relaxed max-w-sm mb-14">
          <CharFade text="what has been breathing you through this page has a written body." stagger={0.05} />
        </p>

        <div className="relative group w-3/4 md:w-full aspect-[2/3] mb-16 mx-auto perspective-[1000px]">
          {/* The physical book presentation */}
          <div className="w-full h-full relative transition-transform duration-700 ease-out transform-style-3d group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg]">
            <img 
              src={coverUrl} 
              alt="The Breath of Your Self by Snigdha Motadaka"
              className="absolute inset-0 w-full h-full object-cover rounded-[2px_6px_6px_2px] shadow-2xl"
              data-testid="img-book-cover"
            />
            {/* Book spine simulation & lighting */}
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 to-transparent pointer-events-none rounded-l-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/20 pointer-events-none rounded-[2px_6px_6px_2px]" />
            <div className="absolute inset-[-1px] border border-white/10 rounded-[2px_6px_6px_2px] pointer-events-none" />
            
            {/* Drop shadow on hover */}
            <div className="absolute -inset-4 bg-white/5 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        <div className="text-center flex flex-col items-center">
          <div className="font-serif italic text-2xl text-white/90 tracking-widest mb-2">
            <CharFade text="The Breath of Your Self" />
          </div>
          <p className="text-primary-foreground/50 tracking-[0.2em] text-sm uppercase mb-10">
            <CharFade text="Snigdha Motadaka" delay={0.5} />
          </p>

          <p className="font-serif italic text-primary-foreground/40 text-base leading-relaxed max-w-xs mb-8">
            <CharFade text="it took the shape of a book so you could feel it." delay={0.8} />
          </p>

          <a 
            href={BOOK_PURCHASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-4 rounded-full overflow-hidden transition-all duration-500 mb-20 inline-block bg-[#fff8f0] text-black shadow-[0_0_40px_rgba(255,248,240,0.15)] hover:shadow-[0_0_60px_rgba(255,248,240,0.3)] hover:scale-105"
            data-testid="link-purchase-book"
          >
            <span className="relative z-10 font-serif italic text-lg tracking-widest font-semibold">
              <CharFade text="take the knowledge home" delay={1.0} />
            </span>
          </a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-serif italic text-primary-foreground/30 text-sm tracking-widest"
          >
            <CharFade text="exhale." delay={1.5} />
          </motion.div>
        </div>

      </motion.div>

    </section>
  );
}
