export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <span>© {year} Siddharth Pundir</span>
      <a href="#home">Back to top</a>
    </footer>
  );
}
