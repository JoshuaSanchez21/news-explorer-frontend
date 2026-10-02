import { useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

import { getNews } from "../../utils/NewsApi.js";
import {
  authorize,
  deleteArticle,
  getSavedArticles,
  getUserInfo,
  saveArticle,
} from "../../utils/MainApi.js";

function formatSavedArticle(article) {
  return {
    ...article,
    description: article.text,
    publishedAt: article.date,
    url: article.link,
    urlToImage: article.image,
    source: {
      name: article.source,
    },
  };
}

function App() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isAuthChecking, setIsAuthChecking] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    Promise.all([getUserInfo(token), getSavedArticles(token).catch(() => [])])
      .then(([userData, userArticles]) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        setSavedArticles(userArticles.map(formatSavedArticle));
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setLoggedIn(false);
        setSavedArticles([]);
      })
      .finally(() => {
        setIsAuthChecking(false);
      });
  }, []);

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

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setLoggedIn(false);
    setSavedArticles([]);
    closeAllPopups();
    navigate("/");
  }

  function handleLogin(email, password) {
    return authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return Promise.all([
          getUserInfo(data.token),
          getSavedArticles(data.token).catch(() => []),
        ]);
      })
      .then(([userData, userArticles]) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        setSavedArticles(userArticles.map(formatSavedArticle));
        closeAllPopups();
      })
      .catch((error) => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setLoggedIn(false);
        setSavedArticles([]);

        return Promise.reject(error);
      });
  }

  function handleSaveArticle(article) {
    const token = localStorage.getItem("jwt");

    if (!token) {
      handleLoginClick();
      return Promise.resolve();
    }

    const articleData = {
      keyword: currentSearch,
      title: article.title,
      text: article.description || "Sin descripción disponible",
      date: article.publishedAt,
      source: article.source?.name || "Fuente desconocida",
      link: article.url,
      image: article.urlToImage,
    };

    return saveArticle(articleData, token).then((savedArticle) => {
      setSavedArticles((currentArticles) => [
        ...currentArticles,
        formatSavedArticle(savedArticle),
      ]);
    });
  }

  function handleDeleteArticle(article) {
    const token = localStorage.getItem("jwt");

    if (!token || !article?._id) {
      return Promise.resolve();
    }

    return deleteArticle(article._id, token).then(() => {
      setSavedArticles((currentArticles) =>
        currentArticles.filter(
          (currentArticle) => currentArticle._id !== article._id,
        ),
      );
    });
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
        const receivedArticles = (data.articles || []).filter(
          (article) =>
            article.title &&
            article.publishedAt &&
            article.url &&
            article.urlToImage &&
            article.source?.name,
        );

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
    <CurrentUserContext.Provider
      value={{
        currentUser,
        loggedIn,
        isAuthChecking,
        onLogout: handleLogout,
      }}
    >
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
                savedArticles={savedArticles}
                onSaveArticle={handleSaveArticle}
                onDeleteArticle={handleDeleteArticle}
              />
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute onLoginClick={handleLoginClick}>
                <SavedNews
                  onLoginClick={handleLoginClick}
                  savedArticles={savedArticles}
                  onDeleteArticle={handleDeleteArticle}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        {activeModal === "login" && (
          <Login
            isOpen
            onClose={closeAllPopups}
            onRegisterClick={handleRegisterClick}
            onLogin={handleLogin}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
