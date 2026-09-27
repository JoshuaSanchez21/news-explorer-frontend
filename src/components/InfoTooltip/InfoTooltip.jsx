import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, onLoginClick }) {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} title="">
      <div className="info-tooltip">
        <h2 className="info-tooltip__title">
          ¡El registro se ha completado con éxito!
        </h2>

        <button
          className="info-tooltip__login"
          type="button"
          onClick={onLoginClick}
        >
          Iniciar sesión
        </button>
      </div>
    </PopupWithForm>
  );
}

export default InfoTooltip;
