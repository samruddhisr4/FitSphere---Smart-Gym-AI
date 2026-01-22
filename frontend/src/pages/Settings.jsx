import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { settingsService } from "../services/api";

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    fitnessGoal: "strength",
    trainingDays: 3,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await response.json();
        if (result.success) {
          const profileData = result.data.profile;
          setFormData({
            firstName: result.data.user.firstName || "",
            lastName: result.data.user.lastName || "",
            email: result.data.user.email || "",
            age: profileData?.age || "",
            height: profileData?.height_cm || "",
            weight: profileData?.weight_kg || "",
            fitnessGoal: profileData?.goal || "strength",
            trainingDays: profileData?.training_days_per_week || 3,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const [reminders, setReminders] = useState({
    proteinShake: { enabled: true, time: "14:30" },
    waterIntake: { enabled: true, time: "10:00" },
    sleep: { enabled: true, time: "22:00" },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReminderChange = (reminderType, field, value) => {
    setReminders((prev) => ({
      ...prev,
      [reminderType]: {
        ...prev[reminderType],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save profile data to backend
      const response = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Settings saved successfully!");
      } else {
        alert("Error saving settings: " + result.message);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Profile Settings
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Training Days
                </label>
                <select
                  name="trainingDays"
                  value={formData.trainingDays}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={num} value={num}>
                      {num} days
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fitness Goal
              </label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="strength">Strength</option>
                <option value="hypertrophy">Muscle Building</option>
                <option value="endurance">Endurance</option>
                <option value="weight_loss">Weight Loss</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reminder Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Reminder Settings
          </h2>

          <div className="space-y-6">
            {/* Protein Shake Reminder */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reminders.proteinShake.enabled}
                    onChange={(e) =>
                      handleReminderChange(
                        "proteinShake",
                        "enabled",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Protein Shake
                  </span>
                </label>

                <input
                  type="time"
                  value={reminders.proteinShake.time}
                  onChange={(e) =>
                    handleReminderChange("proteinShake", "time", e.target.value)
                  }
                  disabled={!reminders.proteinShake.enabled}
                  className={`p-2 border border-gray-300 rounded-lg text-sm ${
                    !reminders.proteinShake.enabled ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 ml-6">
                Get reminded to take your post-workout protein shake
              </p>
            </div>

            {/* Water Intake Reminder */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reminders.waterIntake.enabled}
                    onChange={(e) =>
                      handleReminderChange(
                        "waterIntake",
                        "enabled",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Water Intake
                  </span>
                </label>

                <input
                  type="time"
                  value={reminders.waterIntake.time}
                  onChange={(e) =>
                    handleReminderChange("waterIntake", "time", e.target.value)
                  }
                  disabled={!reminders.waterIntake.enabled}
                  className={`p-2 border border-gray-300 rounded-lg text-sm ${
                    !reminders.waterIntake.enabled ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 ml-6">
                Stay hydrated throughout the day
              </p>
            </div>

            {/* Sleep Reminder */}
            <div className="pb-4">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reminders.sleep.enabled}
                    onChange={(e) =>
                      handleReminderChange("sleep", "enabled", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Sleep
                  </span>
                </label>

                <input
                  type="time"
                  value={reminders.sleep.time}
                  onChange={(e) =>
                    handleReminderChange("sleep", "time", e.target.value)
                  }
                  disabled={!reminders.sleep.enabled}
                  className={`p-2 border border-gray-300 rounded-lg text-sm ${
                    !reminders.sleep.enabled ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 ml-6">
                Maintain a healthy sleep schedule
              </p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Change Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="button"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
