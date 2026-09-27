import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import {
  PageHero,
  DetailRow,
  Steps,
  CtaBand,
} from '../components/PageSections/PageSections.jsx';
import { courses } from '../data/siteData.js';
// Course cards reuse the homepage card styles, which are scoped to #courses.
import '../styles/courses.css';
import '../styles/pages.css';

const LMS_URL = 'https://sastranidhi.edmingle.com/';

const courseDetails = [
  {
    kicker: 'Beginner · 12 Lessons',
    title: 'Indian Philosophy Foundations',
    paragraphs: [
      'An introduction to the major darśanas, the questions each one asks and the terms used to discuss them.',
    ],
    ticks: [
      'The six āstika darśanas and their founders',
      'Key concepts: pramāṇa, ātman, mokṣa',
      'How to read a philosophical text',
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      title: 'You will be able to',
      items: [
        'Explain the main positions of each darśana',
        'Use core terminology accurately',
        'Continue to text-based study',
      ],
    },
  },
  {
    kicker: 'Intermediate · 18 Lessons',
    title: 'Bhagavad-gītā: Text and Meaning',
    paragraphs: [
      'A structured study of selected verses with traditional explanations, read alongside the principal commentaries.',
    ],
    ticks: [
      'Context of the Gītā within the Mahābhārata',
      'Karma, jñāna and bhakti in selected chapters',
      'Comparing commentarial readings',
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      dark: true,
      title: 'You will be able to',
      items: [
        'Read selected verses with meaning',
        'Follow commentarial arguments',
        'Relate teachings to their textual context',
      ],
    },
  },
  {
    kicker: 'Beginner · 20 Lessons',
    title: 'Reading Sanskrit Scriptures',
    paragraphs: [
      'Build the skills required to read simple Sanskrit verses and terminology, starting from the script.',
    ],
    ticks: [
      'Devanāgarī and pronunciation',
      'Basic nouns, verbs and sandhi',
      'Reading short verses with a glossary',
    ],
    action: { to: LMS_URL, label: 'Enrol →' },
    card: {
      title: 'You will be able to',
      items: [
        'Read Devanāgarī confidently',
        'Parse simple verses',
        'Recognise common śāstric terms',
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

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumb="Courses"
          title="Featured Courses"
          lede="Structured online learning in Indian Knowledge Systems, Sanskrit and scriptural studies through IKS-LMS."
        />

        <section id="courses" className="courses-page">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">IKS-LMS</div>
              <h2>Current Courses</h2>
              <p>Each course combines recorded lessons, readings and assessments.</p>
            </div>
            <div className="course-grid stagger">
              {courses.map((course) => (
                <div className="course" key={course.title}>
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
              ))}
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

        <section className="detail">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">HOW IT WORKS</div>
              <h2>Learning on IKS-LMS</h2>
            </div>
            <Steps items={learningSteps} />
          </div>
        </section>

        <CtaBand
          title="Start learning"
          text="Browse the full catalogue on IKS-LMS."
          action={{ to: LMS_URL, label: 'Go to IKS-LMS →' }}
        />
      </main>
      <Footer />
    </>
  );
}
