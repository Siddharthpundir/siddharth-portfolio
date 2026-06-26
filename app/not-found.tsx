import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "5rem", marginBottom: "0.5rem", color: "var(--violet)", fontWeight: 800, lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem", color: "var(--text)", fontWeight: 700 }}>Page Not Found</h2>
        <p style={{ color: "var(--muted)", marginBottom: "2.5rem", maxWidth: "500px", fontSize: "1.1rem", lineHeight: 1.6 }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="primary-btn">
          <span>Return Home</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
