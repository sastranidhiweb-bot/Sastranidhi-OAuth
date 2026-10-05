import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import { PageHero, TickList, CtaBand } from '../components/PageSections/PageSections.jsx';
import { collaborationAreas, collaboratorTypes } from '../data/collaborateData.js';
import '../styles/pages.css';

const APPLY_PATH = '/collaborate/apply';

// What each entry in "Our Collaborations" will show once partners are listed.
const showcaseFields = [
  'Partner institution or organisation',
  'Area of collaboration',
  'Brief description of the joint initiative or project',
  'Year / status',
  'Website / project link',
];

export default function CollaboratePage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          title="Collaborate"
          lede="Partner with Śāstranidhi in preserving, studying, teaching, and advancing Indian Knowledge Systems."
        />

        <section className="detail">
          <div className="wrap">
            <div className="detail-row reveal">
              <div>
                <div className="kicker">Collaborate with us</div>
                <h2>Shared scholarship, shared purpose</h2>
                <p>
                  SASTRANIDHI welcomes meaningful collaborations with{' '}
                  <strong>
                    scholars, universities, research institutions, traditional learning centres,
                    educational organisations, publishers, technology partners, cultural institutions,
                    philanthropic organisations, and individuals
                  </strong>{' '}
                  who share our commitment to preserving, studying, teaching, and advancing Indian
                  Knowledge Systems.
                </p>
                <p>
                  Our collaborations are guided by a common purpose: to bring together{' '}
                  <strong>
                    traditional scholarship, academic research, education, technology, publications,
                    and living cultural traditions
                  </strong>{' '}
                  in ways that create lasting value for present and future generations.
                </p>
                <Link className="btn-outline" to={APPLY_PATH}>
                  Collaborate with us →
                </Link>
              </div>
              <div className="info-card dark">
                <h3 className="info-card-title">We bring together</h3>
                <TickList
                  items={[
                    'Traditional scholarship',
                    'Academic research',
                    'Education',
                    'Technology',
                    'Publications',
                    'Living cultural traditions',
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="detail" id="areas">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Where we work together</div>
              <h2>Areas of Collaboration</h2>
            </div>
            <div className="inst-grid stagger">
              {collaborationAreas.map((area, i) => (
                <div className="inst-card" key={area.title}>
                  <div className="inst-icon" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail" id="our-collaborations">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Partners</div>
              <h2>Our Collaborations</h2>
              <p>
                SASTRANIDHI works with institutions and individuals across different areas of
                education, research, technology, culture, and knowledge preservation.
              </p>
            </div>
            <div className="collab-showcase reveal">
              <p className="collab-showcase-lede">
                This section will showcase our collaborations. Each entry will include:
              </p>
              <TickList items={showcaseFields} />
              <p className="collab-showcase-note">
                As our network grows, this page will serve as a record of collaborative efforts
                contributing to the preservation and advancement of{' '}
                <strong>Bhāratīya Jñāna Paramparā</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="detail" id="who-can-collaborate">
          <div className="wrap">
            <div className="detail-row reveal">
              <div>
                <div className="kicker">Open to all who share the vision</div>
                <h2>Who Can Collaborate?</h2>
                <p>We welcome collaboration from:</p>
                <ul className="ticks ticks-2col">
                  {collaboratorTypes.map((type) => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
              </div>
              <div className="info-card">
                <h3 className="info-card-title">Get started</h3>
                <p>
                  Tell us about your institution or expertise and the area you would like to work on.
                </p>
                <Link className="btn-outline" to={APPLY_PATH}>
                  Collaborate with us →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <div className="info-card dark about-vision reveal">
              <h2>Let Us Work Together</h2>
              <p>
                SASTRANIDHI believes that India’s knowledge traditions can be preserved and
                strengthened most effectively through{' '}
                <strong>shared scholarship, shared resources, and shared responsibility</strong>.
              </p>
              <p>
                If your institution or expertise aligns with our vision, we invite you to collaborate
                with us in building a living, accessible, and enduring ecosystem for{' '}
                <strong>Śāstra and Indian Knowledge Systems</strong>.
              </p>
              <p className="collab-closing">
                Together, we can preserve knowledge, deepen understanding, strengthen learning, and
                carry Bhārata’s wisdom forward.
              </p>
            </div>
          </div>
        </section>

        <CtaBand
          title="Interested in collaborating?"
          text="Share your proposal and our team will get in touch to discuss next steps."
          action={{ to: APPLY_PATH, label: 'Collaborate with us →' }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
