import React, { useState, useEffect } from "react";
import { progressService } from "../services/api";

const ProgressAchievements = () => {
  const [progressData, setProgressData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, achievementsRes] = await Promise.all([
          progressService.getUserProgress(),
          progressService.getUserAchievements(),
        ]);

        if (progressRes.success) {
          setProgressData(progressRes.data);
        }

        if (achievementsRes.success) {
          setAchievements(achievementsRes.data);
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading progress data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Progress & Achievements
        </h1>
        <p className="text-gray-600">
          Track your fitness journey and earned badges
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Weight Progress
            </h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Weight chart visualization would appear here
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Workout Frequency
            </h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Workout frequency chart would appear here
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Strength Progress
            </h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Strength progression chart would appear here
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Achievements
            </h2>

            <div className="space-y-4">
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => {
                  const icons = ["🏆", "🏅", "💪", "🔥", "🎯", "🌟"];
                  const colors = [
                    "yellow",
                    "blue",
                    "green",
                    "purple",
                    "red",
                    "indigo",
                  ];
                  const color = colors[index % colors.length];

                  return (
                    <div
                      key={achievement.id || index}
                      className={`flex items-center p-4 bg-gradient-to-r from-${color}-100 to-${color}-50 rounded-lg border-l-4 border-${color}-500`}
                    >
                      <div className="text-3xl mr-4">
                        {icons[index % icons.length]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          Earned: {achievement.date || "Recently"}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No achievements yet. Start working out to earn badges!
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Achievement Stats
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Total Badges
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    4/20
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    This Month
                  </span>
                  <span className="text-sm font-medium text-gray-700">2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Completion Rate
                  </span>
                  <span className="text-sm font-medium text-gray-700">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Challenges
            </h2>

            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">10 Workouts in 2 Weeks</span>
                  <span className="text-sm text-gray-600">3/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">Protein Goal Daily</span>
                  <span className="text-sm text-gray-600">5/7</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "71%" }}
                  ></div>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">Water Intake Goal</span>
                  <span className="text-sm text-gray-600">6/7</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: "86%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAchievements;
