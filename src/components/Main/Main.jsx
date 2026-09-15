import "./Main.css";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";

function Main() {
  return (
    <main className="main">
      <section className="main__hero">
        <Header />

        <div className="main__hero-content">
          <h1 className="main__title">
            ¿Qué está pasando
            <br />
            en el mundo?
          </h1>

          <p className="main__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en
            tu cuenta personal.
          </p>

          <SearchForm />
        </div>
      </section>

      <About />
      <Footer />
    </main>
  );
}

export default Main;
