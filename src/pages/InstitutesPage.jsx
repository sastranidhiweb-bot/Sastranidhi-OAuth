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
      'SASTRANIDHI Research Institute (SRI) is the research and scholarly wing of SASTRANIDHI, established to promote rigorous study, preservation, interpretation, and contemporary exploration of Śāstra and Indian Knowledge Systems (IKS). The Institute brings together traditional scholarship, academic research, textual studies, digital humanities, technology, and interdisciplinary enquiry.',
    ],
    ticks: [
      'Vedic literature, Purāṇas, Itihāsas, Darśanas, Vaiṣṇava literature, and Sanskrit',
      'Traditional sciences, history, culture, and commentarial traditions',
      'Textual criticism, manuscript studies, translations, and comparative studies',
      'Digital repositories, critical study tools, textual databases, and research publications',
      'Seminars, conferences, fellowships, and collaborative projects',
    ],
    action: { to: '/contact', label: 'Enquire about research →' },
    card: {
      title: 'Aim',
      items: [
        'Preserve the integrity of traditional sources',
        'Develop research methodologies and digital tools',
        'Collaborate with scholars, universities and traditional institutions',
      ],
    },
  },
  {
    id: 'mudgala',
    title: 'Mudgala Rishikulam',
    titleHref: 'https://mudgala.org/',
    paragraphs: [
      'Mudgala Rishikulam is a gurukulam-based school that blends the timeless wisdom of the śāstras with modern academic excellence. Following the SAGE model — Śāstric, Academic, Governing, and Experiential — it nurtures students who are grounded in Vedic and classical learning while prepared for the wider world.',
    ],
    ticks: [
      'Śāstric grounding in Vedas, Bhagavad-gītā, Rāmāyaṇa, Mahābhārata, Bhāgavatam, and Purāṇas',
      'Academic excellence following CBSE principles',
      'Leadership and governance training for tomorrow’s citizens',
      'Experiential learning through direct engagement and reflection',
      'Experienced and Guest faculty from IITs, BITS, and other international institutions',
    ],
    action: { to: 'https://mudgala.org/', label: 'Visit Mudgala Rishikulam →' },
    card: {
      title: 'The SAGE Model',
      items: [
        'Śāstric — time-tested principles from the śāstras',
        'Academic — world-class academic environment',
        'Governing — leaders with positive influence',
        'Experiential — direct experience and reflection',
      ],
    },
  },
  {
    id: 'gargi',
    title: 'Gārgī Gurukulam',
    paragraphs: [
      'Gārgī Gurukulam is a dedicated e-school for girls, envisioned to nurture knowledgeable, skilled, confident, cultured, and value-centred young women through an integrated model of education rooted in Śāstra and Indian Knowledge Systems. Named after the celebrated Vedic scholar Gārgī Vācaknavī, the Gurukulam revives the ideal of deep learning, intellectual inquiry, character, discipline, and cultural refinement while preparing students for the contemporary world.',
    ],
    ticks: [
      'Śāstric studies and Indian Knowledge Systems',
      'Regular academics alongside traditional learning',
      'Practical life skills and traditional arts',
      'Cooking, cultural education, and character development',
      'Accessible through a structured e-school model',
    ],
    action: { to: '/contact', label: 'Enquire about research →' },
    note: 'Gārgī Gurukulam is planned to commence from June 2027 and will be headed by Tulasī Devī Dāsī.',
    card: {
      title: 'Focus',
      items: [
        'Wisdom and responsibility',
        'Confidence and self-discipline',
        'Service-mindedness',
        'Strong personal values',
      ],
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
    title: 'Viśvanātha Bhāgavata Vidyāpīṭha',
    paragraphs: [
      'Viśvanātha Bhāgavata Vidyāpīṭha is a specialised institution of SASTRANIDHI dedicated exclusively to the Śrīmad-Bhāgavatam, its traditional commentarial heritage, and the revival of the living culture of Bhāgavata study, recitation, teaching, and transmission.',
      'The Vidyāpīṭha provides a systematic and comprehensive study of the Bhāgavatam together with the commentaries of the great Vaiṣṇava ācāryas, including Śrīdhara Svāmī and later Vaiṣṇava commentators. Its aim is to enable students and scholars to engage not only with the text of the Bhāgavatam, but also with the rich interpretative traditions that have preserved and explained its philosophy, theology, devotion, aesthetics, and spiritual practice across generations.',
    ],
    ticks: [
      'Verse-by-verse, chapter-wise, and canto-wise study',
      'Thematic courses and comparative study of commentaries',
      'Teacher training and recitation training',
      'Structured presentations and specialised modules',
      'Publication of traditional commentaries in multiple languages and scripts',
      'Study resources for every verse, chapter, canto, and major theme',
      'Audio recitations, video lessons, and digital learning modules',
    ],
    action: { to: '/contact', label: 'Enquire about research →' },
    card: {
      title: 'Focus',
      items: [
        'Revive Bhāgavata-pārāyaṇa and Bhāgavata-saptāha',
        'Prepare competent Bhāgavata scholars, teachers, reciters, and presenters',
        'Preserve the Vaiṣṇava commentarial tradition',
        'Make Bhāgavata-vidyā accessible to serious learners',
      ],
    },
  },
  {
    id: 'siksha',
    title: 'School of Indian Knowledge Systems and Heritage Applications (SIKSHA)',
    paragraphs: [
      'SIKSHA — School of Indian Knowledge Systems and Heritage Applications — is an educational initiative of SASTRANIDHI that integrates Indian Knowledge Systems, heritage, culture, and traditional wisdom with contemporary learning and practical applications. SIKSHA seeks to bridge the depth of India’s traditional knowledge with the needs of present-day learners.',
    ],
    ticks: [
      'Śāstra, philosophy, culture, heritage, and Sanskrit',
      'Traditional sciences, history, education, and related IKS branches',
      'Courses, workshops, and teacher-training initiatives',
      'Curriculum development and learning resources',
      'Certificate programmes and specialised IKS modules',
    ],
    action: { to: '/contact', label: 'Enquire about research →' },
    card: {
      title: 'Bridging',
      items: [
        'Traditional scholarship and contemporary education',
        'Authentic knowledge and academic structure',
        'Accessibility for new generations',
      ],
    },
  },
  {
    id: 'silpa',
    title: 'ŚILPA — Śilpa-Kalā-Kauśala Kendra',
    paragraphs: [
      'ŚILPA is SASTRANIDHI’s centre for preserving, teaching, and revitalising India’s traditional arts, crafts, practical skills, and artisan knowledge. India’s traditional knowledge includes a vast body of applied knowledge transmitted through generations of skilled practitioners — ŚILPA recognises, documents, teaches, and sustains these living traditions.',
    ],
    ticks: [
      'Traditional crafts and visual and decorative arts',
      'Hand skills and practical household arts',
      'Artisan techniques and design traditions',
      'Material knowledge and skill-based heritage',
      'Demonstrations, workshops, apprenticeships, and documentation projects',
    ],
    action: { to: '/contact', label: 'Enquire about ŚILPA →' },
    card: {
      title: 'Scope',
      items: [
        'Courses and structured learning',
        'Interaction with experienced artisans',
        'Preservation of practical knowledge',
      ],
    },
  },
  {
    id: 'bhaskara',
    title: 'BHĀSKARA — Jyotiṣa-Gaṇita-Khagoḷa-Kāla Adhyayana Kendra',
    paragraphs: [
      'BHĀSKARA is SASTRANIDHI’s centre for the study and research of Jyotiṣa, Gaṇita, astronomy, Pañcāṅga, Kāla, and traditional Indian time sciences. Named in the spirit of India’s great astronomical and mathematical tradition, BHĀSKARA brings together classical textual sources, traditional methods, and rigorous contemporary study.',
    ],
    ticks: [
      'Jyotiṣa, Gaṇita, and Khagoḷa',
      'Pañcāṅga, Kāla-gaṇanā, and calendrical traditions',
      'Astronomical computation and traditional time-reckoning',
      'Courses, workshops, and publications',
      'Computational tools and collaborative research',
    ],
    action: { to: '/contact', label: 'Enquire about BHĀSKARA →' },
    card: {
      title: 'Focus',
      items: [
        'Preserve India’s traditional knowledge of the heavens and time',
        'Careful study, documentation, and verification',
        'Collaboration between traditional scholars and modern researchers',
      ],
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
