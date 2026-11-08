
import { useEffect, useState } from "react";
import AdminSide from "../../components/AdminSide";
import ManageBookings from "./managebookings";
import ManageCustomers from "./managecustomers";
import ManageEnquiries from "./manageenquires";
import ManagePayments from "./managepayments";
import ManageServices from "./manageservices";
import {
  ensureDemoData,
  signOutDemoUser,
} from "../../utils/demoData";
import { getAppDashboardStats } from "../../utils/appData";
import { getSupabaseClient } from "../../supabaseClient";

import "./admindashboard.css";

function AdminDashboard({ setPage }) {
  const [activePage, setActivePage] = useState("Overview");
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalCustomers: 0,
    totalEnquiries: 0,
    totalRevenue: 0,
  });
  const [statsError, setStatsError] = useState("");
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    if (!getSupabaseClient()) ensureDemoData();
    getAppDashboardStats()
      .then(setStats)
      .catch((error) => {
        setStatsError(error instanceof Error ? error.message : "Unable to load dashboard statistics.");
      });
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setLogoutError(error.message);
        return;
      }
    }
    signOutDemoUser();
    setPage("home");
  };

  return (
    <div className="admin-layout">
      <AdminSide
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

      <main className="admin-main-content">
        <header className="admin-topbar">
          <h2>{activePage}</h2>
          <p>Slywira Administration</p>
        </header>

        <section className="admin-page-content">
          {logoutError && <p role="alert">{logoutError}</p>}
          {activePage === "Overview" && (
            <>
              <h2>Welcome to Slywira</h2>
              <p>Manage your cleaning business from one place.</p>
              {statsError && <p role="alert">{statsError}</p>}

              <div className="admin-statistics">
                <div className="admin-stat-card">
                  <h3>Total Bookings</h3>
                  <h1>{stats.totalBookings}</h1>
                </div>

                <div className="admin-stat-card">
                  <h3>Total Customers</h3>
                  <h1>{stats.totalCustomers}</h1>
                </div>

                <div className="admin-stat-card">
                  <h3>Enquiries</h3>
                  <h1>{stats.totalEnquiries}</h1>
                </div>

                <div className="admin-stat-card">
                  <h3>Payments</h3>
                  <h1>KSh {stats.totalRevenue.toLocaleString()}</h1>
                </div>
              </div>

              <div className="admin-welcome">
                <h2>Business Overview</h2>
                <p>
                  Monitor bookings, customers, services and payments through your administration
                  panel.
                </p>
              </div>
            </>
          )}

          {activePage === "Manage Bookings" && <ManageBookings />}
          {activePage === "Manage Customers" && <ManageCustomers />}
          {activePage === "Manage Enquiries" && <ManageEnquiries />}
          {activePage === "Manage Payments" && <ManagePayments />}
          {activePage === "Manage Services" && <ManageServices />}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
