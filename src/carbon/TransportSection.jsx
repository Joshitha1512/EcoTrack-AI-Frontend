import { Car, Train, Plane } from "lucide-react";
import "./TransportSection.css";

export function TransportSection({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: Math.max(0, parseInt(value) || 0),
    });
  };

  return (
    <div className="glass-card">
      <div className="header">
        <div className="icon-box">
          <Car />
        </div>
        <div>
          <h3>Transport</h3>
          <p>Your travel habits</p>
        </div>
      </div>

      <div className="section">
        <label>
          <Car size={14} /> Car miles per week
        </label>
        <input
          type="number"
          value={data.car_miles_per_week}
          onChange={(e) =>
            handleChange("car_miles_per_week", e.target.value)
          }
        />
      </div>

      <div className="section">
        <label>
          <Train size={14} /> Public transit trips per week
        </label>
        <input
          type="number"
          value={data.public_transit_trips_per_week}
          onChange={(e) =>
            handleChange(
              "public_transit_trips_per_week",
              e.target.value
            )
          }
        />
      </div>

      <div className="section">
        <label>
          <Plane size={14} /> Flights per year
        </label>
        <input
          type="number"
          value={data.flights_per_year}
          onChange={(e) =>
            handleChange("flights_per_year", e.target.value)
          }
        />
      </div>
    </div>
  );
}
export default TransportSection;