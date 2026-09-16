import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

function Header({ theme = "light" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen((current) => !current);
  }

  return (
    <header
      className={`header header_theme_${theme} ${
        isMenuOpen ? "header_menu-open" : ""
      }`}
    >
      <div className="header__container">
        <Link
          className="header__logo"
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          NewsExplorer
        </Link>

        <button
          className="header__menu-button"
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={handleMenuToggle}
        >
          <span className="header__menu-icon">{isMenuOpen ? "×" : "☰"}</span>
        </button>

        <Navigation
          theme={theme}
          isMenuOpen={isMenuOpen}
          onNavigate={() => setIsMenuOpen(false)}
        />
      </div>

      {isMenuOpen && (
        <div className="header__overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
}

export default Header;
