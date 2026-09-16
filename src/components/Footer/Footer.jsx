import "./Footer.css";
import facebookIcon from "../../images/facebook.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2021 Supersite, Powered by News API</p>

      <div className="footer__content">
        <nav className="footer__navigation">
          <a className="footer__link" href="/">
            Inicio
          </a>

          <a
            className="footer__link"
            href="https://practicum.com/"
            target="_blank"
            rel="noreferrer"
          >
            Practicum
          </a>
        </nav>

        <div className="footer__social">
          <a
            className="footer__social-link"
            href="https://github.com/JoshuaSanchez21"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg className="footer__social-icon">
              <use href="/icons.svg#github-icon" />
            </svg>
          </a>

          <a
            className="footer__social-link"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img className="footer__social-icon" src={facebookIcon} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
