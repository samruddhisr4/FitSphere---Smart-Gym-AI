import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/workout-plan", label: "Workout Plan", icon: "💪" },
    { path: "/form-checker", label: "Form Checker", icon: "🏋️" },
    {
      path: "/progress-achievements",
      label: "Progress & Achievements",
      icon: "🏆",
    },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-dark-800 text-white shadow-lg h-full border-r border-dark-700">
      <div className="p-4 border-b border-dark-700">
        <h1 className="text-xl font-bold text-primary-500">FitSphere</h1>
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 ${
                    isActive
                      ? "bg-primary-500/20 text-primary-500 border-r-2 border-primary-500"
                      : "text-gray-300 hover:bg-dark-700 hover:text-white"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
