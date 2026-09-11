import { ModalProvider } from './context/ModalContext.jsx';

import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Stats from './components/Stats/Stats.jsx';
import About from './components/About/About.jsx';
import Courses from './components/Courses/Courses.jsx';
import Research from './components/Research/Research.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';

// Login and Signup modals commented out as requested
// import LoginModal from './components/Modals/LoginModal.jsx';
// import SignupModal from './components/Modals/SignupModal.jsx';
import DonateModal from './components/Modals/DonateModal.jsx';

// Global stylesheets — imported in the same order as the rules appeared
// in the original <style> block, so the cascade is identical.
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/initiatives.css';
import './styles/sections.css';
import './styles/stats.css';
import './styles/about.css';
import './styles/courses.css';
import './styles/research.css';
import './styles/contact.css';
import './styles/footer.css';
import './styles/modal.css';
import './styles/responsive.css';

export default function App() {
  return (
    <ModalProvider>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Courses />
        <Research />
        <Contact />
      </main>
      <Footer />

      {/* Login and Signup modals commented out as requested */}
      {/*
      <LoginModal />
      <SignupModal />
      */}
      <DonateModal />
    </ModalProvider>
  );
}