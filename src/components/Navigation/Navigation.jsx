import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <a className="navigation__link navigation__link_active" href="/">
        Inicio
      </a>

      <button className="navigation__login-button" type="button">
        Iniciar sesión
      </button>
    </nav>
  );
}

export default Navigation;
