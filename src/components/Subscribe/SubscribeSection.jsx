import { useState } from 'react';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/noreply@sastranidhi.org';

export default function SubscribeSection() {
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      event.currentTarget.reset();
      setStatus('You are subscribed to Śāstra-cakṣu. Welcome to the readership.');
    } catch {
      setStatus('Subscription could not be completed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="subscribe" className="subscribe-section">
      <div className="wrap subscribe-wrap">
        <div className="section-head reveal subscribe-heading">
          <div className="kicker">Digital Publication</div>
          <h2>ŚĀSTRA-CAKṢU eMAGAZINE | शास्त्रचक्षुः ई-पत्रिका</h2>
          <p>
            A bilingual Sanskrit-English publication sharing the wisdom of the Vedic
            śāstras through articles, insights, research, stories, and practical
            spiritual guidance rooted in the authentic tradition.
          </p>
        </div>

        <div className="subscribe-card reveal">
          <div className="subscribe-card-inner">
            <div className="subscribe-mark" aria-hidden="true">ஶி</div>
            <div className="subscribe-content">
              <h3>Subscribe to Śāstra-cakṣu</h3>
              <div className="subscribe-label">FREE · DELIVERED TO YOUR INBOX</div>
              <p className="subscribe-description">
                Join our readership and receive every new issue — articles, research
                notes and stories from the Sastranidhi community — as soon as it is
                published.
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="_subject"
                  value="New Śāstra-cakṣu eMagazine Subscriber"
                />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="subscribe-fields">
                  <div className="subscribe-field">
                    <label htmlFor="subscribe-name">NAME</label>
                    <input
                      id="subscribe-name"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="subscribe-field">
                    <label htmlFor="subscribe-whatsapp">WHATSAPP NUMBER</label>
                    <input
                      id="subscribe-whatsapp"
                      type="tel"
                      name="whatsapp_number"
                      placeholder="+91 xxxxx xxxxx"
                      required
                    />
                  </div>
                  <div className="subscribe-field">
                    <label htmlFor="subscribe-email">EMAIL</label>
                    <input
                      id="subscribe-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="subscribe-submit-wrap">
                    <button type="submit" disabled={submitting}>
                      {submitting ? 'Subscribing…' : 'Subscribe'}
                    </button>
                  </div>
                </div>
              </form>

              {status && <p className="subscribe-status" role="status">{status}</p>}
              <p className="subscribe-note">
                By subscribing you agree to receive the Śāstra-cakṣu eMagazine by
                email. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
