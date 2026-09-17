import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import "./Register.css";

function Register({ isOpen, onClose, onLoginClick }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation({
      email: "",
      password: "",
      name: "",
    });

  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm({
        email: "",
        password: "",
        name: "",
      });

      setServerError("");
    }
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    console.log("Register:", values);
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} title="Inscribirse">
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

        <label className="auth-form__label">
          Nombre
          <input
            className={`auth-form__input ${
              errors.name ? "auth-form__input_error" : ""
            }`}
            type="text"
            name="name"
            placeholder="Introduce tu nombre de usuario"
            value={values.name}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="30"
          />
          <span className="auth-form__error">{errors.name}</span>
        </label>

        {serverError && (
          <p className="auth-form__server-error">{serverError}</p>
        )}

        <button className="auth-form__submit" type="submit" disabled={!isValid}>
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
