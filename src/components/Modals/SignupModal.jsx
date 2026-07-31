import { useModal } from '../../context/ModalContext.jsx';
import { useDemoForm } from '../../hooks/useDemoForm.js';
import Modal from './Modal.jsx';

export default function SignupModal() {
  const { openModal, close } = useModal();
  const { message, handleSubmit } = useDemoForm();

  return (
    <Modal
      id="signup"
      isOpen={openModal === 'signup'}
      onClose={close}
      title="Create Your Account"
    >
      <form className="form demo" onSubmit={handleSubmit}>
        <input required placeholder="Full name" />
        <input type="email" required placeholder="Email address" />
        <input type="password" required placeholder="Create password" />
        <select required defaultValue="">
          <option value="">Select area of interest</option>
          <option>Purāṇa Tilakam</option>
          <option>Paripraśna</option>
          <option>IKS Courses</option>
          <option>Research and Publications</option>
        </select>
        <button className="btn primary">Sign Up</button>
        <div className="message" style={{ display: message ? 'block' : 'none' }}>
          {message}
        </div>
      </form>
    </Modal>
  );
}
