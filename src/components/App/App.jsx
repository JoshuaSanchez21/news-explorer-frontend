import { Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>
    </div>
  );
}

export default App;
