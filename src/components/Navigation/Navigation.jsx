import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ theme = "light", isMenuOpen, onNavigate, onLoginClick }) {
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

      <NavLink
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`
        }
        to="/saved-news"
        onClick={onNavigate}
      >
        Artículos guardados
      </NavLink>

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
    </nav>
  );
}

export default Navigation;
