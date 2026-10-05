import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import { PageHero, TickList } from '../components/PageSections/PageSections.jsx';
import { collaborationAreas, collaboratorTypes } from '../data/collaborateData.js';
import '../styles/pages.css';
import '../styles/contact-page.css';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  designation: '',
  type: '',
  area: '',
  website: '',
  location: '',
  message: '',
};

// Same layout and FormSubmit flow as InternshipPage.
export default function CollaborateApplyPage() {
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
      data.append('organisation', formData.organisation);
      data.append('designation', formData.designation);
      data.append('collaborator_type', formData.type);
      data.append('area_of_collaboration', formData.area);
      data.append('website', formData.website);
      data.append('city_country', formData.location);
      data.append('proposal', formData.message);
      data.append('_subject', 'New Collaboration Enquiry');
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
      showToast('Thank you. We will review your proposal and get in touch.');
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
        <PageHero title="Collaborate with Us" />

        <section className="contact-section">
          <div className="wrap">
            <div className="contact-shell internship-shell">
              <div className="contact-intro internship-intro reveal">
                <h2>Partner with Śāstranidhi</h2>
                <p className="contact-lede">
                  Institutions, scholars, and organisations who share our commitment to preserving,
                  studying, teaching, and advancing Indian Knowledge Systems are welcome to propose a
                  collaboration.
                </p>
                <p className="contact-lede">
                  Tell us about yourself or your institution and the area you would like to work on.
                  See all <Link className="collab-inline-link" to="/collaborate#areas">areas of collaboration</Link>.
                </p>

                <h3>What to include</h3>
                <TickList
                  items={[
                    'Who you are: your institution, organisation, or area of expertise.',
                    'The area of collaboration you are interested in.',
                    'A brief outline of the proposed project or initiative.',
                    'Any timelines, resources, or support you have in mind.',
                  ]}
                />

                <h3>How it works</h3>
                <TickList
                  items={[
                    'Submit the form on this page.',
                    'Our team reviews your proposal.',
                    'We get in touch to discuss the collaboration and next steps.',
                  ]}
                />
              </div>

              <div className="contact-form-card reveal">
                <div className="form-glow"></div>
                <h3>Collaboration enquiry</h3>
                <p>Fields marked * are required.</p>

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
                        autoComplete="name"
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
                      <label htmlFor="c-phone">
                        Phone number <i>*</i>
                      </label>
                      <input
                        id="c-phone"
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
                      <label htmlFor="c-organisation">Institution / organisation</label>
                      <input
                        id="c-organisation"
                        type="text"
                        name="organisation"
                        autoComplete="organization"
                        placeholder="Optional for individuals"
                        value={formData.organisation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="c-designation">Your role / designation</label>
                      <input
                        id="c-designation"
                        type="text"
                        name="designation"
                        autoComplete="organization-title"
                        placeholder="e.g. Professor, Director"
                        value={formData.designation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="c-location">City / country</label>
                      <input
                        id="c-location"
                        type="text"
                        name="location"
                        placeholder="e.g. Hyderabad, India"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="c-type">
                        You are a… <i>*</i>
                      </label>
                      <select
                        id="c-type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select one
                        </option>
                        {collaboratorTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="c-area">
                        Area of collaboration <i>*</i>
                      </label>
                      <select
                        id="c-area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select an area
                        </option>
                        {collaborationAreas.map((area) => (
                          <option key={area.title}>{area.title}</option>
                        ))}
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="c-website">Website / profile link</label>
                    <input
                      id="c-website"
                      type="url"
                      name="website"
                      placeholder="https://"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="c-message">
                      Your collaboration proposal <i>*</i>
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      placeholder="Briefly describe the project or initiative you have in mind..."
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
                    <span className="btn-label">➤ Submit Proposal</span>
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
