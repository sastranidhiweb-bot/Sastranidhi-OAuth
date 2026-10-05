import { initiatives } from '../../data/siteData.js';
import PlatformCard from '../PlatformCard.jsx';
import '../../styles/initiatives.css';

export default function Initiatives() {
  return (
    <section id="platforms" aria-label="Explore Śāstranidhi">
      <div className="wrap">
        <div className="tablet-grid stagger">
          {initiatives.map((item) => (
            <PlatformCard
              key={item.title}
              icon={item.icon}
              shortLabel={item.shortLabel}
              title={item.title}
              subtitle={item.subtitle}
              subtitleUnderlined={item.subtitleUnderlined}
              subtitleHref={item.subtitleHref}
              description={item.description}
              moreTo={item.moreTo}
              href={import.meta.env.DEV && item.devHref ? item.devHref : item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}