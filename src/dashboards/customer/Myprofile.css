function Myprofile({ user }) {
  const initials = user.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <section className="customer-content">
      <div className="customer-section-heading">
        <div>
          <p className="customer-eyebrow">ACCOUNT SETTINGS</p>
          <h2>My profile</h2>
          <p>Your contact information for bookings and service updates.</p>
        </div>
      </div>

      <article className="customer-profile-card">
        <div className="customer-profile-banner" />
        <div className="customer-profile-main">
          <div className="customer-avatar" aria-hidden="true">{initials}</div>
          <div className="customer-profile-title">
            <h3>{user.fullName}</h3>
            <p>Customer account</p>
          </div>
        </div>

        <div className="customer-profile-details">
          <div className="profile-detail">
            <span className="profile-detail-icon" aria-hidden="true">✉</span>
            <div>
              <span>Email address</span>
              <strong>{user.email}</strong>
            </div>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-icon" aria-hidden="true">☎</span>
            <div>
              <span>Phone number</span>
              <strong>{user.phone || "Not provided"}</strong>
            </div>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-icon" aria-hidden="true">◷</span>
            <div>
              <span>Account type</span>
              <strong>Customer</strong>
            </div>
          </div>
        </div>
      </article>

      <aside className="profile-help-card">
        <div>
          <h3>Need to update your details?</h3>
          <p>Our team can help keep your account information up to date.</p>
        </div>
        <a href="mailto:info@slywira.co.ke">Contact support <span aria-hidden="true">→</span></a>
      </aside>
    </section>
  );
}

export default Myprofile;