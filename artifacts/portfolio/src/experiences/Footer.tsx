export default function Footer() {
  return (
    <footer style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      display: "flex",
      justifyContent: "center",
      padding: "0.55rem 1.5rem",
      background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
      pointerEvents: "none",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@1,6..96,400&display=swap');
        .legal-footer-link {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-style: italic;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: rgba(200,185,255,0.45);
          text-decoration: none;
          transition: color 0.25s ease;
          pointer-events: auto;
          cursor: pointer;
          user-select: none;
          padding: 0.3rem 0.6rem;
        }
        .legal-footer-link:hover {
          color: rgba(220,205,255,0.8);
        }
      `}</style>
      <span
        className="legal-footer-link"
        onClick={() => { window.location.href = "/legal"; }}
      >
        artistic expression & legal notice
      </span>
    </footer>
  );
}
