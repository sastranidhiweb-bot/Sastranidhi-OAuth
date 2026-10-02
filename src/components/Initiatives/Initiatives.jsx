import { initiatives } from '../../data/siteData.js';
import PlatformCard from '../PlatformCard.jsx';
import '../../styles/initiatives.css';

export default function Initiatives() {
  return (
    <section id="platforms">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Explore Śāstranidhi</h2>
        </div>
        <div className="tablet-grid stagger">
          {initiatives.map((item) => (
            <PlatformCard
              key={item.title}
              icon={item.icon}
              shortLabel={item.shortLabel}
              title={item.title}
              subtitle={item.subtitle}
              subtitleUnderlined={item.subtitleUnderlined}
              description={item.description}
              more={item.more}
              href={import.meta.env.DEV && item.devHref ? item.devHref : item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}