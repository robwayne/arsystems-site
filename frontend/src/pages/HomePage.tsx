import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FounderCard } from "../components/Site";
import { Icon } from "../components/Icon";
import { founders } from "../data";

export function HomePage() {
  useEffect(() => {
    document.title = "A&R Systems";
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>Put AI to work in your business.</h1>
          <p className="lede">
            We build production-ready AI-powered systems that automate repetitive work, save your
            team time, and reduce operating costs.
          </p>
          <div className="button-row">
            <Link className="btn btn-primary" to="/products">
              Explore products
              <Icon name="arrow-up-right-white" />
            </Link>
            <Link className="btn btn-secondary" to="/services">
              See services
            </Link>
          </div>
          <p className="reassure">
            <Icon name="check" />
            Practical software. Built around your business.
          </p>
        </div>
        <div className="hero-visual">
          <div className="visual-header">
            <span>FROM REPETITION TO RESULTS</span>
            <span>WORKFLOW / 01</span>
          </div>
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">
                <Icon name="layers" />
                <strong>Manual Work</strong>
              </div>
              <span className="meta">INPUT</span>
            </div>
            <div className="chips">
              <span>Customer emails</span>
              <span>Documents</span>
              <span>Data entry</span>
            </div>
          </div>
          <div className="flow-link">
            <Icon name="arrow-down" />
            <span>A BETTER WAY TO WORK</span>
          </div>
          <div className="ai-panel">
            <div className="panel-head">
              <div className="panel-title">
                <Icon name="workflow-white" />
                <strong>AI System</strong>
              </div>
              <span className="live">
                <i />
                WORKING FOR YOU
              </span>
            </div>
            <div className="ai-rule" />
            <div className="ai-steps">
              <span>
                <em>01</em> Understand
              </span>
              <span>
                <em>02</em> Decide
              </span>
              <span>
                <em>03</em> Take action
              </span>
            </div>
            <p>Your business rules. Your tools. Human oversight.</p>
          </div>
          <div className="flow-link">
            <Icon name="arrow-down" />
          </div>
          <div className="panel">
            <div className="panel-title">
              <Icon name="check-circle" />
              <strong>Business Outcome</strong>
            </div>
            <div className="outcomes">
              <span>Time saved</span>
              <span>Lower costs</span>
              <span>More capacity</span>
            </div>
          </div>
        </div>
      </section>
      <section className="strip">
        <p>Less repetitive work. More room for what matters.</p>
        <ul>
          <li>Connected to your tools</li>
          <li>Designed for your workflows</li>
          <li>People stay in control</li>
        </ul>
      </section>
      <section className="card-grid three">
        <article className="card">
          <div className="card-title">
            <span className="icon-well">
              <Icon name="box" />
            </span>
            <h2>Products</h2>
          </div>
          <p>
            Four existing AI products plus custom workflow automation for the work your business
            handles every day.
          </p>
          <Link className="card-link" to="/products">
            View products
          </Link>
        </article>
        <article className="card">
          <div className="card-title">
            <span className="icon-well">
              <Icon name="layers-blue" />
            </span>
            <h2>Services</h2>
          </div>
          <p>
            MVP &amp; Rapid Prototyping, AI Agents &amp; Automation, and Websites &amp; Systems built
            around your business needs.
          </p>
          <Link className="card-link" to="/services">
            View services
          </Link>
        </article>
        <article className="card">
          <div className="card-title">
            <span className="icon-well">
              <Icon name="search" />
            </span>
            <h2>Business Analysis</h2>
          </div>
          <p>
            A paid service that analyzes your workflows, identifies opportunities, and delivers a
            practical automation plan.
          </p>
          <Link className="card-link" to="/business-analysis">
            Learn more
          </Link>
        </article>
      </section>
      <section className="card-grid founders">
        {founders.map((founder) => (
          <FounderCard key={founder.name} {...founder} />
        ))}
      </section>
    </>
  );
}
