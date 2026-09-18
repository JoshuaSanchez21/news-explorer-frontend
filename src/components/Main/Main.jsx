import "./Main.css";

import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";

function Main({
  onLoginClick,
  articles,
  isLoading,
  hasSearched,
  searchError,
  currentSearch,
  onSearch,
}) {
  return (
    <>
      <Header theme="light" onLoginClick={onLoginClick} />

      <main className="main">
        <section className="main__hero">
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

            <SearchForm onSearch={onSearch} />
          </div>
        </section>

        {isLoading && <Preloader />}

        {!isLoading && hasSearched && !searchError && articles.length === 0 && (
          <NothingFound />
        )}

        {!isLoading && !searchError && articles.length > 0 && (
          <NewsCardList key={currentSearch} articles={articles} />
        )}

        {searchError && (
          <section className="main__error">
            <p className="main__error-text">{searchError}</p>
          </section>
        )}

        <About />
      </main>

      <Footer />
    </>
  );
}

export default Main;
