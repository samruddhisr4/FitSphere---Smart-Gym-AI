import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ExerciseCompletionProvider } from "./context/ExerciseCompletionContext.jsx";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import WorkoutPlan from "./pages/WorkoutPlan";
import WorkoutTracker from "./pages/WorkoutTracker";
import FormChecker from "./pages/FormChecker";
import ProgressAchievements from "./pages/ProgressAchievements";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <AuthProvider>
      <ExerciseCompletionProvider>
        <Router>
          <Routes>
          {/* Public Routes - will redirect to dashboard if authenticated */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - require authentication */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workout-plan" element={<WorkoutPlan />} />
            <Route path="/workout/:workoutId?" element={<WorkoutTracker />} />
            <Route path="/form-checker" element={<FormChecker />} />
            <Route
              path="/progress-achievements"
              element={<ProgressAchievements />}
            />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Redirect any unmatched routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ExerciseCompletionProvider>
  </AuthProvider>
  );
}

export default App;
