import "./NewsCard.css";

function formatDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function NewsCard({ article }) {
  return (
    <article className="news-card">
      <img
        className="news-card__image"
        src={article.urlToImage}
        alt={article.title}
      />

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(article.publishedAt)}</p>

        <h3 className="news-card__title">{article.title}</h3>

        <p className="news-card__description">{article.description}</p>

        <p className="news-card__source">{article.source.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
