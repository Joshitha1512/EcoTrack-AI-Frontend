import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

export default function Auth() {
  const { signIn, signUp, user, loading: authLoading } = useAuth();

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async () => {
    if (!email.includes("@")) return alert("Enter a valid email");
    if (password.length < 6) return alert("Password must be at least 6 characters");

    setLoading(true);

    const { error } =
      mode === "signin"
        ? await signIn(email.trim(), password)
        : await signUp(email.trim(), password);

    setLoading(false);

    if (error) alert(error.message);
    if (!error && mode === "signup") {
      alert("Account created. Please sign in.");
      setMode("signin");
    }
  };

  return (
    <div className="auth-page">
      {/* Logo + Title */}
      <div className="auth-header">
        <div className="auth-logo">🌿</div>
        <h1>EcoTrack AI</h1>
        <p><h2>Track & reduce your carbon footprint</h2></p>
      </div>

      {/* Card */}
      <div className="auth-card">
        <div className={`auth-toggle ${mode}`}>
          <span className="slider" />
          <button onClick={() => setMode("signin")}>Sign In</button>
          <button onClick={() => setMode("signup")}>Sign Up</button>
        </div>

        <label>Email</label>
        <input
          type="email"
          placeholder="you@ecotrack.ai"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}
