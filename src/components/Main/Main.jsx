import { useEffect, useState } from "react";
import "./Main.css";

import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";

import { getNews } from "../../utils/NewsApi.js";

function Main() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [lastKeyword, setLastKeyword] = useState("");

  useEffect(() => {
    const storedArticles = localStorage.getItem("newsExplorerArticles");

    const storedKeyword = localStorage.getItem("newsExplorerKeyword");

    if (storedArticles) {
      try {
        const parsedArticles = JSON.parse(storedArticles);

        setArticles(parsedArticles);

        if (parsedArticles.length > 0) {
          setHasSearched(true);
        }
      } catch (error) {
        console.error(
          "No se pudieron recuperar los artículos guardados:",
          error,
        );

        localStorage.removeItem("newsExplorerArticles");
      }
    }

    if (storedKeyword) {
      setLastKeyword(storedKeyword);
    }
  }, []);

  function handleSearch(keyword) {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError("");
    setArticles([]);
    setLastKeyword(keyword);

    localStorage.removeItem("newsExplorerArticles");
    localStorage.removeItem("newsExplorerKeyword");

    getNews(keyword)
      .then((data) => {
        const receivedArticles = data.articles || [];

        setArticles(receivedArticles);

        localStorage.setItem(
          "newsExplorerArticles",
          JSON.stringify(receivedArticles),
        );

        localStorage.setItem("newsExplorerKeyword", keyword);
      })
      .catch((error) => {
        console.error(error);

        setSearchError(
          "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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

          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {isLoading && <Preloader />}

      {!isLoading && hasSearched && !searchError && articles.length === 0 && (
        <NothingFound />
      )}

      {!isLoading && !searchError && articles.length > 0 && (
        <NewsCardList articles={articles} />
      )}

      {searchError && (
        <section className="main__error">
          <p className="main__error-text">{searchError}</p>
        </section>
      )}

      <About />
      <Footer />
    </main>
  );
}

export default Main;
