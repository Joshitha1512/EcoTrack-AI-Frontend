import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { getHistory } from "../services/carbonApi";
import "./History.css";

export default function History() {
  const { session } = useAuth();
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.access_token) return;

    getHistory(session.access_token)
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading history...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="history-page">
        <h2>Analysis History</h2>
        <p className="subtitle">
          View your past carbon footprint analyses and track your progress.
        </p>

        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          history.map((entry) => {
            const output = entry.ai_output;
            const categories = output.category_emissions;
            const topRecommendation = output.top_recommendations?.[0];

            return (
              <div key={entry.id} className="history-card">
                {/* HEADER */}
                <div
                  className="history-header"
                  onClick={() => toggleExpand(entry.id)}
                >
                  <div>
                    <p className="date">
                      {new Date(entry.created_at).toDateString()}
                    </p>
                    <h3>
                      {Math.round(
                        output.total_carbon_footprint
                      ).toLocaleString()}{" "}
                      kg CO₂/year
                    </h3>
                  </div>

                  <div className="header-right">
                    {topRecommendation && (
                      <span className="pill">
                        {topRecommendation.title}
                      </span>
                    )}
                    <span className="chevron">
                      {expandedId === entry.id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* DROPDOWN */}
                {expandedId === entry.id && (
                  <div className="history-body">
                    {/* CATEGORY BREAKDOWN */}
                    <div className="breakdown">
                      <div>
                        <span>Transport</span>
                        <strong>
                          {Math.round(categories.transport)} kg
                        </strong>
                      </div>
                      <div>
                        <span>Electricity</span>
                        <strong>
                          {Math.round(categories.electricity)} kg
                        </strong>
                      </div>
                      <div>
                        <span>Diet</span>
                        <strong>{Math.round(categories.diet)} kg</strong>
                      </div>
                    </div>

                    {/* AI INSIGHTS */}
                    <div className="ai-insights">
                      <strong>AI Insights</strong>
                      {formatAIInsights(output.explanation)}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}

/* ---------- AI INSIGHT FORMATTER ---------- */

function formatAIInsights(text) {
  if (!text) return null;

  const sections = text.split(
    /(?=Introduction:|Emission Breakdown:|Recommendations:|Conclusion:)/
  );

  return sections.map((section, index) => {
    if (section.startsWith("Introduction:")) {
      return (
        <p key={index}>
          <strong>Overview:</strong>{" "}
          {section.replace("Introduction:", "").trim()}
        </p>
      );
    }

    if (section.startsWith("Emission Breakdown:")) {
      return (
        <p key={index}>
          <strong>Breakdown:</strong>{" "}
          {section.replace("Emission Breakdown:", "").trim()}
        </p>
      );
    }

    if (section.startsWith("Recommendations:")) {
      const lines = section
        .replace("Recommendations:", "")
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean);
    
      const items = [];
      let current = "";
    
      lines.forEach(line => {
        if (line.startsWith("-")) {
          if (current) items.push(current);
          current = line.replace(/^-\s*/, "");
        } else {
          current += " " + line;
        }
      });
    
      if (current) items.push(current);
    
      return (
        <ul key={index}>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    
    

    if (section.startsWith("Conclusion:")) {
      return (
        <p key={index}>
          <strong>Conclusion:</strong>{" "}
          {section
            .replace("Conclusion:", "")
            .trim()
            .replace(/,\s*(and|but)?\s*$/i, ".")}
        </p>
      );
    }

    return null;
  });
}
