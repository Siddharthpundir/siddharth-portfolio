const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.querySelector("#year");
const typewriter = document.querySelector("#typewriter");

year.textContent = new Date().getFullYear();

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const roles = [
  "Computer Science Student",
  "AI + Web Development Learner",
  "Building Projects in Public",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 68;
const deletingSpeed = 42;
const holdTime = 780;

function animateRole() {
  const current = roles[roleIndex];
  typewriter.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(animateRole, typingSpeed);
    return;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(animateRole, holdTime);
    return;
  }

  if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(animateRole, deletingSpeed);
    return;
  }

  isDeleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  setTimeout(animateRole, typingSpeed);
}

setTimeout(animateRole, 240);

const sections = [...document.querySelectorAll("main section[id]")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" },
);

sections.forEach((section) => observer.observe(section));
