import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  emails,
  formatSampleDate,
  formatSampleTime,
  isValidEmail,
  openMail,
  sampleDays,
  sampleTimes,
} from "../data";

export type EnquiryRequest = {
  subject: string;
  backLabel: string;
  backTo: string;
  messageLabel: string;
  messagePlaceholder: string;
  successTo: string;
  note: string;
};

type OverlayContextValue = {
  openCall: () => void;
  openAnalysis: () => void;
  openEnquiry: (request: EnquiryRequest) => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

export function useOverlays() {
  const value = useContext(OverlayContext);
  if (!value) throw new Error("Overlays are unavailable");
  return value;
}

type EnquiryFields = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const emptyEnquiry: EnquiryFields = { name: "", email: "", company: "", message: "" };

export function OverlayProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [callOpen, setCallOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [enquiry, setEnquiry] = useState<EnquiryRequest | null>(null);

  const closeAll = () => {
    setCallOpen(false);
    setAnalysisOpen(false);
    setEnquiry(null);
  };

  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  useEffect(() => {
    const open = callOpen || analysisOpen || enquiry !== null;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [callOpen, analysisOpen, enquiry]);

  return (
    <OverlayContext.Provider
      value={{
        openCall: () => {
          setAnalysisOpen(false);
          setEnquiry(null);
          setCallOpen(true);
        },
        openAnalysis: () => {
          setCallOpen(false);
          setEnquiry(null);
          setAnalysisOpen(true);
        },
        openEnquiry: (request) => {
          setCallOpen(false);
          setAnalysisOpen(false);
          setEnquiry(request);
        },
      }}
    >
      {children}
      {enquiry ? (
        <EnquiryModal
          request={enquiry}
          onClose={() => setEnquiry(null)}
          onDone={() => {
            const destination = enquiry.successTo;
            setEnquiry(null);
            if (location.pathname !== destination) navigate(destination);
          }}
        />
      ) : null}
      {callOpen ? (
        <CallModal
          backLabel={location.pathname === "/contact" ? "Back to Contact" : "Close"}
          onClose={() => setCallOpen(false)}
          onDone={() => {
            setCallOpen(false);
            if (location.pathname !== "/contact") navigate("/contact");
          }}
        />
      ) : null}
      {analysisOpen ? (
        <AnalysisModal
          backLabel={
            location.pathname === "/business-analysis" ? "Back to Business Analysis" : "Close"
          }
          onClose={() => setAnalysisOpen(false)}
          onDone={() => {
            setAnalysisOpen(false);
            if (location.pathname !== "/business-analysis") navigate("/business-analysis");
          }}
        />
      ) : null}
    </OverlayContext.Provider>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={titleId}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  invalid = false,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  invalid?: boolean;
  multiline?: boolean;
}) {
  const id = useId();
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          aria-invalid={invalid}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          aria-invalid={invalid}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function EnquiryModal({
  request,
  onClose,
  onDone,
}: {
  request: EnquiryRequest;
  onClose: () => void;
  onDone: () => void;
}) {
  const [fields, setFields] = useState<EnquiryFields>(emptyEnquiry);
  const [emailError, setEmailError] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof EnquiryFields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (key === "email") setEmailError(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (!isValidEmail(fields.email)) {
      setEmailError(true);
      return;
    }
    if (!fields.name.trim() || !fields.company.trim() || !fields.message.trim()) {
      setEmailError(false);
      return;
    }
    openMail(
      emails.info,
      request.subject,
      [
        `Name: ${fields.name.trim()}`,
        `Work email: ${fields.email.trim()}`,
        `Company: ${fields.company.trim()}`,
        "",
        fields.message.trim(),
      ].join("\n"),
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Modal title="Enquiry received" onClose={onDone}>
        <div className="notice">
          <strong>Thanks for getting in touch.</strong>
          <p>
            Your enquiry has been submitted. We’ll review your message and follow up about your
            business needs.
          </p>
        </div>
        <p className="fine">
          Example submission: {fields.name.trim()} / {fields.company.trim()}
        </p>
        <button className="btn btn-primary btn-block" type="button" onClick={onDone}>
          Back to Contact
        </button>
      </Modal>
    );
  }

  const missing =
    fields.name.trim() === "" || fields.company.trim() === "" || fields.message.trim() === "";

  return (
    <Modal title={emailError ? "Check your email address" : "Tell us what you want to build."} onClose={onClose}>
      <form className="stack" noValidate onSubmit={submit}>
        <label className="field">
          <span>Service</span>
          <input value={request.subject} readOnly />
        </label>
        <Field label="Name" value={fields.name} onChange={set("name")} placeholder="Your name" />
        <Field
          label="Work email"
          type="email"
          value={fields.email}
          onChange={set("email")}
          placeholder="you@company.com"
          invalid={emailError}
        />
        {emailError ? (
          <p className="field-error">Enter a valid email address, such as name@company.com.</p>
        ) : null}
        <Field
          label="Company"
          value={fields.company}
          onChange={set("company")}
          placeholder="Your company"
        />
        <Field
          label={request.messageLabel}
          value={fields.message}
          onChange={set("message")}
          placeholder={request.messagePlaceholder}
          multiline
        />
        {attempted && missing && !emailError ? (
          <p className="field-error">Add your name, company, and a short brief before sending.</p>
        ) : null}
        <button className="btn btn-primary btn-block" type="submit">
          {emailError ? "Send enquiry again" : "Send enquiry"}
        </button>
        <button className="btn btn-soft btn-block" type="button" onClick={onClose}>
          {request.backLabel}
        </button>
        <p className="fine">{request.note}</p>
      </form>
    </Modal>
  );
}

function CallModal({
  backLabel,
  onClose,
  onDone,
}: {
  backLabel: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState<"time" | "review" | "done">("time");
  const [day, setDay] = useState(16);
  const [time, setTime] = useState("10:30");
  const [zone, setZone] = useState("UTC");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameMissing, setNameMissing] = useState(false);
  const weeks = [sampleDays.slice(0, 7), sampleDays.slice(7)];

  const confirm = (event: FormEvent) => {
    event.preventDefault();
    const emailOk = isValidEmail(email);
    setEmailError(!emailOk);
    setNameMissing(!name.trim());
    if (!emailOk || !name.trim()) return;
    openMail(
      emails.info,
      "Introductory call request",
      [
        `Name: ${name.trim()}`,
        `Work email: ${email.trim()}`,
        `When: ${formatSampleDate(day)} · ${formatSampleTime(time)} ${zone.trim() || "UTC"}`,
        `Topic: ${topic.trim() || "Introductory call"}`,
        "",
        "Sample availability request from the A&R Systems website.",
      ].join("\n"),
    );
    setStep("done");
  };

  if (step === "done") {
    return (
      <Modal title="Your call is booked" onClose={onDone}>
        <div className="notice">
          <strong>See you soon.</strong>
          <p>
            {formatSampleDate(day)} • {formatSampleTime(time)} {zone.trim() || "UTC"}
            <br />
            Introductory call
            <br />
            Sample confirmation, not a real reservation
          </p>
        </div>
        <p className="fine">
          A confirmation email with meeting details will be sent to {email.trim()}.
        </p>
        <button className="btn btn-primary btn-block" type="button" onClick={onDone}>
          Back to Contact
        </button>
      </Modal>
    );
  }

  if (step === "review") {
    return (
      <Modal title="Review your call" onClose={onClose}>
        <form className="stack" noValidate onSubmit={confirm}>
          <div className="notice">
            <strong>{formatSampleDate(day)}</strong>
            <p>
              {formatSampleTime(time)} {zone.trim() || "UTC"} • Introductory call
              <br />
              Sample booking
            </p>
          </div>
          <Field
            label="Name"
            value={name}
            onChange={(value) => {
              setName(value);
              setNameMissing(false);
            }}
            placeholder="Your name"
          />
          {nameMissing ? <p className="field-error">Enter your name.</p> : null}
          <Field
            label="Work email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setEmailError(false);
            }}
            placeholder="you@company.com"
            invalid={emailError}
          />
          {emailError ? (
            <p className="field-error">Enter a valid email address, such as name@company.com.</p>
          ) : null}
          <Field
            label="What would you like to discuss?"
            value={topic}
            onChange={setTopic}
            placeholder="Customer support automation"
          />
          <button className="btn btn-primary btn-block" type="submit">
            Confirm introductory call
          </button>
          <button className="btn btn-soft btn-block" type="button" onClick={() => setStep("time")}>
            Change date or time
          </button>
        </form>
      </Modal>
    );
  }

  return (
    <Modal title="Choose a time" onClose={onClose}>
      <div className="stack">
        <p className="modal-kicker">Introductory call • Sample availability</p>
        <div className="calendar">
          <strong>October 2026</strong>
          <div className="calendar-week calendar-labels">
            {["M", "T", "W", "T", "F", "S", "S"].map((label, index) => (
              <span key={`${label}-${index}`}>{label}</span>
            ))}
          </div>
          {weeks.map((week) => (
            <div className="calendar-week" key={week[0]}>
              {week.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={value === day ? "day selected" : "day"}
                  onClick={() => setDay(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          ))}
        </div>
        <label className="field">
          <span>Selected date</span>
          <input value={formatSampleDate(day)} readOnly />
        </label>
        <label className="field">
          <span>Time zone</span>
          <input value={zone} onChange={(event) => setZone(event.target.value)} />
        </label>
        <div className="time-choices">
          {sampleTimes.map((value) => (
            <button
              key={value}
              type="button"
              className={value === time ? "time selected" : "time"}
              onClick={() => setTime(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-block" type="button" onClick={() => setStep("review")}>
          Continue to contact details
        </button>
        <button className="btn btn-soft btn-block" type="button" onClick={onClose}>
          {backLabel}
        </button>
        <p className="fine">Illustrative availability, not a live booking calendar.</p>
      </div>
    </Modal>
  );
}

type AnalysisFields = {
  name: string;
  email: string;
  company: string;
  workflow: string;
};

function AnalysisModal({
  backLabel,
  onClose,
  onDone,
}: {
  backLabel: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState<"intake" | "review" | "done">("intake");
  const [fields, setFields] = useState<AnalysisFields>({
    name: "",
    email: "",
    company: "",
    workflow: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [incomplete, setIncomplete] = useState(false);

  const set = (key: keyof AnalysisFields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (key === "email") setEmailError(false);
    setIncomplete(false);
  };

  const review = (event: FormEvent) => {
    event.preventDefault();
    const emailOk = isValidEmail(fields.email);
    const complete = Boolean(fields.name.trim() && fields.company.trim() && fields.workflow.trim());
    setEmailError(!emailOk);
    setIncomplete(!complete);
    if (emailOk && complete) setStep("review");
  };

  const submit = () => {
    openMail(
      emails.info,
      "Business Analysis request",
      [
        `Name: ${fields.name.trim()}`,
        `Work email: ${fields.email.trim()}`,
        `Company: ${fields.company.trim()}`,
        "",
        "Workflow to analyze:",
        fields.workflow.trim(),
        "",
        "Paid service request. Scope and fee to be confirmed before work begins.",
      ].join("\n"),
    );
    setStep("done");
  };

  if (step === "done") {
    return (
      <Modal title="Your request is received" onClose={onDone}>
        <div className="notice">
          <strong>A practical next step.</strong>
          <p>We’ll review your workflows and get in touch to confirm the analysis scope and fee.</p>
        </div>
        <p className="fine">
          This is a request for the paid analysis service—not a payment or a confirmed engagement.
        </p>
        <button className="btn btn-primary btn-block" type="button" onClick={onDone}>
          Back to Business Analysis
        </button>
      </Modal>
    );
  }

  if (step === "review") {
    return (
      <Modal title="Review your request" onClose={onClose}>
        <div className="stack">
          <div className="notice">
            <strong>Business Analysis / Paid service</strong>
            <p>
              {fields.name.trim()} • {fields.company.trim()}
              <br />
              {fields.email.trim()}
            </p>
          </div>
          <div className="notice">
            <strong>Workflow to analyze</strong>
            <p>{fields.workflow.trim()}</p>
          </div>
          <p className="fine">
            Next: we’ll review your workflow, clarify the scope, and confirm the fee before any paid
            work begins.
          </p>
          <button className="btn btn-primary btn-block" type="button" onClick={submit}>
            Submit analysis request
          </button>
          <button className="btn btn-soft btn-block" type="button" onClick={() => setStep("intake")}>
            Edit request
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title={emailError ? "Check your email address" : "Book a Business Analysis"} onClose={onClose}>
      <form className="stack" noValidate onSubmit={review}>
        <p className="modal-kicker">PAID SERVICE</p>
        <Field label="Name" value={fields.name} onChange={set("name")} placeholder="Jane Smith" />
        <Field
          label="Work email"
          type="email"
          value={fields.email}
          onChange={set("email")}
          placeholder="jane@company.com"
          invalid={emailError}
        />
        {emailError ? (
          <p className="field-error">Enter a valid email address, such as name@company.com.</p>
        ) : null}
        <Field
          label="Company"
          value={fields.company}
          onChange={set("company")}
          placeholder="Acme Operations"
        />
        <Field
          label="Workflow details"
          value={fields.workflow}
          onChange={set("workflow")}
          placeholder="Customer support follow-ups and manual email routing."
          multiline
        />
        <div className="notice">
          <strong>What you receive</strong>
          <p>Workflow review, prioritized opportunities, and a practical automation plan.</p>
        </div>
        <p className="fine">
          We confirm scope and fee before the engagement. No payment is taken here.
        </p>
        {incomplete ? (
          <p className="field-error">Add your name, company, and the workflow to review.</p>
        ) : null}
        <button className="btn btn-primary btn-block" type="submit">
          Review analysis request
        </button>
        <button className="btn btn-soft btn-block" type="button" onClick={onClose}>
          {backLabel}
        </button>
      </form>
    </Modal>
  );
}
