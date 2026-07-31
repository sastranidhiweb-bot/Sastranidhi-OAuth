import { useModal } from '../../context/ModalContext.jsx';
import { useDemoForm } from '../../hooks/useDemoForm.js';

export default function Contact() {
  const { open } = useModal();
  const { message, handleSubmit } = useDemoForm();

  return (
    <section className="section alt" id="contact">
      <div className="container">
        <div className="cta">
          <div>
            <h2>Support the Preservation of Knowledge</h2>
            <p>
              Your contribution can support research, digitisation, education,
              publications and open-access initiatives.
            </p>
          </div>
          <button className="btn gold" onClick={() => open('donate')}>
            Make a Donation
          </button>
        </div>
        <div className="split" style={{ marginTop: 42 }}>
          <div>
            <div className="kicker">Contact Us</div>
            <h2 style={{ color: 'var(--navy)', fontSize: 36 }}>Connect with Sastranidhi</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
              For research collaboration, courses, institutional partnerships,
              volunteering and support.
            </p>
            <p>
              <strong>Email:</strong> info@sastranidhi.org
              <br />
              <strong>Location:</strong> Hyderabad, India
            </p>
          </div>
          <form className="form demo" onSubmit={handleSubmit}>
            <input required placeholder="Your name" />
            <input type="email" required placeholder="Email address" />
            <textarea rows={5} required placeholder="Your message" />
            <button className="btn primary">Send Message</button>
            <div className="message" style={{ display: message ? 'block' : 'none' }}>
              {message}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
