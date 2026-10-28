import { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, TickList } from '../components/PageSections/PageSections.jsx';
import SearchSelect from '../components/SearchSelect/SearchSelect.jsx';
import { useCodeVerification, VerifyButton, VerifyCodeBox } from '../components/VerifyCode/VerifyCode.jsx';
import { markLaunchRegistered } from '../components/LaunchPopup/LaunchPopup.jsx';
import { countries } from '../data/countries.js';
import { zohoCountries, zohoStates } from '../data/zohoPlaces.js';
import { apiPost, ApiError } from '../services/api.js';
import { sendPhoneCode, resetPhoneVerification } from '../services/phoneVerification.js';
import '../styles/pages.css';
import '../styles/contact-page.css';

// Zoho CRM Web-to-Lead form "Register for the launch" (supplied by the CRM
// team). Each registration becomes a lead; Zoho workflows then tag it
// "Registration Form", email the visitor, and create a follow-up task and call.
// Field names and hidden token values must match the form in Zoho CRM.
const ZOHO_FORM_ID = '1449582000000732001';
const ZOHO_ACTION = 'https://crm.zoho.in/crm/WebToLeadForm';
const ZOHO_ANALYTICS_SRC =
  'https://crm.zohopublic.in/crm/WebFormAnalyticsServeServlet?rid=c7e62174ef8bdf30547974193e2c6c7fbc22f7974d1a5100fc59d63352ed61baf844ab8773a0e9f223aeb19d1176e39agid7553c51992a4f1289deaeda354f57ffd22f61fa0ab14256f2d52c2aa78d61b08gid83f1e2575a3eafa719391c7e5f3d6ef21082227d019518c9fb2181f586845edbgide14369318cbc3226f05e8ac39a48e246b973ddfbe0fe6a59e3c707cad5efe560&tw=4d9e8784df24e2d5e9f505852e2c8a3d5537fbc2ff5095fefe10cf09ae0be188&version=v2';
const ZOHO_FRAME = 'zoho-registration-submit-frame';

// [Zoho picklist value, label]. The values are spelled as in Zoho CRM.
const ROLES = [
  ['Student', 'Student'],
  ['Scholar / Teacher', 'Scholar / Teacher'],
  ['Researcher', 'Researcher'],
  ['Intitution Representative', 'Institution representative'],
  ['Well Wisher', 'Well-wisher'],
  ['Other', 'Other'],
];

// The four platforms launching together: [name, what it is for]
const PILLARS = [
  ['Svādhyāya', 'Study'],
  ['Viśleṣaka', 'Analyse'],
  ['Paripraśna', 'Inquire'],
  ['Pravacana', 'Learn'],
];

// Other names people may type when searching for a country
const COUNTRY_KEYWORDS = {
  IN: 'Bharat Bharata Hindustan',
  US: 'USA America United States of America',
  GB: 'UK Britain Great Britain England Scotland Wales Northern Ireland',
  AE: 'UAE Emirates Dubai',
  NL: 'Netherlands Holland',
  KR: 'Korea Republic of Korea',
  KP: 'Korea DPRK',
  CZ: 'Czech Republic',
  CI: 'Cote dIvoire',
  CV: 'Cape Verde',
  SZ: 'Swaziland',
  MM: 'Burma',
  TR: 'Turkiye',
  RU: 'Russian Federation',
  PS: 'Palestine',
  VA: 'Holy See Vatican City',
  LK: 'Ceylon',
};

const COUNTRY_OPTIONS = countries.map((c) => ({
  value: c.code,
  label: c.name,
  hint: c.dial,
  keywords: `${c.code} ${COUNTRY_KEYWORDS[c.code] || ''}`,
}));

// States and cities are per country in public/data/places/<ISO>.json
// (scripts/build-geo-data.py); each is fetched once when its country is picked.
const placesCache = new Map();
const NO_PLACES = { states: [], cities: [] };

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  state: '',
  city: '',
  phone: '',
  role: '',
  organisation: '',
};

// Email codes come from the IdP's endpoints (see SignupWizard.jsx).
// /auth/register/resend is used to send because, unlike /register/start, it
// doesn't refuse addresses that already have an account.
// Phone codes come from Firebase (services/phoneVerification.js).
const friendlyApiError = (err, fallback) => {
  const e = new Error(err instanceof ApiError && err.status !== 0 ? err.message : fallback);
  e.retryAfterSeconds = err.details?.retryAfterSeconds;
  return e;
};

// Number in international format, e.g. +91 98765 43210 -> +919876543210
const toE164 = (dial, phone) => `${dial}${phone.replace(/\D/g, '').replace(/^0+/, '')}`;

// Registration for the platform launch (27–31 December 2026, see EventsPage.jsx).
// Layout follows InternshipPage. On submit, the hidden Zoho form below posts
// the details to Zoho CRM (as on ContactPage); a copy also goes to the team
// inbox through FormSubmit.
export default function LaunchRegistrationPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  // places.code tells which country the loaded lists belong to (null while loading)
  const [places, setPlaces] = useState({ code: null, ...NO_PLACES });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toastMessage, setToastMessage] = useState('');
  const [isSmartUrl] = useState(
    () => new URLSearchParams(window.location.search).get('service') === 'smarturl'
  );
  const zohoFormRef = useRef(null);
  const submittingRef = useRef(false);
  const timeoutRef = useRef(null);
  const country = useMemo(() => countries.find((c) => c.code === formData.country), [formData.country]);

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

  const emailCheck = useCodeVerification({
    codeLabel: 'email',
    send: async () => {
      try {
        const res = await apiPost('/auth/register/resend', { email: formData.email.trim() });
        return { cooldownSeconds: res.resendCooldownSeconds };
      } catch (err) {
        throw friendlyApiError(err, 'We could not send the code right now. Please try again in a moment.');
      }
    },
    confirm: async (code) => {
      try {
        await apiPost('/auth/register/verify', { email: formData.email.trim(), code });
      } catch (err) {
        throw friendlyApiError(err, 'We could not check the code right now. Please try again.');
      }
    },
  });

  const confirmPhoneRef = useRef(null);
  const phoneCheck = useCodeVerification({
    codeLabel: 'SMS',
    send: async () => {
      confirmPhoneRef.current = await sendPhoneCode(toE164(country.dial, formData.phone), 'r-recaptcha');
      return {};
    },
    confirm: (code) => confirmPhoneRef.current(code),
  });

  useEffect(() => resetPhoneVerification, []);

  // Checks the field with the browser's own validation before sending a code.
  const sendIfValid = (inputId, check) => () => {
    const input = document.getElementById(inputId);
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    check.sendCode();
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3600);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // A changed email or phone number has to be verified again.
  const handleEmailChange = (e) => {
    handleChange(e);
    emailCheck.reset();
  };

  const handlePhoneChange = (e) => {
    handleChange(e);
    phoneCheck.reset();
  };

  // Country -> state -> city: each choice clears the ones after it.
  // It also changes the phone's country code, so the phone needs verifying again.
  const handleCountry = (code) => {
    if (code !== formData.country) phoneCheck.reset();
    setFormData((prev) => (prev.country === code ? prev : { ...prev, country: code, state: '', city: '' }));
  };

  const handleState = (state) => {
    setFormData((prev) => (prev.state === state ? prev : { ...prev, state, city: '' }));
  };

  useEffect(() => {
    const code = formData.country;
    if (!code) {
      setPlaces({ code: null, ...NO_PLACES });
      return undefined;
    }
    let cancelled = false;
    setPlaces({ code: null, ...NO_PLACES });
    const load =
      placesCache.get(code) || fetch(`/data/places/${code}.json`).then((r) => (r.ok ? r.json() : NO_PLACES));
    placesCache.set(code, load);
    load
      .then((data) => {
        if (!cancelled) setPlaces({ code, ...data });
      })
      .catch(() => {
        placesCache.delete(code);
        if (!cancelled) setPlaces({ code, ...NO_PLACES });
      });
    return () => {
      cancelled = true;
    };
  }, [formData.country]);

  const placesLoaded = Boolean(formData.country) && places.code === formData.country;
  // A few small countries (e.g. Singapore, Vatican City) have no states.
  const hasStates = placesLoaded && places.states.length > 0;

  const stateOptions = useMemo(() => places.states.map((n) => ({ value: n, label: n })), [places]);

  // Cities of the chosen state (or of the whole country if it has no states)
  const cityOptions = useMemo(() => {
    if (!placesLoaded) return [];
    const stateIndex = hasStates ? places.states.indexOf(formData.state) : -1;
    if (hasStates && stateIndex < 0) return [];
    return places.cities
      .filter(([, i]) => !hasStates || i === stateIndex)
      .map(([city]) => ({ value: city, label: city }));
  }, [places, placesLoaded, hasStates, formData.state]);

  let statePlaceholder = 'Choose a country first';
  if (formData.country) statePlaceholder = !placesLoaded ? 'Loading…' : hasStates ? 'Start typing your state' : 'Not applicable';
  let cityPlaceholder = 'Choose a country first';
  if (formData.country) cityPlaceholder = hasStates && !formData.state ? 'Choose a state first' : 'Start typing your city';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    if (!emailCheck.verified) {
      emailCheck.setError('Please verify your email address before registering.');
      document.getElementById('r-email').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!phoneCheck.verified) {
      phoneCheck.setError('Please verify your phone number before registering.');
      document.getElementById('r-phone').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setStatus('loading');
    submittingRef.current = true;

    // The browser posts the hidden Zoho form natively; Zoho's reply loads
    // into a hidden iframe (handleFrameLoad) so the visitor stays here.
    const zohoForm = zohoFormRef.current;
    if (zohoForm.requestSubmit) zohoForm.requestSubmit();
    else zohoForm.submit();

    timeoutRef.current = setTimeout(() => {
      if (!submittingRef.current) return;
      submittingRef.current = false;
      setStatus('error');
      showToast('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 2600);
    }, 20000);

    // Copy for the team inbox; the Zoho lead is what counts, so a failure
    // here is not shown to the visitor.
    const data = new FormData();
    data.append('name', fullName);
    data.append('email', formData.email);
    data.append('email_verified', 'Yes');
    data.append('phone_verified', 'Yes');
    data.append('country', country ? country.name : '');
    data.append('state_province', formData.state);
    data.append('city', formData.city);
    data.append('phone', phoneWithCode);
    data.append('i_am_a', roleLabel);
    data.append('organisation', formData.organisation);
    data.append('_subject', 'New Registration: Śāstra Nidhi Launch');
    data.append('_captcha', 'false');
    data.append('_template', 'table');
    data.append('_replyto', formData.email);
    fetch('https://formsubmit.co/ajax/noreply@sastranidhi.org', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data,
    }).catch(() => {});
  };

  const handleFrameLoad = () => {
    if (!submittingRef.current) return; // ignore the iframe's initial blank load
    submittingRef.current = false;
    clearTimeout(timeoutRef.current);

    markLaunchRegistered();
    setStatus('success');
    showToast('Thank you for registering! We look forward to welcoming you at the launch.');
    setFormData(EMPTY_FORM);
    emailCheck.reset();
    phoneCheck.reset();

    setTimeout(() => setStatus('idle'), 2600);
  };

  // Values as the Zoho form expects them
  const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
  const phoneWithCode = `${country?.dial || ''} ${formData.phone.trim()}`.trim();
  const roleLabel = ROLES.find(([value]) => value === formData.role)?.[1] || '';
  const zohoCountry = country ? zohoCountries[country.code] || country.name : '-None-';
  const zohoState = formData.state ? zohoStates[formData.country]?.[formData.state] || formData.state : '-None-';

  return (
    <>
      <SiteBubbles />
      <Header />
      <main>
        <PageHero title="Launch Event Registration" />

        <section className="contact-section">
          <div className="wrap">
            <div className="contact-shell internship-shell launch-shell">
              <div className="contact-intro internship-intro launch-intro reveal">
                <div className="contact-badge">✦ 27 – 31 DECEMBER 2026 · FIVE DAYS OF CELEBRATION</div>
                <h2>
                  Join us for the launch of <span>Śāstra Nidhi</span>
                </h2>
                <p className="contact-lede">
                  The <strong>Śāstra Nidhi Digital Platform</strong> brings India’s vast śāstric
                  heritage into one living digital treasury. For the first time, four platforms come
                  together to explore the knowledge traditions of Bhārata, for everyone, everywhere.
                </p>

                <ul className="launch-pillars">
                  {PILLARS.map(([name, verb]) => (
                    <li key={name}>
                      <strong>{name}</strong>
                      <small>{verb}</small>
                    </li>
                  ))}
                </ul>

                <h3>Be a part of it</h3>
                <TickList
                  items={[
                    'Witness the launch of a revolutionary platform for Indian Knowledge Systems.',
                    'Receive the launch programme and joining details by email.',
                    'Be among the first to explore each platform as it opens.',
                  ]}
                />
                <p className="launch-invite">
                  An auspicious occasion and a shared offering to our tradition. Students, scholars,
                  teachers, institutions and every well-wisher of Indian Knowledge Systems are warmly
                  invited.
                </p>
              </div>

              <div className="contact-form-card launch-form reveal">
                <div className="form-glow"></div>
                <div className="form-topline">
                  <span>LAUNCH REGISTRATION</span>
                  <span>27 – 31 DEC 2026</span>
                </div>
                <h3>Register for the launch</h3>
                <p>Be part of this historic moment. Fields marked * are required.</p>

                <form className="verify-form" onSubmit={handleSubmit} noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="r-first-name">
                        First name <i>*</i>
                      </label>
                      <input
                        id="r-first-name"
                        type="text"
                        name="firstName"
                        autoComplete="given-name"
                        maxLength={40}
                        placeholder="Your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="r-last-name">
                        Last name <i>*</i>
                      </label>
                      <input
                        id="r-last-name"
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        maxLength={80}
                        placeholder="Your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="r-email">
                      Email address <i>*</i>
                    </label>
                    <div className={`verify-field ${emailCheck.verified ? 'is-verified' : ''}`}>
                      <input
                        id="r-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        maxLength={100}
                        placeholder="you@example.com"
                        aria-describedby="r-email-status"
                        value={formData.email}
                        onChange={handleEmailChange}
                        required
                      />
                      <VerifyButton v={emailCheck} onClick={sendIfValid('r-email', emailCheck)} />
                    </div>
                    <VerifyCodeBox v={emailCheck} id="r-email" sentTo={formData.email} via="email" />
                  </div>
                  <div className="field">
                    <label htmlFor="r-country">
                      Country <i>*</i>
                    </label>
                    <SearchSelect
                      id="r-country"
                      name="country"
                      options={COUNTRY_OPTIONS}
                      value={formData.country}
                      onChange={handleCountry}
                      placeholder="Start typing your country"
                      invalidMessage="Please choose your country from the list."
                      letterIndex
                      required
                    />
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="r-state">
                        State / Province {hasStates && <i>*</i>}
                      </label>
                      <SearchSelect
                        id="r-state"
                        name="state"
                        options={stateOptions}
                        value={formData.state}
                        onChange={handleState}
                        placeholder={statePlaceholder}
                        disabled={!hasStates}
                        invalidMessage="Please choose your state or province from the list."
                        letterIndex
                        required={hasStates}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="r-city">
                        City <i>*</i>
                      </label>
                      <SearchSelect
                        id="r-city"
                        name="city"
                        options={cityOptions}
                        value={formData.city}
                        onChange={(city) => setFormData((prev) => ({ ...prev, city }))}
                        placeholder={cityPlaceholder}
                        disabled={!placesLoaded || (hasStates && !formData.state)}
                        invalidMessage="Please enter your city."
                        emptyText="Type your city"
                        allowCustom
                        otherLabel="Other (my city is not listed)"
                        otherPlaceholder="Type your city name"
                        letterIndex
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="r-phone">
                      Phone number <i>*</i>
                    </label>
                    {/* the prefix follows the chosen country */}
                    <div className={`phone-field verify-field ${phoneCheck.verified ? 'is-verified' : ''}`}>
                      <span className="phone-prefix" aria-hidden="true">
                        {country?.dial || '+'}
                      </span>
                      <input
                        id="r-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel-national"
                        inputMode="tel"
                        aria-describedby="r-phone-code r-phone-status"
                        placeholder={country ? 'Phone number' : 'Choose a country first'}
                        pattern="[0-9 ()\-]{4,20}"
                        title="Your number without the country code"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                      />
                      <VerifyButton
                        v={phoneCheck}
                        onClick={
                          country
                            ? sendIfValid('r-phone', phoneCheck)
                            : () => phoneCheck.setError('Please choose your country first.')
                        }
                      />
                    </div>
                    <span id="r-phone-code" className="visually-hidden">
                      {country ? `Country code ${country.dial} is added automatically.` : 'Choose your country to set the country code.'}
                    </span>
                    <VerifyCodeBox
                      v={phoneCheck}
                      id="r-phone"
                      sentTo={country ? `${country.dial} ${formData.phone}` : formData.phone}
                      via="SMS"
                    />
                    {/* Firebase's invisible reCAPTCHA attaches here */}
                    <div id="r-recaptcha"></div>
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
                        {ROLES.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
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
                        maxLength={200}
                        placeholder="Optional"
                        value={formData.organisation}
                        onChange={handleChange}
                      />
                    </div>
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
                  <p className="geo-credit">
                    Country and city lists from{' '}
                    <a href="https://www.geonames.org/" target="_blank" rel="noopener noreferrer">
                      GeoNames
                    </a>{' '}
                    (CC BY 4.0).
                  </p>
                </form>

                {/* Zoho CRM form: filled from the form above and posted by handleSubmit */}
                <iframe name={ZOHO_FRAME} title="Zoho CRM form submission" onLoad={handleFrameLoad} hidden />
                <form
                  ref={zohoFormRef}
                  id={`webform${ZOHO_FORM_ID}`}
                  name={`WebToLeads${ZOHO_FORM_ID}`}
                  action={ZOHO_ACTION}
                  method="POST"
                  acceptCharset="UTF-8"
                  target={ZOHO_FRAME}
                  hidden
                >
                  <input
                    type="hidden"
                    name="xnQsjsdp"
                    value="f26892215be11dc498bfe36610e0eaab6ffc041fa9aceac27132c8e75243a724"
                  />
                  <input type="hidden" name="zc_gad" id="zc_gad" defaultValue="" />
                  <input
                    type="hidden"
                    name="xmIwtLD"
                    value="cf7d5ea2bf7963eb3984b0855756ee44dafe77532ea154a69f9b1043a3ecd2139f38b41d06140f2e035b6afbccd9e1cd"
                  />
                  <input type="hidden" name="actionType" value="TGVhZHM=" />
                  <input type="hidden" name="returnURL" value="null" />
                  {isSmartUrl && <input type="hidden" name="service" value="smarturl" />}
                  <input type="hidden" name="First Name" value={formData.firstName.trim()} />
                  <input type="hidden" name="Last Name" value={formData.lastName.trim()} />
                  <input type="hidden" name="Email" value={formData.email.trim()} />
                  <input type="hidden" name="Address - Country / Region" value={zohoCountry} />
                  <input type="hidden" name="Address - State / Province" value={zohoState} />
                  <input type="hidden" name="Address - City" value={formData.city} />
                  <input type="hidden" name="Phone" value={phoneWithCode} />
                  <input type="hidden" name="LEADCF5" value={formData.role || '-None-'} />
                  <input type="hidden" name="Company" value={formData.organisation.trim()} />
                  {/* Zoho honeypot: always empty */}
                  <input type="hidden" name="aG9uZXlwb3Q" value="" />
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
