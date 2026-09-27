import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, DetailRow } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

const initiatives = [
  {
    kicker: 'Study & Research',
    title: 'Svādhyāya',
    paragraphs: [
      'Svādhyāya is the institutional home for research, publications, events, projects and scholar initiatives. It gathers Śāstranidhi’s academic work in one reader-friendly place.',
    ],
    ticks: [
      'Research repositories and publications',
      'Event archives and announcements',
      'Scholar and project profiles',
    ],
    action: { to: 'https://reader.sastranidhi.org/homePage', label: 'Open Svādhyāya →' },
    card: {
      title: 'On the platform',
      items: ['Digital library reader', 'Publication catalogue', 'Project pages'],
    },
  },
  {
    kicker: 'Analyze & Assimilate',
    title: 'Viśleṣaka: Purāṇatilakam',
    paragraphs: [
      'Purāṇatilakam presents the Śrīmad-Bhāgavatam with its commentaries, translations and cross-references, together with tools for close reading and research.',
    ],
    ticks: [
      'Verse-by-verse text with commentaries',
      'Translations and cross-references',
      'Search and research tools',
    ],
    action: { to: 'https://puranatilakam.com/', label: 'Open Purāṇatilakam →' },
    card: {
      dark: true,
      title: 'Best for',
      items: [
        'Students of the Bhāgavatam',
        'Researchers comparing commentaries',
        'Teachers preparing lessons',
      ],
    },
  },
  {
    kicker: 'Questions & Answers',
    title: 'Paripraśna',
    paragraphs: [
      'Paripraśna is a space for philosophical questions answered from authentic sources in the Indian knowledge traditions. Answers cite the texts they draw on.',
    ],
    ticks: [
      'Ask and browse questions',
      'Answers from scholars and experts',
      'Topics organised by tags and scriptures',
    ],
    action: { to: 'https://qna.sastranidhi.org/', label: 'Open Paripraśna →' },
    card: {
      title: 'Sections',
      items: ['Questions', 'Experts', 'Scriptures', 'Debates', 'AI Chat'],
    },
  },
  {
    kicker: 'Courses & Discourses',
    title: 'Pravacana',
    paragraphs: [
      'Pravacana offers structured courses, lessons, assessments and certificates in Indian Knowledge Systems, delivered through IKS-LMS.',
    ],
    ticks: [
      'Self-paced and guided courses',
      'Assessments and certificates',
      'Discourse recordings',
    ],
    action: { to: 'https://sastranidhi.edmingle.com/', label: 'Open Pravacana →' },
    card: {
      dark: true,
      title: 'Featured tracks',
      items: ['Indian Philosophy', 'Bhagavad-gītā', 'Sanskrit'],
    },
  },
];

export default function InitiativesPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          crumb="Initiatives"
          title="Knowledge Initiatives"
          lede="Focused platforms and programmes for study, analysis, inquiry and learning across the Indian knowledge traditions."
        />

        <section className="detail">
          <div className="wrap">
            {initiatives.map((row) => (
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
