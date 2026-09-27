import { useState, useEffect } from 'react';
import { ModalProvider } from '../context/ModalContext.jsx';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import '../styles/new-design.css';
import '../styles/contact-page.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Scroll reveal
    const revealTargets = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      revealTargets.forEach((el) => io.observe(el));
      return () => io.disconnect();
    } else {
      revealTargets.forEach((el) => el.classList.add('in'));
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3600);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    setStatus('loading');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('subject', formData.subject);
      data.append('message', formData.message);
      data.append('_subject', 'New message from Sastranidhi Contact page');
      data.append('_captcha', 'false');
      data.append('_template', 'table');
      data.append('_replyto', formData.email);

      const res = await fetch('https://formsubmit.co/ajax/noreply@sastranidhi.org', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (!res.ok) throw new Error('send failed');

      setStatus('success');
      showToast('Message sent successfully. We will get back to you within 1 business day.');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setStatus('idle'), 2600);
    } catch (err) {
      setStatus('error');
      showToast('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 2600);
    }
  };

  return (
    <ModalProvider>
      <div className="homepage">
        <SiteBubbles />
        <Header />
        <main>
          <section id="contact" className="contact-section">
            <div className="wrap">
              <div className="contact-shell">
                <div className="contact-intro reveal">
                  <div className="contact-badge">✦ CONNECT WITH ŚĀSTRANIDHI</div>
                  <h2>
                    Preserving <span>Śāstra.</span>
                    <br />
                    Enabling Research.
                  </h2>
                  <p className="contact-lede">
                    Have a question, research idea, course enquiry or collaboration proposal? Reach
                    out to the Śāstranidhi team. We usually respond within one business day.
                  </p>

                  <div className="contact-logo-card">
                    <div className="contact-logo-orbit">
                      <span className="orbit orbit-a"></span>
                      <span className="orbit orbit-b"></span>
                      <img src="/assets/logo-mark.png" alt="Śāstranidhi emblem" />
                    </div>
                    <div>
                      <strong>Śāstranidhi</strong>
                      <small>SVĀDHYĀYA · VIŚLEṢAKA · PARIPRAŚNA · PRAVACANA</small>
                    </div>
                  </div>

                  <div className="contact-info-list">
                    <a className="contact-info" href="mailto:noreply@sastranidhi.org">
                      <span className="ci-icon">✉</span>
                      <span>
                        <small>Email us</small>
                        <strong>noreply@sastranidhi.org</strong>
                      </span>
                    </a>
                    <div className="contact-info">
                      <span className="ci-icon">⏱</span>
                      <span>
                        <small>Response time</small>
                        <strong>Usually within 1 business day</strong>
                      </span>
                    </div>
                    <div className="contact-info">
                      <span className="ci-icon">◎</span>
                      <span>
                        <small>Connect</small>
                        <strong>Instagram · YouTube · WhatsApp</strong>
                      </span>
                    </div>
                    <div className="contact-info">
                      <span className="ci-icon">⌖</span>
                      <span>
                        <small>Location</small>
                        <strong>Hyderabad, India</strong>
                      </span>
                    </div>
                  </div>
                  <div className="contact-signature">✦ Preserving knowledge, together.</div>
                </div>

                <div className="contact-form-card reveal">
                  <div className="form-glow"></div>
                  <div className="form-topline">
                    <span>PARIPRAŚNA</span>
                    <span>ASK · EXPLORE · CONNECT</span>
                  </div>
                  <h3>Send us a message</h3>
                  <p>
                    Tell us how we can help. Your message will be sent securely to our Sastranidhi
                    inbox.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="field-row">
                      <div className="field">
                        <label htmlFor="c-name">
                          Full name <i>*</i>
                        </label>
                        <input
                          id="c-name"
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="c-email">
                          Email address <i>*</i>
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="c-subject">
                        Subject <i>*</i>
                      </label>
                      <select
                        id="c-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        <option>General Inquiry</option>
                        <option>Courses & Discourses</option>
                        <option>Research Collaboration</option>
                        <option>Technical Support</option>
                        <option>Donation / Support</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="c-message">
                        Message <i>*</i>
                      </label>
                      <textarea
                        id="c-message"
                        name="message"
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`contact-submit ${
                        status === 'loading' ? 'is-loading' : ''
                      } ${status === 'success' ? 'is-success' : ''} ${
                        status === 'error' ? 'is-error' : ''
                      }`}
                      disabled={status === 'loading'}
                    >
                      <span className="btn-label">➤ Send message</span>
                      <span className="btn-spin">
                        <span className="spin-ring"></span>
                      </span>
                      <span className="btn-check">✓</span>
                    </button>
                  </form>
                  <div className="form-note">
                    By contacting us, you agree that we may use your submitted details to respond to
                    your enquiry.
                  </div>
                </div>
              </div>
            </div>

            {toastMessage && <div className="contact-toast show">{toastMessage}</div>}
          </section>
        </main>
        <Footer />
        <DonateModal />
        <WhatsAppFloat />
      </div>
    </ModalProvider>
  );
}