import { ModalProvider } from '../context/ModalContext.jsx';
import Header from '../components/Header/Header.jsx';
import Hero from '../components/Hero/Hero.jsx';
import Initiatives from '../components/Initiatives/Initiatives.jsx';
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
        <Header />
        <main>
          <Hero />
          <Initiatives />
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
        <div className="whatsapp-float">
          <span className="wa-tooltip">Follow us on WhatsApp</span>
          <a
            className="wa-btn"
            href="https://whatsapp.com/channel/0029VbDKfR53mFY1T0Lfdb1O"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Sastranidhi on WhatsApp"
          >
            <span className="wa-ring" />
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.687 4.523 1.872 6.356L4 29l7.84-1.83A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm6.98 16.937c-.297.836-1.474 1.53-2.412 1.73-.642.136-1.48.245-4.302-.924-3.614-1.497-5.94-5.16-6.122-5.398-.178-.238-1.462-1.947-1.462-3.714 0-1.767.926-2.636 1.254-2.998.328-.362.716-.452.955-.452.238 0 .478.003.686.014.22.011.516-.083.807.616.297.716 1.01 2.484 1.098 2.664.089.18.148.392.03.63-.12.238-.178.386-.357.594-.178.208-.375.464-.535.624-.178.178-.363.372-.156.73.208.357.923 1.522 1.98 2.465 1.36 1.213 2.507 1.588 2.865 1.766.357.178.565.15.773-.089.208-.238.892-1.04 1.13-1.397.238-.357.476-.297.803-.178.328.119 2.084.983 2.44 1.163.357.178.594.267.683.416.089.148.089.858-.208 1.694z" />
            </svg>
          </a>
        </div>
      </div>
    </ModalProvider>
  );
}
