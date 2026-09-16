import { useModal } from '../../context/ModalContext.jsx';
import { useDemoForm } from '../../hooks/useDemoForm.js';

export default function Contact() {
  const { open } = useModal();
  const { message, handleSubmit } = useDemoForm();

  return (
    <>
      <section id="donate" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="donate-band reveal">
            <div>
              <h3>Support the Preservation of Knowledge</h3>
              <p>
                Your contribution can support research, digitisation, education,
                publications and open-access initiatives.
              </p>
            </div>
            <a
              href="#donate"
              className="btn-primary js-donate-trigger"
              onClick={(e) => {
                e.preventDefault();
                open('donate');
              }}
            >
              Make a Donation
            </a>
          </div>
        </div>
      </section>

      <section id="contact" style={{ background: 'var(--stone-deep)' }}>
        <div className="wrap">
          <div className="section-head reveal" style={{ marginBottom: '10px' }}>
            <div className="kicker">Contact Us</div>
            <h2>Connect with Sastranidhi</h2>
          </div>
          <div className="contact-grid reveal">
            <div>
              <h3>Reach out</h3>
              <p>
                For research collaboration, courses, institutional partnerships,
                volunteering and support.
              </p>
              <div className="meta-line">
                <strong>Email:</strong> info@sastranidhi.org
              </div>
              <div className="meta-line">
                <strong>Location:</strong> Hyderabad, India
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Email address" required />
              <textarea placeholder="Your message" required />
              <button type="submit" className="btn-primary">
                Send Message
              </button>
              {message && <div className="form-message">{message}</div>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
