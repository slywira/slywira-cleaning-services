
import "./Carpetcleaning.css";
import Carpetcleaningimage from "../assets/carpetcleaning.png";

function Carpetcleaning({ setPage }) {
  return (
    <div className="carpetcontainer">

      <div
        className="back-link"
        onClick={() => setPage("services")}
      >
        <span>←</span> Back to All Services
      </div>

      <div className="carpet-content">

        <div className="carpet-left">

          <h1>Carpet Cleaning Services</h1>

          <h2>Fresh, Clean Carpets for a Healthier Space</h2>

          <p>
            We provide professional carpet cleaning services
            that remove dirt, stains and allergens, leaving
            your carpets fresh, clean and looking like new.
          </p>

          <h3>Our Carpet Cleaning Services Include:</h3>

          <ul>
            <li>Deep carpet steam cleaning</li>
            <li>Stain and spot removal</li>
            <li>Odour elimination</li>
            <li>Allergen and bacteria removal</li>
            <li>Fast drying and minimal disruption</li>
          </ul>

          {/* Mobile image */}
          <div className="carpet-mobile-image">
            <img src={Carpetcleaningimage} alt="Carpet cleaning" />
          </div>

          <button
            className="Bookacleaning"
            onClick={() => setPage("login")}
          >
            Book a Cleaning →
          </button>

        </div>

        {/* Desktop image */}
        <div className="carpetcleaningcard">
          <img
            src={Carpetcleaningimage}
            alt="Carpet cleaning"
          />

          <div className="carpet-image-text">
            <h3>Freshness in Every Fibre</h3>
            <p>Professional carpet care you can trust.</p>
          </div>
        </div>

      </div>

      <div className="carpet-footer">
        <span>SLYWIRA.</span>
        <span>Cleaning and Property Services | Kenya</span>
      </div>

    </div>
  );
}

export default Carpetcleaning;
