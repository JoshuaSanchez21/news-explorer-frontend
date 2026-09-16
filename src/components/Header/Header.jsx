import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`header ${isMenuOpen ? "header_menu-open" : ""}`}>
      <div className="header__container">
        <a className="header__logo" href="/">
          NewsExplorer
        </a>

        <button
          className="header__menu-button"
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={handleMenuToggle}
        >
          <span className="header__menu-icon">{isMenuOpen ? "×" : "☰"}</span>
        </button>

        <Navigation isMenuOpen={isMenuOpen} />
        {isMenuOpen && (
          <div
            className="header__overlay"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
