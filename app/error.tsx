"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main id="main-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", padding: "2rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#ef4444", fontWeight: 800 }}>Error</h1>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--text)", fontWeight: 700 }}>Something went wrong!</h2>
        <p style={{ color: "var(--muted)", marginBottom: "2.5rem", maxWidth: "500px", fontSize: "1.1rem", lineHeight: 1.6 }}>
          An unexpected error has occurred while trying to load this page.
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => reset()} className="primary-btn">
            <span>Try again</span>
          </button>
          <Link href="/" style={{ color: "var(--blue)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
