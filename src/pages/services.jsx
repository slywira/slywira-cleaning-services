import "./services.css";
import homecleaningimage from "../assets/homecleaning.png";
import officecleaningimage from "../assets/officecleaning.png";
import carpetcleaningimage from "../assets/carpetcleaning.png";
import movingcleaningimage from "../assets/movingout.png";

function Services({ setPage }) {
  return (
    <div className="Header">
      <h2><span>.</span>Our Services</h2>
    <div className="servicecontainer">
<div className="servicecard">
 <img src={homecleaningimage} 
      onClick={() => setPage("homecleaning")}
    alt="Home Cleaning" />   
    <h1><span>01</span> Home Cleaning</h1>
   <p>Scheduled cleaning for homes, estates, offices, and shared <br />spaces — built for steady, polished results on every visit.</p>
</div>


<div className="servicecard">
<img src={officecleaningimage} onClick={() => setPage("Officecleaning")}
alt="Office Cleaning" />
  <h1><span>02</span> Office Cleaning</h1>
  <p>Scheduled cleaning for offices and shared spaces —<br /> built
          for steady, polished results on every visit.</p>       
</div>


<div className="servicecard">
<img src={carpetcleaningimage} onClick={() => setPage("carpetcleaning")}
alt="Carpet Cleaning" />       
<h1><span>03</span> Carpet Cleaning</h1>
<p>Deep cleaning for carpets and upholstery to <br />restore
          freshness, texture, and a welcoming finish.</p>
</div>

 <div className="servicecard">
 <img src={movingcleaningimage} onClick={() => setPage("homecleaning")}
 alt="Moving Cleaning" />
 <h1><span>04</span> Move-out Cleaning</h1>
  <p>Moving-out services designed for a<br /> smooth transition
          and a clean handoff.</p>
 </div>
 </div>
 </div>

    );
}

export default Services;