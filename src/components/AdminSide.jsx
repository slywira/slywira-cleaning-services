
import "./AdminSide.css";

function AdminSide({ activePage, setActivePage, handleLogout }) {
  const menuItems = [
    { name: "Overview", icon: "⌂" },
    { name: "Manage Bookings", icon: "▣" },
    { name: "Manage Customers", icon: "♙" },
    { name: "Manage Enquiries", icon: "✉" },
    { name: "Manage Payments", icon: "▤" },
    { name: "Manage Services", icon: "⚙" },
  ];

  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">
        <h2>Slywira.</h2>
        <p>ADMIN PANEL</p>
      </div>

      <nav className="admin-menu">

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name ? "admin-menu-item active" : "admin-menu-item"
            }
            onClick={() => setActivePage(item.name)}
          >
            <span className="admin-icon">{item.icon}</span>
            {item.name}
          </button>
        ))}

      </nav>

      <button className="admin-logout" onClick={handleLogout}>
        <span>↪</span> Logout
      </button>

    </aside>
  );
}

export default AdminSide;
