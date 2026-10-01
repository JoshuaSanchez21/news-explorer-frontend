import { useContext, useEffect, useState } from "react";
import "./SavedNews.css";

import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Footer from "../Footer/Footer.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { deleteArticle, getSavedArticles } from "../../utils/MainApi.js";

function SavedNews({ onLoginClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    getSavedArticles(token)
      .then((articles) => {
        const formattedArticles = articles.map((article) => ({
          ...article,
          description: article.text,
          publishedAt: article.date,
          url: article.link,
          urlToImage: article.image,
          source: {
            name: article.source,
          },
        }));

        setSavedArticles(formattedArticles);
        setLoadError("");
      })
      .catch(() => {
        setLoadError("No se pudieron cargar los artículos guardados.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleDeleteArticle(article) {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    deleteArticle(article._id, token)
      .then(() => {
        setSavedArticles((currentArticles) =>
          currentArticles.filter(
            (currentArticle) => currentArticle._id !== article._id,
          ),
        );
      })
      .catch(() => {
        setLoadError("No se pudo eliminar el artículo guardado.");
      });
  }

  const keywordCounts = savedArticles.reduce((counts, article) => {
    counts[article.keyword] = (counts[article.keyword] || 0) + 1;

    return counts;
  }, {});

  const sortedKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);

  return (
    <div className="saved-news">
      <Header theme="dark" onLoginClick={onLoginClick} />

      <main className="saved-news__main">
        <SavedNewsHeader
          userName={currentUser?.name || "Usuario"}
          articlesCount={savedArticles.length}
          keywords={sortedKeywords}
        />

        <section className="saved-news__articles">
          <div className="saved-news__grid">
            {isLoading && <p>Cargando artículos guardados...</p>}

            {!isLoading && loadError && <p>{loadError}</p>}

            {!isLoading &&
              !loadError &&
              savedArticles.map((article) => (
                <NewsCard
                  key={article._id}
                  article={article}
                  isSaved
                  onDelete={handleDeleteArticle}
                />
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SavedNews;
