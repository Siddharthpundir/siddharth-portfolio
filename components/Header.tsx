"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

// All hrefs are absolute paths — they work correctly from any page.
// "/#section" on the homepage scrolls to the anchor; on other pages it
// navigates to the homepage and then scrolls.
const NAV_LINKS = [
  { href: "/#home", sectionId: "home", label: "Home" },
  { href: "/#about", sectionId: "about", label: "About" },
  { href: "/#projects", sectionId: "projects", label: "Projects" },
  { href: "/#blog", sectionId: "blog", label: "Blog" },
  { href: "/#contact", sectionId: "contact", label: "Contact" },
] as const;

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  // Default to empty string — the IntersectionObserver will set the real
  // active section on the client. Avoids any server/client mismatch on
  // the className attribute.
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  useEffect(() => {
    // Only observe sections on the homepage
    if (pathname !== "/") return;

    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const closeNav = () => {
    setNavOpen(false);
  };

  const isActive = (sectionId: string): boolean => {
    // On blog pages always highlight "blog"
    if (isBlogPage && sectionId === "blog") return true;
    // On homepage highlight whichever section is in view
    return activeSection === sectionId;
  };

  return (
    <header className={`site-header${navOpen ? " nav-open" : ""}`}>
      {/* Brand always links to root — static href, no hydration risk */}
      <a className="brand" href="/" aria-label="Siddharth Pundir home">
        <span className="brand-mark">SP</span>
        <span>Siddharth Pundir</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={navOpen}
        aria-controls="primary-navigation"
        onClick={() => setNavOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="site-nav" id="primary-navigation" aria-label="Primary navigation">
        {NAV_LINKS.map(({ href, sectionId, label }) => (
          <a
            key={href}
            href={href}
            className={isActive(sectionId) ? "active" : undefined}
            onClick={closeNav}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <a className="header-cta" href="/#contact" onClick={closeNav}>
          <span>Let&apos;s Connect</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </header>
  );
}
