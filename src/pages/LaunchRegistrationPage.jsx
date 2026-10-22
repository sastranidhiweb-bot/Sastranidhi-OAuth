import { useState } from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, TickList } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';
import '../styles/contact-page.css';

const ROLES = ['Student', 'Scholar / Teacher', 'Researcher', 'Institution representative', 'Well-wisher', 'Other'];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  city: '',
  role: '',
  organisation: '',
  message: '',
};

// Registration for the platform launch (27 December 2026, see EventsPage.jsx).
// Layout and submission flow follow InternshipPage (FormSubmit AJAX endpoint).
export default function LaunchRegistrationPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toastMessage, setToastMessage] = useState('');

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
      data.append('phone', formData.phone);
      data.append('city_country', formData.city);
      data.append('i_am_a', formData.role);
      data.append('organisation', formData.organisation);
      data.append('message', formData.message);
      data.append('_subject', 'New Registration: Śāstra Nidhi Launch');
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
      showToast('You are registered. We will send launch details to your email.');
      setFormData(EMPTY_FORM);

      setTimeout(() => setStatus('idle'), 2600);
    } catch (err) {
      setStatus('error');
      showToast('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 2600);
    }
  };

  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero title="Launch Registration" />

        <section className="contact-section">
          <div className="wrap">
            <div className="contact-shell internship-shell">
              <div className="contact-intro internship-intro reveal">
                <h2>Register for the Śāstra Nidhi Launch</h2>
                <p className="contact-lede">
                  The <strong>Śāstra Nidhi Digital Platform</strong> will be formally launched on{' '}
                  <strong>27 December 2026</strong>.
                </p>
                <p className="contact-lede">
                  The platform brings together Svādhyāya, Viśleṣaka, Paripraśna and Pravacana, one
                  place to study, analyse, inquire and learn India’s knowledge traditions.
                </p>

                <h3>Why register</h3>
                <TickList
                  items={[
                    'Receive the launch programme and joining details by email.',
                    'Hear first when each platform opens.',
                    'Stay in touch with Śāstra Nidhi’s programmes and events.',
                  ]}
                />
              </div>

              <div className="contact-form-card reveal">
                <div className="form-glow"></div>
                <h3>Register for the launch</h3>
                <p>Fields marked * are required.</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="r-name">
                        Full name <i>*</i>
                      </label>
                      <input
                        id="r-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="r-email">
                        Email address <i>*</i>
                      </label>
                      <input
                        id="r-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="r-phone">
                        Phone number <i>*</i>
                      </label>
                      <input
                        id="r-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="r-city">
                        City / Country <i>*</i>
                      </label>
                      <input
                        id="r-city"
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        placeholder="e.g. Bengaluru, India"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="r-role">
                        I am a <i>*</i>
                      </label>
                      <select
                        id="r-role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select one
                        </option>
                        {ROLES.map((role) => (
                          <option key={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="r-org">Institution / Organisation</label>
                      <input
                        id="r-org"
                        type="text"
                        name="organisation"
                        autoComplete="organization"
                        placeholder="Optional"
                        value={formData.organisation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="r-message">Anything you would like to tell us?</label>
                    <textarea
                      id="r-message"
                      name="message"
                      placeholder="Optional"
                      value={formData.message}
                      onChange={handleChange}
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
                    <span className="btn-label">➤ Register</span>
                    <span className="btn-spin">
                      <span className="spin-ring"></span>
                    </span>
                    <span className="btn-check">✓</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {toastMessage && <div className="contact-toast show">{toastMessage}</div>}
        </section>
      </main>
      <Footer />
      <DonateModal />
      <WhatsAppFloat />
    </>
  );
}
