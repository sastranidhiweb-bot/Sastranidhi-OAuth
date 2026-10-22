import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SiteBubbles from '../components/SiteBubbles.jsx';
import WhatsAppFloat from '../components/WhatsAppFloat.jsx';
import DonateModal from '../components/Modals/DonateModal.jsx';
import { PageHero, TickList } from '../components/PageSections/PageSections.jsx';
import SearchSelect from '../components/SearchSelect/SearchSelect.jsx';
import { countries } from '../data/countries.js';
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

// City lists are per country in public/data/cities/<ISO>.json
// (scripts/build-geo-data.py); each is fetched once when its country is picked.
const cityCache = new Map();

const EMPTY_FORM = {
  name: '',
  email: '',
  country: '',
  city: '',
  phone: '',
  role: '',
  organisation: '',
  message: '',
};

// Registration for the platform launch (27 December 2026, see EventsPage.jsx).
// Layout and submission flow follow InternshipPage (FormSubmit AJAX endpoint).
export default function LaunchRegistrationPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [cities, setCities] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [toastMessage, setToastMessage] = useState('');

  const country = useMemo(() => countries.find((c) => c.code === formData.country), [formData.country]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3600);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // A new country clears the city; the effect below loads its city list.
  const handleCountry = (code) => {
    setFormData((prev) => (prev.country === code ? prev : { ...prev, country: code, city: '' }));
  };

  useEffect(() => {
    const code = formData.country;
    if (!code) {
      setCities([]);
      return undefined;
    }
    let cancelled = false;
    const load = cityCache.get(code) || fetch(`/data/cities/${code}.json`).then((r) => (r.ok ? r.json() : []));
    cityCache.set(code, load);
    load
      .then((rows) => {
        if (cancelled) return;
        setCities(
          rows.map(([city, region]) => ({
            value: region ? `${city}, ${region}` : city,
            label: city,
            hint: region,
          })),
        );
      })
      .catch(() => {
        cityCache.delete(code);
        if (!cancelled) setCities([]);
      });
    return () => {
      cancelled = true;
    };
  }, [formData.country]);

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
      data.append('country', country ? country.name : '');
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

      setStatus('success');
      showToast('Thank you for registering! We look forward to welcoming you at the launch.');
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
                <h2>Join Us for the Launch of Śāstra Nidhi</h2>
                <p className="contact-lede">
                  On <strong>27 December 2026</strong>, the{' '}
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
                  <strong>Register today and join us on this auspicious day.</strong>
                </p>
              </div>

              <div className="contact-form-card reveal">
                <div className="form-glow"></div>
                <h3>Register for the launch</h3>
                <p>Be part of this historic moment. Fields marked * are required.</p>

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
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="r-city">
                        City <i>*</i>
                      </label>
                      <SearchSelect
                        id="r-city"
                        name="city"
                        options={cities}
                        value={formData.city}
                        onChange={(city) => setFormData((prev) => ({ ...prev, city }))}
                        placeholder={formData.country ? 'Start typing your city' : 'Choose a country first'}
                        disabled={!formData.country}
                        invalidMessage="Please enter your city."
                        emptyText="Type your city"
                        allowCustom
                        required
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="r-phone">
                        Phone number <i>*</i>
                      </label>
                      {/* the prefix follows the chosen country */}
                      <div className="phone-field">
                        <span className="phone-prefix" aria-hidden="true">
                          {country?.dial || '+'}
                        </span>
                        <input
                          id="r-phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel-national"
                          inputMode="tel"
                          aria-describedby="r-phone-code"
                          placeholder={country ? 'Phone number' : 'Choose a country first'}
                          pattern="[0-9 ()\-]{4,20}"
                          title="Your number without the country code"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <span id="r-phone-code" className="visually-hidden">
                        {country ? `Country code ${country.dial} is added automatically.` : 'Choose your country to set the country code.'}
                      </span>
                    </div>
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
