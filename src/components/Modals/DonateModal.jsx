import { useModal } from '../../context/ModalContext.jsx';
import { useDemoForm } from '../../hooks/useDemoForm.js';
import Modal from './Modal.jsx';

export default function DonateModal() {
  const { openModal, close } = useModal();
  const { message, handleSubmit } = useDemoForm();

  return (
    <Modal
      id="donateModal"
      isOpen={openModal === 'donate'}
      onClose={close}
      title="Support Sastranidhi"
    >
      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="Full name" />
        <input type="email" required placeholder="Email address" />
        <div className="select-wrap">
          <select required defaultValue="Research and Digitisation">
            <option>Research and Digitisation</option>
            <option>Education and Courses</option>
            <option>Publications</option>
            <option>General Support</option>
          </select>
        </div>
        <input type="number" min="1" placeholder="Donation amount" />
        <button type="submit" className="btn-continue">
          Continue
        </button>
        {message && <div className="modal-success show">{message}</div>}
      </form>
    </Modal>
  );
}
