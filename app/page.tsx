import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
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
