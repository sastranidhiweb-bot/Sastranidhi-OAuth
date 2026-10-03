import { useState } from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, TickList } from '../components/PageSections/PageSections.jsx';
import '../styles/pages.css';
import '../styles/contact-page.css';

const YEARS = ['1st year', '2nd year', '3rd year', '4th year', 'Graduated', 'Other'];

const AREAS = [
  'Research and textual study',
  'Sanskrit translation and transcription',
  'Content writing and editorial work',
  'Web development and design',
  'Social media and outreach',
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  college: '',
  year: '',
  area: '',
  portfolio: '',
  message: '',
};

export default function InternshipPage() {
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

  // Same submission flow as ContactPage (FormSubmit AJAX endpoint).
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
      data.append('college', formData.college);
      data.append('year_of_study', formData.year);
      data.append('area_of_interest', formData.area);
      data.append('portfolio', formData.portfolio);
      data.append('why_intern', formData.message);
      data.append('_subject', 'New Internship Application');
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
      showToast('Application submitted. We will review it and get back to you.');
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
        <PageHero title="Internship" />

        <section className="contact-section">
          <div className="wrap">
            <div className="contact-shell internship-shell">
              <div className="contact-intro internship-intro reveal">
                <h2>Internship at Śāstranidhi</h2>
                <p className="contact-lede">
                  Śāstranidhi welcomes students and recent graduates who wish to contribute to the
                  study, preservation, and dissemination of Indian Knowledge Systems.
                </p>
                <p className="contact-lede">
                  An internship at Śāstranidhi is an opportunity to work alongside our research,
                  editorial, and technology teams on real projects — from digitisation of texts and
                  editorial work to Sanskrit transcription, content writing, web development, design,
                  and community outreach.
                </p>
                <p className="contact-lede">
                  We accept interns on a rolling basis. Internships are typically remote and can be
                  part-time or full-time depending on the project and your availability.
                </p>

                <h3>Who can apply</h3>
                <TickList
                  items={[
                    'Students currently enrolled in a Bachelor’s or Master’s programme.',
                    'Recent graduates within one year of completing their degree.',
                    'Anyone with a demonstrated interest in Sanskrit, Indian Knowledge Systems, digital humanities, education, or related fields.',
                  ]}
                />

                <h3>Areas you can apply for</h3>
                <TickList items={AREAS} />

                <h3>How it works</h3>
                <TickList
                  items={[
                    'Submit the form on this page.',
                    'We review your application and respond within two weeks if there is a suitable opening.',
                    'Shortlisted candidates may be invited for a brief online interview.',
                    'Internships are unpaid unless otherwise stated, but selected interns receive a certificate of completion and, where relevant, a letter of recommendation.',
                  ]}
                />
              </div>

              <div className="contact-form-card reveal">
                <div className="form-glow"></div>
                <h3>Apply for an internship</h3>
                <p>Fields marked * are required.</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="i-name">
                        Full name <i>*</i>
                      </label>
                      <input
                        id="i-name"
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
                      <label htmlFor="i-email">
                        Email address <i>*</i>
                      </label>
                      <input
                        id="i-email"
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
                      <label htmlFor="i-phone">
                        Phone number <i>*</i>
                      </label>
                      <input
                        id="i-phone"
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
                      <label htmlFor="i-college">
                        College / University <i>*</i>
                      </label>
                      <input
                        id="i-college"
                        type="text"
                        name="college"
                        placeholder="Your college or university"
                        value={formData.college}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="i-year">
                        Current year of study <i>*</i>
                      </label>
                      <select
                        id="i-year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select your year
                        </option>
                        {YEARS.map((year) => (
                          <option key={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="i-area">
                        Area of interest <i>*</i>
                      </label>
                      <select
                        id="i-area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select an area
                        </option>
                        {AREAS.map((area) => (
                          <option key={area}>{area}</option>
                        ))}
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="i-portfolio">Link to portfolio / LinkedIn / resume</label>
                    <input
                      id="i-portfolio"
                      type="url"
                      name="portfolio"
                      placeholder="https://"
                      value={formData.portfolio}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="i-message">
                      Why do you want to intern with Śāstranidhi? <i>*</i>
                    </label>
                    <textarea
                      id="i-message"
                      name="message"
                      placeholder="Tell us about your interest and what you would like to work on..."
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
                    <span className="btn-label">➤ Submit Application</span>
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
