import "./NothingFound.css";

function NothingFound() {
  return (
    <section className="nothing-found">
      <div className="nothing-found__icon" />

      <h2 className="nothing-found__title">No se ha encontrado nada</h2>

      <p className="nothing-found__text">
        Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda.
      </p>
    </section>
  );
}

export default NothingFound;
