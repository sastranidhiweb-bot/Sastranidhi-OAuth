import { initiatives } from '../../data/siteData.js';
import PlatformCard from '../PlatformCard.jsx';
import '../../styles/initiatives.css';

export default function Initiatives() {
  return (
    <section id="platforms">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Explore Sastranidhi</h2>
        </div>
        <div className="tablet-grid stagger">
          {initiatives.map((item) => (
            <PlatformCard
              key={item.title}
              icon={item.icon}
              shortLabel={item.shortLabel}
              title={item.title}
              linkedTitle={item.linkedTitle}
              description={item.description}
              linkLabel={item.linkLabel}
              href={import.meta.env.DEV && item.devHref ? item.devHref : item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}