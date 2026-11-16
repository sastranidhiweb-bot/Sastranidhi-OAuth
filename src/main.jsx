import React from 'react';
import ReactDOM from 'react-dom/client';
// Global CSS order is set here. Components still import their own files;
// Vite dedupes them, so each stylesheet loads at its first position below.
import './styles/base.css';   // legacy tokens used by auth.css; palette remap deferred to auth.css
import './styles/header.css';
import './styles/hero.css';
import './styles/initiatives.css';
import './styles/stats.css';
import './styles/about.css';
import './styles/courses.css';
import './styles/research.css';
import './styles/donate-band.css';
import './styles/footer.css';
import './styles/new-design.css';
import './styles/bubbles.css';
import './styles/pages.css';
import './styles/contact-page.css';
import './styles/salesiq-theme.css'; // Zoho SalesIQ chat launcher, in the site's colours
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/auth.css';
import { themeSalesIQ } from './utils/salesiqTheme.js';

// Zoho SalesIQ chat window (an iframe Zoho creates), in the site's colours
themeSalesIQ();

// Routing (including the auth pages and /oauth-test) is handled by
// React Router in App.jsx.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
