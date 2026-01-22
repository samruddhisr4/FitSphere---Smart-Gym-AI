import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import WorkoutPlan from "./pages/WorkoutPlan";
import FormChecker from "./pages/FormChecker";
import ProgressAchievements from "./pages/ProgressAchievements";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workout-plan" element={<WorkoutPlan />} />
                <Route path="/form-checker" element={<FormChecker />} />
                <Route
                  path="/progress-achievements"
                  element={<ProgressAchievements />}
                />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
