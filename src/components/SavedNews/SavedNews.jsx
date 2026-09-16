import "./SavedNews.css";

import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import Footer from "../Footer/Footer.jsx";

function SavedNews() {
  return (
    <main className="saved-news">
      <div className="saved-news__header">
        <Header />
      </div>

      <SavedNewsHeader />

      <section className="saved-news__articles">
        <p className="saved-news__empty">
          Todavía no tienes artículos guardados.
        </p>
      </section>

      <Footer />
    </main>
  );
}

export default SavedNews;
