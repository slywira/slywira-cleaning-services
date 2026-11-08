import { useEffect, useState } from "react";
import {
  getAppBookings,
  getAppCustomers,
  getAppCustomerEmails,
  getAppPayments,
} from "../../utils/appData";
import "./managecustomers.css";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [customerError, setCustomerError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState("");
  const [payments, setPayments] = useState([]);
  const [paymentError, setPaymentError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadCustomerDetails = async () => {
      const results = await Promise.allSettled([
        getAppCustomers(),
        getAppBookings(),
        getAppPayments(),
        getAppCustomerEmails(),
      ]);
      if (!active) return;

      const [customerResult, bookingResult, paymentResult, emailResult] = results;
      if (customerResult.status === "fulfilled") {
        setCustomers(customerResult.value);
      } else {
        setCustomerError(
          customerResult.reason instanceof Error
            ? customerResult.reason.message
            : "Unable to load customers."
        );
      }

      if (bookingResult.status === "fulfilled") {
        setBookings(bookingResult.value);
      } else {
        setBookingError(
          bookingResult.reason instanceof Error
            ? bookingResult.reason.message
            : "Unable to load customer bookings."
        );
      }

      if (paymentResult.status === "fulfilled") {
        setPayments(paymentResult.value);
      } else {
        setPaymentError(
          paymentResult.reason instanceof Error
            ? paymentResult.reason.message
            : "Unable to load customer payments."
        );
      }

      if (emailResult.status === "fulfilled") {
        setCustomers((currentCustomers) => currentCustomers.map((customer) => ({
          ...customer,
          email: emailResult.value[customer.id] || customer.email || "",
        })));
      } else {
        setEmailError(
          emailResult.reason instanceof Error
            ? emailResult.reason.message
            : "Unable to load customer email addresses."
        );
      }
      setLoading(false);
    };

    loadCustomerDetails();

    return () => {
      active = false;
    };
  }, []);

  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);
  const customerBookings = bookings.filter((booking) => booking.customerId === selectedCustomerId);
  const customerPayments = payments.filter((payment) => payment.customerId === selectedCustomerId);

  return (
    <section className="admin-table-panel admin-customers">
      <div className="admin-section-heading">
        <div>
          <h2>Customers</h2>
          <p>Customer contact information, bookings, and payments.</p>
        </div>
        <span className="admin-record-count">{customers.length} customers</span>
      </div>
      {loading ? (
        <p>Loading customers...</p>
      ) : customerError ? (
        <p className="admin-empty-state" role="alert">{customerError}</p>
      ) : customers.length === 0 ? (
        <p className="admin-empty-state">No customers found.</p>
      ) : (
        <div className="admin-data-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.fullName || "—"}</td>
                  <td>{customer.email || "Not available"}</td>
                  <td>{customer.phone || "—"}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-customer-details-button"
                      aria-expanded={selectedCustomerId === customer.id}
                      onClick={() => setSelectedCustomerId(
                        selectedCustomerId === customer.id ? null : customer.id
                      )}
                    >
                      {selectedCustomerId === customer.id ? "Hide details" : "View details"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !customerError && selectedCustomer && (
        <div className="admin-customer-details">
          <div className="admin-customer-details-heading">
            <div>
              <h3>{selectedCustomer.fullName || "Customer details"}</h3>
              <p>Account ID: {selectedCustomer.id}</p>
            </div>
            <button
              type="button"
              className="admin-customer-details-close"
              onClick={() => setSelectedCustomerId(null)}
            >
              Close
            </button>
          </div>

          <dl className="admin-customer-contact">
            <div>
              <dt>Email</dt>
              <dd>{selectedCustomer.email || "Not available"}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{selectedCustomer.phone || "Not provided"}</dd>
            </div>
          </dl>
          {emailError && <p className="admin-customer-data-error" role="alert">
            Customer email addresses could not be loaded: {emailError}
          </p>}

          <div className="admin-customer-history">
            <h4>Bookings ({customerBookings.length})</h4>
            {bookingError ? (
              <p className="admin-customer-data-error" role="alert">
                Bookings could not be loaded: {bookingError}
              </p>
            ) : customerBookings.length === 0 ? (
              <p>No bookings found for this customer.</p>
            ) : (
              <div className="admin-customer-history-list">
                {customerBookings.map((booking) => (
                  <article key={booking.id}>
                    <strong>{booking.service || "Service"}</strong>
                    <span>{booking.date || "Date not set"}{booking.time ? ` · ${booking.time}` : ""}</span>
                    <span>{booking.address || "Address not provided"}</span>
                    <span>Status: {booking.status || "Unknown"}</span>
                    <span>
                      {booking.priceMinimum != null
                        ? `KSh ${booking.priceMinimum.toLocaleString()}–${Number(booking.priceMaximum || 0).toLocaleString()}${booking.priceMaximumPlus ? "+" : ""}`
                        : `KSh ${Number(booking.amount || 0).toLocaleString()}`}
                    </span>
                    {booking.bedrooms && <span>{booking.bedrooms} bedroom home</span>}
                    {booking.carpetSize && <span>Carpet size: {booking.carpetSize}</span>}
                    {booking.officeAreaSqm && <span>Office area: {booking.officeAreaSqm} m²</span>}
                    {booking.movingHouseType && <span>Moving size: {booking.movingHouseType}</span>}
                    {booking.movingAdditionalServices?.length > 0 && (
                      <span>Additional services: {booking.movingAdditionalServices.join(", ")}</span>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="admin-customer-history">
            <h4>Payments ({customerPayments.length})</h4>
            {paymentError ? (
              <p className="admin-customer-data-error" role="alert">
                Payments could not be loaded: {paymentError}
              </p>
            ) : customerPayments.length === 0 ? (
              <p>No payments found for this customer.</p>
            ) : (
              <div className="admin-customer-history-list">
                {customerPayments.map((payment) => (
                  <article key={payment.id}>
                    <strong>KSh {Number(payment.amount || 0).toLocaleString()}</strong>
                    <span>{payment.date || "Date not set"} · {payment.method || "Method not specified"}</span>
                    <span>Status: {payment.status || "Unknown"}</span>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ManageCustomers;
