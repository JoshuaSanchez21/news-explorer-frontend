import { useEffect } from "react";
import "./PopupWithForm.css";

function PopupWithForm({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup" onMouseDown={handleOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />

        <h2 className="popup__title">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;
