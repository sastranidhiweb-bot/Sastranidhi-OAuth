import { useState } from 'react';
import { useModal } from '../../context/ModalContext.jsx';
import Modal from './Modal.jsx';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/noreply@sastranidhi.org';

export default function DonateModal() {
  const { openModal, close } = useModal();
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      });

      if (!response.ok) throw new Error('Donation form submission failed');

      event.currentTarget.reset();
      setMessage('Thank you. Your support enquiry has been sent.');
    } catch {
      setMessage('Unable to send right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      id="donateModal"
      isOpen={openModal === 'donate'}
      onClose={close}
      title="Support Sastranidhi"
    >
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="_subject" value="New Sastranidhi Donation / Support Enquiry" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="text" name="name" required placeholder="Full name" />
        <input type="email" name="email" required placeholder="Email address" />
        <div className="select-wrap">
          <select name="purpose" required defaultValue="">
            <option value="" disabled>Select support area</option>
            <option>Research and Digitisation</option>
            <option>Education and Courses</option>
            <option>Publications</option>
            <option>General Support</option>
          </select>
        </div>
        <input type="number" name="amount" min="1" placeholder="Donation amount" />
        <button type="submit" className="btn-continue" disabled={submitting}>
          {submitting ? 'Sending…' : 'Continue'}
        </button>
        {message && <div className="modal-success show">{message}</div>}
      </form>
    </Modal>
  );
}
