import "./Homecleaning.css";
import Homecleaninginfoimage from "../assets/homecleaninginfo.png";

function Homecleaning({ setPage }) {
  return (
      <div className="homecontainer">
    <div className="left">
        
<h1>Home Cleaning Services  </h1>
<h2>Enjoy a clean, fresh, and  <br />comfortable
home without <br />the hassle.</h2> 

<p>We provide reliable cleaning solutions tailored to your
<br /> needs, whether you need a one-time deep clean, regular 
<br />household cleaning, or help preparing your home for a 
<br />special occasion.</p>
<ol>
<li>Our services include:</li>
<li>General house cleaning</li>
<li>Deep cleaning</li>
<li>Kitchen cleaning</li>
<li>Bathroom and toilet cleaning</li>
<li>Bedroom and living room cleaning</li>
<li>Dusting and surface cleaning</li>
<li>Vacuuming and mopping</li>
<li>Window and glass cleaning</li>
<li>Furniture and appliance cleaning</li>
</ol>
</div>

<div className="homecleaningcard">
         <img src={Homecleaninginfoimage} alt="homecleaning image" /> 
      </div>   

<button className="Bookacleaning" onClick={() => setPage("login")}
>Book a cleaning
</button>
</div>

      );
}

export default Homecleaning;