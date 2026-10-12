import { useEffect } from "react";
import { Icon } from "../components/Icon";
import { useOverlays } from "../components/overlays";
import { services } from "../data";

export function ServicesPage() {
  const { openEnquiry } = useOverlays();

  useEffect(() => {
    document.title = "Services · A&R Systems";
  }, []);

  const enquire = (service: (typeof services)[number]) =>
    openEnquiry({
      subject: service.name,
      backLabel: "Back to Services",
      backTo: "/services",
      messageLabel: "Project brief",
      messagePlaceholder: service.briefPlaceholder,
      successTo: "/contact",
      note: "We’ll review your brief and discuss scope and next steps.",
    });

  return (
    <section className="page">
      <div className="page-intro">
        <h1>Software Development, Built Around Your Business.</h1>
        <p className="lede">
          MVP &amp; Rapid Prototyping, AI Agents &amp; Automation, and Websites &amp; Systems built
          around your business needs.
        </p>
      </div>
      <div className="card-grid services-row">
        {services.map((service) => (
          <article className="card service-card" key={service.id}>
            <span className="icon-well">
              <Icon name={service.icon} />
            </span>
            <h2>{service.name}</h2>
            <p>{service.summary}</p>
            <button className="text-link" type="button" onClick={() => enquire(service)}>
              {service.cta}
              <Icon name="arrow-up-right" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
