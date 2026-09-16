import "./SavedNewsHeader.css";

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__label">Artículos guardados</p>

      <h1 className="saved-news-header__title">
        Joshua, tienes 0 artículos guardados
      </h1>

      <p className="saved-news-header__keywords">
        Por palabras clave:{" "}
        <span className="saved-news-header__keywords-bold">
          todavía no hay palabras clave
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
