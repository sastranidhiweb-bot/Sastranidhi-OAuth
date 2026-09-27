import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, DetailRow, CtaBand } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const institutes = [
  {
    kicker: 'Research',
    title: 'Śāstra Research Institute',
    paragraphs: [
      'The institute studies primary texts in their original languages and traditional frameworks. Its work includes critical editions, comparative studies and the documentation of manuscripts held in private and institutional collections.',
      'Research is carried out with traditional scholars and university faculty, and results are published through Śāstranidhi’s repositories and publications.',
    ],
    ticks: [
      'Vedic, Purāṇic and Itihāsa literature',
      'Darśana and commentarial traditions',
      'Manuscript survey and cataloguing',
    ],
    action: { to: '/contact', label: 'Enquire about research →' },
    card: {
      title: 'Programmes',
      items: ['Critical edition projects', 'Research fellowships', 'Scholar colloquia'],
    },
  },
  {
    kicker: 'Language',
    title: 'Institute of Sanskrit & Indic Languages',
    paragraphs: [
      'Sanskrit is taught as a living key to the śāstras. Courses move from script and pronunciation through grammar and vocabulary to reading verses with their commentaries.',
      'Learners study online through IKS-LMS with guided sessions, graded exercises and assessments.',
    ],
    ticks: [
      'Devanāgarī script and pronunciation',
      'Pāṇinian grammar foundations',
      'Reading original texts with commentaries',
    ],
    action: { to: '/courses', label: 'See language courses →' },
    card: {
      dark: true,
      title: 'Programmes',
      items: ['Sanskrit for Beginners', 'Intermediate reading circles', 'Teacher training'],
    },
  },
  {
    kicker: 'Digital',
    title: 'Centre for Digital Śāstra',
    paragraphs: [
      'The centre digitises texts and manuscripts, encodes them in searchable formats and builds the tools behind Śāstranidhi’s platforms, including the Vedic Digital Library and Purāṇatilakam.',
      'Its goal is dependable, well-cited digital access to primary sources for students and researchers.',
    ],
    ticks: [
      'Digitisation and OCR of printed and manuscript sources',
      'Structured text encoding and cross-referencing',
      'Reader and search platforms',
    ],
    action: { to: '/initiatives', label: 'View platforms →' },
    card: {
      title: 'Platforms built',
      items: ['Vedic Digital Library', 'Purāṇatilakam', 'Paripraśna'],
    },
  },
];

export default function InstitutesPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          crumb="Institutes"
          title="Our Institutes"
          lede="Three centres carry the work of Śāstranidhi: textual research, language learning and digital preservation."
        />

        <section className="detail">
          <div className="wrap">
            {institutes.map((row) => (
              <DetailRow key={row.title} {...row} />
            ))}
          </div>
        </section>

        <CtaBand
          title="Work with our institutes"
          text="Scholars, institutions and volunteers are welcome to collaborate on research, teaching and digitisation."
          action={{ to: '/contact', label: 'Contact us →' }}
        />
      </main>
      <Footer />
      <DonateModal />
      <WhatsAppFloat />
    </>
  );
}
