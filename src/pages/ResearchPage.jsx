import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, DetailRow } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const researchAreas = [
  {
    kicker: 'Projects',
    title: 'Research Projects',
    paragraphs: [
      'Textual, comparative, manuscript and digital humanities projects, carried out with traditional scholars and academic partners.',
    ],
    ticks: [
      'Critical editions of primary texts',
      'Comparative study across commentaries',
      'Manuscript documentation',
      'Digital humanities methods',
    ],
    card: {
      title: 'Approach',
      items: [
        'Primary sources first',
        'Traditional frameworks respected',
        'Open, well-cited outputs',
      ],
    },
  },
  {
    kicker: 'Publications',
    title: 'Publications',
    paragraphs: [
      'Books, articles, translations, reports and educational resources produced by Śāstranidhi and its scholars.',
    ],
    ticks: [
      'Books and monographs',
      'Articles and translations',
      'Reports and teaching resources',
    ],
    action: { to: 'https://reader.sastranidhi.org/homePage', label: 'Browse publications →' },
    card: {
      dark: true,
      title: 'Available through',
      items: ['Svādhyāya reader', 'Vedic Digital Library'],
    },
  },
  {
    kicker: 'Events',
    title: 'Events',
    paragraphs: [
      'Lectures, seminars, workshops, launches and conferences, held online and in person.',
    ],
    ticks: ['Public lectures', 'Scholar seminars and workshops', 'Book and platform launches'],
    card: {
      title: 'Stay informed',
      items: ['Subscribe to the newsletter', 'Follow us on social media'],
    },
  },
  {
    kicker: 'People',
    title: 'Scholars',
    paragraphs: [
      'Profiles of teachers, researchers, contributors and institutional partners who shape Śāstranidhi’s work.',
    ],
    ticks: ['Teachers and researchers', 'Contributors and volunteers', 'Partner institutions'],
    action: { to: '/contact', label: 'Get in touch →' },
    card: {
      dark: true,
      title: 'Collaborate',
      items: ['Research fellowships', 'Joint projects', 'Guest lectures'],
    },
  },
];

export default function ResearchPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          crumb="Research"
          title="Research & Publications"
          lede="Authentic sources with digital access: projects, publications, events and the scholars behind them."
        />

        <section className="detail">
          <div className="wrap">
            {researchAreas.map((row) => (
              <DetailRow key={row.title} {...row} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <DonateModal />
      <WhatsAppFloat />
    </>
  );
}
