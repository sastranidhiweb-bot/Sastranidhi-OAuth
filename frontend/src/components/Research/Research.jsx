import { researchFeatures } from '../../data/siteData.js';

export default function Research() {
  return (
    <section className="section" id="research">
      <div className="container">
        <div className="section-head">
          <div className="kicker">Research & Publications</div>
          <h2>Authentic Sources, Digital Access</h2>
          <p>
            Explore the wider Sastranidhi ecosystem of scholarship, publications,
            events and institutional collaboration.
          </p>
        </div>
        <div className="feature-grid">
          {researchFeatures.map((feature) => (
            <article className="feature" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
