import { Utensils, AlertCircle } from "lucide-react";
import "./DietSection.css";

export function DietSection({ data, onChange }) {
  const totalPercentage =
    data.meat_percentage +
    data.vegetarian_percentage +
    data.vegan_percentage;

  const isValid = totalPercentage === 100;

  const handleChange = (field, value) => {
    const numValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    onChange({ ...data, [field]: numValue });
  };

  return (
    <div className="glass-card">
      <div className="header">
        <div className="icon-box">
          <Utensils />
        </div>
        <div>
          <h3>Diet</h3>
          <p>Food consumption habits</p>
        </div>
      </div>

      <div className="section">
        <label>Meals per week</label>
        <input
          type="number"
          min="0"
          value={data.meals_per_week}
          onChange={(e) =>
            handleChange("meals_per_week", e.target.value)
          }
        />
      </div>

      <div className="section">
        <div className="row">
          <span>Diet Breakdown</span>
          <span className={isValid ? "success" : "error"}>
            {totalPercentage}%
          </span>
        </div>

        <div className="progress">
          <div
            className={isValid ? "progress-fill" : "progress-error"}
            style={{ width: `${Math.min(totalPercentage, 100)}%` }}
          />
        </div>

        {!isValid && (
          <div className="warning">
            <AlertCircle size={14} />
            Percentages must total 100%
          </div>
        )}
      </div>

      <div className="grid">
        <div>
          <label>Meat %</label>
          <input
            type="number"
            value={data.meat_percentage}
            onChange={(e) =>
              handleChange("meat_percentage", e.target.value)
            }
          />
        </div>

        <div>
          <label>Vegetarian %</label>
          <input
            type="number"
            value={data.vegetarian_percentage}
            onChange={(e) =>
              handleChange(
                "vegetarian_percentage",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label>Vegan %</label>
          <input
            type="number"
            value={data.vegan_percentage}
            onChange={(e) =>
              handleChange("vegan_percentage", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}
export default DietSection;