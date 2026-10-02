import { useContext } from "react";
import "./SavedNews.css";

import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Footer from "../Footer/Footer.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function SavedNews({ onLoginClick, savedArticles, onDeleteArticle }) {
  const { currentUser } = useContext(CurrentUserContext);

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
            {savedArticles.map((article) => (
              <NewsCard
                key={article._id}
                article={article}
                isSaved
                onDelete={onDeleteArticle}
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
