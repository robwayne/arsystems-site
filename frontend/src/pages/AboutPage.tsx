import { useEffect } from "react";
import { FounderCard } from "../components/Site";
import { founders } from "../data";

export function AboutPage() {
  useEffect(() => {
    document.title = "About · A&R Systems";
  }, []);

  return (
    <section className="page">
      <div className="page-intro">
        <h1>We don’t just add AI. We build solutions that save your business time and money.</h1>
        <p className="lede">
          We make business tools for small and medium-sized businesses that are changing and
          scaling: custom and flexible when you need it, ready-made when you don’t. The technology
          is the means. A more efficient business is the goal.
        </p>
      </div>
      <div className="card-grid founders">
        {founders.map((founder) => (
          <FounderCard key={founder.name} {...founder} />
        ))}
      </div>
    </section>
  );
}
