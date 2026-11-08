import { useEffect, useState } from "react";
import { getAppEnquiries, updateAppEnquiryStatus } from "../../utils/appData";
import "./manageenquires.css";

function ManageEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppEnquiries()
      .then(setEnquiries)
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Unable to load enquiries.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    setError("");
    try {
      const updated = await updateAppEnquiryStatus(id, status);
      setEnquiries((current) => current.map((item) => item.id === id ? updated : item));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update enquiry.");
    }
  };

  return (
    <section className="admin-table-panel admin-enquiries">
      <div className="admin-section-heading">
        <div>
          <h2>Enquiries</h2>
          <p>Review customer questions and update their progress.</p>
        </div>
        <span className="admin-record-count">{enquiries.length} enquiries</span>
      </div>
      {error && <p className="admin-empty-state" role="alert">{error}</p>}
      {loading ? (
        <p>Loading enquiries...</p>
      ) : error ? null : enquiries.length === 0 ? (
        <p className="admin-empty-state">No enquiries found.</p>
      ) : (
        <div className="admin-data-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.customerName}</strong>
                    <small className="enquiry-email">{item.email}</small>
                  </td>
                  <td>{item.service}</td>
                  <td className="enquiry-message">{item.message}</td>
                  <td>
                    <select
                      className="enquiry-status-select"
                      value={item.status}
                      onChange={(event) => updateStatus(item.id, event.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ManageEnquiries;