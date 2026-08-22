import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import OAuthTestPage from './pages/OAuthTestPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupWizard from './pages/SignupWizard.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/auth.css';

// Minimal manual routing (no router dependency added just for this — the
// route set is small and fixed). /oauth-test is the existing dev-only PKCE
// harness; the rest are the new branded auth pages that /oauth/authorize
// on the backend now redirects to when a request is unauthenticated.
const ROUTES = {
  '/oauth-test': OAuthTestPage,
  '/login': LoginPage,
  '/signup': SignupWizard,
  '/forgot-password': ForgotPasswordPage,
  '/reset-password': ResetPasswordPage,
};

const PageComponent = ROUTES[window.location.pathname];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {PageComponent ? <PageComponent /> : <App />}
    </AuthProvider>
  </React.StrictMode>
);
