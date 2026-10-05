import { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardList({
  articles,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
  onRegisterClick,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  function handleShowMore() {
    setVisibleCount((currentCount) => currentCount + 3);
  }

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        <h2 className="news-card-list__title">Resultados de búsqueda</h2>

        <div className="news-card-list__grid">
          {visibleArticles.map((article, index) => {
            const savedArticle = savedArticles.find(
              (item) => item.url === article.url,
            );

            return (
              <NewsCard
                key={`${article.url}-${index}`}
                article={article}
                isArticleSaved={Boolean(savedArticle)}
                savedArticle={savedArticle}
                onSave={onSaveArticle}
                onDelete={onDeleteArticle}
                onRegisterClick={onRegisterClick}
              />
            );
          })}
        </div>

        {hasMoreArticles && (
          <button
            className="news-card-list__more-button"
            type="button"
            onClick={handleShowMore}
          >
            Mostrar más
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
