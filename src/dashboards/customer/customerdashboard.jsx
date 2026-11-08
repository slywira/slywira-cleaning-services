
import { useEffect, useState } from "react";
import CustomerSide from "../../components/CustomerSide";
import Mybookings from "./Mybookings";
import Mypayments from "./Mypayments";
import Myprofile from "./Myprofile";
import {
  getCurrentUser,
  signOutDemoUser,
} from "../../utils/demoData";
import {
  createAppBooking,
  getAppCustomerBookings,
  getAppCustomerPayments,
} from "../../utils/appData";
import { getSupabaseClient } from "../../supabaseClient";
import {
  getMoveOutQuote,
  MOVE_OUT_ADDITIONAL_SERVICES,
  MOVE_OUT_HOUSE_PRICES,
} from "../../utils/movingPrices";
import "./customerdashboard.css";

const HOME_CLEANING_PRICES = {
  "1": 2000,
  "2": 3000,
  "3": 4000,
  "4": 5000,
  "5+": 7000,
};

const CARPET_CLEANING_PRICES = {
  "3x5 ft": 500,
  "4x6 ft": 600,
  "5x7 ft": 800,
  "6x9 ft": 1000,
  "7x10 ft": 1500,
};

const OFFICE_CLEANING_RATES = {
  withoutCarpet: 40,
  withCarpet: 150,
};
const MIN_OFFICE_AREA_SQM = 50;

function CustomerDashboard({ setPage }) {
  const [activePage, setActivePage] = useState("Overview");
  const [currentUser] = useState(getCurrentUser);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [dataError, setDataError] = useState("");
  const [bookingForm, setBookingForm] = useState({
    service: "Home Cleaning",
    bedrooms: "1",
    carpetSize: "3x5 ft",
    movingHouseType: MOVE_OUT_HOUSE_PRICES[0].id,
    movingAdditionalServices: [],
    officeAreaSqm: "",
    officeHasCarpet: "no",
    date: "",
    time: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    Promise.all([
      getAppCustomerBookings(currentUser.id),
      getAppCustomerPayments(currentUser.id),
    ])
      .then(([customerBookings, customerPayments]) => {
        setBookings(customerBookings);
        setPayments(customerPayments);
      })
      .catch((error) => {
        setDataError(error instanceof Error ? error.message : "Unable to load your account data.");
      });
  }, [currentUser]);

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

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser) return;

    if (!bookingForm.date || !bookingForm.time || !bookingForm.address.trim()) {
      setMessage("Please complete the date, time, and address fields.");
      return;
    }

    if (bookingForm.service === "Office Cleaning") {
      const officeAreaSqm = Number(bookingForm.officeAreaSqm);
      if (!Number.isFinite(officeAreaSqm) || officeAreaSqm < MIN_OFFICE_AREA_SQM) {
        setMessage(`Office Cleaning requires a minimum area of ${MIN_OFFICE_AREA_SQM} m².`);
        return;
      }
    }

    const officeHasCarpet = bookingForm.officeHasCarpet === "yes";
    const moveOutQuote = bookingForm.service === "Move-out Cleaning"
      ? getMoveOutQuote(bookingForm.movingHouseType, bookingForm.movingAdditionalServices)
      : null;
    const servicePrice = bookingForm.service === "Home Cleaning"
      ? HOME_CLEANING_PRICES[bookingForm.bedrooms]
      : bookingForm.service === "Office Cleaning"
        ? Number(bookingForm.officeAreaSqm) *
          (officeHasCarpet
            ? OFFICE_CLEANING_RATES.withCarpet
            : OFFICE_CLEANING_RATES.withoutCarpet)
        : bookingForm.service === "Carpet Cleaning"
          ? CARPET_CLEANING_PRICES[bookingForm.carpetSize]
          : moveOutQuote.minimum;

    try {
      await createAppBooking({
        customerId: currentUser.id,
        customerName: currentUser.fullName,
        service: bookingForm.service,
        bedrooms: bookingForm.service === "Home Cleaning" ? bookingForm.bedrooms : undefined,
        carpetSize: bookingForm.service === "Carpet Cleaning" ? bookingForm.carpetSize : undefined,
        movingHouseType: bookingForm.service === "Move-out Cleaning"
          ? MOVE_OUT_HOUSE_PRICES.find((item) => item.id === bookingForm.movingHouseType).label
          : undefined,
        movingAdditionalServices: bookingForm.service === "Move-out Cleaning"
          ? bookingForm.movingAdditionalServices.map(
            (serviceId) => MOVE_OUT_ADDITIONAL_SERVICES.find((item) => item.id === serviceId).label
          )
          : undefined,
        priceMinimum: moveOutQuote?.minimum,
        priceMaximum: moveOutQuote?.maximum,
        priceMaximumPlus: moveOutQuote?.maximumPlus,
        officeAreaSqm: bookingForm.service === "Office Cleaning"
          ? Number(bookingForm.officeAreaSqm)
          : undefined,
        officeHasCarpet: bookingForm.service === "Office Cleaning" ? officeHasCarpet : undefined,
        date: bookingForm.date,
        time: bookingForm.time,
        address: bookingForm.address,
        amount: servicePrice,
      });

      setBookingForm({
        service: "Home Cleaning",
        bedrooms: "1",
        carpetSize: "3x5 ft",
        movingHouseType: MOVE_OUT_HOUSE_PRICES[0].id,
        movingAdditionalServices: [],
        officeAreaSqm: "",
        officeHasCarpet: "no",
        date: "",
        time: "",
        address: "",
      });
      setMessage("Booking request submitted successfully.");
      setDataError("");
      setBookings(await getAppCustomerBookings(currentUser.id));
      setPayments(await getAppCustomerPayments(currentUser.id));
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Unable to submit your booking.");
    }
  };

  if (!currentUser) {
    return null;
  }

  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((booking) => booking.status === "completed").length;
  const pendingBookings = bookings.filter((booking) => booking.status === "pending").length;
  const totalPayments = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  return (
    <div className="customer-dashboard">
      <CustomerSide
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
      />

      <main className="customer-main">
        <header className="customer-header">
          <div>
            <h1>{activePage}</h1>
            <p>Welcome back, {currentUser.fullName}.</p>
          </div>
        </header>
        {dataError && <p className="customer-message" role="alert">{dataError}</p>}
        {logoutError && <p className="customer-message" role="alert">{logoutError}</p>}

        {activePage === "Overview" && (
          <>
            <div className="customer-cards">
              <div className="customer-card">
                <h3>My Bookings</h3>
                <h2>{totalBookings}</h2>
                <p>Your cleaning bookings</p>
              </div>

              <div className="customer-card">
                <h3>Completed Services</h3>
                <h2>{completedBookings}</h2>
                <p>Services completed</p>
              </div>

              <div className="customer-card">
                <h3>Pending Bookings</h3>
                <h2>{pendingBookings}</h2>
                <p>Bookings awaiting service</p>
              </div>

              <div className="customer-card">
                <h3>My Payments</h3>
                <h2>KSh {totalPayments.toLocaleString()}</h2>
                <p>Payment records</p>
              </div>
            </div>

            <section className="customer-welcome">
              <h2>Welcome to Slywira.</h2>
              <p>
                Manage your cleaning services easily. You can make bookings, track your
                services, view payments and update your profile.
              </p>
              <button onClick={() => setActivePage("My Bookings")}>View My Bookings</button>
            </section>
          </>
        )}

        {activePage === "My Bookings" && (
          <Mybookings
            bookings={bookings}
            bookingForm={bookingForm}
            estimatedPrice={
              bookingForm.service === "Home Cleaning"
                ? HOME_CLEANING_PRICES[bookingForm.bedrooms]
                : bookingForm.service === "Office Cleaning"
                  ? Number(bookingForm.officeAreaSqm) >= MIN_OFFICE_AREA_SQM
                    ? Number(bookingForm.officeAreaSqm) *
                      (bookingForm.officeHasCarpet === "yes"
                        ? OFFICE_CLEANING_RATES.withCarpet
                        : OFFICE_CLEANING_RATES.withoutCarpet)
                    : null
                  : bookingForm.service === "Carpet Cleaning"
                    ? CARPET_CLEANING_PRICES[bookingForm.carpetSize]
                    : getMoveOutQuote(
                      bookingForm.movingHouseType,
                      bookingForm.movingAdditionalServices
                    )
            }
            onBookingFormChange={(field, value) =>
              setBookingForm((previous) => ({ ...previous, [field]: value }))
            }
            onSubmit={handleBookingSubmit}
            message={message}
          />
        )}

        {activePage === "My Payments" && <Mypayments payments={payments} />}
        {activePage === "My Profile" && <Myprofile user={currentUser} />}
      </main>
    </div>
  );
}

export default CustomerDashboard;
