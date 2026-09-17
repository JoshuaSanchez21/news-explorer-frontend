import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";

function App() {
  const [activeModal, setActiveModal] = useState(null);

  function handleLoginClick() {
    setActiveModal("login");
  }

  function handleRegisterClick() {
    setActiveModal("register");
  }

  function closeAllPopups() {
    setActiveModal(null);
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main onLoginClick={handleLoginClick} />} />

        <Route
          path="/saved-news"
          element={<SavedNews onLoginClick={handleLoginClick} />}
        />
      </Routes>

      <Login
        isOpen={activeModal === "login"}
        onClose={closeAllPopups}
        onRegisterClick={handleRegisterClick}
      />

      <Register
        isOpen={activeModal === "register"}
        onClose={closeAllPopups}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
}

export default App;
