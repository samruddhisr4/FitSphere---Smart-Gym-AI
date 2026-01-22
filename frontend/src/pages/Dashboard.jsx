import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-600">Welcome back!</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            Workouts Completed
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            Current Streak
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">5 days</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            Calories Burned
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">2,450</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Active Plan</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">Week 2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="bg-blue-100 p-2 rounded mr-3">💪</div>
              <div>
                <p className="font-medium">Completed Chest Day</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="bg-green-100 p-2 rounded mr-3">🏆</div>
              <div>
                <p className="font-medium">Earned Consistency Badge</p>
                <p className="text-sm text-gray-600">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="bg-purple-100 p-2 rounded mr-3">🔥</div>
              <div>
                <p className="font-medium">New Personal Record</p>
                <p className="text-sm text-gray-600">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition">
              Start Workout
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition">
              Check Form
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition">
              View Progress
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg transition">
              Set Goals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
