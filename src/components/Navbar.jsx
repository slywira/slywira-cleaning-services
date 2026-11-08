
import "./Navbar.css";

function Navbar({ navigate = () => {} }) {
  return (
    <nav className="navbar">

      <h2
        role="button"
        tabIndex={0}
        onClick={() => navigate("home")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") navigate("home");
        }}
      >
        Slywira<span>.</span>
      </h2>

      <div className="nav-links">
        <button type="button" onClick={() => navigate("home")}>
          Home
        </button>

        <button type="button" onClick={() => navigate("services")}>
          Services
        </button>

        <button type="button" onClick={() => navigate("about")}>
          About
        </button>

        <button type="button" onClick={() => navigate("contact")}>
          Contact
        </button>
      </div>

      <button
        className="nav-book-button"
        onClick={() => navigate("login")}
      >
        Book Now
      </button>

    </nav>
  );
}

export default Navbar;
