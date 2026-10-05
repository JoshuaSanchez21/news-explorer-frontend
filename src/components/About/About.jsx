import "./About.css";
import authorImage from "../../images/author.webp";

function About() {
  return (
    <section className="about">
      <img
        className="about__image"
        src={authorImage}
        alt="Joshua Sánchez, desarrollador de News Explorer"
      />

      <div className="about__content">
        <h2 className="about__title">Acerca del autor</h2>

        <p className="about__text">
          Soy Joshua Sánchez, desarrollador web enfocado en crear aplicaciones
          funcionales, responsivas y fáciles de usar. Trabajo con tecnologías
          como JavaScript, React, Node.js, Express y MongoDB.
        </p>

        <p className="about__text">
          News Explorer forma parte de mi formación en desarrollo web y reúne
          conceptos como consumo de APIs, autenticación con JWT, persistencia de
          datos, diseño responsive y despliegue de una aplicación full stack en
          la nube.
        </p>
      </div>
    </section>
  );
}

export default About;
