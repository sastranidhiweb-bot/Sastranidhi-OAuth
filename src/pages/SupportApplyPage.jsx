import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import { PageHero, TickList } from '../components/PageSections/PageSections.jsx';
import { supportWays } from '../data/supportData.js';
import '../styles/pages.css';
import '../styles/contact-page.css';

const CONTRIBUTION_TYPES = [
  'Financial contribution',
  'Time and skills (volunteering)',
  'Books, resources, or materials',
  'Sponsorship (students, courses, projects)',
  'Other',
];

// Dropdown option text for a way, e.g. "Śāstra-Dāna — Donate Śāstra."
const wayLabel = (way) => `${way.title} — ${way.tagline}`;

const emptyForm = (way = '') => ({
  name: '',
  email: '',
  phone: '',
  organisation: '',
  location: '',
  way,
  contribution: '',
  amount: '',
  message: '',
});

// Same layout and FormSubmit flow as InternshipPage / CollaborateApplyPage.
export default function SupportApplyPage() {
  const [searchParams] = useSearchParams();
  // "Support this →" on /support links here with ?way=<slug> to preselect it.
  const preselected = supportWays.find((w) => w.slug === searchParams.get('way'));
  const [formData, setFormData] = useState(() => emptyForm(preselected ? wayLabel(preselected) : ''));
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
      data.append('organisation', formData.organisation);
      data.append('city_country', formData.location);
      data.append('way_of_support', formData.way);
      data.append('type_of_contribution', formData.contribution);
      data.append('approximate_amount', formData.amount);
      data.append('message', formData.message);
      data.append('_subject', 'New Support Enquiry');
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
      showToast('Thank you for your support. Our team will get in touch with you.');
      setFormData(emptyForm());

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
        <PageHero title="Support Śāstranidhi" />

        <section className="contact-section">
          <div className="wrap">
            <div className="contact-shell internship-shell">
              <div className="contact-intro internship-intro reveal">
                <h2>Be a Part of the Tradition</h2>
                <p className="contact-lede">
                  Become a part of preserving and transmitting Śāstra and Bhāratīya Jñāna Paramparā
                  for future generations.
                </p>
                <p className="contact-lede">
                  Choose how you would like to support, and our team will get in touch with the next
                  steps. See all{' '}
                  <Link className="collab-inline-link" to="/support#ways">
                    ways to support
                  </Link>
                  .
                </p>

                <h3>Ways to support</h3>
                <TickList items={supportWays.map(wayLabel)} />

                <h3>How it works</h3>
                <TickList
                  items={[
                    'Submit the form on this page.',
                    'Our team reviews your request.',
                    'We get in touch to discuss how your support can be put to use.',
                  ]}
                />
              </div>

              <div className="contact-form-card reveal">
                <div className="form-glow"></div>
                <h3>Support enquiry</h3>
                <p>Fields marked * are required.</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="s-name">
                        Full name <i>*</i>
                      </label>
                      <input
                        id="s-name"
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
                      <label htmlFor="s-email">
                        Email address <i>*</i>
                      </label>
                      <input
                        id="s-email"
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
                      <label htmlFor="s-phone">
                        Phone number <i>*</i>
                      </label>
                      <input
                        id="s-phone"
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
                      <label htmlFor="s-location">City / country</label>
                      <input
                        id="s-location"
                        type="text"
                        name="location"
                        placeholder="e.g. Hyderabad, India"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="s-organisation">Organisation (if supporting on behalf of one)</label>
                    <input
                      id="s-organisation"
                      type="text"
                      name="organisation"
                      autoComplete="organization"
                      placeholder="Optional"
                      value={formData.organisation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="s-way">
                      How would you like to support? <i>*</i>
                    </label>
                    <select
                      id="s-way"
                      name="way"
                      value={formData.way}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a way to support
                      </option>
                      {supportWays.map((way) => (
                        <option key={way.slug}>{wayLabel(way)}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="s-contribution">
                        Type of contribution <i>*</i>
                      </label>
                      <select
                        id="s-contribution"
                        name="contribution"
                        value={formData.contribution}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select one
                        </option>
                        {CONTRIBUTION_TYPES.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="s-amount">Approximate amount (₹)</label>
                      <input
                        id="s-amount"
                        type="number"
                        name="amount"
                        min="1"
                        placeholder="Optional"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="s-message">
                      Tell us more <i>*</i>
                    </label>
                    <textarea
                      id="s-message"
                      name="message"
                      placeholder="How you would like to help, any specific project, skills you can offer..."
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
                    <span className="btn-label">➤ Submit</span>
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
      <WhatsAppFloat />
    </>
  );
}
