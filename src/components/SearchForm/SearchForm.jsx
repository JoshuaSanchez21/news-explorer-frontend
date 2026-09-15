import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search-form">
      <input
        className="search-form__input"
        type="text"
        placeholder="Introduce un tema"
      />

      <button className="search-form__button" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
