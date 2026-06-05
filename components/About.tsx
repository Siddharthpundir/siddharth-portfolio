const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Python",
  "Git",
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>Building with curiosity, code, and AI.</h2>
      </div>
      <div className="about-grid">
        <p>
          I&apos;m Siddharth Pundir, a Computer Science student passionate about AI, web
          development, and software engineering. I enjoy building projects, sharing my learning
          online, and documenting my journey as I grow into a better developer.
        </p>
        <div className="skill-cloud" id="skills">
          {SKILLS.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
