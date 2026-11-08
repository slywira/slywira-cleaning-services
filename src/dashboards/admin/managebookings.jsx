
import { useEffect, useState } from "react";
import { getAppBookings, updateAppBookingStatus } from "../../utils/appData";
import "./managebookings.css";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const refreshBookings = async () => {
    setMessage("");
    setError("");
    setLoading(true);
    try {
      setBookings(await getAppBookings());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getAppBookings()
      .then((data) => {
        if (active) setBookings(data);
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load bookings.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const updateStatus = async (bookingId, newStatus) => {
    setError("");
    try {
      const updatedBooking = await updateAppBookingStatus(bookingId, newStatus);
      setBookings((current) =>
        current.map((booking) => booking.id === updatedBooking.id ? updatedBooking : booking)
      );
      setMessage("Booking status updated successfully.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update booking.");
    }
  };

  return (
    <div className="manage-bookings">
      <div className="booking-heading">
        <div>
          <h2>Manage Bookings</h2>
          <p>View and manage customer cleaning bookings.</p>
        </div>

        <button onClick={refreshBookings}>Refresh</button>
      </div>

      {message && <p className="booking-message">{message}</p>}
      {error && <p className="booking-message" role="alert">{error}</p>}

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Service details</th>
                <th>Date</th>
                <th>Time</th>
                <th>Address</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.service}</td>
                  <td>
                    {booking.bedrooms && <div>{booking.bedrooms} bedroom home</div>}
                    {booking.carpetSize && <div>Carpet: {booking.carpetSize}</div>}
                    {booking.officeAreaSqm && (
                      <div>
                        Office: {booking.officeAreaSqm} m²
                        {booking.officeHasCarpet ? " with carpet" : " without carpet"}
                      </div>
                    )}
                    {booking.movingHouseType && <div>Moving size: {booking.movingHouseType}</div>}
                    {booking.movingAdditionalServices?.length > 0 && (
                      <ul className="booking-extra-services">
                        {booking.movingAdditionalServices.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    )}
                    {!booking.bedrooms && !booking.carpetSize && !booking.officeAreaSqm &&
                      !booking.movingHouseType && <span>—</span>}
                  </td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.address}</td>
                  <td>
                    {booking.priceMinimum != null ? (
                      <>
                        <strong>
                          KSh {Number(booking.priceMinimum).toLocaleString()}–
                          {Number(booking.priceMaximum).toLocaleString()}
                          {booking.priceMaximumPlus ? "+" : ""}
                        </strong>
                        <div className="booking-price-note">Indicative; confirm after assessment</div>
                      </>
                    ) : (
                      `KSh ${Number(booking.amount || 0).toLocaleString()}`
                    )}
                  </td>
                  <td>
                    <span className={`booking-status ${booking.status}`}>{booking.status}</span>
                  </td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(event) => updateStatus(booking.id, event.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageBookings;
