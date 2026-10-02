import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import "./Login.css";

function Login({ isOpen, onClose, onRegisterClick, onLogin }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    setServerError("");
    setIsSubmitting(true);

    onLogin(values.email, values.password)
      .catch((error) => {
        setServerError(
          error.message || "Ha ocurrido un error al iniciar sesión",
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} title="Iniciar sesión">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="auth-form__label">
          Correo electrónico
          <input
            className={`auth-form__input ${
              errors.email ? "auth-form__input_error" : ""
            }`}
            type="email"
            name="email"
            placeholder="Introduce tu correo electrónico"
            value={values.email}
            onChange={handleChange}
            required
          />
          <span className="auth-form__error">{errors.email}</span>
        </label>

        <label className="auth-form__label">
          Contraseña
          <input
            className={`auth-form__input ${
              errors.password ? "auth-form__input_error" : ""
            }`}
            type="password"
            name="password"
            placeholder="Introduce tu contraseña"
            value={values.password}
            onChange={handleChange}
            required
          />
          <span className="auth-form__error">{errors.password}</span>
        </label>

        {serverError && (
          <p className="auth-form__server-error">{serverError}</p>
        )}

        <button
          className="auth-form__submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Iniciando..." : "Iniciar sesión"}
        </button>

        <p className="auth-form__switch">
          o{" "}
          <button
            className="auth-form__switch-button"
            type="button"
            onClick={onRegisterClick}
          >
            Registrarse
          </button>
        </p>
      </form>
    </PopupWithForm>
  );
}

export default Login;
