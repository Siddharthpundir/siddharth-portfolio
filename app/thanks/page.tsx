import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Message Sent",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className="thanks-page">
      <section className="thanks-panel" aria-labelledby="thanks-title">
        <p className="eyebrow">Message sent</p>
        <h1 id="thanks-title">Thanks for reaching out.</h1>
        <p>
          Your message has been submitted successfully. I will get back to you as soon as I can.
        </p>
        <Link className="primary-btn" href="/">
          <span>Back to Home</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
