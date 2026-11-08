function Mypayments({ payments }) {
  const paidTotal = payments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const pendingTotal = payments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  return (
    <section className="customer-content">
      <div className="customer-section-heading">
        <div>
          <p className="customer-eyebrow">ACCOUNT ACTIVITY</p>
          <h2>My payments</h2>
          <p>Review your payment history and any balances due.</p>
        </div>
        <span className="customer-count">{payments.length} records</span>
      </div>

      <div className="payment-summary-grid">
        <article className="payment-summary-card">
          <span className="payment-summary-icon" aria-hidden="true">✓</span>
          <div>
            <p>Total paid</p>
            <h3>KSh {paidTotal.toLocaleString()}</h3>
          </div>
        </article>
        <article className="payment-summary-card pending">
          <span className="payment-summary-icon" aria-hidden="true">◷</span>
          <div>
            <p>Pending balance</p>
            <h3>KSh {pendingTotal.toLocaleString()}</h3>
          </div>
        </article>
      </div>

      <div className="customer-list-heading">
        <div>
          <h3>Payment history</h3>
          <p>Transactions associated with your cleaning services.</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="customer-empty-state">
          <span aria-hidden="true">◈</span>
          <h3>No payments yet</h3>
          <p>Your payment records will appear here after a service is booked.</p>
        </div>
      ) : (
        <div className="customer-payment-list">
          {payments.map((payment) => (
            <article key={payment.id} className="customer-payment-item">
              <div className="payment-method-icon" aria-hidden="true">◈</div>
              <div className="customer-payment-details">
                <h3>{payment.method}</h3>
                <p>{payment.id} · {payment.date}</p>
              </div>
              <div className="customer-payment-amount">
                <strong>KSh {Number(payment.amount || 0).toLocaleString()}</strong>
                <span className={`payment-status ${payment.status}`}>{payment.status}</span>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="payment-note">
        Need help with a transaction? Contact us at info@slywira.co.ke.
      </p>
    </section>
  );
}

export default Mypayments;