import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setKeyword(event.target.value);

    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setError("Por favor, introduzca una palabra clave");
      return;
    }

    setError("");
    onSearch(trimmedKeyword);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__field">
        <input
          className="search-form__input"
          type="text"
          placeholder="Introduce un tema"
          value={keyword}
          onChange={handleChange}
          required
        />

        {error && <span className="search-form__error">{error}</span>}
      </div>

      <button className="search-form__button" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
