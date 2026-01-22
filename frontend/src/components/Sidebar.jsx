import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
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

  // Filter out duplicate dashboard entries
  const uniqueNavItems = navItems.filter(
    (item, index, self) => index === self.findIndex((i) => i.path === item.path)
  );

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">FitSphere</h1>
      </div>
      <nav className="mt-4">
        <ul>
          {uniqueNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
