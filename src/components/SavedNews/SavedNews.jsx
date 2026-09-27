import "./SavedNews.css";

import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Footer from "../Footer/Footer.jsx";

const mockSavedArticles = [
  {
    _id: "1",
    keyword: "Tecnología",
    title: "La tecnología continúa transformando la vida cotidiana",
    description:
      "Nuevas herramientas digitales siguen cambiando la manera en que trabajamos, aprendemos y nos comunicamos.",
    publishedAt: "2026-09-15T12:00:00Z",
    url: "https://example.com/technology-1",
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    source: {
      name: "Technology Daily",
    },
  },
  {
    _id: "2",
    keyword: "Ciencia",
    title: "Nuevos avances impulsan la investigación científica",
    description:
      "Equipos internacionales trabajan en nuevas tecnologías y métodos para acelerar descubrimientos científicos.",
    publishedAt: "2026-09-14T10:30:00Z",
    url: "https://example.com/science-1",
    urlToImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    source: {
      name: "Science Journal",
    },
  },
  {
    _id: "3",
    keyword: "Tecnología",
    title: "La inteligencia artificial llega a más sectores",
    description:
      "Empresas y organizaciones están incorporando nuevas aplicaciones de inteligencia artificial en sus operaciones.",
    publishedAt: "2026-09-13T08:15:00Z",
    url: "https://example.com/technology-2",
    urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    source: {
      name: "Digital News",
    },
  },
];

function SavedNews({ onLoginClick }) {
  const keywordCounts = mockSavedArticles.reduce((counts, article) => {
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
      </main>

      <Footer />
    </div>
  );
}

export default SavedNews;
