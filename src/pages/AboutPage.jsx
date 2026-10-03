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
  { title: 'Preservation', text: 'Safeguarding texts, manuscripts and oral traditions.' },
  { title: 'Authenticity', text: 'Grounding every resource in primary sources.' },
  { title: 'Access', text: 'Making learning open to students everywhere.' },
  { title: 'Service', text: 'Working in service of dharma, education and research.' },
];

export default function AboutPage() {
  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero
          title="About Śāstranidhi"
          lede="Preserving śāstra, enabling research and inspiring learning."
        />

        <section className="detail">
          <div className="wrap">
            <DetailRow
              kicker="Who we are"
              title="Preserving Śāstra. Enabling Research. Inspiring Learning."
              paragraphs={[
                'Sastranidhi is dedicated to the study, preservation and dissemination of India’s scriptural and knowledge traditions. Through research repositories, educational programs, publications, technology platforms and scholar collaboration, the institution makes authentic learning accessible to present and future generations.',
              ]}
              card={{
                dark: true,
                title: 'Our Guiding Vision',
                items: [
                  'To create a trusted and accessible digital ecosystem where traditional scholarship and modern technology work together in service of dharma, education and research.',
                ],
              }}
            />
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">WHAT GUIDES US</div>
              <h2>Our Values</h2>
            </div>
            <Steps items={values} />
          </div>
        </section>

        <section className="detail">
          <div className="wrap">
            <DetailRow
              kicker="What we do"
              title="One ecosystem, many doors"
              paragraphs={[
                'Śāstranidhi’s work is organised through its institutes and initiatives, so that research, teaching and digital access reinforce one another.',
              ]}
              ticks={[
                'Institutes for research, language and digital preservation',
                'Platforms for reading, analysis and inquiry',
                'Courses through IKS-LMS',
              ]}
              action={{ to: '/institutes', label: 'Meet our institutes →' }}
              card={{
                title: 'Explore',
                items: ['Institutes', 'Initiatives', 'Courses', 'Research'],
              }}
            />
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
