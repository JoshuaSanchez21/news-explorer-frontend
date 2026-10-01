import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./Navigation.css";

function Navigation({ theme = "light", isMenuOpen, onNavigate, onLoginClick }) {
  const { loggedIn, onLogout } = useContext(CurrentUserContext);

  function handleLogoutClick() {
    onNavigate();
    onLogout();
  }

  return (
    <nav
      className={`navigation navigation_theme_${theme} ${
        isMenuOpen ? "navigation_mobile-open" : ""
      }`}
    >
      <NavLink
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`
        }
        to="/"
        onClick={onNavigate}
      >
        Inicio
      </NavLink>

      {loggedIn && (
        <NavLink
          className={({ isActive }) =>
            `navigation__link ${isActive ? "navigation__link_active" : ""}`
          }
          to="/saved-news"
          onClick={onNavigate}
        >
          Artículos guardados
        </NavLink>
      )}

      {loggedIn ? (
        <button
          className="navigation__login-button"
          type="button"
          onClick={handleLogoutClick}
        >
          Cerrar sesión
        </button>
      ) : (
        <button
          className="navigation__login-button"
          type="button"
          onClick={() => {
            onNavigate();
            onLoginClick();
          }}
        >
          Iniciar sesión
        </button>
      )}
    </nav>
  );
}

export default Navigation;
