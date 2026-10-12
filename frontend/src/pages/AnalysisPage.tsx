import { useEffect } from "react";
import { Icon } from "../components/Icon";
import { useOverlays } from "../components/overlays";
import { analysisSteps } from "../data";

export function AnalysisPage() {
  const { openAnalysis, openCall } = useOverlays();

  useEffect(() => {
    document.title = "Business Analysis · A&R Systems";
  }, []);

  return (
    <section className="split-page analysis-page">
      <div className="split-copy">
        <h1>Find your starting point.</h1>
        <p className="lede">
          We analyze your business workflows, identify opportunities to save time and money, and
          deliver a practical automation plan.
        </p>
        <ul className="checks">
          <li>
            <Icon name="check-lg" />
            Map the repetitive work and the time involved.
          </li>
          <li>
            <Icon name="check-lg" />
            Identify the highest-value automation opportunities.
          </li>
          <li>
            <Icon name="check-lg" />
            Deliver a practical plan grounded in your actual business work.
          </li>
        </ul>
        <div className="button-row">
          <button className="btn btn-primary" type="button" onClick={openAnalysis}>
            Book a Business Analysis
            <Icon name="arrow-up-right-white" />
          </button>
          <button className="btn btn-secondary" type="button" onClick={openCall}>
            Book an introductory call
          </button>
        </div>
      </div>
      <div className="path">
        <div className="visual-header">
          <span>A CLEAR PATH FROM BUSINESS TO VALUE</span>
          <span>BUSINESS ANALYSIS</span>
        </div>
        {analysisSteps.map((step, index) => (
          <div className={step.tone === "blue" ? "path-row last" : "path-row"} key={step.title}>
            <article className={step.tone === "blue" ? "path-card blue" : "path-card"}>
              <Icon name={step.icon} />
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </article>
            {index < analysisSteps.length - 1 ? <Icon name="arrow-right" /> : null}
          </div>
        ))}
        <div className="path-rule" />
        <p className="path-outcome">
          <Icon name="check-circle-muted" />
          The outcome: a prioritized automation plan, grounded in your actual business work.
        </p>
      </div>
    </section>
  );
}
