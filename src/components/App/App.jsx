import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

import { getNews } from "../../utils/NewsApi.js";

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const [articles, setArticles] = useState(() => {
    const storedArticles = localStorage.getItem("newsExplorerArticles");

    if (!storedArticles) {
      return [];
    }

    try {
      return JSON.parse(storedArticles);
    } catch {
      localStorage.removeItem("newsExplorerArticles");
      return [];
    }
  });

  const [currentSearch, setCurrentSearch] = useState(
    () => localStorage.getItem("newsExplorerKeyword") || "",
  );

  const [isLoading, setIsLoading] = useState(false);

  const [hasSearched, setHasSearched] = useState(() =>
    Boolean(localStorage.getItem("newsExplorerKeyword")),
  );

  const [searchError, setSearchError] = useState("");

  function handleLoginClick() {
    setActiveModal("login");
  }

  function handleRegisterClick() {
    setActiveModal("register");
  }

  function handleRegistrationSuccess() {
    setActiveModal("success");
  }

  function closeAllPopups() {
    setActiveModal(null);
  }

  function handleSearch(keyword) {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError("");
    setArticles([]);
    setCurrentSearch(keyword);

    localStorage.removeItem("newsExplorerArticles");
    localStorage.removeItem("newsExplorerKeyword");

    getNews(keyword)
      .then((data) => {
        const receivedArticles = data.articles || [];

        setArticles(receivedArticles);

        localStorage.setItem(
          "newsExplorerArticles",
          JSON.stringify(receivedArticles),
        );

        localStorage.setItem("newsExplorerKeyword", keyword);
      })
      .catch(() => {
        setSearchError(
          "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              onLoginClick={handleLoginClick}
              articles={articles}
              isLoading={isLoading}
              hasSearched={hasSearched}
              searchError={searchError}
              currentSearch={currentSearch}
              onSearch={handleSearch}
            />
          }
        />

        <Route
          path="/saved-news"
          element={<SavedNews onLoginClick={handleLoginClick} />}
        />
      </Routes>

      {activeModal === "login" && (
        <Login
          isOpen
          onClose={closeAllPopups}
          onRegisterClick={handleRegisterClick}
        />
      )}

      {activeModal === "register" && (
        <Register
          isOpen
          onClose={closeAllPopups}
          onLoginClick={handleLoginClick}
          onSuccess={handleRegistrationSuccess}
        />
      )}

      {activeModal === "success" && (
        <InfoTooltip
          isOpen
          onClose={closeAllPopups}
          onLoginClick={handleLoginClick}
        />
      )}
    </div>
  );
}

export default App;
