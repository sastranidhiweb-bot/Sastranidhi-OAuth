import { initiatives } from '../../data/siteData.js';

export default function Initiatives() {
  return (
    <section id="initiatives">
      <div className="section-title">
        <div className="kicker">Our Digital Initiatives</div>
        <h2>Explore All Platforms</h2>
        <p>The four key initiatives are visible immediately when visitors enter the website.</p>
      </div>
      <div className="grid">
        {initiatives.map((item) => (
          <article className="card" key={item.title}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a className="link" href={item.href} target="_blank" rel="noreferrer">
              {item.linkLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
