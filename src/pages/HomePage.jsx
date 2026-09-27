import { ModalProvider } from '../context/ModalContext.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import Header from '../components/Header/Header.jsx';
import Hero from '../components/Hero/Hero.jsx';
import Initiatives from '../components/Initiatives/Initiatives.jsx';
import InitiativesList from '../components/Initiatives/InitiativesList.jsx';
import Stats from '../components/Stats/Stats.jsx';
import About from '../components/About/About.jsx';
import Courses from '../components/Courses/Courses.jsx';
import Research from '../components/Research/Research.jsx';
import SubscribeSection from '../components/Subscribe/SubscribeSection.jsx';
import DonateBand from '../components/DonateBand/DonateBand.jsx';
// import Contact from '../components/Contact/Contact.jsx';
import Footer from '../components/Footer/Footer.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';

// Imported after the component stylesheets so it keeps the same cascade
// position it had when it lived in App.jsx.
import '../styles/new-design.css';

export default function HomePage() {
  return (
    <ModalProvider>
      <div className="homepage">
        <SiteBubbles />
        <Header />
        <main>
          <Hero />
          <Initiatives />
          <InitiativesList />
          <Stats />
          <Courses />
          <Research />
          <About />
          <DonateBand />
          <SubscribeSection />
          {/* <Contact /> */}
        </main>
        <Footer />
        <DonateModal />
        <WhatsAppFloat />
      </div>
    </ModalProvider>
  );
}
