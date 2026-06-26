export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "1rem" }}>
        <span>© {year} Siddharth Pundir</span>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <a href="https://github.com/Siddharthpundir" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            GitHub
          </a>
          <a href="https://linkedin.com/in/siddharthpundir" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            LinkedIn
          </a>
          <a href="#home" aria-label="Scroll to top">Top ↑</a>
        </div>
      </div>
    </footer>
  );
}
