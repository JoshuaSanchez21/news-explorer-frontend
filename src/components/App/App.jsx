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
import { authorize, getUserInfo } from "../../utils/MainApi.js";

function App() {
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [isAuthChecking, setIsAuthChecking] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    getUserInfo(token)
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setLoggedIn(false);
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
    closeAllPopups();
    navigate("/");
  }

  function handleLogin(email, password) {
    return authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return getUserInfo(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        closeAllPopups();
      })
      .catch((error) => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setLoggedIn(false);

        return Promise.reject(error);
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
              />
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute onLoginClick={handleLoginClick}>
                <SavedNews onLoginClick={handleLoginClick} />
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
