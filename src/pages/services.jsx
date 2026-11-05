
import "./services.css";

import homecleaningimage from "../assets/homecleaning.png";
import officecleaningimage from "../assets/officecleaning.png";
import carpetcleaningimage from "../assets/carpetcleaning.png";
import movingcleaningimage from "../assets/movingout.png";

function Services({ setPage }) {
  return (
    <div className="services-page">

      <div className="services-heading">
        <p>WHAT WE OFFER</p>
        <h2><span>.</span> Our Services</h2>
        <h3>
          Professional cleaning solutions for every space.
        </h3>
      </div>

      <div className="servicecontainer">

        {/* Home Cleaning */}
        <div
          className="servicecard"
          onClick={() => setPage("homecleaning")}
        >
          <div className="service-image">
            <img src={homecleaningimage} alt="Home Cleaning" />
            <span className="service-number">01</span>
          </div>

          <div className="service-info">
            <h1>Home Cleaning</h1>
            <p>
              Enjoy a fresh and comfortable home with our
              reliable household cleaning services.
            </p>
            <span className="service-link">Explore Service →</span>
          </div>
        </div>

        {/* Office Cleaning */}
        <div
          className="servicecard"
          onClick={() => setPage("officecleaning")}
        >
          <div className="service-image">
            <img src={officecleaningimage} alt="Office Cleaning" />
            <span className="service-number">02</span>
          </div>

          <div className="service-info">
            <h1>Office Cleaning</h1>
            <p>
              Maintain a clean and welcoming workplace
              with professional office cleaning.
            </p>
            <span className="service-link">Explore Service →</span>
          </div>
        </div>

        {/* Carpet Cleaning */}
        <div
          className="servicecard"
          onClick={() => setPage("carpetcleaning")}
        >
          <div className="service-image">
            <img src={carpetcleaningimage} alt="Carpet Cleaning" />
            <span className="service-number">03</span>
          </div>

          <div className="service-info">
            <h1>Carpet Cleaning</h1>
            <p>
              Remove dirt, stains and unpleasant odours
              to restore freshness to your carpets.
            </p>
            <span className="service-link">Explore Service →</span>
          </div>
        </div>

        {/* Move-out Cleaning */}
        <div
          className="servicecard"
          onClick={() => setPage("movingout")}
        >
          <div className="service-image">
            <img src={movingcleaningimage} alt="Move-out Cleaning" />
            <span className="service-number">04</span>
          </div>

          <div className="service-info">
            <h1>Move-out Cleaning</h1>
            <p>
              Leave your property spotless and ready
              for its next occupant.
            </p>
            <span className="service-link">Explore Service →</span>
          </div>
        </div>

      </div>

      <div className="services-footer">
        CLEANING AND PROPERTY SERVICES | KENYA
      </div>

    </div>
  );
}

export default Services;
