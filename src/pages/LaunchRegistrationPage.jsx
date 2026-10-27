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
import { apiPost, ApiError } from '../services/api.js';
import { sendPhoneCode, resetPhoneVerification } from '../services/phoneVerification.js';
import '../styles/pages.css';
import '../styles/contact-page.css';

const ROLES = ['Student', 'Scholar / Teacher', 'Researcher', 'Institution representative', 'Well-wisher', 'Other'];

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
  name: '',
  email: '',
  country: '',
  state: '',
  city: '',
  phone: '',
  role: '',
  organisation: '',
  message: '',
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
// Layout and submission flow follow InternshipPage (FormSubmit AJAX endpoint).
export default function LaunchRegistrationPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  // places.code tells which country the loaded lists belong to (null while loading)
  const [places, setPlaces] = useState({ code: null, ...NO_PLACES });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toastMessage, setToastMessage] = useState('');
  const country = useMemo(() => countries.find((c) => c.code === formData.country), [formData.country]);

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

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('email_verified', 'Yes');
      data.append('phone_verified', 'Yes');
      data.append('country', country ? country.name : '');
      data.append('state_province', formData.state);
      data.append('city', formData.city);
      data.append('phone', `${country?.dial || ''} ${formData.phone}`.trim());
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

      markLaunchRegistered();
      setStatus('success');
      showToast('Thank you for registering! We look forward to welcoming you at the launch.');
      setFormData(EMPTY_FORM);
      emailCheck.reset();
      phoneCheck.reset();

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
        <PageHero title="Launch Event Registration" />

        <section className="contact-section">
          <div className="wrap">
            <div className="contact-shell internship-shell">
              <div className="contact-intro internship-intro reveal">
                <h2>Join us for the launch of Śāstra Nidhi</h2>
                <p className="contact-lede">
                  From <strong>27 to 31 December 2026</strong>, over five days of celebration, the{' '}
                  <strong>Śāstra Nidhi Digital Platform</strong> will be formally launched: a
                  revolutionary initiative that brings India’s vast śāstric heritage into one living
                  digital treasury.
                </p>
                <p className="contact-lede">
                  For the first time, Svādhyāya, Viśleṣaka, Paripraśna and Pravacana come together on
                  a single platform to study, analyse, inquire into and learn the knowledge
                  traditions of Bhārata, for everyone, everywhere.
                </p>
                <p className="contact-lede">
                  This is more than a launch. It is an auspicious occasion and a shared offering to
                  our tradition. We warmly invite students, scholars, teachers, institutions and every
                  well-wisher of Indian Knowledge Systems to come together and be a part of this
                  historic moment.
                </p>

                <h3>Be a part of it</h3>
                <TickList
                  items={[
                    'Witness the launch of a revolutionary platform for Indian Knowledge Systems.',
                    'Receive the launch programme and joining details by email.',
                    'Be among the first to explore each platform as it opens.',
                    'Join a growing community devoted to preserving and sharing śāstric wisdom.',
                  ]}
                />
                <p className="contact-lede">
                  <strong>Register today and join us for this auspicious occasion.</strong>
                </p>
              </div>

              <div className="contact-form-card reveal">
                <div className="form-glow"></div>
                <h3>Register for the launch</h3>
                <p>Be part of this historic moment. Fields marked * are required.</p>

                <form className="verify-form" onSubmit={handleSubmit} noValidate>
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
                      <div className={`verify-field ${emailCheck.verified ? 'is-verified' : ''}`}>
                        <input
                          id="r-email"
                          type="email"
                          name="email"
                          autoComplete="email"
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
                  </div>
                  <div className="field-row">
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
                  </div>
                  <div className="field-row">
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
                  <p className="geo-credit">
                    Country and city lists from{' '}
                    <a href="https://www.geonames.org/" target="_blank" rel="noopener noreferrer">
                      GeoNames
                    </a>{' '}
                    (CC BY 4.0).
                  </p>
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
