import { initiatives } from '../../data/siteData.js';
import '../../styles/initiatives-list.css';

// Short badge abbreviations for this compact list view (the full Sanskrit
// title used by the platform tablets above doesn't fit this 58px circle).
// Titles/descriptions/links come from siteData.js so the two views can't
// drift apart independently.
const ICON_ABBR = ['Sv', 'Vi', 'Pr', 'Cd'];

const initiativeItems = initiatives.map((item, index) => ({
  icon: ICON_ABBR[index],
  title: item.title.replace(/\s*\([^)]*\)\s*$/, ''),
  description: item.description,
  href: item.href,
  linkLabel: item.linkLabel,
}));

export default function InitiativesList() {
  return (
    <section id="initiatives" className="independent-initiatives">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="kicker">OUR INITIATIVES</div>
          <h2>Explore Our Knowledge</h2>
          <p>
            Discover focused platforms and programs supporting study, research,
            inquiry and learning across the Indian knowledge traditions.
          </p>
        </div>
        <ul className="independent-list stagger">
          {initiativeItems.map((item) => (
            <li className="initiative-item topic-item" key={item.title}>
              <div className="initiative-icon" aria-hidden="true">
                {item.icon}
              </div>
              <div className="initiative-body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <a
                className="initiative-link-button"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.title} (opens in a new tab)`}
              >
                {item.linkLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
