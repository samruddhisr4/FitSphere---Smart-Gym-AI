import React, { useState, useEffect } from "react";
import { useExerciseCompletion } from "../context/ExerciseCompletionContext";
import { workoutService } from "../services/api";

const Dashboard = () => {
  const { recentActivity } = useExerciseCompletion();
  
  // State for current workout plan
  const [currentPlan, setCurrentPlan] = useState(null);
  
  // Sample attendance data - in a real app, this would come from the backend
  // Using a real calendar function to track attendance for the current month
  const [attendanceData, setAttendanceData] = useState([]);
  
  // Initialize attendance data based on current month
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Initialize attendance data for the current month
    const initialAttendance = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPastOrToday = date <= today;
      initialAttendance.push({
        date: day,
        attended: false,
        isPastOrToday: isPastOrToday
      });
    }
    setAttendanceData(initialAttendance);
  }, []);
  
  // Fetch current workout plan
  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const response = await workoutService.getCurrentPlan();
        if (response.success && response.data.plan) {
          setCurrentPlan(response.data.plan);
        }
      } catch (error) {
        console.error('Error fetching current plan:', error);
      }
    };
    
    fetchCurrentPlan();
  }, []);
  
  // Function to calculate attendance percentage based on selected days per week
  const getAttendancePercentage = () => {
    const daysPerWeek = currentPlan?.daysPerWeek || 4; // Default to 4 if not available
    const today = new Date();
    const currentDay = today.getDate();
    
    // Calculate expected workout days based on daysPerWeek
    const weeksSoFar = Math.ceil(currentDay / 7);
    const expectedWorkoutDays = weeksSoFar * daysPerWeek;
    
    // Count actual attended days
    const attendedDays = attendanceData.filter(
      day => day.date <= currentDay && day.attended && day.isPastOrToday
    ).length;
    
    // Calculate percentage based on expected workout days
    return expectedWorkoutDays > 0 ? Math.round((attendedDays / expectedWorkoutDays) * 100) : 0;
  };

  // Function to format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.floor((now - then) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  // Function to calculate current streak
  const calculateStreak = () => {
    if (recentActivity.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = today;
    
    // Sort activities by timestamp descending (newest first)
    const sortedActivities = [...recentActivity].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    const activityDates = [...new Set(sortedActivities.map(activity => 
      new Date(activity.timestamp).toDateString()
    ))];
    
    // Check consecutive days
    while (true) {
      const dateString = currentDate.toDateString();
      if (activityDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Function to get attendance message based on selected days per week
  const getAttendanceMessage = () => {
    const daysPerWeek = currentPlan?.daysPerWeek || 4; // Default to 4 if not available
    const today = new Date();
    const currentDay = today.getDate();
    const weeksSoFar = Math.ceil(currentDay / 7);
    const expectedWorkouts = weeksSoFar * daysPerWeek;
    const actualAttended = attendanceData.filter(day => day.date <= currentDay && day.attended && day.isPastOrToday).length;
    
    // Calculate percentage based on selected days per week
    const percentage = expectedWorkouts > 0 ? Math.round((actualAttended / expectedWorkouts) * 100) : 0;
    
    if (percentage >= 100) {
      return `Perfect! You're following your ${daysPerWeek}-day plan perfectly!`;
    } else if (percentage >= 90) {
      return `Excellent! You're staying consistent with your ${daysPerWeek}-day routine!`;
    } else if (percentage >= 75) {
      return `Good job! You're mostly following your ${daysPerWeek}-day plan.`;
    } else if (percentage >= 50) {
      return `Not bad! Try to stick closer to your ${daysPerWeek}-day schedule.`;
    } else {
      return `You can do better! Aim for your ${daysPerWeek} day${daysPerWeek !== 1 ? 's' : ''} per week goal.`;
    }
  };
  
  // Function to render calendar days
  const renderCalendarDays = () => {
    return attendanceData;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back! Ready to crush your goals today?
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 hover:border-primary-500/30 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-primary-500/10 rounded-lg mr-4">
              <span className="text-primary-400 text-xl">💪</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Exercises Completed</p>
              <p className="text-2xl font-bold text-white">{recentActivity.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 hover:border-secondary-500/30 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-secondary-500/10 rounded-lg mr-4">
              <span className="text-secondary-400 text-xl">🔥</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-2xl font-bold text-white">{calculateStreak()} days</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 hover:border-purple-500/30 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/10 rounded-lg mr-4">
              <span className="text-purple-400 text-xl">⚡</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Calories Burned</p>
              <p className="text-2xl font-bold text-white">{Math.round(recentActivity.length * 85)}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 hover:border-yellow-500/30 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500/10 rounded-lg mr-4">
              <span className="text-yellow-400 text-xl">🎯</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Plan</p>
              <p className="text-2xl font-bold text-white">In Progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - taking 2/3 of the width */}
        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600 lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">📋</span> Recent Activity
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {/* Show recent exercise completions */}
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-3 bg-dark-600 rounded-lg border border-dark-500 hover:bg-dark-600/70 transition-colors duration-200">
                  <div className="p-2 bg-green-500/10 rounded mr-3">
                    <span className="text-green-400">✅</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{activity.message}</p>
                    <p className="text-xs text-gray-400">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                  <span className="text-green-400 text-sm font-medium">
                    +1 exercise
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="mb-2">No recent activity yet</p>
                <p className="text-sm">Complete exercises in your workout plan to see activity here</p>
              </div>
            )}
          </div>
        </div>

        {/* Attendance Calendar */}
        <div className="bg-dark-700 p-6 rounded-xl shadow border border-dark-600">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">📅</span> Workout Attendance
          </h2>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs font-medium text-gray-400 py-1">
                {day}
              </div>
            ))}
            
            {/* Empty cells for the beginning of the month based on the first day of the month */}
            {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="py-2"></div>
            ))}
            
            {/* Render calendar days with clickable green circles for attendance */}
            {renderCalendarDays().map((day, index) => {
              const dayIndex = day.date - 1;
              return (
                <div 
                  key={`day-${index}`}
                  className="relative w-8 h-8 flex flex-col items-center"
                >
                  <label 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                      day.attended 
                        ? 'bg-green-500 text-white' 
                        : day.isPastOrToday
                          ? 'text-gray-400 bg-dark-600 border border-gray-500 hover:bg-dark-500'
                          : 'text-gray-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (day.isPastOrToday) {
                        const updatedAttendance = [...attendanceData];
                        if (updatedAttendance[dayIndex]) {
                          updatedAttendance[dayIndex].attended = !updatedAttendance[dayIndex].attended;
                          setAttendanceData(updatedAttendance);
                        }
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={day.attended}
                      onChange={() => {}}
                      className="sr-only"
                    />
                    {day.date}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;