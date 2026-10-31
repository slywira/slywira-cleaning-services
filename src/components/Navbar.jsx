import "./Navbar.css";

function Navbar({ navigate = () => {} }) {
  return (
    <nav className="navbar">
      <h2 onClick={() => navigate("home")}>
        Slywira.
      </h2>

      <div className="nav-links">
        <button type="button" onClick={() => navigate("home")}>Home</button>
        <button type="button" onClick={() => navigate("services")}>Services</button>
        <button type="button" onClick={() => navigate("about")}>About</button>
        <button type="button" onClick={() => navigate("contact")}>Contact</button>
      </div>
    </nav>
  );
}

export default Navbar;