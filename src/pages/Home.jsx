
import "./Home.css";

function Home({ setPage }) {
  return (
    <section className="intro">

      <div className="intro-content">

        <p className="intro-label">
          SLYWIRA CLEANING SERVICES
        </p>

        <h2>
          Defined by <span>Detail.</span>
        </h2>

        <p className="intro-description">
          Cleaning and property services for homes, offices,
          <br />
          and spaces that need a finish that feels complete.
        </p>

        <div className="btns">

          <button
            type="button"
            className="Book"
            onClick={() => setPage("login")}
          >
            Book a Service <span>→</span>
          </button>

          <button
            type="button"
            className="view"
            onClick={() => setPage("services")}
          >
            View Services
          </button>

        </div>

      </div>

      <div className="cleaning">
        <p> CLEANING AND PROPERTY SERVICES | KENYA </p>
      </div>

    </section>
  );
}

export default Home;
