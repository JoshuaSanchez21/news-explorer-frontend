import "./NewsCard.css";

function formatDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function NewsCard({ article, isSaved = false, onDelete }) {
  function handleSaveClick() {}

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <a
          className="news-card__image-link"
          href={article.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir noticia: ${article.title || "Sin título"}`}
        >
          {isSaved && article.keyword && (
            <span className="news-card__keyword">{article.keyword}</span>
          )}

          {article.urlToImage && (
            <img
              className="news-card__image"
              src={article.urlToImage}
              alt={article.title || "Imagen de noticia"}
            />
          )}
        </a>

        <div className="news-card__action-container">
          {!isSaved && (
            <>
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
            </>
          )}

          {isSaved && (
            <button
              className="news-card__delete-button"
              type="button"
              aria-label="Eliminar artículo guardado"
              onClick={() => {
                if (onDelete) {
                  onDelete(article);
                }
              }}
            >
              <span className="news-card__delete-icon" />
            </button>
          )}
        </div>
      </div>

      <a
        className="news-card__link"
        href={article.url}
        target="_blank"
        rel="noreferrer"
      >
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
