import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <div className="infocontactcontainer">

       
        <div className="contactinfo">

          <button className="contactlabel">
            <span>.</span> CONTACT
          </button>

          <h1>Let's Talk About</h1>
          <h2>Your Space</h2>

          <p>
            Whether you manage a home, estate, office, school,
            church, new development, solar site, or industrial
            facility, we will shape a service plan that matches
            the standard you want to keep.
          </p>

        </div>

       
        <div className="contact-right">

          <div className="contactcontainer">

            <h3>Email</h3>
            <h4>info@slywira.co.ke</h4>

            

            <h3>Phone</h3>
            <h4>+254 722 433 778</h4>

           

            <h3>WhatsApp</h3>
            <h4>Chat with us on WhatsApp</h4>

          </div>

          <div className="contact-note">
            <span>✉</span>
            <p>Use the details above for direct inquiries,
            service requests, and tailored facility support.</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;