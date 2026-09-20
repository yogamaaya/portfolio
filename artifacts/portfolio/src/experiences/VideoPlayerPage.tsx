import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export default function VideoPlayerPage() {
  const videoId = "7pzVvWEr_WI";
  const spotifyUrl = "https://open.spotify.com/track/4o6O3R2G7YlXwAQUYlpkkU?si=NV9LnnNVReGL4YuhvG8V0A";

  const isMobile = useIsMobile();
  const [linksActive, setLinksActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLinksActive(true), 30000);
    return () => clearTimeout(t);
  }, []);

  const handleSpotify = (e: React.MouseEvent) => {
    if (!linksActive) { e.preventDefault(); return; }
    window.open(spotifyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&display=swap');

        #yt-player-container iframe {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }

        .spotify-btn {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(180px, 28vw);
          height: min(180px, 28vw);
          border-radius: 50%;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0);
          border: 1.5px solid rgba(255,255,255,0);
          transition: background 0.3s ease, border-color 0.3s ease;
          text-decoration: none;
          cursor: ${linksActive ? "pointer" : "default"};
        }

        .spotify-btn.active:hover {
          background: rgba(0, 0, 0, 0.52);
          border-color: rgba(255,255,255,0.18);
        }

        .spotify-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .spotify-btn.active:hover .spotify-inner {
          opacity: 1;
        }

        .spotify-icon {
          width: 36px;
          height: 36px;
          fill: #1DB954;
        }

        .spotify-label {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-style: italic;
          font-size: clamp(0.55rem, 1.1vw, 0.75rem);
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.85);
          text-align: center;
          line-height: 1.4;
          white-space: nowrap;
        }
      `}</style>

      {/* Video iframe */}
      <div
        id="yt-player-container"
        style={{
          position: "absolute",
          zIndex: 1,
          ...(isMobile
            ? {
                width: "100vh",
                height: "100vw",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(90deg)",
              }
            : {
                inset: 0,
                width: "100%",
                height: "100%",
              }),
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?controls=1&rel=0&modestbranding=1&playsinline=1`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Creator Experience Video"
        />
      </div>

      {/* Center Spotify overlay (passes through for first 30s) */}
      <div
        onClick={handleSpotify}
        className={`spotify-btn${linksActive ? " active" : ""}`}
        style={{ pointerEvents: linksActive ? "auto" : "none" } as React.CSSProperties}
      >
        <div className="spotify-inner">
          <svg className="spotify-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="spotify-label">listen on spotify</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}
