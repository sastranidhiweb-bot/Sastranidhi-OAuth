import { useModal } from '../../context/ModalContext.jsx';
import { useDemoForm } from '../../hooks/useDemoForm.js';
import Modal from './Modal.jsx';

export default function DonateModal() {
  const { openModal, close } = useModal();
  const { message, handleSubmit } = useDemoForm();

  return (
    <Modal
      id="donate"
      isOpen={openModal === 'donate'}
      onClose={close}
      title="Support Sastranidhi"
    >
      <form className="form demo" onSubmit={handleSubmit}>
        <input required placeholder="Full name" />
        <input type="email" required placeholder="Email address" />
        <select>
          <option>Research and Digitisation</option>
          <option>Education and Courses</option>
          <option>Publications</option>
          <option>General Support</option>
        </select>
        <input type="number" min="1" required placeholder="Donation amount" />
        <button className="btn gold">Continue</button>
        <div className="message" style={{ display: message ? 'block' : 'none' }}>
          {message}
        </div>
      </form>
    </Modal>
  );
}
