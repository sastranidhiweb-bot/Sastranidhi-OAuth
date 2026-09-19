import { useModal } from '../../context/ModalContext.jsx';

export default function DonateBand() {
  const { open } = useModal();

  return (
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
  );
}