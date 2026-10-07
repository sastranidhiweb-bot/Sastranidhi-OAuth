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
import { courses, bhagavatamSeries } from '../data/siteData.js';
// Course cards reuse the homepage card styles, which are scoped to #courses.
import '../styles/courses.css';
import '../styles/pages.css';

const LMS_URL = 'https://sastranidhi.edmingle.com/';

// Detail rows for the four courses (cards: `courses` in siteData.js).
// Paragraph elements keep the key phrases in bold.
const courseDetails = [
  {
    id: 'sanskrit-shastric',
    kicker: 'New course · Online on IKS-LMS',
    title: 'Sanskrit for Śāstric Study',
    paragraphs: [
      <p className="course-lede" key="lede">
        Learn Sanskrit with a focused approach to reading, understanding, and studying Śāstric texts.
      </p>,
      <p key="p1">
        <strong>Sanskrit for Śāstric Study</strong> is designed for learners who wish to acquire
        Sanskrit specifically for the study of Vedic and classical literature.
      </p>,
      <p key="p2">
        Rather than treating Sanskrit merely as a language subject, the course develops the skills
        needed to approach{' '}
        <strong>
          Bhagavad-gītā, Śrīmad-Bhāgavatam, Upaniṣads, Purāṇas, philosophical works, commentaries, and
          other Śāstric texts
        </strong>{' '}
        with greater understanding.
      </p>,
      <p key="p3">
        Learners are introduced systematically to essential{' '}
        <strong>
          vocabulary, grammar, sandhi, samāsa, case endings, verbal forms, sentence structure, anvaya,
          and methods of textual analysis
        </strong>
        , using examples drawn directly from scripture.
      </p>,
      <p key="p4">
        The aim is to progressively enable students to move from dependence on translations toward a
        more direct engagement with the original Sanskrit text.
      </p>,
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      dark: true,
      title: 'Ideal for',
      items: [
        'Students of Śāstra',
        'Teachers and researchers',
        'Devotees',
        'Anyone wishing to understand Sanskrit scriptures more deeply',
      ],
    },
  },
  {
    id: 'iks-intro',
    kicker: 'New course · Online on IKS-LMS',
    title: 'Introduction to Indian Knowledge Systems',
    paragraphs: [
      <p className="course-lede" key="lede">
        Discover the foundations, scope, disciplines, and continuing relevance of India’s vast
        knowledge traditions.
      </p>,
      <p key="p1">
        <strong>Introduction to Indian Knowledge Systems (IKS)</strong> offers a structured overview of
        the extraordinary intellectual, spiritual, scientific, literary, and cultural traditions that
        developed in Bhārata.
      </p>,
      <p key="p2">
        The course introduces learners to the broad architecture of Indian knowledge, including the{' '}
        <strong>
          Vedas, Vedāṅgas, Upavedas, Itihāsas, Purāṇas, Darśanas, Dharmaśāstras, Sanskrit literature,
          traditional sciences, arts, education, culture, and other branches of Bhāratīya Jñāna
          Paramparā
        </strong>
        .
      </p>,
      <p key="p3">
        Along with understanding the major disciplines, learners explore characteristic Indian
        approaches to{' '}
        <strong>
          knowledge, reality, human life, education, ethics, society, nature, and the pursuit of
          knowledge and wisdom
        </strong>
        .
      </p>,
      <p key="p4">
        The course provides a strong foundation for anyone wishing to pursue deeper study or research
        in Indian Knowledge Systems.
      </p>,
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      title: 'Ideal for',
      items: [
        'Students',
        'Teachers and educators',
        'Researchers and professionals',
        'Anyone seeking a structured introduction to IKS',
      ],
    },
  },
  {
    id: 'gita-gaudiya',
    kicker: 'New course · Online on IKS-LMS',
    title: 'Bhagavad-gītā with Gauḍīya Commentaries',
    paragraphs: [
      <p className="course-lede" key="lede">
        Study the Bhagavad-gītā through the rich philosophical and devotional insights of the Gauḍīya
        Vaiṣṇava commentarial tradition.
      </p>,
      <p key="p1">
        <strong>Bhagavad-gītā with Gauḍīya Commentaries</strong> is an in-depth study of the
        Bhagavad-gītā through the teachings and interpretations of the{' '}
        <strong>Gauḍīya Vaiṣṇava ācāryas</strong>.
      </p>,
      <p key="p2">
        The course examines the verses of the Gītā together with important traditional commentaries,
        helping learners appreciate how Gauḍīya teachers have explained its teachings on{' '}
        <strong>
          the self, karma, jñāna, yoga, bhakti, the nature of the Supreme Lord, surrender, devotional
          service, and the ultimate goal of life
        </strong>
        .
      </p>,
      <p key="p3">
        Attention is given to the connections between verses, the progression of thought across
        chapters, important philosophical concepts, and distinctive insights offered by different
        Gauḍīya commentators.
      </p>,
      <p key="p4">
        The course seeks to move beyond a general reading of the Gītā toward a{' '}
        <strong>
          systematic, comparative, and contemplative study grounded in the Gauḍīya Vaiṣṇava tradition
        </strong>
        .
      </p>,
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      dark: true,
      title: 'Ideal for',
      items: [
        'Serious students of Bhagavad-gītā',
        'Students of Vaiṣṇava philosophy',
        'Teachers and preachers',
        'Students preparing for advanced Śāstric study',
      ],
    },
  },
];

// Detail rows for the "Bhāgavatam As It Is" series (cards: `bhagavatamSeries`
// in siteData.js), shown under the series heading.
const bhagavatamDetails = [
  {
    id: 'bhagavatam-1',
    kicker: 'Course series · Skandha 1',
    title: 'Bhāgavatam As It Is — Skandha 1',
    paragraphs: [
      <p className="course-lede" key="lede">
        Enter the world of Śrīmad-Bhāgavatam through its foundational teachings, personalities,
        questions, and the circumstances that lead to the narration of the Bhāgavata.
      </p>,
      <p key="p1">
        <strong>Bhāgavatam As It Is — Skandha 1</strong> introduces the philosophical, historical, and
        devotional foundation of the entire Śrīmad-Bhāgavatam.
      </p>,
      <p key="p2">
        The course explores the setting of the Bhāgavata at <strong>Naimiṣāraṇya</strong>, the
        questions of the sages, the life and teachings of{' '}
        <strong>
          Śrīla Vyāsadeva, Nārada Muni, Mahārāja Parīkṣit, the Pāṇḍavas, Kuntī Devī, Bhīṣmadeva
        </strong>
        , and other central personalities.
      </p>,
      <p key="p3">
        Learners will study important themes such as{' '}
        <strong>
          pure devotional service, the purpose of scripture, the role of the spiritual master, the
          position of Bhagavān, the nature of dharma, remembrance of Kṛṣṇa, the departure of great
          devotees, and the preparation of Mahārāja Parīkṣit to hear Śrīmad-Bhāgavatam
        </strong>
        .
      </p>,
      <p key="p4">
        Through verse study, Bhaktivedanta purports, traditional commentarial insights, recitation,
        presentations, and thematic learning, students gain a strong foundation for understanding the
        remaining Skandhas.
      </p>,
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      dark: true,
      title: 'Ideal for',
      items: [
        'Students beginning systematic Bhāgavata study',
        'Teachers and speakers',
        'Devotees',
        'Serious readers of Śrīmad-Bhāgavatam',
      ],
    },
  },
  {
    id: 'bhagavatam-2',
    kicker: 'Course series · Skandha 2',
    title: 'Bhāgavatam As It Is — Skandha 2',
    paragraphs: [
      <p className="course-lede" key="lede">
        A focused study of the universal form, creation, meditation, the process of hearing, and the
        deeper philosophical structure of Śrīmad-Bhāgavatam.
      </p>,
      <p key="p1">
        <strong>Bhāgavatam As It Is — Skandha 2</strong> continues the dialogue between{' '}
        <strong>Śukadeva Gosvāmī and Mahārāja Parīkṣit</strong> and presents some of the most
        important philosophical teachings of the Bhāgavata.
      </p>,
      <p key="p2">
        The course explores topics such as{' '}
        <strong>
          meditation on the Supreme Lord, the virāṭ-rūpa, the process of creation, the nature of the
          material and spiritual worlds, the role of Brahmā, the power of hearing and chanting, the
          structure of the universe, and the essential subject matter of Śrīmad-Bhāgavatam
        </strong>
        .
      </p>,
      <p key="p3">
        Special attention is given to the famous <strong>catuḥ-ślokī Bhāgavatam</strong>, which
        presents the essence of Bhāgavata philosophy and establishes the relationship between the
        Supreme Lord, the living entity, material energy, and reality.
      </p>,
      <p key="p4">
        Through systematic verse study, Bhaktivedanta purports, Vaiṣṇava commentaries, diagrams,
        presentations, recitations, and thematic analysis, learners develop a deeper philosophical
        understanding of the Bhāgavatam.
      </p>,
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      title: 'Ideal for',
      items: [
        'Students who have completed Skandha 1',
        'Those seeking a deeper understanding of Bhāgavata philosophy',
        'Students of cosmology and creation',
        'Practitioners of devotional meditation',
      ],
    },
  },
  {
    id: 'bhagavatam-3',
    kicker: 'Course series · Skandha 3',
    title: 'Bhāgavatam As It Is — Skandha 3',
    paragraphs: [
      <p className="course-lede" key="lede">
        Explore creation, cosmology, Varāha-līlā, the teachings of Kapiladeva, and the profound
        journey of Kardama Muni and Devahūti.
      </p>,
      <p key="p1">
        <strong>Bhāgavatam As It Is — Skandha 3</strong> presents a rich combination of philosophy,
        cosmology, divine līlā, yoga, devotion, and spiritual psychology.
      </p>,
      <p key="p2">
        The course follows the conversations of <strong>Vidura and Maitreya Ṛṣi</strong> and explores
        major topics including{' '}
        <strong>
          the creation of the universe, the appearance of Lord Varāha, the story of Hiraṇyākṣa, the
          activities of Brahmā, the lineage of Svāyambhuva Manu, the life of Kardama Muni and
          Devahūti, and the teachings of Lord Kapiladeva
        </strong>
        .
      </p>,
      <p key="p3">
        A major portion of the course focuses on{' '}
        <strong>
          Kapila’s teachings on Sāṅkhya, bhakti-yoga, the nature of the material world, the
          conditioning of the living entity, meditation, devotional service, liberation, and the path
          back to the Supreme Lord
        </strong>
        .
      </p>,
      <p key="p4">
        The Skandha also offers profound insights into{' '}
        <strong>
          family life, renunciation, spiritual discipline, divine incarnation, creation, time,
          material nature, and the qualities of a pure devotee
        </strong>
        .
      </p>,
      <p key="p5">
        Through verse-by-verse study, Bhaktivedanta purports, traditional commentarial insights,
        thematic presentations, recitations, visual resources, notes, and structured learning
        materials, students gain a comprehensive understanding of one of the most philosophically
        rich sections of Śrīmad-Bhāgavatam.
      </p>,
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      dark: true,
      title: 'Ideal for',
      items: [
        'Serious students of Bhāgavata philosophy',
        'Students of Kapiladeva’s teachings and Sāṅkhya',
        'Those deepening their devotional practice',
        'Students of cosmology and Vaiṣṇava theology',
      ],
    },
  },
];

const learningSteps = [
  { title: 'Enrol', text: 'Create an account and choose a course.' },
  { title: 'Study', text: 'Watch lessons and work through readings at your pace.' },
  { title: 'Practise', text: 'Complete exercises and assessments.' },
  { title: 'Certify', text: 'Receive a certificate on completion.' },
];

const courseIncludes = [
  { title: 'Recorded lessons', text: 'Short video lessons you can watch in order and revisit at any time.' },
  { title: 'Source readings', text: 'Selected passages in the original language with transliteration and translation.' },
  { title: 'Assessments', text: 'Quizzes and graded exercises at the end of each module.' },
  { title: 'Guided sessions', text: 'Live or scheduled sessions with teachers to clarify doubts.' },
  { title: 'Certificate', text: 'A certificate of completion once all modules and assessments are done.' },
];

const courseFaq = [
  {
    q: 'Do I need to know Sanskrit?',
    a: 'No. Beginner courses start from the script and basic terms. Intermediate courses assume you have completed a beginner course or have equivalent reading ability.',
  },
  {
    q: 'How do I access the lessons?',
    a: 'All courses run on IKS-LMS. After you enrol, the lessons, readings and assessments appear in your account and can be opened on a phone or computer.',
  },
  {
    q: 'Can I study at my own pace?',
    a: 'Yes. Recorded lessons and readings stay available, so you can move through the modules on your own schedule. Guided sessions are announced in advance.',
  },
  {
    q: 'Will I receive a certificate?',
    a: 'A certificate of completion is issued once you finish every module and pass the assessments.',
  },
  {
    q: 'Which course should I start with?',
    a: 'Introduction to Indian Knowledge Systems gives the widest overview. If you want to read the scriptures in the original, begin with Sanskrit for Śāstric Study.',
  },
];

// One course card (styles in courses.css, scoped to #courses).
function CourseCard({ course }) {
  return (
    <div className={course.isNew ? 'course course-new' : 'course'}>
      {course.isNew && <span className="course-ribbon">New</span>}
      <div className="head">
        <div className="level">{course.level}</div>
        <h3>{course.topLabel}</h3>
      </div>
      <div className="body">
        <div className="meta">
          <span>{course.lessons}</span>
          <span>{course.level}</span>
        </div>
        <h4>{course.title}</h4>
        <p>{course.description}</p>
        <a href={course.href} target="_blank" rel="noopener noreferrer">
          View Course →
        </a>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          title="Featured Courses"
          lede="Structured online learning in Indian Knowledge Systems, Sanskrit and scriptural studies through IKS-LMS."
        />

        <section id="courses" className="courses-page">
          <div className="wrap">
            <div className="section-head reveal" id="live-courses">
              <div className="kicker">Part 1</div>
              <h2>Live Courses</h2>
              <p>Scheduled online classes taught live by teachers.</p>
            </div>

            {/* Bhāgavatam As It Is: one series heading over its Skandha courses */}
            <div className="course-series" id="bhagavatam">
              <div className="section-head reveal">
                <div className="kicker">Course series</div>
                <h2>{bhagavatamSeries.title}</h2>
                <p>{bhagavatamSeries.intro}</p>
              </div>
              <div className="course-grid stagger">
                {bhagavatamSeries.courses.map((course) => (
                  <CourseCard course={course} key={course.title} />
                ))}
              </div>
            </div>

            <div className="course-group" id="self-paced-courses">
              <div className="section-head reveal">
                <div className="kicker">Part 2</div>
                <h2>Self-paced Courses</h2>
                <p>Recorded lessons, readings and assessments you can work through at your own pace.</p>
              </div>
              <div className="course-grid stagger">
                {courses.map((course) => (
                  <CourseCard course={course} key={course.title} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            {courseDetails.map((row) => (
              <DetailRow key={row.title} {...row} />
            ))}
          </div>
        </section>

        <section className="detail" id="bhagavatam-details">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">Course series</div>
              <h2>{bhagavatamSeries.title}</h2>
            </div>
            {bhagavatamDetails.map((row) => (
              <DetailRow key={row.title} {...row} />
            ))}
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">HOW IT WORKS</div>
              <h2>Learning on Pravacana</h2>
            </div>
            <Steps items={learningSteps} />
          </div>
        </section>

        <section className="detail" id="course-includes">
          <div className="wrap">
            <div className="section-head reveal">
              <h2>What Every Course Includes</h2>
              <p>Each course follows the same structure, so you always know what to expect.</p>
            </div>
            <Steps items={courseIncludes} />
          </div>
        </section>

        <section className="detail" id="course-faq">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="section-head reveal">
              <div className="kicker">Questions</div>
              <h2>Before You Enrol</h2>
            </div>
            <div className="sn-faq reveal">
              {courseFaq.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Start learning"
          text="Browse the full catalogue on IKS-LMS."
          action={{ to: LMS_URL, label: 'Go to IKS-LMS →' }}
        />
      </main>
      <Footer />
      <DonateModal />
      <WhatsAppFloat />
    </>
  );
}
