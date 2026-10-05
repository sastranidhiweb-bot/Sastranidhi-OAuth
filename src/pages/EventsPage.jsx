import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import { PageHero, ActionLink, CtaBand } from '../components/PageSections/PageSections.jsx';
import { initiatives } from '../data/siteData.js';
import '../styles/pages.css';

// What each platform is for, as worded for the launch announcement; names
// and links come from the home page's initiative cards (siteData.js).
const launchRoles = {
  Svādhyāya: 'for discovering, searching, and studying Vedic literature and Indian Knowledge Systems',
  Viśleṣaka: 'for deep and multi-dimensional analysis of major scriptures',
  Paripraśna: 'for scholarly questions and answers',
  Pravacana:
    'for structured courses, discourses, learning materials, assignments, and certification',
};

// Date block on the left of an event card: big day/year, small month.
function EventDate({ day, month, year }) {
  return (
    <div className="event-date" aria-hidden="true">
      {day && <span className="event-date-day">{day}</span>}
      {month && <span className="event-date-month">{month}</span>}
      <span className={day ? 'event-date-year' : 'event-date-day'}>{year}</span>
    </div>
  );
}

export default function EventsPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          title="Events"
          lede="Programmes, launches, and milestones in Śāstra and Indian Knowledge Systems."
        />

        <section className="detail">
          <div className="wrap">
            <div className="section-head reveal">
              <p>
                SASTRANIDHI conducts and supports programmes related to{' '}
                <strong>
                  Śāstra, Indian Knowledge Systems, research, education, publications, and digital
                  learning
                </strong>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="detail" id="upcoming">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Upcoming</div>
              <h2>Upcoming Event</h2>
            </div>

            <article className="event-card event-card-upcoming reveal">
              <EventDate day="16" month="Dec" year="2026" />
              <div className="event-body">
                <div className="event-label">Platform launch · 16 December 2026</div>
                <h3>Launch of the SASTRANIDHI Digital Platform</h3>
                <p>
                  The <strong>SASTRANIDHI Digital Platform</strong> will be formally launched on{' '}
                  <strong>16 December 2026</strong>.
                </p>
                <p>The platform brings together SASTRANIDHI’s four core digital initiatives:</p>
                <ul className="event-platforms">
                  {initiatives.map((item) => (
                    <li key={item.shortLabel}>
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.shortLabel}
                      </a>{' '}
                      — {launchRoles[item.shortLabel]}
                    </li>
                  ))}
                </ul>
                <p>
                  The launch marks an important milestone in SASTRANIDHI’s vision to create an
                  integrated digital ecosystem for the preservation, study, research, teaching, and
                  dissemination of Śāstra and Indian Knowledge Systems.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="detail" id="previous">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Previous milestone</div>
              <h2>Previous Milestone</h2>
            </div>

            <article className="event-card reveal">
              <EventDate year="2025" />
              <div className="event-body">
                <div className="event-label">Platform launch · 2025</div>
                <h3>Purāṇa Tilakam Launch</h3>
                <p>
                  In 2025, SASTRANIDHI launched <strong>Purāṇa Tilakam</strong>, a comprehensive
                  digital platform for the study and analysis of <strong>Śrīmad-Bhāgavatam</strong>.
                </p>
                <p>
                  Purāṇa Tilakam serves as the first major example of the <strong>Viśleṣaka</strong>{' '}
                  vision, bringing together texts, commentaries, translations, study resources,
                  recitations, presentations, and analytical tools within one integrated platform.
                </p>
                <ActionLink to="https://puranatilakam.com/">Visit Purāṇa Tilakam →</ActionLink>
              </div>
            </article>
          </div>
        </section>

        <CtaBand
          title="Stay informed"
          text="Reach out to know more about upcoming programmes, launches, and events."
          action={{ to: '/contact', label: 'Contact us →' }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
