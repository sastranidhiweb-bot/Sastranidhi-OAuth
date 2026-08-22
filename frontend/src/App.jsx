import { ModalProvider } from './context/ModalContext.jsx';

import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Stats from './components/Stats/Stats.jsx';
import About from './components/About/About.jsx';
import Courses from './components/Courses/Courses.jsx';
import Initiatives from './components/Initiatives/Initiatives.jsx';
import Research from './components/Research/Research.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';

import DonateModal from './components/Modals/DonateModal.jsx';
// LoginModal / SignupModal are retired — login and signup are now real
// pages (/login, /signup, see main.jsx), not modals, because
// /oauth/authorize needs somewhere it can actually redirect the browser
// TO. A modal only exists inside an already-loaded page; a fresh redirect
// from the backend has no page loaded yet to open one in.

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
      <Initiatives />
        <Stats />
        <About />
        <Courses />
        <Research />
        <Contact />
      </main>
      <Footer />

      <DonateModal />
    </ModalProvider>
  );
}
