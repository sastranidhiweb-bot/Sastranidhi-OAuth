import { researchFeatures } from '../../data/siteData.js';

export default function Research() {
  return (
    <section id="research">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker">Research &amp; Publications</div>
          <h2>Authentic Sources, Digital Access</h2>
          <p>
            Explore the wider Sastranidhi ecosystem of scholarship, publications,
            events and institutional collaboration.
          </p>
        </div>
        <div className="research-grid stagger">
          {researchFeatures.map((feature) => (
            <div className="research-item" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
