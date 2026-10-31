import "./Home.css";

function Home() {
  return (
    <section className="intro">
      <h2>
        Defined by <span>Detail.</span>
      </h2>
      <p>
        Cleaning and property services for homes, offices,
        <br />
        and spaces that need a finish that feels complete.
      </p>
      <div className="btns">
        <button type="button" className="Book">Book a Service</button>
        <button type="button" className="view">View Services</button>
      </div>
      <button type="button" className="cleaning">
        <p>cleaning and property services | kenya</p>
      </button>
    </section>
  );
}

export default Home;
