
import "./Homecleaning.css";
import Homecleaninginfoimage from "../assets/homecleaninginfo.png";

function Homecleaning({ setPage }) {
  return (
    <div className="homecontainer">

      <div className="back-link" onClick={() => setPage("services")}>
        <span>←</span> Back to All Services
      </div>

      <div className="home-content">

        <div className="left">

          <p className="home-label">Slywira Cleaning Services</p>

          <h1>
            Home Cleaning Services
          </h1>

          <h2>
            Enjoy a clean, fresh and comfortable home.
          </h2>

          <p className="home-description">
            We provide reliable cleaning solutions tailored to your
            needs. Whether you need a one-time deep clean, regular
            household cleaning, or help preparing your home for a
            special occasion, we are here to help.
          </p>

          <div className="home-services">
            <h3>Our Home Cleaning Services</h3>

            <ul>
              <li>General house cleaning</li>
              <li>Deep cleaning</li>
              <li>Kitchen cleaning</li>
              <li>Bathroom and toilet cleaning</li>
              <li>Bedroom and living room cleaning</li>
              <li>Dusting and surface cleaning</li>
              <li>Vacuuming and mopping</li>
              <li>Window and glass cleaning</li>
              <li>Furniture and appliance cleaning</li>
            </ul>
          </div>

          <div className="mobile-image">
            <img src={Homecleaninginfoimage} alt="Home cleaning" />
          </div>

          <button
            className="Bookacleaning"
            onClick={() => setPage("login")}
          >
            Book a Cleaning <span>→</span>
          </button>

          <p className="home-note">
            A cleaner home. A more comfortable life.
          </p>

        </div>

        <div className="homecleaningcard">

          <img src={Homecleaninginfoimage} alt="Home cleaning" />

          <div className="home-image-text">
            <h2>Freshness Starts at Home</h2>
            <p>Professional care for every corner of your space.</p>
          </div>

        </div>

      </div>

      <div className="home-footer">
        CLEANING AND PROPERTY SERVICES | KENYA
      </div>

    </div>
  );
}

export default Homecleaning;
