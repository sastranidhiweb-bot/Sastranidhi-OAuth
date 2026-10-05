import { Fragment } from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, DetailRow, ActionLink } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';

// Featured book shown at the top of the Publications row.
function BookCard() {
  return (
    <article className="book-card">
      <div className="book-card-label">Featured publication</div>
      <h3 className="book-card-title">Gītā in a nutshell</h3>
      <p className="book-card-subtitle">A Summary Study of Bhagavad-gītā</p>
      <p className="book-card-author">Kollimarla Mādhava Śarma</p>
      <p className="book-card-text">
        A concise, structured summary study of the Bhagavad-gītā — presenting the essential teachings of
        each chapter with clear explanations, helping both new readers and students of the Gītā grasp the
        text’s central message.
      </p>
      <p className="book-card-meta">
        Publisher: Śāstranidhi · Language: English · ISBN 978-81-95394-0-4
        <br />
        Printed in India (Hyderabad)
      </p>
      <ActionLink to="https://www.amazon.in/PLACEHOLDER">Buy now</ActionLink>
    </article>
  );
}

const praise = [
  {
    name: 'H.H. Bhakti Swami Mahārāja',
    role: 'Gītā ISKCON GBC',
    quote:
      'This is a clear analysis of the structure and flow of the Bhagavad-gītā. Generally, if we go for the Bhagavad-gītā we may get lost in the different verses and may not look at the verses as a structured whole. This book clearly explains the structure behind Krishna’s teaching and the different topics and chapters. It is a very good addition to our study of the Bhagavad-gītā.',
  },
  {
    name: 'H.G. Śubha Vilāsa Prabhu',
    role: 'Author, Motivational Speaker, Leadership Professor',
    quote:
      'Gītā in a nutshell is one of the most concise yet deep expositions of the Bhagavad-gītā. I have read Madhava Śarma’s heart into the study of the Gītā, and the result is just so amazingly practical and, yet, intriguingly thought-provoking.',
  },
  {
    name: 'H.G. Rādhāśyāma Prabhu',
    role: 'Temple President, ISKCON NVCC',
    quote:
      'I have seen many overview books of the Bhagavad-gītā that make it easier to grasp. This is the easiest thing I have seen.',
  },
  {
    name: 'Dr. Lakshmidhar Behera',
    role: 'Professor, IIT Kharagpur',
    quote:
      'This is a lucid presentation of the Bhagavad-gītā — a pocket dictionary that will be helpful for both readers and students of this great sacred book. Mr. Madhava Śarma has used his rich spiritual experience skilfully to present Lord Krishna’s instructions as nectar of contentment for all kinds of readers.',
  },
  {
    name: 'Late Mr. Lax Gopisetty',
    role: 'Ex CEO, Infosys Ltd.',
    quote:
      'This book brings the essence of the Bhagavad-gītā in a simple, pragmatic, structured flow across all chapters in a summarised format — a very good companion for early-stage learners. Excellent work by Madhava Śarma.',
  },
  {
    name: 'Mr. Suryaprakash Sastry',
    role: 'Vice President, HCL',
    quote:
      'This is a great attempt. The book is a unique and innovative attempt to detail the concepts of the Bhagavad-gītā through diagrams, flows, and mind maps — it will be of immense help for the young generation beginning their study of the Bhagavad-gītā. Excellent work done by Madhava.',
  },
];

// "Critics' Praise" block, placed right after the Publications row.
function PraiseSection() {
  return (
    <div className="praise">
      <div className="section-head reveal">
        <div className="kicker">Critics’ praise</div>
        <h2>What scholars and leaders say about Gītā in a nutshell</h2>
        <p>Endorsements from scholars, practitioners, and industry leaders who have read the book.</p>
      </div>
      <div className="praise-grid stagger">
        {praise.map((item) => (
          <figure className="praise-card" key={item.name}>
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>
              {item.name} — {item.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

const researchAreas = [
  {
    title: 'Publications',
    feature: <BookCard />,
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
    id: 'events',
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
    id: 'scholars',
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
          title="Research & Publications"
          lede="Authentic sources with digital access: projects, publications, events and the scholars behind them."
        />

        {/* research-page scopes the purple info-card treatment (research.css) to this page */}
        <section className="detail research-page">
          <div className="wrap">
            {researchAreas.map((row) => (
              <Fragment key={row.title}>
                <DetailRow {...row} />
                {row.title === 'Publications' && <PraiseSection />}
              </Fragment>
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
