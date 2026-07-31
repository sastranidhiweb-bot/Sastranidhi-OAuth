export default function Modal({ id, isOpen, onClose, title, children }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal${isOpen ? ' show' : ''}`}
      id={id}
      onClick={handleBackdropClick}
    >
      <div className="box">
        <button className="close" onClick={onClose}>
          ×
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
