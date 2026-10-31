import "./About.css";
import aboutimage from "../assets/about.png" ;

function About() {
  return (
    <div className="aboutcontainer">
    <div className="about">

      <div className="about-intro">
        <button className="aboutusbtn">
          <span>.</span> ABOUT US
        </button>

        <h1>Who We Are</h1>

        <p>
          Slywira Cleaning Services is dedicated to providing
          professional and dependable cleaning solutions for
          residential, commercial, and institutional spaces.
          We understand that cleanliness plays an important
          role in creating comfortable, healthy, and productive
          environments. Our goal is to make every space cleaner,
          fresher, and more welcoming through quality service,
          attention to detail, and a customer-focused approach.
          We serve individuals, businesses, property managers,
          schools, churches, and organisations looking for
          reliable cleaning solutions tailored to their needs.
        </p>
      </div>
     
        <div className="aboutcard">
         <img src={aboutimage} alt="about image" /> 
      </div>
<div className="missionbg">
      <div className="misionandvision">

        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            To deliver exceptional cleaning services through
            professionalism, reliability, and attention to detail
            while creating cleaner, healthier, and more
            comfortable environments for our clients.
          </p>
        </div>

        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To become a leading and trusted cleaning services
            company, recognised for quality service delivery,
            innovation, professionalism, and lasting
            customer relationships.
          </p>
        </div>
</div>
      </div>
</div>
    </div>
  );
}

export default About;
