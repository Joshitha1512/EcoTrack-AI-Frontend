// AppSidebar.jsx
import {
  LayoutDashboard,
  History,
  LogOut,
  Leaf,
  TrendingDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./AppSidebar.css";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "History", url: "/history", icon: History },
];

  export default function AppSidebar() {
  const { signOut, user } = useAuth();

  return (
      <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo">
          <Leaf />
        </div>
        <div>
          <h1>EcoTrack AI</h1>
          <p>Carbon Footprint Tracker</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <h4>Navigation</h4>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Impact Summary */}
      <div className="impact-box">
        <div className="impact-title">
          <TrendingDown size={16} />
          <span>Track Progress</span>
        </div>
        <p>
          Monitor your carbon footprint and see how your choices make a
          difference.
        </p>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <p className="email">{user?.email}</p>
        <button className="signout-btn" onClick={signOut}>
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
