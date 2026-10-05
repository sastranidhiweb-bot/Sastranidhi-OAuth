import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import {
  PageHero,
  DetailRow,
  Steps,
  CtaBand,
} from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const values = [
  { title: 'Preservation', text: 'Safeguarding texts, manuscripts, and oral traditions.' },
  { title: 'Authenticity', text: 'Grounding every resource in primary sources.' },
  { title: 'Access', text: 'Making learning open to students everywhere.' },
  { title: 'Service', text: 'Working in service of dharma, education, and research.' },
];

const institutions = [
  {
    icon: 'Mudgala',
    to: '/institutes#mudgala',
    title: 'Mudgala Ṛṣikulam',
    text: 'English-medium IKS-based school under Śāstranidhi Trust, established in 2024.',
  },
  {
    icon: 'Gārgī',
    to: '/institutes#gargi',
    title: 'Gārgī Gurukulam',
    text: 'IKS-based educational initiative for girls.',
  },
  {
    icon: 'SRI',
    to: '/institutes#sri',
    title: 'Śāstranidhi Research Institute',
    text: 'Research and innovation in Indian Knowledge Systems.',
  },
  {
    icon: 'VBV',
    to: '/institutes#visvanatha',
    title: 'Viśvanātha Bhāgavata Vidyāpīṭha',
    text: 'Study, recitation, research and preservation of Śrīmad-Bhāgavatam.',
  },
  {
    icon: 'SIKSHA',
    to: '/institutes#siksha',
    title: 'SIKSHA',
    text: 'Indian Knowledge Systems and Heritage Applications.',
  },
  {
    icon: 'ŚILPA',
    to: '/institutes#silpa',
    title: 'ŚILPA',
    text: 'Traditional arts, crafts, practical skills, and artisan knowledge.',
  },
  {
    icon: 'BHĀSKARA',
    to: '/institutes#bhaskara',
    title: 'BHĀSKARA',
    text: 'Jyotiṣa, astronomy, mathematics, and traditional Indian time sciences.',
  },
];

const people = [
  {
    icon: 'MGP',
    title: 'Madhava Gopinath Prabhu',
    text: 'Principal visionary and leader of the Śāstranidhi mission. Has led the integration of śāstric scholarship, education, research, preservation, technology, and digital knowledge systems.',
  },
  {
    icon: 'RA',
    title: 'Rajeswari Aluri',
    text: 'Involved since the project began. Teaches śāstras to women learners and supports Śrīmad-Bhāgavatam śloka recitation activities.',
  },
  {
    icon: 'OK',
    title: 'Ogeti Krupaluh',
    text: 'Leader of Gītā Saṁskṛta Kendram. Promotes spoken Sanskrit along with recitation, reflection, and realisation of Bhagavad-gītā teachings.',
  },
];

// Cards with `to` become links to that route; `icon` (optional) is the small badge.
function CardGrid({ items }) {
  return (
    <div className="inst-grid stagger">
      {items.map((item) => {
        const body = (
          <>
            {item.icon && <div className="inst-icon" aria-hidden="true">{item.icon}</div>}
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </>
        );
        return item.to ? (
          <Link className="inst-card inst-card-link" to={item.to} key={item.title}>
            {body}
          </Link>
        ) : (
          <div className="inst-card" key={item.title}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          title="About Śāstranidhi"
          lede="A living treasury of Śāstra and Indian Knowledge Systems."
        />

        <section className="detail">
          <div className="wrap">
            <DetailRow
              kicker="Who we are"
              title="Śāstranidhi — A Living Knowledge Ecosystem"
              paragraphs={[
                'Śāstranidhi is an integrated digital, educational, research, and institutional ecosystem dedicated to preserving, studying, analysing, teaching, and transmitting Bhāratīya Jñāna Parampārā. It brings together traditional śāstric scholarship and modern technology so that authentic Indian knowledge remains living, accessible, searchable, teachable, and relevant for future generations.',
                'The name Śāstranidhi means “a treasure-house of śāstra.” It expresses the aspiration to preserve, organise, study, share, and transmit the knowledge contained in India’s sacred, philosophical, scientific, literary, and traditional knowledge systems.',
              ]}
              card={{
                dark: true,
                title: 'Our Guiding Vision',
                text: 'To create a trusted and accessible digital ecosystem where traditional scholarship and modern technology work together in service of dharma, education, and research.',
              }}
            />
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">What guides us</div>
              <h2>Our Values</h2>
            </div>
            <Steps items={values} />
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <DetailRow
              kicker="What we do"
              title="Four Digital Knowledge Pillars"
              paragraphs={[
                'Śāstranidhi’s work is organised through four digital knowledge pillars, complemented by a growing family of educational institutions and specialised centres.',
              ]}
              list={[
                'Svādhyāya — Discover and Explore',
                'Viśleṣaka — Analyse and Understand',
                'Paripraśna — Enquire and Clarify',
                'Pravacana — Learn and Teach',
              ]}
              paragraphsAfter={[
                'Together these platforms connect texts, teachers, institutions, technologies, and learners into one living ecosystem.',
              ]}
              card={{
                title: 'Explore',
                items: ['Institutes', 'Initiatives', 'Courses', 'Research & Publications'],
              }}
            />
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">The Śāstranidhi ecosystem</div>
              <h2>One ecosystem, many doors</h2>
              <p>
                Śāstranidhi’s work is organised through its institutions and specialised centres, so that
                research, teaching, preservation, and public engagement reinforce one another.
              </p>
            </div>
            <CardGrid items={institutions} />
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Our people</div>
              <h2>The People Behind Śāstranidhi</h2>
            </div>
            <CardGrid items={people} />
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <div className="info-card dark about-vision reveal">
              <h2>Our Long-Term Vision</h2>
              <p>
                The long-term vision of Śāstranidhi is to create a trusted, globally accessible ecosystem in
                which the breadth and depth of India’s knowledge traditions can be preserved and actively used.
              </p>
              <p>
                Digital repositories should make knowledge discoverable; analytical platforms should make major
                scriptures deeply researchable; scholarly enquiry should make difficult questions approachable;
                structured learning should make the tradition teachable; and institutions should ensure that
                knowledge remains lived, practiced, and transmitted.
              </p>
              <p>
                In this model, technology is not a substitute for traditional scholarship — it is an instrument
                for preservation, organisation, accessibility, comparison, teaching, research, and responsible
                transmission. The intended result is a living bridge between the continuity of Bhāratīya Jñāna
                Parampārā and the needs of contemporary learners, scholars, institutions, and society.
              </p>
            </div>
          </div>
        </section>

        <CtaBand
          title="“Where there is Dharma, there is victory.”"
          text="Support the work or reach out to collaborate."
          action={{ to: '/contact', label: 'Connect with us →' }}
        />
      </main>
      <Footer />
      <DonateModal />
      <WhatsAppFloat />
    </>
  );
}
