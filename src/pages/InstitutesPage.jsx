import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, DetailRow, CtaBand } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const institutes = [
  {
    id: 'sri',
    title: 'Śāstra Nidhi Research Institute (SRI)',
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
    id: 'mudgala',
    title: 'Mudgala Rishikulam',
    titleHref: 'https://mudgala.org/',
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
    id: 'gargi',
    title: 'Gargi Rishikulam',
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
    id: 'geetha',
    title: 'Gita Samskrita Gurukulam',
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
    id: 'visvanatha',
    title: 'Viśvanātha Bhagavata Vidyapitha',
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
    id: 'siksha',
    title: 'School of Indian Knowledge Systems and Heritage Applications (SIKSHA)',
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
];

export default function InstitutesPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
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
