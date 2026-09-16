import "./SavedNews.css";

import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Footer from "../Footer/Footer.jsx";

const mockSavedArticles = [
  // conserva aquí los tres objetos anteriores
];

function SavedNews() {
  const keywordCounts = mockSavedArticles.reduce((counts, article) => {
    counts[article.keyword] = (counts[article.keyword] || 0) + 1;

    return counts;
  }, {});

  const sortedKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);

  return (
    <main className="saved-news">
      <Header theme="dark" />

      <SavedNewsHeader
        userName="Joshua"
        articlesCount={mockSavedArticles.length}
        keywords={sortedKeywords}
      />

      <section className="saved-news__articles">
        <div className="saved-news__grid">
          {mockSavedArticles.map((article) => (
            <NewsCard key={article._id} article={article} isSaved />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default SavedNews;
