import { Zap } from "lucide-react";
import "./ElectricitySection.css";

export function ElectricitySection({ data, onChange }) {
  return (
    <div className="glass-card">
      <div className="header">
        <div className="icon-box">
          <Zap />
        </div>
        <div>
          <h3>Electricity</h3>
          <p>Home energy usage</p>
        </div>
      </div>

      <div className="section">
        <label>Monthly electricity usage (kWh)</label>
        <input
          type="number"
          min="0"
          value={data.monthly_kwh}
          onChange={(e) =>
            onChange({
              ...data,
              monthly_kwh: Math.max(
                0,
                parseInt(e.target.value) || 0
              ),
            })
          }
        />
      </div>

      <div className="section">
        <label>Energy source</label>
        <select
          value={data.energy_source}
          onChange={(e) =>
            onChange({
              ...data,
              energy_source: e.target.value,
            })
          }
        >
          <option value="grid">Grid Power</option>
          <option value="solar">Solar</option>
          <option value="wind">Wind</option>
        </select>
      </div>
    </div>
  );
}
export default ElectricitySection;