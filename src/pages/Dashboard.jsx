import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { TransportSection } from "../carbon/TransportSection";
import { ElectricitySection } from "../carbon/ElectricitySection";
import { DietSection } from "../carbon/DietSection";
import { ResultsDisplay } from "../carbon/ResultsDisplay";
import { useAuth } from "../contexts/AuthContext";
import { calculateCarbonFootprint } from "../services/carbonApi";
import "./Dashboard.css";

export default function Dashboard() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [transport, setTransport] = useState({
    car_miles_per_week: 0,
    public_transit_trips_per_week: 0,
    flights_per_year: 0,
  });

  const [electricity, setElectricity] = useState({
    monthly_kwh: 0,
    energy_source: "grid",
  });

  const [diet, setDiet] = useState({
    meals_per_week: 21,
    meat_percentage: 50,
    vegetarian_percentage: 30,
    vegan_percentage: 20,
  });

  const dietTotal =
    diet.meat_percentage +
    diet.vegetarian_percentage +
    diet.vegan_percentage;

  const handleSubmit = async () => {
    if (dietTotal !== 100) {
      alert("Diet percentages must total 100%");
      return;
    }

    if (!session?.access_token) {
      alert("Please sign in first");
      return;
    }

    setLoading(true);
    try {
      const apiResponse = await calculateCarbonFootprint(
        { transport, electricity, diet },
        session.access_token
      );

      //  Normalize backend response to UI format
      const adaptedResult = {
        total_footprint: apiResponse.total_carbon_footprint,
        breakdown: apiResponse.category_emissions,
        recommendations: apiResponse.top_recommendations || [],
        ai_explanation: apiResponse.explanation,
      };

      setResult(adaptedResult);
    } catch (error) {
      console.error(error);
      alert("Failed to calculate carbon footprint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2>Carbon Footprint Analysis</h2>
      <p>Enter your lifestyle details below to calculate your annual carbon footprint and receive AI-powered recommendations.</p>

      <div className="grid">
        <TransportSection data={transport} onChange={setTransport} />
        <ElectricitySection data={electricity} onChange={setElectricity} />
        <DietSection data={diet} onChange={setDiet} />
      </div>

      <button className="analyze-btn" onClick={handleSubmit} disabled={loading}>
      {loading ? "Analyzing..." : "Analyze My Carbon Footprint"}
      </button>

      {result && <ResultsDisplay result={result} />}
    </DashboardLayout>
  );
}
