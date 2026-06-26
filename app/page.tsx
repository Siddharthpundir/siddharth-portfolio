import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/profile-photo.png`,
          width: 424,
          height: 493,
        },
        description: SITE_DESCRIPTION,
        jobTitle: "Computer Science Student",
        knowsAbout: [
          "Artificial Intelligence",
          "Web Development",
          "Software Engineering",
          "Next.js",
          "React",
          "TypeScript",
          "Python",
        ],
        sameAs: [
          "https://github.com/Siddharthpundir",
          "https://www.linkedin.com/in/siddharthpundir",
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Hero />
        <Stats />
        <About />
        <section className="content-grid section">
          <Projects />
          <Blog />
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
