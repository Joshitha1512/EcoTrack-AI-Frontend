import {
  Leaf,
  Car,
  Zap,
  Utensils,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import "./ResultDisplay.css";

export function ResultsDisplay({ result }) {
  if (!result || !result.breakdown) return null;

  const chartData = [
    { name: "Transport", value: result.breakdown.transport || 0, color: "#4fa3ff" },
    { name: "Electricity", value: result.breakdown.electricity || 0, color: "#f5a623" },
    { name: "Diet", value: result.breakdown.diet || 0, color: "#3cb371" },
  ];

  const icons = {
    transport: Car,
    electricity: Zap,
    diet: Utensils,
  };

  /**
   * ✅ SAFE AI formatter (NO BULLETS)
   */
const formatAIExplanation = (text) => {
  if (!text) return null;

  const sections = text.split(
      /(?=Introduction:|Emission Breakdown:|Recommendations:|Conclusion:)/
  );

  return sections.map((section, index) => {
    const cleanText = (label) =>
      section.replace(label, "").replace(/\n+/g, " ").trim();

      if (section.startsWith("Introduction:")) {
      return (
        <section key={index}>
            <p>{cleanText("Introduction:")}</p>
        </section>
      );
    }

      if (section.startsWith("Emission Breakdown:")) {
      return (
        <section key={index}>
            <h4>Emission Breakdown</h4>
            <p>{cleanText("Emission Breakdown:")}</p>
        </section>
      );
    }

    if (section.startsWith("Recommendations:")) {
      const items = cleanText("Recommendations:")
        .split(/\s-\s+/)  
        .map(i => i.replace(/^-\s*/, "").trim())
        .filter(Boolean);
    
      return (
        <section key={index}>
          <h4>Recommended Actions</h4>
          <ul className="ai-bullets">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      );
    }
    

    if (section.startsWith("Conclusion:")) {
      return (
        <section key={index}>
          <p>
            {cleanText("Conclusion:")
              .replace(/,\s*(and|but)?\s*$/i, ".")}
          </p>
        </section>
      );
    }

    return null;
  });
};

  return (
    <div className="results">
      {/* Total */}
      <div className="card hero">
        <div className="row">
          <Leaf />
          <span>Total Carbon Footprint</span>
        </div>
        <div className="total">
          <strong>{result.total_footprint.toLocaleString()}</strong>
          <span>kg CO₂ / year</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid-2">
        <div className="card">
          <h3>Category Breakdown</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={60} outerRadius={90} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3>Detailed Breakdown</h3>
          {Object.entries(result.breakdown).map(([key, value]) => {
            const Icon = icons[key];
            const percent = Math.round((value / result.total_footprint) * 100);

            return (
              <div key={key} className="breakdown-row">
                <div className="row">
                  <Icon />
                  <span className="capitalize">{key}</span>
                </div>
                <div className="right">
                  <strong>{value.toLocaleString()} kg</strong>
                  <small>{percent}%</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Insights */}
      <div className="card ai">
        <div className="row">
          <Sparkles />
          <h3>AI Insights</h3>
        </div>
        <div className="ai-explanation">
          {formatAIExplanation(result.ai_explanation)}
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;
