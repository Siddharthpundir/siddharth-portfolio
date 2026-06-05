const PROJECTS = [
  {
    shotClass: "assistant-shot",
    shotLabel: "How can I help you today?",
    title: "AI Chat Assistant",
    description:
      "Currently in development. Source code and live demo will be available soon.",
    tags: ["Next.js", "OpenAI", "Tailwind"],
  },
  {
    shotClass: "task-shot",
    shotLabel: "Organize. Plan. Achieve.",
    title: "TaskFlow",
    description:
      "Currently in development. Source code and live demo will be available soon.",
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    shotClass: "weather-shot",
    shotLabel: "22°C Clear Sky",
    title: "Weather Dashboard",
    description:
      "Currently in development. Source code and live demo will be available soon.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
] as const;

export default function Projects() {
  return (
    <div className="projects-panel" id="projects">
      <div className="panel-header">
        <h2>Featured Projects</h2>
        <span className="muted-link" title="Available after project completion">
          View all projects
        </span>
      </div>
      <div className="project-list">
        {PROJECTS.map((project) => (
          <article key={project.title} className="project-card">
            <div className="card-meta">
              <span className="status-badge">Coming Soon</span>
              <span className="progress-dot">In Progress</span>
            </div>
            <div className={`project-shot ${project.shotClass}`}>
              <span>{project.shotLabel}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="project-actions">
              <button type="button" disabled title="Available after project completion">
                Source
              </button>
              <button type="button" disabled title="Available after project completion">
                Live Demo
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
