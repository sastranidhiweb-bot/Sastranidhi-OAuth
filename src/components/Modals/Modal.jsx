export default function Modal({ id, isOpen, onClose, title, children }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      id={id}
      onClick={handleBackdropClick}
    >
      <div className="modal-box">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
