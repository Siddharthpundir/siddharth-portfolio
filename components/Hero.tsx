"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ROLES = [
  "Computer Science Student",
  "AI + Web Development Learner",
  "Building Projects in Public",
];

const TYPING_SPEED = 68;
const DELETING_SPEED = 42;
const HOLD_TIME = 780;

export default function Hero() {
  const [roleText, setRoleText] = useState(ROLES[0]);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animateRole = () => {
      const current = ROLES[roleIndex];
      setRoleText(current.slice(0, charIndex));

      if (!isDeleting && charIndex < current.length) {
        charIndex += 1;
        timeoutId = setTimeout(animateRole, TYPING_SPEED);
        return;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        timeoutId = setTimeout(animateRole, HOLD_TIME);
        return;
      }

      if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        timeoutId = setTimeout(animateRole, DELETING_SPEED);
        return;
      }

      isDeleting = false;
      roleIndex = (roleIndex + 1) % ROLES.length;
      timeoutId = setTimeout(animateRole, TYPING_SPEED);
    };

    timeoutId = setTimeout(animateRole, 240);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Hi, I&apos;m</p>
        <h1>Siddharth Pundir</h1>
        <p className="hero-role">
          <span>{roleText}</span>
        </p>
        <p className="hero-text">
          Exploring the world of AI, building intelligent web applications, and creating digital
          experiences that feel useful, fast, and thoughtful.
        </p>

        <div className="hero-actions">
          <a className="primary-btn" href="#projects">
            <span>View My Work</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            className="secondary-btn"
            href="/resume/Siddharth_Pundir_Resume_Final.pdf"
            download
          >
            <span>Download Resume</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
            </svg>
          </a>
        </div>

        <div className="social-links" aria-label="Social links">
          <a
            href="https://github.com/Siddharthpundir"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1.3-3.7c4.3-.5 8.8-2.1 8.8-9.4A7.4 7.4 0 0 0 20.6 0a6.8 6.8 0 0 1-.5 4.8A7.5 7.5 0 0 0 13.5 2 7.5 7.5 0 0 0 7 4.8 6.8 6.8 0 0 1 6.5 0a7.4 7.4 0 0 0-1.9 4.9c0 7.3 4.5 8.9 8.8 9.4A4.8 4.8 0 0 0 12 18v4" />
              <path d="M9 19c-4 1.5-4-2-6-2.5" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/siddharthpundir"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
              <path d="M2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://x.com/sidpundirdev"
            aria-label="X"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4l16 16M20 4 4 20" />
            </svg>
          </a>
          <a href="mailto:siddharthpundir.dev@gmail.com" aria-label="Email Siddharth">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 4h16v16H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-label="Profile photo area">
        <div className="portrait-orbit" />
        <div className="portrait-card">
          <Image
            src="/assets/profile-photo.png"
            alt="Siddharth Pundir"
            width={424}
            height={493}
            priority
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 48%" }}
          />
        </div>
        <div className="floating-card learn-card">
          <span className="mini-icon">AI</span>
          <div>
            <small>Currently Learning</small>
            <strong>AI/ML & Next.js</strong>
          </div>
        </div>
        <div className="floating-card build-card">
          <span className="mini-icon code-icon">&lt;/&gt;</span>
          <div>
            <small>Building</small>
            <strong>Cool Projects</strong>
          </div>
        </div>
        <div className="floating-card open-card">
          <span className="mini-icon">+</span>
          <div>
            <small>Open to</small>
            <strong>Opportunities</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
