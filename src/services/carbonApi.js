const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function calculateCarbonFootprint(data, accessToken) {
  const response = await fetch(`${API_BASE_URL}/calculate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let error = { detail: "Failed to calculate carbon footprint" };
    try {
      error = await response.json();
    } catch {}
    throw new Error(error.detail || "Calculation failed");
  }

  return response.json();
}

export async function getHistory(accessToken) {
  const response = await fetch(`${API_BASE_URL}/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let error = { detail: "Failed to fetch history" };
    try {
      error = await response.json();
    } catch {}
    throw new Error(error.detail || "History fetch failed");
  }

  return response.json();
}
