import { SITE_URL } from "@/lib/site";

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s build something useful.</h2>
      </div>
      <form
        className="contact-form"
        action="https://formsubmit.co/siddharthpundir.dev@gmail.com"
        method="POST"
      >
        <input type="hidden" name="_subject" value="New message from siddharthpundir.com" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value={`${SITE_URL}/thanks`} />
        <label htmlFor="contact-name">
          <span>Name</span>
          <input id="contact-name" name="name" autoComplete="name" required />
        </label>
        <label htmlFor="contact-email">
          <span>Email</span>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="full" htmlFor="contact-message">
          <span>Message</span>
          <textarea id="contact-message" name="message" rows={5} required />
        </label>
        <button className="primary-btn" type="submit">
          <span>Send Message</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 2 11 13" />
            <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          </svg>
        </button>
      </form>
    </section>
  );
}
