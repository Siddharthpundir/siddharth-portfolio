"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/siddharthpundir.dev@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        router.push("/thanks");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s build something useful.</h2>
      </div>
      <form
        className="contact-form"
        onSubmit={handleSubmit}
        aria-label="Contact form"
      >
        <input type="hidden" name="_subject" value="New message from siddharthpundir.com" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        
        <label htmlFor="contact-name">
          <span>Name</span>
          <input 
            id="contact-name" 
            name="name" 
            autoComplete="name" 
            required 
            aria-required="true"
            disabled={status === "submitting"}
          />
        </label>
        <label htmlFor="contact-email">
          <span>Email</span>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            disabled={status === "submitting"}
          />
        </label>
        <label className="full" htmlFor="contact-message">
          <span>Message</span>
          <textarea 
            id="contact-message" 
            name="message" 
            rows={5} 
            required 
            aria-required="true"
            disabled={status === "submitting"}
          />
        </label>
        <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button 
            className="primary-btn" 
            type="submit"
            disabled={status === "submitting"}
            aria-disabled={status === "submitting"}
          >
            <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
            {status !== "submitting" && (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4 20-7Z" />
              </svg>
            )}
          </button>
          {status === "error" && (
            <p className="error-message" role="alert" style={{ color: "#ef4444", fontSize: "0.875rem", fontWeight: 600 }}>
              Something went wrong. Please try again later.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
