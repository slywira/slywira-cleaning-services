import { useEffect, useState } from "react";
import { getAppServices } from "../../utils/appData";
import {
  MOVE_OUT_ADDITIONAL_SERVICES,
  MOVE_OUT_HOUSE_PRICES,
} from "../../utils/movingPrices";
import "./manageservices.css";

const SERVICE_PRICE_GUIDE = {
  "Home Cleaning": "KSh 2,000–7,000 by number of bedrooms",
  "Office Cleaning": "KSh 40/m² without carpet; KSh 150/m² with carpet (50 m² minimum)",
  "Carpet Cleaning": "KSh 500–1,500 by carpet size",
  "Move-out Cleaning": "Indicative moving price ranges; confirm after assessment",
};

function ManageServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppServices()
      .then(setServices)
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Unable to load services.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="admin-table-panel admin-services">
      <div className="admin-section-heading">
        <div>
          <h2>Services</h2>
          <p>Service availability and current customer pricing.</p>
        </div>
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p className="admin-empty-state" role="alert">{error}</p>
      ) : <div className="admin-data-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Duration</th>
              <th>Pricing</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={`${service.name}-${index}`}>
                <td>{service.name}</td>
                <td>{service.duration}</td>
                <td>
                  {service.priceDescription || SERVICE_PRICE_GUIDE[service.name] ||
                    `KSh ${Number(service.price || 0).toLocaleString()}`}
                </td>
                <td>{service.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

      <section className="admin-moving-price-guide">
        <h3>Move-out &amp; relocation price guide</h3>
        <p className="admin-price-note">
          Indicative prices for local moves within Nairobi. Confirm the final price after
          assessing the distance and belongings.
        </p>

        <div className="admin-data-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>House size</th>
                <th>Indicative price range</th>
              </tr>
            </thead>
            <tbody>
              {MOVE_OUT_HOUSE_PRICES.map((item) => (
                <tr key={item.id}>
                  <td>{item.label}</td>
                  <td>
                    KSh {item.minimum.toLocaleString()}–{item.maximum.toLocaleString()}
                    {item.maximumPlus ? "+" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4>Additional moving services</h4>
        <div className="admin-data-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Indicative price range</th>
              </tr>
            </thead>
            <tbody>
              {MOVE_OUT_ADDITIONAL_SERVICES.map((item) => (
                <tr key={item.id}>
                  <td>{item.label}</td>
                  <td>KSh {item.minimum.toLocaleString()}–{item.maximum.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export default ManageServices;