
import "./Movingout.css";
import Movingoutimage from "../assets/movingout.png";

function Movingout({ setPage }) {
  return (
    <div className="moving-container">

     
      <div
        className="back-link"
        onClick={() => setPage("services")}
      >
        <span>←</span> Back to All Services
      </div>

      <div className="moving-content">

        {/* Left Section */}
        <div className="moving-left">

          <p className="moving-label">
            SLYWIRA CLEANING SERVICES
          </p>

          <h1>
            Moving Made Easy
          </h1>

          <h2>
            Your New Beginning Starts Here.
          </h2>

          <p className="moving-description">
            Make your next move stress-free with our
            professional moving services. We handle your
            belongings with care, ensuring a safe, efficient
            and hassle-free relocation.
          </p>

          <h3>Our Moving Services Include:</h3>

          <ul>
            <li>Residential moving</li>
            <li>Commercial moving</li>
            <li>Packing and unpacking services</li>
            <li>Loading and unloading</li>
            <li>Local and long-distance moving</li>
          </ul>

        
          <div className="moving-mobile-image">
            <img
              src={Movingoutimage}
              alt="Professional moving services"
            />
          </div>

          <button
            className="moving-book-button"
            onClick={() => setPage("login")}
          >
            Book a Moving Service →
          </button>

        </div>

      
        <div className="moving-right">

          <img
            src={Movingoutimage}
            alt="Professional moving services"
          />

          <div className="moving-image-text">
            <h3>Moving With Care</h3>
            <p>Your belongings deserve the best care.</p>
          </div>

        </div>

      </div>

     
      <div className="moving-footer">
        <p>SLYWIRA.</p>
        <p>Cleaning and Property Services | Kenya</p>
      </div>

    </div>
  );
}

export default Movingout;
