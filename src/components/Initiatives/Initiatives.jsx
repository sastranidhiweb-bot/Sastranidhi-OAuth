import { initiatives } from '../../data/siteData.js';
import PlatformCard from '../PlatformCard.jsx';

export default function Initiatives() {
  return (
    <section id="platforms">
      <div className="wrap">
        <div className="section-head reveal">
          {/* "Our Digital Initiatives" kicker removed as requested */}
          {/* <div className="kicker">Our Digital Initiatives</div> */}
          <h2>Explore All Platforms</h2>
          <p>The four key initiatives are visible immediately when visitors enter the website.</p>
        </div>
        <div className="tablet-grid stagger">
          {initiatives.map((item) => (
            <PlatformCard
              key={item.title}
              icon={item.icon}
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