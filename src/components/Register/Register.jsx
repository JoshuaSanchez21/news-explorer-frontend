import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import "./Register.css";

function Register({ isOpen, onClose, onLoginClick }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} title="Inscribirse">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-form__label">
          Correo electrónico
          <input
            className="auth-form__input"
            type="email"
            name="email"
            placeholder="Introduce tu correo electrónico"
          />
        </label>

        <label className="auth-form__label">
          Contraseña
          <input
            className="auth-form__input"
            type="password"
            name="password"
            placeholder="Introduce tu contraseña"
          />
        </label>

        <label className="auth-form__label">
          Nombre
          <input
            className="auth-form__input"
            type="text"
            name="name"
            placeholder="Introduce tu nombre de usuario"
          />
        </label>

        <button className="auth-form__submit" type="submit">
          Inscribirse
        </button>

        <p className="auth-form__switch">
          o{" "}
          <button
            className="auth-form__switch-button"
            type="button"
            onClick={onLoginClick}
          >
            Iniciar sesión
          </button>
        </p>
      </form>
    </PopupWithForm>
  );
}

export default Register;
