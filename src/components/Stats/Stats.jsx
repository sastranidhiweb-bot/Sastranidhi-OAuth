import { stats } from '../../data/siteData.js';

export default function Stats() {
  return (
    <div className="stats-band">
      <div className="wrap stats-grid stagger">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="num">{stat.value}</div>
            <div className="lbl">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
