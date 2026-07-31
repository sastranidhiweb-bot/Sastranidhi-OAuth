import { useModal } from '../../context/ModalContext.jsx';
import { useDemoForm } from '../../hooks/useDemoForm.js';
import Modal from './Modal.jsx';

export default function LoginModal() {
  const { openModal, close } = useModal();
  const { message, handleSubmit } = useDemoForm();

  return (
    <Modal id="login" isOpen={openModal === 'login'} onClose={close} title="Login">
      <form className="form demo" onSubmit={handleSubmit}>
        <input type="email" required placeholder="Email address" />
        <input type="password" required placeholder="Password" />
        <button className="btn primary">Login</button>
        <div className="message" style={{ display: message ? 'block' : 'none' }}>
          {message}
        </div>
      </form>
    </Modal>
  );
}
