import '../../styles/initiatives-list.css';

const initiativeItems = [
  {
    icon: 'Sv',
    title: 'Svādhyāya',
    description:
      'Institutional information, research, publications, events, projects and scholar initiatives.',
    href: 'https://reader.sastranidhi.org/homePage',
  },
  {
    icon: 'Vi',
    title: 'Viśleṣaka: Purāṇatilakam',
    description:
      'Śrīmad-Bhāgavatam texts, commentaries, translations, cross-references and research tools.',
    href: 'https://puranatilakam.com/',
  },
  {
    icon: 'Pr',
    title: 'Paripraśna',
    description:
      'Philosophical questions and answers grounded in authentic Indian knowledge traditions.',
    href: 'https://qna.sastranidhi.org/',
  },
  {
    icon: 'Cd',
    title: 'Pravacana (Courses & Discourses)',
    description:
      'Courses, lessons, assessments, certificates and guided Indian Knowledge Systems programs.',
    href: 'https://sastranidhi.edmingle.com/',
  },
];

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
                Open Platform →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
