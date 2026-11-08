
import "./CustomerSide.css";

function CustomerSide({ activePage, setActivePage, handleLogout }) {
  const menuItems = [
    { name: "Overview", icon: "⌂" },
    { name: "My Bookings", icon: "▣" },
    { name: "My Payments", icon: "▤" },
    { name: "My Profile", icon: "♙" },
  ];

  return (
    <aside className="customer-sidebar">

      <div className="customer-logo">
        <h2>Slywira.</h2>
        <p>CUSTOMER PORTAL</p>
      </div>

      <nav className="customer-menu">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name
                ? "customer-menu-item active"
                : "customer-menu-item"
            }
            onClick={() => setActivePage(item.name)}
          >
            <span className="customer-icon">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>

      <button className="customer-logout" onClick={handleLogout}>
        <span>↪</span> Logout
      </button>

    </aside>
  );
}

export default CustomerSide;
