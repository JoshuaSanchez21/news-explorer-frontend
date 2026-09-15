import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2026 NewsExplorer, Powered by News API
      </p>

      <nav className="footer__navigation">
        <a className="footer__link" href="/">
          Inicio
        </a>

        <a
          className="footer__link"
          href="https://tripleten.com/"
          target="_blank"
          rel="noreferrer"
        >
          TripleTen
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
