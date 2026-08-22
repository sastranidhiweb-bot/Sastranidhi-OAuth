import { stats } from '../../data/siteData.js';

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            {stat.label}
          </div>
        ))}
      </div>
    </section>
  );
}
