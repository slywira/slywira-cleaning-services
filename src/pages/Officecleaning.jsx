
import "./Officecleaning.css";
import Officecleaninginfoimage from "../assets/officecleaninginfo.png";

function Officecleaning({ setPage }) {

  return (
    <div className="officecontainer">

      {/* Back to Services */}
      <div
        className="back-link"
        onClick={() => setPage("services")}
      >
        <span>←</span> Back to All Services
      </div>

      <div className="office-content">

        {/* Left Section */}
        <div className="office-left">

          <p className="office-label">
            SLYWIRA CLEANING SERVICES
          </p>

          <h1>
            Office Cleaning Services
          </h1>

          <h2>
            A Cleaner Office, A Better Workplace.
          </h2>

          <p className="office-description">
            A clean and organised office creates a healthy,
            comfortable and productive working environment.
            Our professional office cleaning services help
            keep your workplace fresh, spotless and welcoming.
          </p>

          <h3>Our Office Cleaning Services Include:</h3>

          <ul>
            <li>Desk and workstation cleaning</li>
            <li>Floor sweeping, mopping and vacuuming</li>
            <li>Window and glass cleaning</li>
            <li>Washroom cleaning and sanitisation</li>
            <li>Dusting furniture and office equipment</li>
            <li>Waste collection and disposal</li>
            <li>Kitchen and breakroom cleaning</li>
          </ul>

          <button
            className="Bookacleaning"
            onClick={() => setPage("login")}
          >
            Book a Cleaning →
          </button>

        </div>

        {/* Right Section */}
        <div className="office-right">

          <img
            src={Officecleaninginfoimage}
            alt="Professional office cleaning"
          />

          <div className="office-image-text">
            <h3>Professional Office Care</h3>
            <p>We care about every detail.</p>
          </div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="office-footer">
        <p>SLYWIRA.</p>
        <p>Cleaning and Property Services | Kenya</p>
      </div>

    </div>
  );
}

export default Officecleaning;
