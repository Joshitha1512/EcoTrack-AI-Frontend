import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px" }}>404</h1>
      <p>Page not found</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
