import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext.jsx';
import DonateModal from './components/Modals/DonateModal.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import InstitutesPage from './pages/InstitutesPage.jsx';
import InitiativesPage from './pages/InitiativesPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import ResearchPage from './pages/ResearchPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupWizard from './pages/SignupWizard.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import OAuthTestPage from './pages/OAuthTestPage.jsx';

// Page-level effects live inside the router so they can re-run whenever the
// route changes, not only on the first load.
function AppRoutes() {
  const { pathname, hash } = useLocation();

  // Scroll to hash section (e.g., when arriving from /#platforms); otherwise
  // start each newly routed page at the top, as a full page load would.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const id = hash.replace('#', '');
    const timer = setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  useEffect(() => {
    const selector = [
      '.reveal',
      '.stagger',
      '.section-head',
      '.tablet',
      '.course',
      '.research-item',
      '.vision-card',
    ].join(', ');

    const revealTargets = document.querySelectorAll(selector);

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/institutes" element={<InstitutesPage />} />
      <Route path="/initiatives" element={<InitiativesPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupWizard />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* Dev-only PKCE harness, previously routed in main.jsx */}
      <Route path="/oauth-test" element={<OAuthTestPage />} />
      {/* Unknown paths fall back to the homepage, as before */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <AppRoutes />
        {/* Rendered once so the header's Donate button works on every route */}
        <DonateModal />
      </BrowserRouter>
    </ModalProvider>
  );
}
