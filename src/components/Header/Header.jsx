import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <a className="header__logo" href="/">
          NewsExplorer
        </a>

        <Navigation />
      </div>
    </header>
  );
}

export default Header;
