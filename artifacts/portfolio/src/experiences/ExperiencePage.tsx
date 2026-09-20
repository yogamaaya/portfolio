import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";

export default function ExperiencePage() {
  const [introPhase, setIntroPhase] = useState<"enter" | "visible" | "exit" | "done">("enter");
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("visible"), 100);
    const t2 = setTimeout(() => setIntroPhase("exit"), 2400);
    const t3 = setTimeout(() => setIntroPhase("done"), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => { setShowOverlay(true); }, 36000);
    const t2 = setTimeout(() => { setOverlayVisible(true); }, 36200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const videoUrl = "/video";

  return (
    <div style={{ position: "relative", width: "100%", height: "100dvh", background: "#000", overflow: "hidden", touchAction: "pan-y" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400&display=swap');

        @keyframes auraShift {
          0%   { background-position: 0% 50%; }
          25%  { background-position: 50% 0%; }
          50%  { background-position: 100% 50%; }
          75%  { background-position: 50% 100%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes auraPulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.04); }
        }

        @keyframes floatBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }

        .intro-aura {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 40%, #3b0a6e 0%, transparent 55%),
                      radial-gradient(ellipse at 70% 60%, #0d1f4f 0%, transparent 55%),
                      radial-gradient(ellipse at 50% 80%, #1a0a3e 0%, transparent 50%),
                      radial-gradient(ellipse at 20% 70%, #4a1060 0%, transparent 45%),
                      linear-gradient(135deg, #050010 0%, #0a0025 40%, #05001a 100%);
          background-size: 400% 400%;
          animation: auraShift 8s ease infinite, auraPulse 4s ease-in-out infinite;
          z-index: 0;
        }

        .intro-aura::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 30%, rgba(120,40,220,0.3) 0%, transparent 50%),
                      radial-gradient(ellipse at 40% 65%, rgba(40,80,200,0.25) 0%, transparent 50%);
          background-size: 200% 200%;
          animation: auraShift 12s ease-in-out infinite reverse;
        }

        .intro-text {
          position: relative;
          z-index: 1;
          font-family: 'Bodoni Moda', 'Didot', 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 6vw, 5rem);
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.3em;
          color: transparent;
          background: linear-gradient(135deg,
            rgba(255,255,255,0.95) 0%,
            rgba(200,180,255,0.9) 30%,
            rgba(160,200,255,0.85) 60%,
            rgba(255,255,255,0.95) 100%
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: auraShift 6s ease infinite;
          text-shadow: none;
          filter: drop-shadow(0 0 30px rgba(160,100,255,0.6)) drop-shadow(0 0 60px rgba(100,140,255,0.4));
          transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }

        .creator-pill {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 9999;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 1rem 0.65rem 0.65rem;
          background: rgba(8, 4, 18, 0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(160,120,255,0.25);
          border-radius: 999px;
          box-shadow:
            0 4px 24px rgba(80,40,160,0.35),
            0 0 0 0.5px rgba(160,120,255,0.12),
            inset 0 1px 0 rgba(255,255,255,0.06);
          transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          animation: floatBob 4s ease-in-out infinite;
        }

        .creator-pill:hover {
          box-shadow:
            0 8px 40px rgba(120,60,220,0.55),
            0 0 0 0.5px rgba(200,160,255,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1);
          border-color: rgba(180,140,255,0.45);
          transform: translateY(-2px);
          animation: none;
        }

        .creator-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(160,120,255,0.35);
          flex-shrink: 0;
        }

        .creator-label {
          font-family: 'Bodoni Moda', 'Didot', Georgia, serif;
          font-style: italic;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: rgba(220,210,255,0.85);
          line-height: 1.3;
          max-width: 170px;
        }
      `}</style>

      {/* Main spanda iframe — always rendered */}
      <iframe
        ref={iframeRef}
        src="/spanda-experience.html"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          opacity: introPhase === "done" ? 1 : 0,
          transition: "opacity 0.8s ease",
          zIndex: 1,
        }}
        title="Spanda — The Field of Kaali"
      />

      {/* Intro animation overlay */}
      {introPhase !== "done" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: introPhase === "exit" ? 0 : 1,
            transition: introPhase === "exit" ? "opacity 0.8s ease" : "none",
          }}
        >
          <div className="intro-aura" />
          <span
            className="intro-text"
            style={{
              opacity: introPhase === "enter" ? 0 : 1,
              transform:
                introPhase === "enter"
                  ? "scale(0.85)"
                  : introPhase === "exit"
                  ? "scale(0.9)"
                  : "scale(1)",
            }}
          >
            press…
          </span>
        </div>
      )}

      {/* Floating creator overlay — appears at 36s */}
      {showOverlay && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="creator-pill"
          style={{
            opacity: overlayVisible ? 1 : 0,
            transform: overlayVisible ? undefined : "translateY(-8px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <img
            src="/creator-image.jpeg"
            alt="Creator"
            className="creator-avatar"
          />
          <span className="creator-label">
            listen to the creator of this experience?
          </span>
        </a>
      )}

      <Footer />
    </div>
  );
}
