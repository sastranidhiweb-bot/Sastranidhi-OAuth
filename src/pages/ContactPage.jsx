import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import '../styles/new-design.css';
import '../styles/contact-page.css';

// Zoho CRM Web-to-Lead form (supplied by the CRM team). Field names and
// hidden token values must match the form configured in Zoho CRM.
const ZOHO_FORM_ID = '1449582000000575031';
const ZOHO_ACTION = 'https://crm.zoho.in/crm/WebToLeadForm';
const ZOHO_ANALYTICS_SRC =
  'https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=4625314ad58d7303d4821a3304ba3785d4c85698237aee30f0c44a473b64e1f243c7472329e242426691a0322532b259gid5619463566f6cee7dbec3644d97191946cf218019790698776d8952551744997gid654483cb8792b4cff86283e5ce0cd62f92cb07e771bf9a1539673f7a4670c4e2gid8849b9b587343d7ef0d35018a7e311c8408d9316583bfa8472c9744647eb090c&tw=770e499c86f862e2b5fba01ace3a0725d2a33fb54fce2a73d0c4ccf38c7ab322&version=v2';
const ZOHO_FRAME = 'zoho-crm-submit-frame';

const SUBJECTS = [
  ['General Enquiry', 'General Enquiry'],
  ['Courses and Discourses', 'Courses and Discourses'],
  ['Research and Collaboration', 'Research and Collaboration'],
  ['Technical Support', 'Technical Support'],
  ['Donation/ Support', 'Donation / Support'],
];

const AREAS = [
  'Courses / Learning',
  'Volunteering',
  'Donations',
  'General Enquiry',
  'Research / Collaboration',
  'Other',
];

const EMPTY_FORM = { name: '', email: '', mobile: '', subject: '', area: '', message: '' };

const REQUIRED_FIELDS = [
  ['name', 'Name'],
  ['email', 'Email address'],
  ['mobile', 'Mobile'],
  ['subject', 'Subject'],
  ['area', 'Area of Interest'],
  ['message', 'Message'],
];

export default function ContactPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toastMessage, setToastMessage] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const [formError, setFormError] = useState('');
  const [isSmartUrl] = useState(
    () => new URLSearchParams(window.location.search).get('service') === 'smarturl'
  );
  const formRef = useRef(null);
  const submittingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Zoho web-form analytics: must load after the form is in the DOM.
    window._wfa_fstprtcken = window._wfa_fstprtcken || {};
    window._wfa_fstprtcken[ZOHO_FORM_ID] = true;

    const script = document.createElement('script');
    script.id = 'wf_anal';
    script.src = ZOHO_ANALYTICS_SRC;
    document.body.appendChild(script);

    return () => {
      script.remove();
      clearTimeout(timeoutRef.current);
    };
  }, []);

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

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    if (invalidField === key && e.target.value.trim()) {
      setInvalidField('');
      setFormError('');
    }
  };

  const fail = (e, key, msg) => {
    e.preventDefault();
    setInvalidField(key);
    setFormError(msg);
    formRef.current?.querySelector(`[data-key="${key}"]`)?.focus();
  };

  // Validates, then lets the browser POST natively to Zoho. The response
  // loads into a hidden iframe so the visitor stays on this page.
  const handleSubmit = (e) => {
    for (const [key, label] of REQUIRED_FIELDS) {
      if (!formData[key].trim()) {
        return fail(e, key, `${label} is required. Please complete this field.`);
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return fail(e, 'email', 'Please enter a valid email address.');
    }
    const phoneDigits = formData.mobile.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return fail(e, 'mobile', 'Please enter a valid mobile number.');
    }

    setInvalidField('');
    setFormError('');
    setStatus('loading');
    submittingRef.current = true;

    timeoutRef.current = setTimeout(() => {
      if (!submittingRef.current) return;
      submittingRef.current = false;
      setStatus('error');
      showToast('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 2600);
    }, 20000);
  };

  const handleFrameLoad = () => {
    if (!submittingRef.current) return; // ignore the iframe's initial blank load
    submittingRef.current = false;
    clearTimeout(timeoutRef.current);

    setStatus('success');
    showToast('Message sent successfully. We will get back to you within 1 business day.');
    setFormData(EMPTY_FORM);
    setTimeout(() => setStatus('idle'), 2600);
  };

  const fieldClass = (key) => (invalidField === key ? 'is-invalid' : undefined);

  return (
    <>
      <div className="homepage">
        <Header />
        <main>
          <section className="contact-section">
            <div className="wrap">
              <div className="contact-shell">
                <div className="contact-intro reveal">
                  <div className="contact-badge">✦ CONNECT WITH ŚĀSTRA NIDHI</div>
                  <h2>
                    Preserving <span>Śāstra.</span>
                    <br />
                    Enabling Research.
                  </h2>
                  <p className="contact-lede">
                    Have a question, research idea, course enquiry or collaboration proposal? Reach
                    out to the Śāstra Nidhi team. We usually respond within one business day.
                  </p>

                  <div className="contact-logo-card">
                    <div className="contact-logo-orbit">
                      <span className="orbit orbit-a"></span>
                      <span className="orbit orbit-b"></span>
                      <img src="/images/logo.png" alt="Śāstra Nidhi emblem" />
                    </div>
                    <div>
                      <strong>Śāstra Nidhi</strong>
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
                    Tell us how we can help. Your message will be sent securely to our Sastra Nidhi
                    inbox.
                  </p>

                  <iframe
                    name={ZOHO_FRAME}
                    title="Zoho CRM form submission"
                    onLoad={handleFrameLoad}
                    hidden
                  />
                  <form
                    ref={formRef}
                    id={`webform${ZOHO_FORM_ID}`}
                    name={`WebToLeads${ZOHO_FORM_ID}`}
                    action={ZOHO_ACTION}
                    method="POST"
                    acceptCharset="UTF-8"
                    target={ZOHO_FRAME}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Zoho CRM hidden integration fields */}
                    <input
                      type="hidden"
                      name="xnQsjsdp"
                      value="ee1dd053d4ce23aa0affe1c9d46ff1a73a9333f75d677e34914513a331f96052"
                    />
                    <input type="hidden" name="zc_gad" id="zc_gad" defaultValue="" />
                    <input
                      type="hidden"
                      name="xmIwtLD"
                      value="ed24f3fdf2c45a54ce1b4dd60e66584e9f500b019f6700bb37aa680c4cb4f3631beb79e06caf90c4493d7092da61ed48"
                    />
                    <input type="hidden" name="actionType" value="TGVhZHM=" />
                    <input type="hidden" name="returnURL" value="null" />
                    {isSmartUrl && <input type="hidden" name="service" value="smarturl" />}

                    <div className="field-row">
                      <div className="field">
                        <label htmlFor="Last_Name">
                          Name <i>*</i>
                        </label>
                        <input
                          id="Last_Name"
                          data-key="name"
                          type="text"
                          name="Last Name"
                          maxLength={80}
                          placeholder="Your full name"
                          autoComplete="name"
                          className={fieldClass('name')}
                          value={formData.name}
                          onChange={handleChange('name')}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="Email">
                          Email address <i>*</i>
                        </label>
                        <input
                          id="Email"
                          data-key="email"
                          type="email"
                          name="Email"
                          ftype="email"
                          maxLength={100}
                          placeholder="you@example.com"
                          autoComplete="email"
                          className={fieldClass('email')}
                          value={formData.email}
                          onChange={handleChange('email')}
                          required
                        />
                      </div>
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label htmlFor="Mobile">
                          Mobile <i>*</i>
                        </label>
                        <input
                          id="Mobile"
                          data-key="mobile"
                          type="tel"
                          name="Mobile"
                          maxLength={30}
                          placeholder="Your phone number"
                          autoComplete="tel"
                          className={fieldClass('mobile')}
                          value={formData.mobile}
                          onChange={handleChange('mobile')}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="LEADCF1">
                          Subject <i>*</i>
                        </label>
                        <select
                          id="LEADCF1"
                          data-key="subject"
                          name="LEADCF1"
                          className={fieldClass('subject')}
                          value={formData.subject}
                          onChange={handleChange('subject')}
                          required
                        >
                          <option value="" disabled>
                            Select a subject
                          </option>
                          {SUBJECTS.map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="LEADCF4">
                        Area of Interest <i>*</i>
                      </label>
                      <select
                        id="LEADCF4"
                        data-key="area"
                        name="LEADCF4"
                        className={fieldClass('area')}
                        value={formData.area}
                        onChange={handleChange('area')}
                        required
                      >
                        <option value="" disabled>
                          Select an area
                        </option>
                        {AREAS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="Description">
                        Message <i>*</i>
                      </label>
                      <textarea
                        id="Description"
                        data-key="message"
                        name="Description"
                        maxLength={32000}
                        placeholder="Type your message here..."
                        className={fieldClass('message')}
                        value={formData.message}
                        onChange={handleChange('message')}
                        required
                      ></textarea>
                    </div>

                    {/* Zoho honeypot: keep hidden */}
                    <input
                      type="text"
                      name="aG9uZXlwb3Q"
                      defaultValue=""
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="zoho-honeypot"
                    />

                    {formError && (
                      <div className="contact-form-error" role="alert">
                        {formError}
                      </div>
                    )}

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
        <div className="whatsapp-float">
          <span className="wa-tooltip">Follow us on WhatsApp</span>
          <a
            className="wa-btn"
            href="https://whatsapp.com/channel/0029VbDKfR53mFY1T0Lfdb1O"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Sastra Nidhi on WhatsApp"
          >
            <span className="wa-ring" />
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.687 4.523 1.872 6.356L4 29l7.84-1.83A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm6.98 16.937c-.297.836-1.474 1.53-2.412 1.73-.642.136-1.48.245-4.302-.924-3.614-1.497-5.94-5.16-6.122-5.398-.178-.238-1.462-1.947-1.462-3.714 0-1.767.926-2.636 1.254-2.998.328-.362.716-.452.955-.452.238 0 .478.003.686.014.22.011.516-.083.807.616.297.716 1.01 2.484 1.098 2.664.089.18.148.392.03.63-.12.238-.178.386-.357.594-.178.208-.375.464-.535.624-.178.178-.363.372-.156.73.208.357.923 1.522 1.98 2.465 1.36 1.213 2.507 1.588 2.865 1.766.357.178.565.15.773-.089.208-.238.892-1.04 1.13-1.397.238-.357.476-.297.803-.178.328.119 2.084.983 2.44 1.163.357.178.594.267.683.416.089.148.089.858-.208 1.694z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}