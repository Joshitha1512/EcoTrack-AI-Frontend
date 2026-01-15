import { useState } from "react";
import { Leaf, Menu } from "lucide-react";
import AppSidebar from "./AppSidebar";
import "./DashboardLayout.css";

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar */}
      <AppSidebar />

      <div className="main">
        {/* Header */}
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <Menu size={20} />
          </button>

          <div className="brand">
            <Leaf size={18} />
            <span>EcoTrack AI</span>
          </div>
        </header>

        {/* Page content */}
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
