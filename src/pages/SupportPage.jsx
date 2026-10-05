import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import { PageHero, CtaBand } from '../components/PageSections/PageSections.jsx';
import { supportWays } from '../data/supportData.js';
import '../styles/pages.css';

const APPLY_PATH = '/support/apply';

export default function SupportPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          title="Support Śāstranidhi"
          lede="Become a part of preserving and transmitting Śāstra and Bhāratīya Jñāna Paramparā for future generations."
        />

        <section className="detail" id="ways">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Ways to support</div>
              <h2>How You Can Support</h2>
            </div>
            <div className="inst-grid stagger">
              {supportWays.map((way, i) => (
                <div className="inst-card support-card" key={way.slug}>
                  <div className="inst-icon" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3>{way.title}</h3>
                  <p className="support-tagline">{way.tagline}</p>
                  <p>{way.text}</p>
                  <Link className="support-card-link" to={`${APPLY_PATH}?way=${way.slug}`}>
                    Support this →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <div className="info-card dark about-vision reveal">
              <h2>Every Contribution Counts</h2>
              <p className="collab-closing">
                Every contribution—through resources, knowledge, service, or support—helps keep the
                tradition alive.
              </p>
            </div>
          </div>
        </section>

        <CtaBand
          title="Become a supporter"
          text="Tell us how you would like to support, and our team will get in touch with the next steps."
          action={{ to: APPLY_PATH, label: 'Support Śāstranidhi →' }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
