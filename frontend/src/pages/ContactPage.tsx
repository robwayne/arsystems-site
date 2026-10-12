import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "../components/Icon";
import { useOverlays } from "../components/overlays";
import { emails, isValidEmail, openMail } from "../data";

const directLines = [
  { label: "General", address: emails.info },
  { label: "Support", address: emails.support },
  { label: "Billing", address: emails.billing },
];

export function ContactPage() {
  const { openCall } = useOverlays();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Contact · A&R Systems";
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const emailOk = isValidEmail(email);
    const complete = Boolean(name.trim() && company.trim() && message.trim());
    setEmailError(!emailOk);
    setIncomplete(!complete);
    if (!emailOk || !complete) return;
    openMail(
      emails.info,
      "Website enquiry",
      [`Name: ${name.trim()}`, `Email: ${email.trim()}`, `Company: ${company.trim()}`, "", message.trim()].join(
        "\n",
      ),
    );
    setSent(true);
  };

  return (
    <section className="split-page contact-page">
      <div className="split-copy">
        <h1>Get in touch.</h1>
        <p className="lede">
          Tell us what you want to build, or book an introductory conversation about your business.
        </p>
        <ul className="contact-points">
          <li>
            <Icon name="mail-muted" />
            Send an enquiry
          </li>
          <li>
            <button type="button" onClick={openCall}>
              <Icon name="calendar-muted" />
              Book an introductory call
            </button>
          </li>
          <li>
            <a href={`mailto:${emails.info}`}>
              <Icon name="phone" />
              Discuss your business needs
            </a>
          </li>
        </ul>
        <div className="aside-card">
          <p className="footer-label">EMAIL</p>
          <ul className="email-list">
            {directLines.map((line) => (
              <li key={line.address}>
                <span>{line.label}</span>
                <a href={`mailto:${line.address}`}>{line.address}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="aside-card">
          <p className="footer-label">SAMPLE AVAILABILITY</p>
          <p>Illustrative scheduling availability shown as a sample, not actual company availability.</p>
        </div>
      </div>
      <div className="contact-forms">
        <article className="card form-card">
          {sent ? (
            <>
              <h2>Enquiry received</h2>
              <div className="notice">
                <strong>Thanks for getting in touch.</strong>
                <p>
                  Your enquiry has been submitted. We’ll review your message and follow up about your
                  business needs.
                </p>
              </div>
              <p className="fine">
                Example submission: {name.trim()} / {company.trim()}
              </p>
            </>
          ) : (
            <form noValidate onSubmit={submit}>
              <h2 className={emailError ? "error-title" : undefined}>
                {emailError ? "Check your email address" : "Send an enquiry"}
              </h2>
              <label>
                Name
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Jane Smith" />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  aria-invalid={emailError}
                  placeholder="jane@company.com"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError(false);
                  }}
                />
              </label>
              {emailError ? (
                <p className="field-error">Enter a valid email address, such as name@company.com.</p>
              ) : null}
              <label>
                Company
                <input
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Acme Operations"
                />
              </label>
              <label>
                Message
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="We want to automate customer support follow-ups and reduce manual email routing."
                />
              </label>
              {incomplete ? (
                <p className="field-error">Add your name, company, and a message before sending.</p>
              ) : null}
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                  {emailError ? "Send enquiry again" : "Send enquiry"}
                </button>
                <p>We’ll review your message and follow up about the next step.</p>
              </div>
            </form>
          )}
        </article>
        <article className="card form-card">
          <h2>Book an introductory call</h2>
          <label>
            Date
            <input value="Fri 16 Oct 2026 • Sample" readOnly />
          </label>
          <label>
            Time
            <input value="10:30 AM UTC • Sample" readOnly />
          </label>
          <label>
            Contact details
            <input value="jane@company.com" readOnly />
          </label>
          <div className="form-actions">
            <button className="btn btn-primary" type="button" onClick={openCall}>
              Review booking
            </button>
            <p>Choose a time, review your details, then confirm your call.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
