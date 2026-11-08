import { useEffect, useState } from "react";
import { getAppPayments } from "../../utils/appData";
import "./managepayments.css";

function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppPayments()
      .then(setPayments)
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Unable to load payments.");
      })
      .finally(() => setLoading(false));
  }, []);

  const paidTotal = payments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const pendingTotal = payments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  return (
    <section className="admin-table-panel admin-payments">
      <div className="admin-section-heading">
        <div>
          <h2>Payments</h2>
          <p>Review payment records and outstanding balances.</p>
        </div>
        <span className="admin-record-count">{payments.length} records</span>
      </div>

      <div className="admin-payment-summary">
        <article>
          <span>Total paid</span>
          <strong>KSh {paidTotal.toLocaleString()}</strong>
        </article>
        <article>
          <span>Pending</span>
          <strong>KSh {pendingTotal.toLocaleString()}</strong>
        </article>
      </div>

      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p className="admin-empty-state" role="alert">{error}</p>
      ) : payments.length === 0 ? (
        <p className="admin-empty-state">No payments found.</p>
      ) : (
        <div className="admin-data-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Customer</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.customerName}</td>
                  <td>{payment.method}</td>
                  <td>KSh {Number(payment.amount || 0).toLocaleString()}</td>
                  <td>
                    <span className={`admin-payment-status ${payment.status}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.date || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ManagePayments;