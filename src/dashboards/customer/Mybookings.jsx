import {
  MOVE_OUT_ADDITIONAL_SERVICES,
  MOVE_OUT_HOUSE_PRICES,
} from "../../utils/movingPrices";

function Mybookings({
  bookings,
  bookingForm,
  estimatedPrice,
  onBookingFormChange,
  onSubmit,
  message,
}) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="customer-content">
      <div className="customer-section-heading">
        <div>
          <p className="customer-eyebrow">YOUR SERVICES</p>
          <h2>My bookings</h2>
          <p>Schedule a cleaning or keep track of your upcoming services.</p>
        </div>
        <span className="customer-count">{bookings.length} total</span>
      </div>

      <form className="booking-form" onSubmit={onSubmit}>
        <h3>Request a cleaning</h3>
        <div className="booking-form-grid">
          <label>
            Service
            <select
              value={bookingForm.service}
              onChange={(event) => onBookingFormChange("service", event.target.value)}
            >
              <option value="Home Cleaning">Home Cleaning</option>
              <option value="Office Cleaning">Office Cleaning</option>
              <option value="Carpet Cleaning">Carpet Cleaning</option>
              <option value="Move-out Cleaning">Move-out Cleaning</option>
            </select>
          </label>

          {bookingForm.service === "Home Cleaning" && (
            <label>
              Number of bedrooms
              <select
                value={bookingForm.bedrooms}
                onChange={(event) => onBookingFormChange("bedrooms", event.target.value)}
              >
                <option value="1">1 bedroom</option>
                <option value="2">2 bedrooms</option>
                <option value="3">3 bedrooms</option>
                <option value="4">4 bedrooms</option>
                <option value="5+">5+ bedrooms</option>
              </select>
            </label>
          )}

          {bookingForm.service === "Carpet Cleaning" && (
            <label>
              Carpet size
              <select
                value={bookingForm.carpetSize}
                onChange={(event) => onBookingFormChange("carpetSize", event.target.value)}
              >
                <option value="3x5 ft">3 × 5 ft — KSh 500</option>
                <option value="4x6 ft">4 × 6 ft — KSh 600</option>
                <option value="5x7 ft">5 × 7 ft — KSh 800</option>
                <option value="6x9 ft">6 × 9 ft — KSh 1,000</option>
                <option value="7x10 ft">7 × 10 ft — KSh 1,500</option>
              </select>
            </label>
          )}

          {bookingForm.service === "Move-out Cleaning" && (
            <>
              <label>
                Home size
                <select
                  value={bookingForm.movingHouseType}
                  onChange={(event) => onBookingFormChange("movingHouseType", event.target.value)}
                >
                  {MOVE_OUT_HOUSE_PRICES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label} — KSh {item.minimum.toLocaleString()}–{item.maximum.toLocaleString()}
                      {item.maximumPlus ? "+" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset className="moving-extras-fieldset">
                <legend>Additional moving services (optional)</legend>
                {MOVE_OUT_ADDITIONAL_SERVICES.map((item) => (
                  <label key={item.id} className="moving-extra-option">
                    <input
                      type="checkbox"
                      checked={bookingForm.movingAdditionalServices.includes(item.id)}
                      onChange={(event) => {
                        const selected = bookingForm.movingAdditionalServices;
                        onBookingFormChange(
                          "movingAdditionalServices",
                          event.target.checked
                            ? [...selected, item.id]
                            : selected.filter((serviceId) => serviceId !== item.id)
                        );
                      }}
                    />
                    <span>
                      {item.label} — KSh {item.minimum.toLocaleString()}–
                      {item.maximum.toLocaleString()}
                    </span>
                  </label>
                ))}
              </fieldset>
            </>
          )}

          {bookingForm.service === "Office Cleaning" && (
            <>
              <label>
                Office area (m²)
                <input
                  type="number"
                  min="50"
                  step="0.01"
                  value={bookingForm.officeAreaSqm}
                  onChange={(event) => onBookingFormChange("officeAreaSqm", event.target.value)}
                  placeholder="Minimum 50 m²"
                  required
                />
              </label>
              <label>
                Office has carpet?
                <select
                  value={bookingForm.officeHasCarpet}
                  onChange={(event) => onBookingFormChange("officeHasCarpet", event.target.value)}
                >
                  <option value="no">No carpet - KSh 40/m²</option>
                  <option value="yes">With carpet - KSh 150/m²</option>
                </select>
              </label>
            </>
          )}

          <label>
            Preferred date
            <input
              type="date"
              min={today}
              value={bookingForm.date}
              onChange={(event) => onBookingFormChange("date", event.target.value)}
              required
            />
          </label>

          <label>
            Preferred time
            <input
              type="time"
              value={bookingForm.time}
              onChange={(event) => onBookingFormChange("time", event.target.value)}
              required
            />
          </label>
        </div>

        <label className="booking-address">
          Service address
          <textarea
            rows="3"
            placeholder="Enter your full property address"
            value={bookingForm.address}
            onChange={(event) => onBookingFormChange("address", event.target.value)}
            required
          />
        </label>

        <p className="booking-price-quote">
          Estimated price:{" "}
          <strong>
            {estimatedPrice === null
              ? Number(bookingForm.officeAreaSqm) > 0
                ? "Minimum office area is 50 m²"
                : "Enter the office area to calculate"
              : typeof estimatedPrice === "number"
                ? `KSh ${estimatedPrice.toLocaleString()}`
                : `KSh ${estimatedPrice.minimum.toLocaleString()}–${estimatedPrice.maximum.toLocaleString()}${estimatedPrice.maximumPlus ? "+" : ""}`}
          </strong>
        </p>
        {bookingForm.service === "Move-out Cleaning" && (
          <p className="moving-price-note">
            Indicative prices for local moves within Nairobi. Final price will be confirmed
            after assessing the distance and belongings.
          </p>
        )}

        {message && (
          <p className="customer-message" role="status">
            {message}
          </p>
        )}

        <button type="submit" className="booking-submit-btn">
          Request booking <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="customer-list-heading">
        <div>
          <h3>Booking history</h3>
          <p>Your service requests and their latest status.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="customer-empty-state">
          <span aria-hidden="true">✦</span>
          <h3>No bookings yet</h3>
          <p>Use the form above to schedule your first cleaning service.</p>
        </div>
      ) : (
        <div className="customer-booking-list">
          {bookings.map((booking) => (
            <article key={booking.id} className="customer-booking-item">
              <div className="customer-booking-icon" aria-hidden="true">✦</div>
              <div className="customer-booking-details">
                <div className="customer-booking-title">
                  <h3>{booking.service}</h3>
                  <span className={`booking-status ${booking.status}`}>{booking.status}</span>
                </div>
                <p>
                  {booking.date} at {booking.time}
                </p>
                {booking.bedrooms && <p>{booking.bedrooms} bedroom home</p>}
                {booking.carpetSize && <p>Carpet size: {booking.carpetSize}</p>}
                {booking.movingHouseType && <p>Moving size: {booking.movingHouseType}</p>}
                {booking.movingAdditionalServices?.length > 0 && (
                  <p>Additional services: {booking.movingAdditionalServices.join(", ")}</p>
                )}
                {booking.officeAreaSqm && (
                  <p>
                    {booking.officeAreaSqm} m² office
                    {booking.officeHasCarpet ? " with carpet" : " without carpet"}
                  </p>
                )}
                <p>{booking.address}</p>
              </div>
              <div className="customer-booking-price">
                <span>{booking.priceMinimum != null ? "Indicative price" : "Estimated total"}</span>
                <strong>
                  {booking.priceMinimum != null
                    ? `KSh ${Number(booking.priceMinimum).toLocaleString()}–${Number(booking.priceMaximum).toLocaleString()}${booking.priceMaximumPlus ? "+" : ""}`
                    : `KSh ${Number(booking.amount || 0).toLocaleString()}`}
                </strong>
                {booking.priceMinimum != null && <small>Subject to assessment</small>}
                <small>{booking.id}</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Mybookings;