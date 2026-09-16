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
  function handleSaveClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  return (
    <article className="news-card">
      <a
        className="news-card__link"
        href={article.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="news-card__image-container">
          {article.urlToImage && (
            <img
              className="news-card__image"
              src={article.urlToImage}
              alt={article.title || "Imagen de noticia"}
            />
          )}

          <div className="news-card__save-container">
            <span className="news-card__tooltip">
              Inicia sesión para guardar artículos
            </span>

            <button
              className="news-card__save-button"
              type="button"
              aria-label="Guardar artículo"
              onClick={handleSaveClick}
            >
              <svg
                className="news-card__save-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.5 4.75C6.5 3.78 7.28 3 8.25 3h7.5c.97 0 1.75.78 1.75 1.75v15.1a.5.5 0 0 1-.78.42L12 17.12l-4.72 3.15a.5.5 0 0 1-.78-.42V4.75Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="news-card__content">
          <p className="news-card__date">{formatDate(article.publishedAt)}</p>

          <h3 className="news-card__title">{article.title || "Sin título"}</h3>

          {article.description && (
            <p className="news-card__description">{article.description}</p>
          )}

          <p className="news-card__source">
            {article.source?.name || "Fuente desconocida"}
          </p>
        </div>
      </a>
    </article>
  );
}

export default NewsCard;
