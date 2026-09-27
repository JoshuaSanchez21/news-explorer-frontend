import "./SavedNewsHeader.css";

function SavedNewsHeader({
  userName = "Usuario",
  articlesCount = 0,
  keywords = [],
}) {
  function getKeywordsText() {
    if (!Array.isArray(keywords) || keywords.length === 0) {
      return "todavía no hay palabras clave";
    }

    if (keywords.length <= 3) {
      return keywords.join(", ");
    }

    const remainingCount = keywords.length - 2;

    return `${keywords[0]}, ${keywords[1]} y ${remainingCount} más`;
  }

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__label">Artículos guardados</p>

      <h1 className="saved-news-header__title">
        {userName}, tienes {articlesCount} artículos guardados
      </h1>

      <p className="saved-news-header__keywords">
        Por palabras clave:{" "}
        <span className="saved-news-header__keywords-bold">
          {getKeywordsText()}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
