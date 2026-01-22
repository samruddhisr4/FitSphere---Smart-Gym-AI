import React, { useState, useEffect } from "react";
import { workoutService } from "../services/api";

const WorkoutPlan = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [intensity, setIntensity] = useState("beginner");
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [focusArea, setFocusArea] = useState("strength");

  useEffect(() => {
    // Fetch current workout plan
    const fetchWorkoutPlan = async () => {
      try {
        const response = await workoutService.getCurrentPlan();
        if (response.success) {
          setWorkoutPlan(response.data.plan);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, []);

  const generateNewPlan = async () => {
    // Call backend to generate new plan using AI
    const planData = {
      intensity,
      daysPerWeek,
      focusArea,
    };

    try {
      const response = await workoutService.generateWorkoutPlan(planData);

      if (response.success) {
        setWorkoutPlan(response.data.plan);
        alert("New workout plan generated successfully!");
      } else {
        alert("Error generating plan: " + response.message);
      }
    } catch (error) {
      console.error("Error generating workout plan:", error);
      alert("Error generating workout plan");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading workout plan...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Workout Plan</h1>
          <p className="text-gray-600">
            Generate personalized workout plans with AI
          </p>
        </div>

        {/* Plan Generation Options */}
        <div className="flex flex-wrap gap-4">
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <option key={num} value={num}>
                {num} days/week
              </option>
            ))}
          </select>

          <select
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="strength">Strength</option>
            <option value="hypertrophy">Muscle Building</option>
            <option value="endurance">Endurance</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="custom">Custom Focus</option>
          </select>

          <button
            onClick={generateNewPlan}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Generate New Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Current Workout Plan
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Strength Building Program</h3>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">4 weeks</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Days per week</p>
                <p className="font-semibold">4 days</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Focus Areas</p>
                <p className="font-semibold">Chest, Back, Legs</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Weekly Schedule
          </h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Monday - Chest & Triceps</h4>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                  COMPLETED
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bench Press: 3 sets of 8-10 reps</li>
                <li>• Incline Dumbbell Press: 3 sets of 10-12 reps</li>
                <li>• Tricep Dips: 3 sets of 12-15 reps</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Tuesday - Rest Day</h4>
              </div>
              <p className="text-sm text-gray-600">Complete recovery day</p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Wednesday - Back & Biceps</h4>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  TODAY
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pull-ups: 3 sets of 8-10 reps</li>
                <li>• Bent-over Rows: 3 sets of 10-12 reps</li>
                <li>• Barbell Curls: 3 sets of 12-15 reps</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Thursday - Legs</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Squats: 4 sets of 6-8 reps</li>
                <li>• Leg Press: 3 sets of 10-12 reps</li>
                <li>• Calf Raises: 4 sets of 15-20 reps</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Plan Details
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">Week 2 of 4</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">
                Today's Workout
              </h3>
              <p className="text-sm text-gray-600">Back & Biceps</p>
              <button className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                Start Workout
              </button>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">
                Upcoming Sessions
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>Thursday</span>
                  <span className="font-medium">Legs</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday</span>
                  <span className="font-medium">Rest</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">Shoulders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;
